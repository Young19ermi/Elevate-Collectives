import { isValidChapaSignature } from "@/lib/chapa/webhook";
import { verifyPayment } from "@/lib/chapa/client";

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-chapa-signature");
  if (!isValidChapaSignature(raw, sig)) return new Response("Invalid signature", { status: 401 });
  const event = JSON.parse(raw);
  // Always re-verify with Chapa before marking an order paid.
  const result = await verifyPayment(event.tx_ref);
  // TODO: update order status in Supabase (idempotently) based on `result`.
  return Response.json({ received: true, status: result?.data?.status });
}
