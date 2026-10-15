
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/products/api/get-products";
import { ProductDetails } from "../product-details/product-details";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* Your existing site header is rendered by the shared layout. */}

      <ProductDetails product={product} />

      {/* Your existing site footer is rendered by the shared layout. */}
    </>
  );
}
