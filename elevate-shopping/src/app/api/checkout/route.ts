import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { initializePayment } from "@/lib/chapa/client";

export async function POST(req: Request) {
  const parsed = checkoutSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  // TODO: load cart + prices from the DB (never trust client prices), create order, then:
  // const res = await initializePayment({ amount, currency: "ETB", tx_ref, return_url, callback_url, ... });
  return Response.json({ checkout_url: null });
}
