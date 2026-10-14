import { notFound } from "next/navigation";
import { findCategory } from "@/features/products/api/get-categories";
import { getProducts, type Sort } from "@/features/products/api/get-products";
import { ListingPage } from "@/features/products/components/listing-page";

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ sort?: Sort }> }) {
  const { slug } = await params;
  const { sort = "featured" } = await searchParams;
  const category = findCategory(slug);
  if (!category) notFound();
  return <ListingPage variant="image" title={category.name} products={await getProducts({ categorySlug: slug, sort })} sort={sort} />;
}
