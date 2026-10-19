import Link from "next/link";
import type { Product } from "../schemas/product.schema";
import { ProductGrid } from "./product-grid";
import { SortSelect } from "./sort-select";

type Props = {
  title: string;
  description?: string;
  variant: "image" | "plain";
  products: Product[];
  sort: string;
};

export function ListingPage({
  title,
  description,
  variant,
  products,
  sort,
}: Props) {
  const image = variant === "image";
  return (
    <>
      <section
        className={`relative flex h-[340px] flex-col justify-end px-4 pb-8 ${image ? "bg-gradient-to-b from-gray-400 via-gray-600 to-gray-900 text-white" : "bg-[#f1f1f1] text-gray-900"}`}
      >
        <nav
          className={`mb-4 flex w-fit items-center gap-2 text-base ${image ? "rounded-full bg-white/85 px-4 py-2 text-gray-900" : ""}`}
        >
          <Link href="/">Home</Link>
          <span>›</span>
          <span className="font-medium">{title}</span>
        </nav>
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-4 max-w-[16rem] text-lg text-gray-600">
            {description}
          </p>
        )}
      </section>
      <div className="flex items-center justify-between border-b px-4 py-4">
        <button className="flex h-11 items-center gap-3 rounded-lg border border-gray-300 bg-white px-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
            <circle cx="16" cy="7" r="2" />
            <circle cx="8" cy="17" r="2" />
          </svg>
          Filters
        </button>
        <SortSelect value={sort} />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex min-h-[320px] flex-col items-center justify-center px-4 py-12 text-center">
            <img
              src="/empty.png"
              alt=""
              className="mb-5 h-16 w-16 object-contain"
            />

            <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
              Coming Soon
            </h2>

            <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">
              We're preparing something special. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
