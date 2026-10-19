"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "../store/cart.store";

type AddToCartButtonProps = {
  productId: string;
  size?: string;
  color?: string;
};

export function AddToCartButton({
  productId,
  size,
  color,
}: AddToCartButtonProps) {
  const add = useCart((state) => state.add);
  const [done, setDone] = useState(false);

  const handleAddToCart = () => {
    add(productId, size);
    setDone(true);
    setTimeout(() => setDone(false), 1200);
  };

  return (
    <Button className="w-full" onClick={handleAddToCart}>
      {done ? "Added" : "Add to cart"}
    </Button>
  );
}
