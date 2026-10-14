import Link from "next/link";
import { formatEtb } from "@/lib/utils/format";
import type { Product } from "../schemas/product.schema";
import { ProductImage } from "./product-image";

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="block">
      <ProductImage product={p} />
      <p className="mt-5 text-xs font-medium uppercase tracking-widest text-gray-600">
        {p.category}
      </p>
      <h3 className="mt-2 text-lg text-gray-900">{p.name}</h3>
      {/* <span
        className="mt-3 block h-4 w-4 rounded-full"
        style={{ background: p.color }}
      /> */}
      <p className="mt-2 text-lg font-semibold">
        {formatEtb(p.priceEtb)}
        {p.priceMaxEtb ? `` : ""}
      </p>
    </Link>
  );
}
