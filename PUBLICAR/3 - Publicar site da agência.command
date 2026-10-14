#!/bin/bash
# Publica as atualizações do site da Identidade Digital (envia para o GitHub; a Vercel atualiza sozinha).
cd "$HOME/identidade-digital" || { echo "Não achei a pasta identidade-digital."; read -p "Enter para fechar"; exit 1; }
rm -f .git/*.lock .git/stale-*-lock-* 2>/dev/null
echo "Enviando o site da agência..."
if git push origin main; then
  echo; echo "Pronto! Em 1 a 2 minutos o site estará atualizado em identidadedigital64.com.br"
else
  echo; echo "Algo deu errado. Tire um print desta janela e mande no chat."
fi
read -p "Enter para fechar."
