import data from "@/data/categories.json";
export type Category = { name: string; slug: string; children?: Category[] };
export const categoryTree = data as Category[];
export function findCategory(slug: string, list: Category[] = categoryTree): Category | null {
  for (const c of list) {
    if (c.slug === slug) return c;
    const hit = c.children && findCategory(slug, c.children);
    if (hit) return hit;
  }
  return null;
}
