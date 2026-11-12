// GET  /api/checkout/pay?t=TOKEN  → valida o link e devolve o resumo do pedido
// POST /api/checkout/pay          → cria o cliente e a cobrança no Asaas
import { handle, readJson, send, httpError, decodeToken, asaas, todaySP, onlyDigits, sign, isSandbox } from '../_lib.js';

function publicPlan(p) {
  return {
    servico: p.s, descricao: p.d, cliente: p.c, valor: p.v / 100, parcelas: p.p,
    descontoPix: p.x || 0, metodos: p.m, validade: p.e || null, sandbox: isSandbox(),
  };
}

const cents = (n) => Math.round(n) / 100;

export default handle(async (req, res) => {
  if (req.method === 'GET') {
    const url = new URL(req.url, 'http://x');
    const p = decodeToken(url.searchParams.get('t'));
    return send(res, 200, publicPlan(p));
  }
  if (req.method !== 'POST') throw httpError(405, 'Método não permitido.');

  const b = await readJson(req);
  const p = decodeToken(b.t);
  const metodo = String(b.metodo || '');
  if (!p.m.includes(metodo)) throw httpError(400, 'Forma de pagamento indisponível para este pedido.');

  const nome = String(b.nome || '').trim().slice(0, 100);
  const email = String(b.email || '').trim().slice(0, 120);
  const doc = onlyDigits(b.documento);
  const fone = onlyDigits(b.telefone).slice(-11);
  if (nome.length < 3) throw httpError(400, 'Informe seu nome completo.');
  if (![11, 14].includes(doc.length)) throw httpError(400, 'Informe um CPF ou CNPJ válido.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw httpError(400, 'Informe um e-mail válido.');

  // Cliente: reaproveita pelo CPF/CNPJ quando já existe
  const found = await asaas(`/customers?cpfCnpj=${doc}&limit=1`);
  let customer = found?.data?.[0]?.id;
  if (!customer) {
    const c = await asaas('/customers', {
      method: 'POST',
      body: { name: nome, cpfCnpj: doc, email, mobilePhone: fone || undefined, notificationDisabled: false },
    });
    customer = c.id;
  }

  const description = `${p.s}${p.d ? ' — ' + p.d : ''}`.slice(0, 500);
  const base = { customer, description, externalReference: `ID-${p.r}` };
  let body;

  if (metodo === 'pix') {
    body = { ...base, billingType: 'PIX', value: cents(p.v * (1 - (p.x || 0) / 100)), dueDate: todaySP() };
  } else if (metodo === 'boleto') {
    body = { ...base, billingType: 'BOLETO', value: cents(p.v), dueDate: todaySP(3) };
  } else {
    const n = Math.min(p.p, Math.max(1, parseInt(b.parcelas, 10) || 1));
    body = { ...base, billingType: 'CREDIT_CARD', dueDate: todaySP() };
    if (n >= 2) Object.assign(body, { installmentCount: n, totalValue: cents(p.v) });
    else body.value = cents(p.v);
  }

  const pay = await asaas('/payments', { method: 'POST', body });
  const out = {
    id: pay.id, chave: sign('status:' + pay.id), metodo, valor: pay.value,
    fatura: pay.invoiceUrl, status: pay.status,
  };

  if (metodo === 'pix') {
    try {
      const qr = await asaas(`/payments/${pay.id}/pixQrCode`);
      out.pix = { imagem: qr.encodedImage, copiaECola: qr.payload, expira: qr.expirationDate };
    } catch { /* sem QR: o cliente paga pela fatura */ }
  }
  if (metodo === 'boleto') {
    out.boleto = { url: pay.bankSlipUrl };
    try {
      const l = await asaas(`/payments/${pay.id}/identificationField`);
      out.boleto.linha = l.identificationField;
    } catch { /* linha digitável fica na fatura */ }
  }

  send(res, 200, out);
});
