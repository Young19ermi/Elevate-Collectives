import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Perfumes",
    slug: "perfume",
    image:
      "https://plus.unsplash.com/premium_photo-1679106770086-f4355693be1b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Classic perfume bottles",
  },
  {
    name: "Mens Wear",
    slug: "apparel",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Modern mens wear clothing",
  },
  {
    name: "Watches",
    slug: "watches",
    image:
      "https://images.unsplash.com/photo-1663861536241-2b54d239286e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Minimal wristwatch",
  },
  // {
  //   name: "Accessories",
  //   slug: "accessories",
  //   image:
  //     "https://images.unsplash.com/photo-1663861536241-2b54d239286e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  //   alt: "Minimal wristwatch",
  // },
];

export function CategoryShowcase() {
  return (
    <section className="bg-[#efefef] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif mb-7 text-[28px] font-normal tracking-[-0.035em]">
        
          Shop by category
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative isolate block aspect-[0.9] overflow-hidden rounded-xl bg-neutral-300 sm:aspect-[0.8] lg:aspect-[0.78]"
            >
              {/* <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              /> */}
              <img
                src={category.image}
                alt={category.alt}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  index === 1 ? "grayscale" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 text-white">
                <span className="text-lg font-semibold tracking-tight">
                  {category.name}
                </span>

                <span
                  aria-hidden="true"
                  className="text-2xl transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
