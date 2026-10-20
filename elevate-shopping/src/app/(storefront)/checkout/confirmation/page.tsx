"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import data from "@/data/products.json";
import { formatEtb } from "@/lib/utils/format";
import { useCart } from "@/features/cart/store/cart.store";
type SavedOrder = {
  trackingCode: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    country: string;
    deliveryZone: string;
    region: string;
    city: string;
    subCity: string;
    woreda: string;
    kebele: string;
    area: string;
    address: string;
    landmark: string;
    mapsLink: string;
    instructions: string;
  };
  createdAt: string;
};

export default function OrderConfirmationPage() {
  const { items } = useCart();
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("elevate-order-confirmation");
      if (saved) setOrder(JSON.parse(saved) as SavedOrder);
    } catch {
      setOrder(null);
    }
    setMounted(true);
  }, []);

  const lines = mounted
    ? items.flatMap((item) => {
        const product = data.find((p) => p.id === item.productId);
        return product
          ? [{ product, quantity: item.quantity, size: item.size }]
          : [];
      })
    : [];

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.priceEtb * line.quantity,
    0,
  );

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  if (!mounted) {
    return <main className="min-h-screen animate-pulse bg-[#ffffff]" />;
  }

  if (!order) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#ffffff] px-6 text-center text-[#211d19]">
        <div className="max-w-sm">
          <h1 className="font-serif text-3xl">Order confirmation</h1>
          <p className="mt-3 text-sm leading-6 text-[#212d19]">
            We couldn't find a recent checkout in this browser.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#17130f] px-6 text-xs font-semibold uppercase tracking-[0.15em] text-white"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  const c = order.customer;

  const address = [
    c.address,
    c.area,
    c.subCity,
    c.woreda ? `Woreda ${c.woreda}` : "",
    c.city,
    c.region,
    c.country,
  ]
    .filter(Boolean)
    .join(", ");

  const telegramMessage = [
    "Hello Elevate Collectives, I'd like to follow up on my order.",
    `Tracking code: ${order.trackingCode}`,
    `Name: ${c.fullName}`,
    `Phone: ${c.phone}`,
  ].join("\n");

  // Replace with your shop's actual Telegram username.
  const telegramUrl = `https://t.me/Youngermi?text=${encodeURIComponent(
    telegramMessage,
  )}`;

  return (
    <main className="min-h-screen bg-[#ffffff] pb-8 text-[#211d19]">
      <div className="mx-auto max-w-[520px] px-5 sm:px-6">
        {/* Confirmation hero */}
        <section className="pt-[52px] text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-[#d9b979] text-[#b1822e]">
            <img
              src="/logo.png"
              alt="Your Brand Name"
              width={120}
              height={120}
              className="h-8 w-auto object-contain"
            />
          </div>

          <h1 className="mt-6 font-serif text-[34px] font-normal leading-tight tracking-[-0.045em] text-[#17130f] sm:text-[36px]">
            Thank you, {c.fullName.trim().split(/\s+/)[0]}.
          </h1>

          <p className="mt-3 text-[14px] leading-[1.7] text-[#746b61]">
            Your order has been received. Our team will contact you shortly on{" "}
            <a href={`tel:${c.phone}`} className="font-medium text-[#211d19]">
              {c.phone}
            </a>{" "}
            to confirm delivery and payment.
          </p>

          {/* Tracking code */}
          <div className="mt-5 flex min-h-[62px] flex-wrap items-center justify-center gap-x-3 border border-[#d9bd88] bg-[#f4ebd8] px-3 py-3 text-[12px] uppercase tracking-[0.17em] text-[#17130f]">
            <span>Tracking code</span>
            <span className="font-medium tracking-[0.16em]">
              {order.trackingCode}
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="inline-flex min-h-[30px] items-center border border-[#ded9d1] bg-white px-4 text-[9px] uppercase tracking-[0.2em] text-[#746b61]">
              Status · Pending
            </span>
            <span className="inline-flex min-h-[30px] items-center border border-[#ded9d1] bg-white px-4 text-[9px] uppercase tracking-[0.2em] text-[#746b61]">
              Payment · Awaiting payment
            </span>
          </div>
        </section>

        {/* Decorative separator */}
        <div className="my-11 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#ded8cd]" />
          <span className="font-serif text-[13px] text-[#211d19]">
            እናመሰግናለን
          </span>
          <div className="h-px flex-1 bg-[#ded8cd]" />
        </div>

        {/* Order summary — same visual style as checkout */}
        <section className="border border-[#e5e0d8] bg-white px-5 py-6 sm:px-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-serif text-[23px] font-normal tracking-[-0.035em]">
              Order summary
            </h2>
            <span className="text-[11px] text-[#746b61]">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          <ul className="mt-5 divide-y divide-[#e8e3db] border-y border-[#e8e3db]">
            {lines.map(({ product, quantity, size }) => (
              <li
                key={`${product.id}-${size ?? "no-size"}`}
                className="flex gap-3 py-4"
              >
                <div
                  className="flex size-[64px] shrink-0 items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: product.colors?.[0]?.hex || "#eee9e0",
                  }}
                >
                  {product.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="px-1 text-center text-[9px] text-neutral-600">
                      {product.category}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[12px] leading-5 text-[#17130f]">
                    {product.name}
                  </h3>
                  <p className="text-[11px] leading-5 text-[#746b61]">
                    {formatEtb(product.priceEtb)} × {quantity}
                    {size ? ` · Size ${size}` : ""}
                  </p>
                </div>

                <span className="shrink-0 pt-1 text-[13px] text-[#17130f]">
                  {formatEtb(product.priceEtb * quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-4 text-[12px]">
            <div className="flex justify-between gap-3">
              <span className="text-[#746b61]">Subtotal</span>
              <span>{formatEtb(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#746b61]">Delivery fee</span>
              <span className="text-right text-[11px] text-[#746b61]">
                Confirmed by our team
              </span>
            </div>
          </div>

          <div className="my-5 border-t border-[#ded8cd]" />

          <div className="flex items-center justify-between gap-3">
            <span className="font-serif text-lg">Total</span>
            <span className="text-base font-semibold">
              {formatEtb(subtotal)}
            </span>
          </div>

          <p className="mt-2 text-right text-[10px] text-[#746b61]">
            Delivery fee not included
          </p>
        </section>

        {/* Delivery details */}
        <section className="mt-6 border border-[#e5e0d8] bg-white px-5 py-6 sm:px-6">
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em]">
              Delivering to
            </h2>
            <p className="mt-2 text-[13px] leading-[1.7] text-[#211d19]">
              {address || "Address not provided"}
            </p>

            {c.landmark && (
              <p className="mt-2 text-[12px] leading-5 text-[#746b61]">
                Landmark: {c.landmark}
              </p>
            )}

            {c.mapsLink && (
              <a
                href={c.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[12px] underline underline-offset-4"
              >
                View delivery location
              </a>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em]">
              What happens next
            </h2>
            <p className="mt-2 text-[13px] leading-[1.7] text-[#211d19]">
              We confirm your order by phone or Telegram, agree the delivery fee
              and payment, and prepare your order for dispatch.
            </p>
          </div>

          {c.instructions && (
            <div className="mt-5">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em]">
                Delivery instructions
              </h2>
              <p className="mt-2 text-[13px] leading-[1.7] text-[#746b61]">
                {c.instructions}
              </p>
            </div>
          )}
        </section>

        {/* Payment options */}
        <section className="mt-8 border border-[#e5e0d8] bg-white px-5 py-7 text-center sm:px-6">
          <h2 className="font-serif text-[23px] font-normal tracking-[-0.035em]">
            Pay now — {formatEtb(subtotal)}
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-[12px] leading-[1.7] text-[#746b61]">
            Pay securely online — or skip this and settle with our team by phone
            or Telegram instead.
          </p>

          <button
            type="button"
            className="mt-6 flex min-h-[51px] w-full items-center justify-center gap-2  focus-visible:outline-black bg-black px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white opacity-60"
          >
            Pay in Birr — {formatEtb(subtotal)}
          </button>

          <p className="mt-3 text-left text-[11px] leading-[1.7] text-[#746b61]">
            Telebirr · CBE Birr · M-Pesa · Cards and bank transfer via Chapa.
            Online payments are not enabled yet.
          </p>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e5e0d8]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#746b61]">
              Or pay in USD
            </span>
            <div className="h-px flex-1 bg-[#e5e0d8]" />
          </div>

          <button
            type="button"
            disabled
            className="flex min-h-[48px] w-full cursor-not-allowed items-center justify-center rounded-md bg-[#ffc439] px-4 text-sm font-semibold text-[#17345c] opacity-60"
          >
            Pay with PayPal
          </button>

          <button
            type="button"
            disabled
            className="mt-4 flex min-h-[48px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-md bg-[#292929] px-4 text-sm font-semibold text-white opacity-60"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-5"
              aria-hidden="true"
            >
              <rect x="2.5" y="4.5" width="19" height="15" rx="1" />
              <path d="M3 9h18" />
            </svg>
            Debit or Credit Card
          </button>

          <p className="mt-5 text-[11px] leading-[1.7] text-[#746b61]">
            Online payment is currently unavailable. Our team will contact you
            to confirm payment arrangements before dispatch.
          </p>
        </section>

        {/* Telegram contact */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 mt-6 flex min-h-[54px] items-center justify-center gap-3 bg-[#229ED9] px-5 text-[12px] font-semibold tracking-[0.04em] text-white transition-colors hover:bg-[#168bc3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#229ED9]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 shrink-0"
            aria-hidden="true"
          >
            <path d="M21.8 3.2a1.5 1.5 0 0 0-1.55-.25L2.7 9.7a1.45 1.45 0 0 0 .13 2.73l4.52 1.47 1.68 5.22a1.45 1.45 0 0 0 2.55.42l2.56-3.3 4.39 3.2a1.45 1.45 0 0 0 2.28-.88l2.03-13.9a1.5 1.5 0 0 0-1.04-1.46ZM9.1 13.45l8.82-6.04-6.87 7.54-.35 2.56-1.6-4.06Zm2.53 5.1.45-3.27 2.06-2.26-2.51 5.53Z" />
          </svg>
          Message us on Telegram
        </a>

        <p className="px-4 pb-4 pt-4 text-center text-[10px] leading-5 text-[#746b61]">
          Keep your tracking code for future order enquiries.
        </p>
      </div>
    </main>
  );
}
