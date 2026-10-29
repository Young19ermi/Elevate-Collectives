import Link from "next/link";
import { getProducts } from "@/features/products/api/get-products";
import { ProductGrid } from "@/features/products/components/product-grid";
import { CategoryShowcase } from "@/features/category-showcase/category-showcase";
import { StoreBenefits } from "@/features/StoreBenefits/StoreBenefits";
import { StoreFooter } from "@/features/store-footer/store-footer";
export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-65px)] w-full items-end overflow-hidden bg-neutral-900 md:min-h-[680px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1762703988054-89e9b9b96ff4?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D')",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/15"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
        />

        <div className="mx-auto flex w-full max-w-6xl items-end px-[17px] pb-[62px] pt-24 md:px-8 md:pb-20 lg:pb-24">
          <div className="w-full max-w-2xl">
            <h1 className="max-w-[600px] text-[56px] font-bold leading-[0.99] tracking-[-0.045em] text-white md:text-6xl lg:text-7xl">
              Discover our
              <br />
              collection
            </h1>

            <p className="mt-7 max-w-[440px] text-[18px] font-medium leading-[1.5] text-white md:text-lg">
              Premium products with exceptional quality.
              <br className="hidden sm:block" /> Discover our curated
              collection.
            </p>

            <Link
              href="/products"
              className="mt-9 inline-flex h-14 items-center justify-center rounded-[7px] bg-white px-8 text-[17px] font-medium text-black transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Shop all
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* <h2 className="mb-8 text-3xl font-black tracking-tight md:text-3xl">
          Featured products
        </h2> */}
        <h2 className="font-serif mb-4 text-[32px] font-normal tracking-[-0.035em]">
          Featured products
        </h2>
        <ProductGrid products={products.slice(0, 6)} />
      </section>
      <CategoryShowcase />
      <StoreBenefits />
      <StoreFooter />
    </>
  );
}
