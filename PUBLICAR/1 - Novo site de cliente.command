#!/bin/bash
# Cria a pasta de um novo site de cliente a partir do modelo.
BASE="$HOME/identidade-digital/CLIENTES"
fim(){ echo; read -p "Enter para fechar."; exit ${1:-0}; }
read -p "Nome do cliente (ex.: Quintal Bar e Restaurante): " NOME
[ -z "$NOME" ] && fim 1
SLUG="$(echo "$NOME" | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"
DIR="$BASE/$SLUG"
[ -e "$DIR" ] && { echo "Já existe uma pasta $SLUG em CLIENTES."; open "$DIR"; fim 1; }
cp -R "$BASE/_modelo" "$DIR" || fim 1
export NOME; perl -pi -e 's/\{\{CLIENTE\}\}/$ENV{NOME}/g' "$DIR/index.html"
echo "$SLUG" > "$DIR/projeto-vercel.txt"
echo; echo "Criada a pasta CLIENTES/$SLUG"
echo "Endereço que o site vai ter: https://$SLUG.vercel.app"
echo; echo "Agora peça ao Claude: \"crie o site do $NOME na pasta CLIENTES/$SLUG\"."
open "$DIR"
fim
