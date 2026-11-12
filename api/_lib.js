// Utilitários compartilhados do checkout (arquivos com "_" não viram rota na Vercel).
import crypto from 'node:crypto';

const KEY = () => process.env.ASAAS_API_KEY || '';

export function asaasBase() {
  if (process.env.ASAAS_API_URL) return process.env.ASAAS_API_URL.replace(/\/$/, '');
  return KEY().startsWith('$aact_prod_') ? 'https://api.asaas.com/v3' : 'https://api-sandbox.asaas.com/v3';
}

export function isSandbox() {
  return !KEY().startsWith('$aact_prod_');
}

export async function asaas(path, { method = 'GET', body } = {}) {
  if (!KEY()) throw httpError(500, 'Pagamentos ainda não configurados (ASAAS_API_KEY ausente).');
  const r = await fetch(asaasBase() + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'IdentidadeDigital-Checkout/1.0',
      access_token: KEY(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!r.ok) {
    const msg = data?.errors?.[0]?.description || `Erro ${r.status} no processador de pagamentos.`;
    throw httpError(r.status >= 500 ? 502 : 400, msg);
  }
  return data;
}

export function httpError(status, message) {
  const e = new Error(message);
  e.status = status;
  return e;
}

// ---------- Assinatura dos links ----------
function secret() {
  if (process.env.CHECKOUT_SECRET) return process.env.CHECKOUT_SECRET;
  if (!KEY()) throw httpError(500, 'Pagamentos ainda não configurados.');
  return crypto.createHash('sha256').update('identidade-checkout|' + KEY()).digest('hex');
}

const b64u = (buf) => Buffer.from(buf).toString('base64url');

export function sign(str) {
  return b64u(crypto.createHmac('sha256', secret()).update(str).digest()).slice(0, 32);
}

export function safeEqual(a, b) {
  const A = Buffer.from(String(a));
  const B = Buffer.from(String(b));
  return A.length === B.length && crypto.timingSafeEqual(A, B);
}

export function encodeToken(payload) {
  const body = b64u(JSON.stringify(payload));
  return body + '.' + sign(body);
}

export function decodeToken(token) {
  const [body, sig] = String(token || '').split('.');
  if (!body || !sig || !safeEqual(sig, sign(body))) throw httpError(400, 'Link de pagamento inválido.');
  let p;
  try { p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')); } catch { throw httpError(400, 'Link de pagamento inválido.'); }
  if (p.e && todaySP() > p.e) throw httpError(410, 'Este link de pagamento expirou. Peça um novo à Identidade Digital.');
  return p;
}

// ---------- Datas (horário de Brasília) ----------
export function todaySP(addDays = 0) {
  const d = new Date(Date.now() + addDays * 86400000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(d); // YYYY-MM-DD
}

// ---------- HTTP ----------
export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { return {}; }
}

export function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

export function handle(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (e) {
      send(res, e.status || 500, { erro: e.status ? e.message : 'Não foi possível concluir agora. Tente novamente em instantes.' });
      if (!e.status) console.error(e);
    }
  };
}

export const onlyDigits = (s) => String(s || '').replace(/\D/g, '');
