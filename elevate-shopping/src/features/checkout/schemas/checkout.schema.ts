import { z } from "zod";
export const checkoutSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(9),
  address: z.string().min(5),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;
