import data from "@/data/products.json";
import { productSchema, type Product } from "../schemas/product.schema";

// Dummy data. Replace the bodies with Supabase queries later; keep the signatures.
const all: Product[] = data.map((p) => productSchema.parse(p));
export type Sort = "featured" | "price-asc" | "price-desc" | "name";

export async function getProducts(opts: { categorySlug?: string; sort?: Sort } = {}): Promise<Product[]> {
  let list = opts.categorySlug ? all.filter((p) => p.categoryPath.includes(opts.categorySlug!)) : [...all];
  if (opts.sort === "price-asc") list.sort((a, b) => a.priceEtb - b.priceEtb);
  if (opts.sort === "price-desc") list.sort((a, b) => b.priceEtb - a.priceEtb);
  if (opts.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}
export async function getProductBySlug(slug: string) {
  return all.find((p) => p.slug === slug) ?? null;
}
