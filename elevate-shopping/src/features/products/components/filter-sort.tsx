"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  sort: string;
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name" },
];

export function FilterSort({ sort }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sort);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedSort(sort);
  }, [sort]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function updateSort(value: string) {
    setSelectedSort(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);

    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`group inline-flex h-11 items-center gap-2.5 rounded-full border px-5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
          open
            ? "border-[#dedbd5] bg-white text-[#211d19] hover:border-[#211d19]"
            : "border-[#dedbd5] bg-white text-[#211d19] hover:border-[#211d19]"
        }`}
      >
        <img src="/filter.png" alt="filter icon" className="h-6 w-6" />

        <span>Filter & Sort</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Filter and sort products"
          className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(340px,calc(100vw-32px))] rounded-2xl border border-[#e8e4dd] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
        >
          {/* Sort */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#211d19]">
                Sort products
              </h3>
              <span className="text-xs text-gray-400">SORT BY</span>
            </div>

            <div className="space-y-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateSort(option.value)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-gray-600 transition hover:bg-[#f7f5f1] hover:text-[#211d19]"
                >
                  {option.label}

                  {selectedSort === option.value && (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#211d19"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
