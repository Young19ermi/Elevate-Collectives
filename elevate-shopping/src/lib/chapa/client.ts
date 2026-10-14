// Server-only. Never import from client components.
const BASE = "https://api.chapa.co/v1";
export async function initializePayment(body: Record<string, unknown>) {
  const res = await fetch(`${BASE}/transaction/initialize`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}
export async function verifyPayment(txRef: string) {
  const res = await fetch(`${BASE}/transaction/verify/${txRef}`, {
    headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
  });
  return res.json();
}
