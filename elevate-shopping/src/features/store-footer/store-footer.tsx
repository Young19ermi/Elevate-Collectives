import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="w-full bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Built for real commerce
          </h2>

          <p className="mt-5 text-base leading-7 text-neutral-400 md:text-lg">
            Paper is a minimal, production-ready storefront for Saleor — clean
            as a blank page, built to ship.
          </p>

          <p className="mt-5 text-base leading-7 text-neutral-400 md:text-lg">
            Customize sections in code, connect your catalog, and keep checkout,
            cart, and product pages battle-tested out of the box.
          </p>
        </div>

        {/* Brand */}
        <div className="mt-20 flex items-center gap-4">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="text-2xl font-black tracking-tight"
          >
            <span className="h-7 w-px bg-neutral-700" aria-hidden="true" />
            <img
              src="/logo_one.png"
              alt="Your Brand Name"
              width={120}
              height={120}
              className="h-8 w-auto object-contain"
            />
          </Link>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold tracking-tight transition-colors hover:text-neutral-300"
          ></a>
        </div>

        <p className="mt-8 text-sm text-neutral-400">
          Discover our collection.
        </p>

        {/* Footer navigation */}
        <div className="mt-9 grid grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h3 className="text-sm font-semibold">Elevate Collectives</h3>

            <ul className="mt-5 space-y-4 text-sm text-neutral-400">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>

              <li>
                <a
                  href="https://docs.saleor.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                ></a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Collections</h3>

            <ul className="mt-5 space-y-4 text-sm text-neutral-400">
              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-white"
                >
                  Featured Products
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-white"
                >
                  Summer Picks
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Locale selector */}
        <div className="mt-8">
          <label htmlFor="store-locale" className="sr-only">
            Language and currency
          </label>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-6">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Elevate Collectives. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
