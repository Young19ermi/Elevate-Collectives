"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import data from "@/data/products.json";
import { formatEtb } from "@/lib/utils/format";
import { useCart } from "@/features/cart/store/cart.store";
import { useRouter } from "next/navigation";
type CheckoutForm = {
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

const initialForm: CheckoutForm = {
  fullName: "",
  phone: "",
  email: "",
  country: "Ethiopia",
  deliveryZone: "Addis Ababa",
  region: "Addis Ababa",
  city: "Addis Ababa",
  subCity: "",
  woreda: "",
  kebele: "",
  area: "",
  address: "",
  landmark: "",
  mapsLink: "",
  instructions: "",
};

const inputClass =
  "mt-2 block h-[46px] w-full rounded-none border border-[#d8d5d0] bg-white px-4 text-[13px] text-[#211d19] outline-none transition focus:border-[#9b7741] focus:ring-1 focus:ring-[#9b7741]/20 placeholder:text-[#a6a09a]";

const labelClass =
  "block text-[10px] font-semibold uppercase tracking-[0.19em] text-[#211d19]";

function Field({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
}: {
  label: string;
  name: keyof CheckoutForm;
  value: string;
  onChange: (name: keyof CheckoutForm, value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="ml-1 text-[#a77936]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}: {
  label: string;
  name: keyof CheckoutForm;
  value: string;
  options: string[];
  onChange: (name: keyof CheckoutForm, value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="ml-1 text-[#17130f]">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        required={required}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-3 font-serif text-[23px] font-normal leading-tight tracking-[-0.035em] text-[#17130f]">
      <span className="font-sans text-[10px] font-medium text-[#17130f]">
        {number}
      </span>
      {children}
    </h2>
  );
}

export default function Page() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [notice, setNotice] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateField = (name: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setNotice("");
  };

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

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const trackingCode =
    `GW-${new Date().toISOString().slice(2, 10).replaceAll("-", "")}-` +
    crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();

  const order = {
    trackingCode,
    customer: form,
    createdAt: new Date().toISOString(),
  };

  sessionStorage.setItem(
    "elevate-order-confirmation",
    JSON.stringify(order),
  );

  router.push("/checkout/confirmation");
}

  if (!mounted) {
    return (
      <main
        className="min-h-screen animate-pulse bg-[#faf7f1]"
        aria-label="Loading checkout"
      />
    );
  }

  if (lines.length === 0) {
    return (
      <main className="min-h-[75vh] bg-[#faf7f1] px-5 py-20 text-[#211d19]">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-4xl tracking-tight">Checkout</h1>
          <p className="mt-4 text-sm leading-6 text-[#17130f]">
            Your bag is empty. Add something you love before checking out.
          </p>
          <Link
            href="/products"
            className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#17130f] px-7 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#393027]"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#ffffff] text-[#211d19]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* Checkout form */}
          <div className="min-w-0">
            <header>
              <h1 className="font-serif text-[36px]  leading-tight tracking-[-0.045em] text-[#17130f] sm:text-[42px]">
                Checkout
              </h1>
              <p className="mt-3 max-w-[580px] text-[13px] leading-[1.75] text-[#17130f] sm:text-sm">
                Fill in your details and place your order — our team confirms
                every order personally by phone or Telegram, including the
                delivery fee and payment arrangements. Nothing is charged
                online.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-11 space-y-11">
              {/* Personal details */}
              <section>
                <SectionHeading number="01">Your details</SectionHeading>

                <div className="mt-6 space-y-[18px]">
                  <Field
                    label="Full name"
                    name="fullName"
                    value={form.fullName}
                    onChange={updateField}
                    required
                  />

                  <Field
                    label="Phone number"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="+251 ..."
                    required
                    type="tel"
                  />

                  <Field
                    label="Email (for order updates)"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    type="email"
                  />
                </div>
              </section>

              {/* Delivery location */}
              <section>
                <SectionHeading number="02">Delivery location</SectionHeading>

                <div className="mt-6 space-y-[18px]">
                  <SelectField
                    label="Country"
                    name="country"
                    value={form.country}
                    onChange={updateField}
                    options={["Ethiopia"]}
                    required
                  />

                  <SelectField
                    label="Select Nearby Delivery zone"
                    name="deliveryZone"
                    value={form.deliveryZone}
                    onChange={updateField}
                    options={[
                      "Mexico",
                      "Tor Hailoch",
                      "Arat Kilo",
                      "Meskel Flower & Olympia",
                      "Kazanchis & Kirkos",
                      "Megenagna",
                      "Ayer Tena",
                      "Piassa",
                      "Lideta",
                      "Autobus Tera",
                      "Bole Skylight",
                      "CMC & Ayat",
                      "Saris",
                      "Gerji",
                    ]}
                    required
                  />

                  <Field
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={updateField}
                    required
                  />

                  <Field
                    label="Sub-city"
                    name="subCity"
                    value={form.subCity}
                    onChange={updateField}
                  />

                  <Field
                    label="Google Maps link (optional)"
                    name="mapsLink"
                    value={form.mapsLink}
                    onChange={updateField}
                    placeholder="https://maps.app.goo.gl/..."
                    type="url"
                  />

                  <div>
                    <label htmlFor="instructions" className={labelClass}>
                      Delivery instructions (optional)
                    </label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      value={form.instructions}
                      onChange={(event) =>
                        updateField("instructions", event.target.value)
                      }
                      rows={3}
                      className="mt-2 block min-h-[86px] w-full rounded-none border border-[#d8d5d0] bg-white px-4 py-3 text-[13px] leading-5 text-[#211d19] outline-none transition focus:border-[#9b7741] focus:ring-1 focus:ring-[#9b7741]/20"
                    />
                  </div>
                </div>

                <p className="mt-5 text-[11px] leading-5 text-[#746b61]">
                  Estimated delivery — Confirmed when we call you.
                </p>
              </section>

              {/* Transaction summary on smaller screens */}
              <div className="lg:hidden">
                <OrderSummary
                  lines={lines}
                  subtotal={subtotal}
                  itemCount={itemCount}
                />
              </div>

              {notice && (
                <p
                  role="status"
                  className="border border-[#d8d0c1] bg-white/70 p-4 text-xs leading-5 text-[#746b61]"
                >
                  {notice}
                </p>
              )}

              <button
                type="submit"
                className="flex min-h-[52px] w-full items-center justify-center bg-[#17130f] px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#393027] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b7741]"
              >
                Submit order details · {formatEtb(subtotal)}
              </button>

              <p className="text-center text-[11px] leading-5 text-[#746b61]">
                No online payment required. Our team will contact you to confirm
                your order, delivery fee, and payment arrangements.
              </p>
            </form>
          </div>

          {/* Desktop transaction summary */}
          <aside className="hidden lg:block lg:sticky lg:top-8">
            <OrderSummary
              lines={lines}
              subtotal={subtotal}
              itemCount={itemCount}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

function OrderSummary({
  lines,
  subtotal,
  itemCount,
}: {
  lines: {
    product: (typeof data)[number];
    quantity: number;
    size?: string;
  }[];
  subtotal: number;
  itemCount: number;
}) {
  return (
    <aside className="border border-[#e1dcd3] bg-white/60 p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-serif text-[23px] font-normal tracking-[-0.035em]">
          Your order
        </h2>
        <span className="text-[11px] text-[#746b61]">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <ul className="mt-6 divide-y divide-[#e8e3db] border-y border-[#e8e3db]">
        {lines.map(({ product, quantity, size }) => (
          <li
            key={`${product.id}-${size ?? "no-size"}`}
            className="flex gap-3 py-4"
          >
            <div
              className="flex size-[62px] shrink-0 items-center justify-center overflow-hidden"
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
              <h3 className="text-[12px] font-medium leading-5">
                {product.name}
              </h3>
              {size && (
                <p className="mt-0.5 text-[11px] text-[#746b61]">
                  Size: {size}
                </p>
              )}
              <p className="mt-1 text-[11px] text-[#746b61]">Qty: {quantity}</p>
            </div>

            <p className="shrink-0 pt-0.5 text-[12px] font-medium">
              {formatEtb(product.priceEtb * quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-4 text-[12px]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[#746b61]">Subtotal</span>
          <span>{formatEtb(subtotal)}</span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <span className="text-[#746b61]">Delivery fee</span>
          <span className="max-w-[145px] text-right text-[11px] leading-5 text-[#746b61]">
            Confirmed by our team
          </span>
        </div>
      </div>

      <div className="my-5 border-t border-[#dcd6cc]" />

      <div className="flex items-center justify-between gap-3">
        <span className="font-serif text-lg">Total</span>
        <span className="text-base font-semibold">{formatEtb(subtotal)}</span>
      </div>

      <p className="mt-2 text-right text-[10px] leading-5 text-[#746b61]">
        Delivery fee not included
      </p>

      <div className="mt-5 border-t border-[#e8e3db] pt-4">
        <p className="text-[11px] leading-5 text-[#746b61]">
          Your order is confirmed personally by our team. Payment arrangements
          are discussed after we contact you.
        </p>
      </div>

      <Link
        href="/cart"
        className="mt-5 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#746b61] underline underline-offset-4 transition hover:text-[#17130f]"
      >
        Edit your bag
      </Link>
    </aside>
  );
}
