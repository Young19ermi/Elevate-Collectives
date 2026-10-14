"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../store/cart.store";

export function CartBadge() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Link href="/cart" aria-label="Cart" className="relative p-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
      {mounted && count > 0 && <span className="absolute -right-0.5 -top-0.5 rounded-full bg-gray-900 px-1.5 text-[10px] text-white">{count}</span>}
    </Link>
  );
}
