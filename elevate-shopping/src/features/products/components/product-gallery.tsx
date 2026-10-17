"use client";

import { useState } from "react";
import type { Product } from "../schemas/product.schema";
import { getProductImages } from "./product-image";

const arrowButton =
  " ml-2 mb-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition hover:border-neutral-400 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";

export function ProductGallery({ product }: { product: Product }) {
  const images = getProductImages(product);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const count = images.length;
  const hasMultipleImages = count > 1;
  const activeImage = images[activeIndex] ?? images[0];

  const previous = () => {
    setActiveIndex((index) => (index === 0 ? count - 1 : index - 1));
  };

  const next = () => {
    setActiveIndex((index) => (index === count - 1 ? 0 : index + 1));
  };

  return (
    <div className="min-w-0 space-y-4">
      {/* Main product image — full-bleed so any photo background looks intentional */}
      <div className="relative isolate overflow-hidden rounded-2xl bg-neutral-100">
        <div className="relative aspect-square w-full">
          <img
            key={activeImage}
            src={activeImage}
            alt={`${product.name} — image ${activeIndex + 1}`}
            fetchPriority="high"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover"
          />

          {/* Soft edge so light photos don't bleed into the page */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />

          {/* Sale label — frosted so it stays readable on any photo */}
          {product.sale && (
            <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-neutral-950 shadow-sm ring-1 ring-black/5 backdrop-blur-md">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* Controls — only when needed */}
      {hasMultipleImages && (
        <div className="flex mb-2.5 items-center gap-2.5">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous product image"
            className={arrowButton}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[16px]"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next product image"
            className={arrowButton}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[16px]"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div className="ml-2 flex items-center gap-1.5">
            {images.map((image, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={isActive}
                  className="flex ml-6 h-6 items-center focus-visible:outline-none "
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-5 bg-neutral-950"
                        : "w-2 bg-neutral-200 hover:bg-neutral-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <p
            className="ml-auto mr-2.5 text-sm tabular-nums flex-col text-neutral-700 border border-neutral-300 rounded-full px-2 py-1"
            aria-live="polite"
          >
            {activeIndex + 1} / {count}
          </p>
        </div>
      )}
    </div>
  );
}
