"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CartBadge } from "@/features/cart/components/cart-badge";
import { categoryTree } from "@/features/products/api/get-categories";
import { Logo } from "./logo";
import { TransactionBadge } from "@/components/TransactionBadge";
import { MobileMenu } from "./mobile-menu";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-neutral-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden gap-8 md:flex">
          <Link href="/products">All</Link>
          {categoryTree.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/transactions"
            aria-label="Transaction History"
            className="p-2"
          >
            <TransactionBadge />
          </Link>
          <CartBadge />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="p-2 md:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}
