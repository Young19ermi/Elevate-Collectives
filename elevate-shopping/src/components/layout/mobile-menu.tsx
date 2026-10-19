"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categoryTree } from "@/features/products/api/get-categories";
import { Logo } from "./logo";
import { Logo_mobile } from "./logo_mobile";

type MobileMenuProps = {
  onClose: () => void;
};

export function MobileMenu({ onClose }: MobileMenuProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const categoryHref = (slug: string) =>
    `/products?category=${encodeURIComponent(slug)}`;

  const toggleCategory = (slug: string) => {
    setExpanded((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  };

  const goToSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    onClose();
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <div
      className="fixed inset-0 z-[100] h-[100dvh] overflow-y-auto bg-white text-neutral-950"
      role="dialog"
      aria-modal="true"
      aria-label="Product categories"
    >
      {/* Menu header */}
      <div className="sticky top-0 z-10 flex h-[51px] items-center justify-between border-b border-neutral-200 bg-white px-3">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3"
          aria-label="Elevate Shopping home"
        >
          {/* <span className="text-xl font-black tracking-tight">E</span>
          <span className="h-5 w-px bg-neutral-300" />
          <span className="text-sm font-semibold tracking-tight">
            Elevate Shopping
          </span>*/}
          {/* <Logo  /> */}
          <Logo_mobile/>
        </Link>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close categories"
          className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-100"
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
        </button>
      </div>

      <div className="px-3 pb-5">
        {/* All products */}
        <Link
          href="/products"
          onClick={onClose}
          className="flex min-h-[61px] items-center border-b border-neutral-200 text-xs text-neutral-600"
        >
          All
        </Link>

        {/* Categories */}
        {categoryTree.map((category) => {
          const isExpanded = expanded.includes(category.slug);
          const children = category.children ?? [];

          return (
            <section
              key={category.slug}
              className="border-b border-neutral-200 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={categoryHref(category.slug)}
                  onClick={onClose}
                  className="text-xs font-semibold"
                >
                  {category.name}
                </Link>

                {children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.slug)}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.name}`}
                    aria-expanded={isExpanded}
                    className="flex size-7 items-center justify-center"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`size-3.5 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Subcategories */}
              {isExpanded && children.length > 0 && (
                <div className="ml-1 mt-3 space-y-4">
                  {children.map((child) => {
                    const grandchildren = child.children ?? [];

                    return (
                      <div key={child.slug}>
                        <Link
                          href={categoryHref(child.slug)}
                          onClick={onClose}
                          className="block py-1 text-xs font-medium"
                        >
                          {child.name}
                        </Link>

                        {/* Nested subcategories */}
                        {grandchildren.length > 0 && (
                          <div className="ml-1 mt-1 space-y-1 border-l border-neutral-200 pl-3">
                            {grandchildren.map((leaf) => (
                              <Link
                                key={leaf.slug}
                                href={categoryHref(leaf.slug)}
                                onClick={onClose}
                                className="block py-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-950"
                              >
                                {leaf.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* View all */}
              {isExpanded && (
                <Link
                  href={categoryHref(category.slug)}
                  onClick={onClose}
                  className="mt-4 block border-t border-neutral-200 pt-4 text-xs font-medium"
                >
                  View all {category.name}
                </Link>
              )}
            </section>
          );
        })}

        {/* Product search */}
        <form
          onSubmit={goToSearch}
          className="sticky bottom-0 bg-white pb-1 pt-3"
        >
          <div className="flex h-[42px] items-center gap-2 rounded-md bg-neutral-100 px-3">
            <svg
              viewBox="0 0 24 24"
              className="size-4 shrink-0 text-neutral-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for products..."
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-neutral-500"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-xs text-neutral-500"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
