import { getProducts, type Sort } from "@/features/products/api/get-products";
import { ListingPage } from "@/features/products/components/listing-page";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ sort?: Sort }> }) {
  const { sort = "featured" } = await searchParams;
  return <ListingPage variant="plain" title="All Products" description="Discover our full collection of premium products." products={await getProducts({ sort })} sort={sort} />;
}
