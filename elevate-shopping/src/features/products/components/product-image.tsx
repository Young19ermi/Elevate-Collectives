import type { Product } from "../schemas/product.schema";

const PRODUCT_IMAGES: Record<string, string> = {
  "t-shirts":
    "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?q=80&w=1000&auto=format&fit=crop",
  "polo-shirts":
    "https://images.unsplash.com/photo-1625910513413-5fc45e7d6f8a?auto=format&fit=crop&w=1000&q=85",
  watches:
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",
  sunglasses:
    "https://images.unsplash.com/photo-1728405034490-0d55d9b59af1?auto=format&fit=crop&w=1000&q=85",
  belts:
    "https://images.unsplash.com/photo-1752386341161-de2b02ea1f50?q=80&w=1000&auto=format&fit=crop",
  perfume: "/perfume.jpg",
  artifacts:
    "https://plus.unsplash.com/premium_photo-1723568617048-8ba7f42e5fec?q=80&w=1000&auto=format&fit=crop",
  default:
    "https://images.unsplash.com/photo-1666199996238-a6aa2dde8f5a?q=80&w=1000&auto=format&fit=crop",
};
// Keep your existing category fallback logic here.
// Always return an array with at least one valid image URL.
export function getProductImages(product: Product): string[] {
  // Use images assigned to the individual product first.
  if (product.images?.length) {
    return product.images;
  }

  // Include both category and categoryPath to support different data formats.
  const categories = [product.category, ...product.categoryPath].map(
    (category) => category.toLowerCase().trim(),
  );

  const matchedCategory = categories.find((category) => {
    if (["t-shirts", "shirts", "sweatshirts"].includes(category)) {
      return true;
    }

    if (["polo-shirts", "polo shirts"].includes(category)) {
      return true;
    }

    return Boolean(PRODUCT_IMAGES[category]);
  });

  if (matchedCategory) {
    if (["shirts", "sweatshirts"].includes(matchedCategory)) {
      return [PRODUCT_IMAGES["t-shirts"]];
    }

    if (matchedCategory === "polo shirts") {
      return [PRODUCT_IMAGES["polo-shirts"]];
    }

    return [PRODUCT_IMAGES[matchedCategory]];
  }

  return [PRODUCT_IMAGES.default];
}

export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const imageUrl = getProductImages(product)[0];

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
        alt={product.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
