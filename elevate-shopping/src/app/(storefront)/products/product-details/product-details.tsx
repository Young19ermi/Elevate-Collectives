"use client";

import { useState } from "react";
import type { Product } from "@/features/products/schemas/product.schema";
// import { ProductImage } from "@/features/products/components/product-image";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";

import { formatEtb } from "@/lib/utils/format";
import { StoreFooter } from "@/features/store-footer/store-footer";
import { ProductGallery } from "@/features/products/components/product-gallery";
const SIZES = ["S", "M", "L", "XL", "XXL"];

export function ProductDetails({ product }: { product: Product }) {
  const categories = [product.category, ...product.categoryPath].map((item) =>
    item.toLowerCase(),
  );

  const isApparel = categories.some((item) =>
    ["t-shirt", "t-shirts", "shirts", "shirt", "polo-shirts"].includes(item),
  );

  const isComingSoon =
    product.category.toLowerCase() === "artifacts" || product.stock <= 0;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] ?? null,
  );
  // const [activeImage, setActiveImage] = useState(0);

  // The current product schema has one image source.
  // Replace this array with product.gallery when your schema supports it.
  // const galleryImages = [0];

  // const previousImage = () => {
  //   setActiveImage(
  //     (current) => (current - 1 + galleryImages.length) % galleryImages.length,
  //   );
  // };

  // const nextImage = () => {
  //   setActiveImage((current) => (current + 1) % galleryImages.length);
  // };

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      {/* Product image gallery */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-12 pt-4 md:grid-cols-2 md:gap-10 md:px-8 md:pt-8 lg:gap-16">
        <div className="min-w-0">
          <div className="relative">
            <div className="overflow-hidden rounded-xl bg-[#f2f2f2]">
              {/* Product image gallery */}
              <section className="min-w-0">
                <ProductGallery product={product} />
              </section>
            </div>

            {product.sale && (
              <span className="absolute left-3 top-3 rounded-full border border-red-500 bg-white px-3 py-1 text-xs font-medium text-red-600">
                Sale
              </span>
            )}

            {product.stock > 0 && !product.sale && (
              <span className="absolute left-3 top-3 rounded-full border border-neutral-300 bg-white/95 px-3 py-1 text-xs font-medium">
                Bestseller
              </span>
            )}
          </div>

          {/* Gallery controls */}
        </div>

        {/* Product information */}
        <div className="min-w-0 pt-2 md:pt-8">
          <div className="mb-4">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-600">
              {product.category}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {product.name}
            </h1>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <p className="text-2xl font-semibold">
              {formatEtb(product.priceEtb)}
            </p>

            {product.priceMaxEtb && product.priceMaxEtb > product.priceEtb && (
              <p className="text-base text-neutral-400 line-through">
                {formatEtb(product.priceMaxEtb)}
              </p>
            )}
          </div>

          {/* Color */}

          {/* Color selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-8">
              <p className="text-sm">
                <span className="font-medium">Color</span>
                <span className="ml-2 text-neutral-600">
                  {selectedColor?.name ?? "Select a color"}
                </span>
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color.name}`}
                    aria-pressed={selectedColor?.hex === color.hex}
                    title={color.name}
                    className={`flex size-12 items-center justify-center rounded-full border-2 transition ${
                      selectedColor?.hex === color.hex
                        ? "border-black"
                        : "border-neutral-200"
                    }`}
                  >
                    <span
                      className="size-9 rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Apparel size selector */}
          {isApparel && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Size</label>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("size-guide")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-xs text-neutral-500 underline underline-offset-4"
                >
                  Size guide
                </button>
              </div>

              <div className="mt-3 grid grid-cols-5 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`flex h-12 items-center justify-center rounded-lg border text-sm transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-neutral-200 hover:border-neutral-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          {/* <div className="mt-8">
            <label htmlFor="product-quantity" className="text-sm font-medium">
              Quantity
            </label>
          </div> */}

          {/* Purchase area */}
          <div className="mt-8">
            {isComingSoon ? (
              <button
                type="button"
                disabled
                className="flex h-14 w-full items-center justify-center rounded-lg bg-neutral-100 font-medium text-neutral-500"
              >
                Coming soon
              </button>
            ) : (
              <div className="w-full">
                <AddToCartButton
                  productId={product.id}
                  size={isApparel ? selectedSize : undefined}
                />
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-neutral-600">
              <div className="flex items-center justify-center gap-2">
                <img
                  src="/cart.png"
                  alt="secure checkout"
                  width={18}
                  height={18}
                />
                Secure checkout
              </div>

              <div className="flex items-center justify-center gap-2">
                <img
                  src="/express.png"
                  alt="secure checkout"
                  width={18}
                  height={18}
                />
                Delivery across Ethiopia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product information accordions */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <div className="border-b border-neutral-200">
          <details open className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              Description
              <img
                src="/down-arrow.png"
                alt="see description "
                width={100}
                height={100}
                className="h-8 w-auto object-contain rotate-transition group-open:rotate-180"
              />
            </summary>

            <p className="pt-5 text-sm leading-7 text-neutral-600">
              <span className="font-semibold text-neutral-800">
                {product.name}.
              </span>{" "}
              {product.description}
            </p>
          </details>
        </div>

        <div className="border-b border-neutral-200">
          <details open className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              Product Details
              <img
                src="/down-arrow.png"
                alt="see description "
                width={100}
                height={100}
                className="h-8 w-auto object-contain rotate-transition group-open:rotate-180"
              />
            </summary>

            <dl className="space-y-4 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">Category</dt>
                <dd className="text-right">{product.category}</dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">Color</dt>
                <dd>{selectedColor?.name ?? "Not specified"}</dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">Availability</dt>
                <dd>{product.stock > 0 ? "In stock" : "Out of stock"}</dd>
              </div>

              {isApparel && (
                <div
                  id="size-guide"
                  className="flex items-center justify-between gap-4"
                >
                  <dt className="text-neutral-500">Selected size</dt>
                  <dd>{selectedSize}</dd>
                </div>
              )}
            </dl>
          </details>
        </div>

        <div className="border-b border-neutral-200">
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              Shipping &amp; Returns
              <img
                src="/down-arrow.png"
                alt="see description "
                width={100}
                height={100}
                className="h-8 w-auto object-contain rotate-transition group-open:rotate-180"
              />
            </summary>

            <p className="pt-5 text-sm leading-7 text-neutral-600">
              Delivery is available across Ethiopia. Shipping costs, delivery
              estimates, and return eligibility are confirmed at checkout or
              according to your store's published policies.
            </p>
          </details>
        </div>
      </section>
      <StoreFooter />
    </main>
  );
}
