// POST /api/checkout/link — gera um link de pagamento assinado (uso interno, protegido por senha).
import { handle, readJson, send, httpError, encodeToken, safeEqual, isSandbox } from '../_lib.js';
import crypto from 'node:crypto';

export default handle(async (req, res) => {
  if (req.method !== 'POST') throw httpError(405, 'Método não permitido.');
  const b = await readJson(req);

  const senha = process.env.CHECKOUT_SENHA;
  if (!senha) throw httpError(500, 'Defina a variável CHECKOUT_SENHA na Vercel para usar o gerador.');
  if (!safeEqual(b.senha || '', senha)) {
    await new Promise((r) => setTimeout(r, 700));
    throw httpError(401, 'Senha incorreta.');
  }
  if (b.verificar) return send(res, 200, { ok: true, sandbox: isSandbox() });

  const servico = String(b.servico || '').trim().slice(0, 80);
  const descricao = String(b.descricao || '').trim().slice(0, 240);
  const cliente = String(b.cliente || '').trim().slice(0, 80);
  const valor = Math.round(Number(b.valor) * 100);
  const parcelas = Math.min(12, Math.max(1, parseInt(b.parcelas, 10) || 1));
  const descontoPix = Math.min(30, Math.max(0, Number(b.descontoPix) || 0));
  const metodos = ['pix', 'cartao', 'boleto'].filter((m) => (b.metodos || []).includes(m));
  const validade = /^\d{4}-\d{2}-\d{2}$/.test(b.validade || '') ? b.validade : '';

  if (!servico) throw httpError(400, 'Informe o serviço.');
  if (!Number.isFinite(valor) || valor < 500) throw httpError(400, 'Informe um valor a partir de R$ 5,00.');
  if (!metodos.length) throw httpError(400, 'Escolha pelo menos uma forma de pagamento.');

  const payload = {
    s: servico, d: descricao, c: cliente, v: valor, p: parcelas, x: descontoPix,
    m: metodos, e: validade, r: crypto.randomBytes(4).toString('hex'),
  };
  const token = encodeToken(payload);
  const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`;
  send(res, 200, { link: `${origin}/pagar/?t=${token}`, sandbox: isSandbox() });
});
