"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "../store/cart.store";

export function AddToCartButton({ productId }: { productId: string }) {
  const add = useCart((s) => s.add);
  const [done, setDone] = useState(false);
  return (
    <Button className="w-full" onClick={() => { add(productId); setDone(true); setTimeout(() => setDone(false), 1200); }}>
      {done ? "Added ✓" : "Add to cart"}
    </Button>
  );
}
