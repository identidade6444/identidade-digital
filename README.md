# Identidade Digital — Site institucional

Site single-page para a Identidade Digital, agência de marketing digital 360°.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) com paleta de cores customizada (`tailwind.config.ts`)
- [Framer Motion](https://motion.dev/) para microanimações
- [react-icons](https://react-icons.github.io/react-icons/) para ícones
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

Os arquivos otimizados são gerados em `dist/`. Para conferir o resultado localmente:

```bash
npm run preview
```

## Deploy

O projeto é estático após o build (`dist/`) e pode ser publicado diretamente na [Vercel](https://vercel.com/) ou [Netlify](https://netlify.com/):

- **Vercel**: framework preset "Vite", build command `npm run build`, output directory `dist`.
- **Netlify**: build command `npm run build`, publish directory `dist`.

## Estrutura de pastas

```
src/
  assets/        # imagens e SVGs
  components/    # componentes reutilizáveis (Header, Logo, ContactForm)
  sections/      # seções da landing page (Hero, About, Services, ...)
  styles/        # CSS global (Tailwind + fontes)
  lib/           # constantes e helpers (WhatsApp, contatos)
```

## Conteúdo a substituir

O projeto foi entregue com placeholders que devem ser trocados por materiais reais antes do lançamento:

- **Logo**: `src/components/Logo.tsx` é um SVG gerado a partir da descrição da marca (coração de impressões digitais laranja/amarelo sobre gradiente ciano→azul). Substitua pela arte oficial em vetor quando disponível — o componente aceita as variantes `dark` (fundo claro) e `light` (fundo escuro/gradiente).
- **Favicon e imagem de compartilhamento**: `public/favicon.svg` e `public/og-image.svg` seguem o mesmo estilo provisório.
- **Portfólio**: `src/sections/Portfolio.tsx` usa blocos com gradiente no lugar de prints reais de campanhas.
- **Depoimentos**: `src/sections/Testimonials.tsx` traz depoimentos ilustrativos (sem nomes reais) — trocar por depoimentos reais de clientes quando autorizado.

## Configuração de contato

Número de WhatsApp, e-mail e Instagram estão centralizados em [`src/lib/constants.ts`](src/lib/constants.ts).
