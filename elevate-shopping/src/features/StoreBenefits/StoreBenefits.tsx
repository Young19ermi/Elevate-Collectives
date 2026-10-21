import Link from "next/link";

const benefits = [
  {
    title: "Curated quality",
    description:
      "Every product is selected for craftsmanship and longevity — not trend-chasing.",
  },
  {
    title: "Fast fulfillment",
    description:
      "Orders ship from regional warehouses with tracking from checkout to delivery.",
  },
  {
    title: "Easy returns",
    description:
      "Hassle-free returns within 30 days. We stand behind what we sell.",
  },
];

export function StoreBenefits() {
  return (
    <section className="w-full bg-neutral-50 text-black">
      <div className="mx-auto max-w-8xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-12 text-left md:mb-16">
          {/* <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Designed to last
          </h2> */}

          <h2 className="font-serif text-3xl font-normal tracking-[-0.035em]">
            Designed to last
          </h2>
          <p className="mx-auto mt-5 w-full text-base leading-7 text-neutral-600 md:text-lg">
            Thoughtful materials and timeless silhouettes — pieces you'll reach
            for season after season.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex min-h-14 items-start justify-left gap-2.5
              rounded-md bg-black px-8 py-4 text-base font-semibold
              text-white transition-colors hover:bg-neutral-800
              focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-black"
          >
            Explore collections
          </Link>
        </div>

        <div className="max-w-full bg-neutral-10  px-4 py-16 md:px-8 md:py-20">
          <h2 className="mb-12 font-serif text-center text-3xl tracking-[-0.035em]">
            Why shop with us
          </h2>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="text-center">
                <h3 className="text-lg font-serif">{benefit.title}</h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-700 md:text-base">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
