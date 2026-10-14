#!/bin/bash
# Publica o site de um cliente na Vercel com segurança.
# Publica a partir de uma cópia FORA do repositório da agência, então a Vercel
# nunca liga o projeto do cliente ao GitHub da Identidade Digital.
BASE="$HOME/identidade-digital/CLIENTES"
SCOPE="agencia10"
VC="npx --yes vercel@latest"
fim(){ echo; read -p "Enter para fechar."; exit ${1:-0}; }

# 1. Escolher o site
if [ -n "$1" ]; then DIR="${1%/}"; else
  cd "$BASE" || { echo "Não achei a pasta $BASE"; fim 1; }
  OPTS=(); for d in */; do d="${d%/}"; [ "$d" = "_modelo" ] && continue; [ -f "$d/index.html" ] && OPTS+=("$d"); done
  [ ${#OPTS[@]} -eq 0 ] && { echo "Nenhum site encontrado em CLIENTES."; fim 1; }
  echo "Qual site você quer publicar?"; echo
  PS3=$'\nDigite o número e aperte Enter: '
  select d in "${OPTS[@]}"; do [ -n "$d" ] && break; done
  DIR="$BASE/$d"
fi
NOME="$(basename "$DIR")"
[ -f "$DIR/index.html" ] || { echo "Não há index.html em $DIR"; fim 1; }
PROJ="$NOME"; [ -f "$DIR/projeto-vercel.txt" ] && PROJ="$(head -1 "$DIR/projeto-vercel.txt" | tr -d '[:space:]')"
case "$PROJ" in identidade-digital*) echo "ERRO: o projeto '$PROJ' é o da agência. Ajuste projeto-vercel.txt."; fim 1;; esac

# 2. Copiar para fora do repositório
TMP="$(mktemp -d /tmp/publicar-XXXXXX)"
rsync -a --exclude '*.command' --exclude 'README.md' --exclude 'projeto-vercel.txt' \
  --exclude '.DS_Store' --exclude '.gitignore' --exclude '.git' "$DIR"/ "$TMP"/
cd "$TMP" || fim 1

echo; echo "Publicando \"$NOME\" no projeto Vercel \"$PROJ\"..."; echo
# 3. Ligar ao projeto certo (cria se não existir)
if [ ! -f .vercel/project.json ]; then
  $VC project add "$PROJ" --scope "$SCOPE" >/dev/null 2>&1
  $VC link --yes --project "$PROJ" --scope "$SCOPE" || { echo "Falhou ao ligar ao projeto."; fim 1; }
fi
# Garante que o projeto não está ligado a nenhum GitHub (erro aqui é normal)
$VC git disconnect --yes --scope "$SCOPE" </dev/null >/dev/null 2>&1

# 4. Publicar
$VC deploy --prod --yes --scope "$SCOPE" 2>&1 | tee deploy.log
mkdir -p "$DIR/.vercel" && cp .vercel/project.json "$DIR/.vercel/"
[ -f "$DIR/projeto-vercel.txt" ] || echo "$PROJ" > "$DIR/projeto-vercel.txt"

# 5. Conferir se o endereço mostra o site certo
URL="$(sed $'s/\x1b\\[[0-9;]*m//g' deploy.log | grep -Eo 'Aliased: https://[^ ]+' | head -1 | sed 's/Aliased: //')"
[ -z "$URL" ] && URL="https://$PROJ.vercel.app"
titulo(){ tr '\n' ' ' | grep -o '<title>[^<]*' | head -1 | sed 's/<title>//; s/^ *//; s/ *$//'; }
LOCAL="$(titulo < index.html)"
OK=0
for i in 1 2 3; do
  REMOTO="$(curl -sL "$URL" | titulo)"
  [ "$REMOTO" = "$LOCAL" ] && { OK=1; break; }; sleep 5
done
echo; echo "=================================================="
if [ $OK -eq 1 ]; then
  echo "PRONTO! O site está no ar e conferido:"; echo "  $URL"
else
  echo "ATENÇÃO: o endereço $URL"; echo "não está mostrando o título esperado (\"$LOCAL\")."
  if [ -z "$REMOTO" ]; then echo "Não consegui abrir o endereço (internet ou site fora do ar)."; else echo "Ele mostrou: \"$REMOTO\""; fi
  echo "Tire um print desta janela e mande no chat."
fi
echo "=================================================="
echo; echo "Próximo passo: peça ao Claude \"coloque o site $NOME no portfólio da agência\"."
rm -rf "$TMP"
fim
