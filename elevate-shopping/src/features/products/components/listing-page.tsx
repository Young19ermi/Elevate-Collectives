import Link from "next/link";
import type { Product } from "../schemas/product.schema";
import { ProductGrid } from "./product-grid";
import { SortSelect } from "./sort-select";
import { FilterSort } from "./filter-sort";
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
      <div className="flex items-center justify-end border-b px-2 py-2">
        {/* <button
          type="button"
          className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-[#dedbd5] bg-white px-5 text-sm font-medium text-[#211d19] shadow-sm transition-all duration-200 hover:border-[#211d19] hover:bg-[#211d19] hover:text-white active:scale-[0.97]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7h9" />
            <path d="M17 7h3" />
            <path d="M4 17h3" />
            <path d="M11 17h9" />
            <circle cx="15" cy="7" r="2" />
            <circle cx="9" cy="17" r="2" />
          </svg>

          <span>Filters</span>

          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f1eee8] text-[10px] text-[#211d19] transition-colors group-hover:bg-white/20 group-hover:text-white">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button> */}
        <div className="flex items-center justify-end border-b px-4 py-4">
          <FilterSort sort={sort} />
        </div>
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
