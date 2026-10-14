"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import data from "@/data/products.json";
import { formatEtb } from "@/lib/utils/format";
import { useCart } from "../store/cart.store";

export function CartView() {
  const { items, add, dec, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const lines = items.flatMap((i) => { const p = data.find((d) => d.id === i.productId); return p ? [{ p, q: i.quantity }] : []; });
  const total = lines.reduce((s, l) => s + l.p.priceEtb * l.q, 0);
  if (!lines.length) return (
    <div className="py-20 text-center">
      <p className="text-gray-500">Your cart is empty.</p>
      <Link href="/products" className="mt-4 inline-block underline">Continue shopping</Link>
    </div>
  );
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
      <ul className="divide-y">
        {lines.map(({ p, q }) => (
          <li key={p.id} className="flex items-center gap-4 py-4">
            <div className="h-20 w-20 shrink-0 rounded-lg" style={{ background: p.color }} />
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">{formatEtb(p.priceEtb)}</p>
              <button onClick={() => remove(p.id)} className="mt-1 text-xs text-gray-500 underline">Remove</button>
            </div>
            <div className="flex items-center gap-3 rounded-full border px-2">
              <button className="h-8 w-8" onClick={() => dec(p.id)} aria-label="Decrease">−</button>
              <span>{q}</span>
              <button className="h-8 w-8" onClick={() => add(p.id)} aria-label="Increase">+</button>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-xl border p-5">
        <h2 className="font-semibold">Summary</h2>
        <div className="mt-4 flex justify-between"><span>Total</span><span className="font-semibold">{formatEtb(total)}</span></div>
        <Link href="/checkout" className="mt-5 flex min-h-11 items-center justify-center rounded-lg bg-gray-900 text-white">Checkout</Link>
      </aside>
    </div>
  );
}
