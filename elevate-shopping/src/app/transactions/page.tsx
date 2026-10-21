"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { formatEtb } from "@/lib/utils/format";
import {
  ORDER_HISTORY_STORAGE_KEY,
  type StoredOrder,
} from "@/lib/orders/order-history";

function formatOrderDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-ET", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getDeliveryAddress(order: StoredOrder) {
  const customer = order.customer;

  return [
    customer.address,
    customer.area,
    customer.subCity,
    customer.woreda ? `Woreda ${customer.woreda}` : "",
    customer.kebele ? `Kebele ${customer.kebele}` : "",
    customer.city,
    customer.region,
    customer.country,
  ]
    .filter(Boolean)
    .join(", ");
}

function EmptyOrders() {
  return (
    <section className="flex flex-col items-center px-5 py-16 text-center sm:py-24">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#e8dfd1] bg-[#f5efe5]">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-11 w-11 text-[#826849]"
          aria-hidden="true"
        >
          <path
            d="M8 16.5 24 8l16 8.5v18L24 43 8 34.5v-18Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="m8.5 16.5 15.5 9 15.5-9M24 26v16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a18158]">
        Your story starts here
      </p>

      <h2 className="mt-3 font-serif text-3xl text-[#292119] sm:text-4xl">
        Nothing in your orders. Yet.
      </h2>

      <p className="mt-4 max-w-sm text-sm leading-7 text-[#84796c]">
        Your next favorite is waiting. Find something you love, place your first
        order, and it will show up right here.
      </p>

      <Link
        href="/products"
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-[#211a14] px-7 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#5c4732]"
      >
        Explore the collection
      </Link>

      <Link
        href="/"
        className="mt-5 text-xs text-[#84796c] underline underline-offset-4 transition hover:text-[#292119]"
      >
        Back to home
      </Link>
    </section>
  );
}

