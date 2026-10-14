import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/products/api/get-products";
import { ProductImage } from "@/features/products/components/product-image";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { formatEtb } from "@/lib/utils/format";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProductBySlug((await params).slug);
  if (!p) notFound();
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 md:grid-cols-2">
      <ProductImage product={p} />
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-gray-600">{p.category}</p>
        <h1 className="mt-2 text-3xl font-bold">{p.name}</h1>
        <p className="mt-3 text-2xl font-semibold">{formatEtb(p.priceEtb)}{p.priceMaxEtb ? ` - ${formatEtb(p.priceMaxEtb)}` : ""}</p>
        <p className="mt-5 text-gray-600">{p.description}</p>
        <div className="mt-6 max-w-sm"><AddToCartButton productId={p.id} /></div>
      </div>
    </div>
  );
}
