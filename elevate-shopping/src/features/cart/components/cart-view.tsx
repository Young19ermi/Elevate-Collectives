"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import data from "@/data/products.json";
import { formatEtb } from "@/lib/utils/format";
import { useCart } from "../store/cart.store";

function BagIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 8h14l1 12H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      <path d="m9 13 3 3 3-3" />
    </svg>
  );
}

function EmptyBag() {
  return (
    <section className="flex min-h-[calc(100svh-69px)] flex-col bg-[#fcfcfc]">
      {/* Bag header */}
      <div className="flex h-[67px] shrink-0 items-center justify-between border-b border-neutral-200 px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <BagIcon className="size-5" />

          <h1 className="text-lg font-semibold tracking-tight">Your Bag</h1>

          <span className="text-sm text-neutral-500">(0 items)</span>
        </div>

        <Link
          href="/"
          aria-label="Close bag and continue shopping"
          className="flex size-9 items-center justify-center rounded-full transition hover:bg-neutral-100"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </Link>
      </div>

      {/* Centered empty state */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-[#f1f1f1] text-neutral-600">
          <BagIcon className="size-8" />
        </div>

        <h2 className="mt-5 text-lg font-medium tracking-tight">
          Your bag is empty
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-5 text-neutral-500">
          Looks like you haven't added anything to your bag yet.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          Start Shopping
        </Link>
      </div>
    </section>
  );
}

export function CartView() {
  const { items, add, dec, remove } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch while the cart store initializes.
  if (!mounted) {
    return (
      <div
        className="min-h-[calc(100svh-69px)] animate-pulse bg-[#fcfcfc]"
        aria-label="Loading your bag"
      />
    );
  }

  const lines = items.flatMap((item) => {
    const product = data.find((p) => p.id === item.productId);

    return product ? [{ p: product, q: item.quantity, size: item.size }] : [];
  });
  const total = lines.reduce((sum, line) => sum + line.p.priceEtb * line.q, 0);

  if (!lines.length) {
    return <EmptyBag />;
  }

  const itemCount = lines.reduce((sum, line) => sum + line.q, 0);

  return (
    <main className="min-h-[calc(100svh-69px)] bg-[#fcfcfc] text-neutral-950">
      {/* Bag heading */}
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8">
          <div>
            <h2 className="font-serif text-[23px] font-normal tracking-[-0.035em]">
              Your Bag
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-neutral-500"
          >
            Continue shopping
          </Link>
        </div>
      </header>

      {/* Cart items and order summary */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-8 md:grid-cols-[1fr_340px] md:px-8 md:py-12 lg:gap-16">
        <section>
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {lines.map(({ p, q, size }) => (
              <li
                key={`${p.id}-${size ?? "no-size"}`}
                className="flex gap-4 py-5 sm:gap-6"
              >
                <div
                  className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:size-32"
                  style={{ backgroundColor: p.colors?.[0]?.hex || "#f1f1f1" }}
                >
                  <span className="text-xs font-medium text-white/80">
                    {p.category}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-neutral-500">{p.category}</p>
                      <h3 className="mt-1 font-medium leading-5">{p.name}</h3>
                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                      {formatEtb(p.priceEtb * q)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    {formatEtb(p.priceEtb)} each
                  </p>
                  {size && (
                    <p className="mt-1 text-sm text-neutral-500">
                      Size: {size}
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <div className="flex h-9 items-center rounded-full border border-neutral-200 bg-white">
                      <button
                        type="button"
                        className="flex size-9 items-center justify-center disabled:opacity-30"
                        onClick={() => dec(p.id, size)}
                        disabled={q <= 1}
                        aria-label={`Decrease ${p.name} quantity`}
                      >
                        −
                      </button>

                      <span className="min-w-6 text-center text-sm">{q}</span>

                      <button
                        type="button"
                        className="flex size-9 items-center justify-center"
                        onClick={() => add(p.id, size)}
                        aria-label={`Increase ${p.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(p.id, size)}
                      className="text-xs text-neutral-500 underline underline-offset-4 transition-colors hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Order summary
          </h2>

          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Subtotal</span>
            <span>{formatEtb(total)}</span>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Shipping</span>
            <span className="text-neutral-500">Calculated at checkout</span>
          </div>

          <div className="my-5 border-t border-neutral-200" />

          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-semibold">{formatEtb(total)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex min-h-12 w-full items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Proceed to checkout
          </Link>

          <p className="mt-4 text-center text-xs leading-5 text-neutral-500">
            Secure checkout · Delivery across Ethiopia
          </p>
        </aside>
      </div>
    </main>
  );
}
