import { z } from "zod";
export const productSchema = z.object({
  id: z.string(), slug: z.string(), name: z.string(), category: z.string(), categoryPath: z.array(z.string()),
  priceEtb: z.number().nonnegative(), priceMaxEtb: z.number().optional(), description: z.string(),
  color: z.string(), sale: z.boolean(), stock: z.number().int().nonnegative(),
});
export type Product = z.infer<typeof productSchema>;
