import Image from "next/image";
import type { Product } from "../schemas/product.schema";

const PRODUCT_IMAGES: Record<string, string> = {
  sweetshirts:
    "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  Artifacts:
    "https://plus.unsplash.com/premium_photo-1723568617048-8ba7f42e5fec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  Watchs:
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  shoes:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85 ",
  belts:
    "https://images.unsplash.com/photo-1752386341161-de2b02ea1f50?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  perfumes: "./perfume.jpg",
  perfume:
    "https://plus.unsplash.com/premium_photo-1679106770086-f4355693be1b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  sunglasses:
    "https://images.unsplash.com/photo-1728405034490-0d55d9b59af1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  watches: "./watch.jpg",
  mouses:
    "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1028&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  default:
    "https://images.unsplash.com/photo-1666199996238-a6aa2dde8f5a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
};

function getProductImage(product: Product) {
  const categories = product.categoryPath.map((category) =>
    category.toLowerCase(),
  );

  if (categories.includes("t-shirts")) {
    return PRODUCT_IMAGES.sweetshirts;
  }
  if (categories.includes("polo-shirts")) {
    return PRODUCT_IMAGES.Artifacts;
  }

  if (categories.includes("watches")) {
    return PRODUCT_IMAGES.watches;
  }
  if (categories.includes("sunglasses")) {
    return PRODUCT_IMAGES.sunglasses;
  }
  if (categories.includes("belts")) {
    return PRODUCT_IMAGES.belts;
  }
  if (categories.includes("perfume")) {
    return PRODUCT_IMAGES.perfumes;
  }
  if (categories.includes("mouse")) {
    return PRODUCT_IMAGES.mouses;
  }
}

export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const imageUrl = getProductImage(product);

  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-xl bg-[#f1f1f1] ${className}`}
    >
      {product.sale && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          Sale
        </span>
      )}
      <img
        src={imageUrl}
        alt={`Product in ${product.categoryPath.join(" ") || "store collection"}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* 
      <Image
        src={imageUrl}
        alt={`Product in ${product.categoryPath.join(" ") || "store collection"}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 hover:scale-105"
      /> */}
    </div>
  );
}
