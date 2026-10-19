import { create } from "zustand";
import { persist } from "zustand/middleware";
export type ProductColor = {
  name: string;
  hex: string;
}
export type CartItem = {
  productId: string;
  quantity: number;
  size?: string;
  color?: ProductColor;
};

type CartState = {
  items: CartItem[];
  add: (id: string, size?: string, color?: ProductColor) => void;
// add : (product.id, selectedSize, selectedColor ?? undefined);
  dec: (id: string, size?: string) => void;
  remove: (id: string, size?: string) => void;
  clear: () => void;
};

function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;

  const value = item as Record<string, unknown>;

  return (
    typeof value.productId === "string" &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    (value.size === undefined || typeof value.size === "string")
  );
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      add: (id, size) =>
        set((state) => {
          const existing = state.items.some(
            (item) => item.productId === id && item.size === size,
          );

          return {
            items: existing
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
    {
      name: "elevate-cart",
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as { items?: unknown } | undefined;

        return {
          items: Array.isArray(state?.items)
            ? state.items.filter(isValidCartItem)
            : [],
        };
      },
    },
  ),
);