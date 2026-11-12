// GET /api/checkout/status?id=pay_xxx&k=ASSINATURA → status da cobrança
import { handle, send, httpError, asaas, sign, safeEqual } from '../_lib.js';

const PAGO = ['RECEIVED', 'CONFIRMED', 'RECEIVED_IN_CASH'];

export default handle(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const id = url.searchParams.get('id') || '';
  const k = url.searchParams.get('k') || '';
  if (!/^pay_[A-Za-z0-9]+$/.test(id) || !safeEqual(k, sign('status:' + id))) throw httpError(400, 'Consulta inválida.');
  const p = await asaas(`/payments/${id}`);
  send(res, 200, { status: p.status, pago: PAGO.includes(p.status) });
});