function OrderCard({
  order,
  number,
  onDelete,
}: {
  order: StoredOrder;
  number: number;
  onDelete: (trackingCode: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const address = getDeliveryAddress(order);

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-[#e9e2d8] bg-white shadow-[0_4px_24px_rgba(44,32,18,0.035)]">
        {/* Compact transaction header */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            {/* Transaction number */}
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e8dfd1] bg-[#faf7f1] font-serif text-sm text-[#826849]">
              {number}
            </div>

            {/* Tapping this section expands the transaction */}
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              className="min-w-0 flex-1 text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#211a14]">
                  Order reference
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d7e8d9] bg-[#f0f7f0] px-2.5 py-1.5 text-[10px] font-semibold text-[#326840]">
                  {/* <span aria-hidden="true">✓</span> */}
                  Order Confirmed
                </span>
              </div>

              <p className="mt-2 break-all font-mono text-xs leading-5 text-[#30271f] sm:text-sm">
                {order.trackingCode}
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-[#211a14]">
                  Placed {formatOrderDate(order.createdAt)}
                </p>
              </div>
            </button>
          </div>

          {/* Compact actions at the bottom of the transaction box */}
          <div className="mt-4 flex items-center justify-between border-t border-[#eee8df] pt-3">
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              aria-label={`Delete transaction ${number}`}
              title="Delete transaction history"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#a5332b] transition hover:bg-[#fbefed] hover:text-[#a5332b]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M10 11v6M14 11v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium text-[#79582e] transition hover:bg-[#f8f3eb]"
            >
              {expanded ? "Hide details" : "View details"}
              <span aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
          </div>
        </div>

        {/* Full details only appear when expanded */}
        {expanded && (
          <div className="border-t border-[#eee8df]">
            {/* Payment status */}
            <div className="mx-5 mt-5 flex gap-3 rounded-xl border border-[#eadfc9] bg-[#fbf7ee] p-4 sm:mx-7 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#efe3ce] text-[#86673e]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 10h18M7 15h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#463623]">
                  Payment Awaited
                </p>
                <p className="mt-1 text-[11px] leading-5 text-[#8d7b64]">
                  You Will Pay After you get the Product in hand.
                </p>
              </div>
            </div>

            {/* Purchased products */}
            <div className="space-y-4 px-5 py-5 sm:px-7">
              {order.items.map((item, index) => (
                <div
                  key={`${item.productId}-${item.size ?? ""}-${index}`}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-[76px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f6f3ee] sm:h-[88px] sm:w-[78px]">
                    {item.imageUrl?.startsWith("/") ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        width={88}
                        height={100}
                        unoptimized
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="h-7 w-7 text-[#b4a794]"
                        aria-hidden="true"
                      >
                        <rect
                          x="4"
                          y="4"
                          width="24"
                          height="24"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="m7 22 6-6 4 4 3-3 5 5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-6 text-[#30271f]">
                      {item.productName}
                    </p>

                    {item.size && (
                      <p className="mt-1 text-xs text-[#8f8375]">
                        Size: {item.size}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-[#8f8375]">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-right text-sm font-medium text-[#30271f]">
                    {formatEtb(item.unitPriceEtb * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Price summary */}
            <div className="mx-5 border-t border-[#eee8df] py-5 sm:mx-7">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-[#82776a]">Subtotal</span>
                <span className="font-medium text-[#30271f]">
                  {formatEtb(order.subtotalEtb)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 text-xs">
                <span className="text-[#82776a]">Delivery fee</span>
                <span className="text-[#82776a]">To be confirmed</span>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4 border-t border-[#eee8df] pt-4">
                <div>
                  <p className="font-serif text-lg text-[#30271f]">
                    Total before delivery
                  </p>
                  <p className="mt-1 text-[11px] text-[#968b7e]">
                    Your final delivery cost will be confirmed by our team.
                  </p>
                </div>

                <p className="shrink-0 text-lg font-semibold text-[#30271f]">
                  {formatEtb(order.subtotalEtb)}
                </p>
              </div>
            </div>

            {/* Customer and delivery details */}
            <details className="border-t border-[#eee8df] bg-[#fcfbf8] px-5 py-4 sm:px-7">
              <summary className="cursor-pointer text-xs font-semibold text-[#514333]">
                Customer &amp; delivery details
              </summary>

              <div className="mt-5 grid gap-5 border-t border-[#eee8df] pt-5 text-xs sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a18158]">
                    Customer
                  </p>
                  <p className="mt-3 font-medium text-[#30271f]">
                    {order.customer.fullName}
                  </p>
                  <p className="mt-2 break-all leading-5 text-[#82776a]">
                    {order.customer.email}
                  </p>
                  <p className="mt-1 text-[#82776a]">{order.customer.phone}</p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a18158]">
                    Delivery address
                  </p>

                  <p className="mt-3 leading-6 text-[#82776a]">
                    {address || "No address provided"}
                  </p>

                  {order.customer.landmark && (
                    <p className="mt-2 leading-5 text-[#82776a]">
                      Landmark: {order.customer.landmark}
                    </p>
                  )}

                  {order.customer.instructions && (
                    <p className="mt-2 leading-5 text-[#82776a]">
                      Instructions: {order.customer.instructions}
                    </p>
                  )}

                  {order.customer.mapsLink &&
                    /^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl\/)/i.test(
                      order.customer.mapsLink,
                    ) && (
                      <a
                        href={order.customer.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-[#79582e] underline underline-offset-4"
                      >
                        View map location
                      </a>
                    )}
                </div>
              </div>
            </details>
          </div>
        )}
      </article>

      {/* Delete confirmation dialog */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setConfirmDelete(false);
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`delete-order-title-${number}`}
            aria-describedby={`delete-order-description-${number}`}
            className="w-full max-w-md rounded-2xl border border-[#e9e2d8] bg-[#fffdf9] p-6 shadow-2xl sm:p-7"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fbefed] text-[#a5332b]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M10 11v6M14 11v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2
              id={`delete-order-title-${number}`}
              className="mt-5 font-serif text-2xl text-[#30271f]"
            >
              Delete transaction history?
            </h2>

            <p
              id={`delete-order-description-${number}`}
              className="mt-3 text-sm leading-6 text-[#796e61]"
            >
              Before deleting this record, make sure you have received your
              product. You may need this tracking number to follow up on your
              delivery.
            </p>

            <div className="mt-4 rounded-lg border border-[#eee4d5] bg-[#f8f3eb] p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#a18158]">
                Tracking number
              </p>
              <p className="mt-2 break-all font-mono text-xs text-[#30271f]">
                {order.trackingCode}
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-[#968b7e]">
              Deleting this history removes it from this browser. It does not
              cancel your order or stop delivery, but you may lose easy access
              to its details.
            </p>

            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#e5ddd1] px-5 text-xs font-medium text-[#514333] transition hover:bg-[#f8f3eb]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => onDelete(order.trackingCode)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#a5332b] px-5 text-xs font-semibold text-white transition hover:bg-[#842820]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7h16M10 11v6M14 11v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Delete history
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default function TransactionsPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDER_HISTORY_STORAGE_KEY);

      if (raw) {
        const parsed: unknown = JSON.parse(raw);

        if (Array.isArray(parsed)) {
          setOrders(parsed as StoredOrder[]);
        }
      }
    } catch (error) {
      console.error("Could not read transaction history:", error);
    } finally {
      setLoaded(true);
    }
  }, []);
  const handleDeleteOrder = (trackingCode: string) => {
    const updatedOrders = orders.filter(
      (order) => order.trackingCode !== trackingCode,
    );

    try {
      localStorage.setItem(
        ORDER_HISTORY_STORAGE_KEY,
        JSON.stringify(updatedOrders),
      );

      setOrders(updatedOrders);

      // Update the transaction badge in the page header.
      window.dispatchEvent(new Event("elevate-transactions-updated"));
    } catch (error) {
      console.error("Could not delete transaction history:", error);

      window.alert(
        "We couldn't delete this transaction history. Please try again.",
      );
    }
  };
  return (
    <main className="min-h-screen bg-[#ffffff] text-[#30271f]">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        {/* Page heading */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#30271f]"></p>

            <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
              Your orders
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#84796c]">
              Your purchases, tracking codes, and order details in one place.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden shrink-0 border-b border-[#cbb99d] pb-1 text-xs font-medium text-[#6f5638] transition hover:text-[#30271f] sm:inline-block"
          >
            Continue shopping
          </Link>
        </div>

        {/* Loading state */}
        {!loaded ? (
          <div className="space-y-4" aria-label="Loading order history">
            <div className="h-32 animate-pulse rounded-2xl bg-[#f0ebe3]" />
            <div className="h-64 animate-pulse rounded-2xl bg-[#f0ebe3]" />
          </div>
        ) : orders.length === 0 ? (
          /* Empty state */
          <div className="rounded-2xl border border-[#e9e2d8] bg-white">
            <EmptyOrders />
          </div>
        ) : (
          /* Existing orders */
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[#75695a]">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>

              <p className="text-[10px] uppercase tracking-[0.16em] text-[#a18158]">
                Order history
              </p>
            </div>

            <div className="space-y-6">
              {orders.map((order, index) => (
                <OrderCard
                  key={order.trackingCode}
                  order={order}
                  number={index + 1}
                  onDelete={handleDeleteOrder}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#211a14] px-7 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#5c4732]"
              >
                Find your next favorite
              </Link>
            </div>
          </>
        )}

        <p className="mt-12 text-center text-[10px] tracking-[0.12em] text-[#a09586]">
          ELEVATE COLLECTIVES
        </p>
        <p className="mt-2 text-center text-[10px] tracking-[0.12em] text-[#a09586]">
          OTHERS DELIVER ORDERS. WE DELIVER VALUE.
        </p>
      </div>
    </main>
  );
}
