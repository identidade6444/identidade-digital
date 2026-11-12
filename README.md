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

## Checkout (pagamentos pelo site)

- **`/pagar/gerar`** — área interna (senha) para gerar o link de pagamento de cada venda: serviço, valor, parcelas no cartão (até 12x sem juros), formas aceitas, desconto no Pix e validade.
- **`/pagar/?t=…`** — página que o cliente abre: Pix com QR Code na tela, cartão (à vista ou parcelado, digitado no ambiente seguro do Asaas) e boleto. Atualiza sozinha quando o pagamento é confirmado.
- **`api/checkout/`** — funções serverless da Vercel que falam com o Asaas. O link é assinado (HMAC): se alguém alterar o valor na URL, o link deixa de funcionar.

Variáveis de ambiente na Vercel (Settings → Environment Variables):

| Nome | O que é |
|---|---|
| `ASAAS_API_KEY` | Chave de API do Asaas. `$aact_hmlg_…` = sandbox (teste), `$aact_prod_…` = produção. O ambiente é detectado pela chave. |
| `CHECKOUT_SENHA` | Senha da página `/pagar/gerar`. |
| `CHECKOUT_SECRET` | Opcional. Chave de assinatura dos links; sem ela, é derivada da `ASAAS_API_KEY` (trocar a chave invalida links antigos). |

A conta bancária fica cadastrada no Asaas, nunca no site.
