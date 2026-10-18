
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  quantity: number;
  size?: string;
};

type CartState = {
  items: CartItem[];
  add: (id: string, size?: string) => void;
  dec: (id: string, size?: string) => void;
  remove: (id: string, size?: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      add: (id, size) =>
        set((state) => {
          const existingItem = state.items.some(
            (item) => item.productId === id && item.size === size,
          );

          return {
            items: existingItem
              ? state.items.map((item) =>
                  item.productId === id && item.size === size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                )
              : [...state.items, { productId: id, size, quantity: 1 }],
          };
        }),

      dec: (id, size) =>
        set((state) => ({
          items: state.items.flatMap((item) =>
            item.productId !== id || item.size !== size
              ? [item]
              : item.quantity > 1
                ? [{ ...item, quantity: item.quantity - 1 }]
                : [],
          ),
        })),

      remove: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.productId !== id || item.size !== size,
          ),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "elevate-cart" },
  ),
);
