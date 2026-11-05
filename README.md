# Identidade Digital — Site institucional

Site single-page da Identidade Digital, agência de marketing digital 360°.

## Stack

- Um único `index.html` com HTML, CSS e JavaScript inline (sem framework)
- [Vite](https://vite.dev/) apenas para servir localmente e gerar o `dist/` (copia `public/` junto)
- Formulário de contato client-side que redireciona para o WhatsApp (sem backend)

## Como rodar localmente

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

Os arquivos são gerados em `dist/`. Para conferir o resultado localmente:

```bash
npm run preview
```

## Deploy

A Vercel publica automaticamente a cada push na `main` (preset "Vite", build `npm run build`, output `dist`). Veja `PUBLICAR/LEIA-ME - Como publicar.md`.

## Estrutura

```
index.html      # o site inteiro
public/         # imagens, vídeos, favicon e og-image (copiados para dist/)
  novo/         # assets do site 360°
  clientes/     # sites de clientes servidos sob /clientes/
CLIENTES/       # fontes dos sites de clientes (cada um é um projeto Vercel próprio)
PUBLICAR/       # scripts de publicação
```

## Onde editar

Tudo fica no `<script>` do `index.html`:

- **WhatsApp**: constante `WA` e helper `wa()`
- **Serviços**: `SERVICES`
- **Portfólio**: `PROJECTS` e as categorias em `CATS`

## Histórico

Até outubro/2026 o site era uma SPA em React + Tailwind (`src/`). Ela foi substituída pelo `index.html` atual no commit `f906a5b` e removida depois; o código antigo continua acessível pelo histórico do git.
