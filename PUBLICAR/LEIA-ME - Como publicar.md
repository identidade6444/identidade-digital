# Como publicar sites (Identidade Digital)

Tudo fica na pasta `~/identidade-digital`. Para abrir: no Finder, **Cmd + Shift + G**, cole `~/identidade-digital/PUBLICAR` e aperte Enter.

## Site novo de cliente
1. Dois cliques em **1 - Novo site de cliente** e digite o nome do cliente. A pasta é criada em `CLIENTES/`.
2. Peça ao Claude: *"crie o site do [cliente] na pasta CLIENTES/[pasta]"*.
3. Dois cliques em **2 - Publicar site de cliente** e escolha o número do site. No fim, a janela confere sozinha se o endereço mostra o site certo.
4. Peça ao Claude: *"coloque o site [cliente] no portfólio da agência"*.
5. Dois cliques em **3 - Publicar site da agência**.
6. Cadastre o endereço no monitor (UptimeRobot, tipo "Keyword", com o nome do cliente como palavra-chave).

## Atualizar um site de cliente que já existe
Depois que o Claude alterar os arquivos: **2 - Publicar site de cliente** e escolha o site.

## Atualizar o site da agência
**3 - Publicar site da agência**.

## Regras que evitam o erro de outubro/2026
- Nunca rode `vercel` direto de dentro da pasta `identidade-digital`. Use sempre o **2**, porque ele publica a partir de uma cópia fora do repositório.
- Na Vercel, nenhum projeto de cliente pode aparecer ligado ao repositório `identidade6444/identidade-digital` (Settings → Git).
- O nome do projeto na Vercel fica gravado no arquivo `projeto-vercel.txt` dentro da pasta de cada cliente.
