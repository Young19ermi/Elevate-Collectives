"use client";
import { usePathname, useRouter } from "next/navigation";

export function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const path = usePathname();
  return (
    <select value={value} onChange={(e) => router.push(`${path}?sort=${e.target.value}`)}
      className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-base">
      <option value="featured">Sort</option>
      <option value="price-asc">Price: low to high</option>
      <option value="price-desc">Price: high to low</option>
      <option value="name">Name</option>
    </select>
  );
}
