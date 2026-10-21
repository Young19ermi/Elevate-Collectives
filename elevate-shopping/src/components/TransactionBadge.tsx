"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ORDER_HISTORY_STORAGE_KEY } from "@/lib/orders/order-history";

export function TransactionBadge() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      try {
        const raw = localStorage.getItem(ORDER_HISTORY_STORAGE_KEY);

        if (!raw) {
          setCount(0);
          setMounted(true);
          return;
        }

        const parsed: unknown = JSON.parse(raw);

        setCount(Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        setCount(0);
      }

      setMounted(true);
    };

    updateCount();

    // Updates when transactions change in this tab.
    window.addEventListener("elevate-transactions-updated", updateCount);

    // Updates when transactions change in another browser tab.
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("elevate-transactions-updated", updateCount);

      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <Link
      href="/transactions"
      aria-label={`Transaction history${mounted ? `, ${count} ${count === 1 ? "order" : "orders"}` : ""}`}
      title="Transaction history"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#f3eee6]"
    >
      <img src=" /bank-statement.png" width={24} height={24}/>

      {mounted && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-medium leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
