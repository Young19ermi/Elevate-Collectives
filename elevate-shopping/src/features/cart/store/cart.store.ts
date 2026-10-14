import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { productId: string; quantity: number };
type CartState = {
  items: CartItem[];
  add: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};
export const useCart = create<CartState>()(persist((set) => ({
  items: [],
  add: (id) => set((s) => ({ items: s.items.some((i) => i.productId === id)
    ? s.items.map((i) => i.productId === id ? { ...i, quantity: i.quantity + 1 } : i)
    : [...s.items, { productId: id, quantity: 1 }] })),
  dec: (id) => set((s) => ({ items: s.items.flatMap((i) => i.productId !== id ? [i] : i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : []) })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.productId !== id) })),
  clear: () => set({ items: [] }),
}), { name: "elevate-cart" }));
