import { createHmac, timingSafeEqual } from "crypto";
// TODO: confirm exact header names and signing method against Chapa's current webhook docs.
export function isValidChapaSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = createHmac("sha256", process.env.CHAPA_WEBHOOK_SECRET!).update(rawBody).digest("hex");
  const a = Buffer.from(expected), b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
