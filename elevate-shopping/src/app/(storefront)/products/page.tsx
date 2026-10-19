import { getProducts, type Sort } from "@/features/products/api/get-products";
import { ListingPage } from "@/features/products/components/listing-page";

type ProductsPageProps = {
  searchParams: Promise<{
    sort?: Sort;
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { sort = "featured", category } = await searchParams;

  const products = await getProducts({
    sort,
    categorySlug: category,
  });

  const categoryTitles: Record<string, string> = {
    perfume: "Perfumes",
    apparel: "Mens Wear",
    watches: "Watches",
    "t-shirts": "T-Shirts",
    "polo-shirts": "Polo Shirts",
    sunglasses: "Sunglasses",
    belts: "Belts",
    mouse: "Mouse",
    sweatshirts: "Sweatshirts",
    accessories: "Accessories",
  };

  const title = category
    ? (categoryTitles[category] ?? "Products")
    : "All Products";

  return (
    <ListingPage
      variant="plain"
      title={title}
      description={
        category
          ? `Explore our ${title.toLowerCase()} collection.`
          : "Discover our full collection of premium products."
      }
      products={products}
      sort={sort}
    />
  );
}
