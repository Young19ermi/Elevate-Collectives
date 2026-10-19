import Image from "next/image";
import Link from "next/link";
import HomePage from "@/app/(storefront)/page";

export function Logo_mobile() {
  return (
    <Link
      href="/"
      aria-label="Go to homepage"
      className="flex shrink-0 items-center"
    >
      <Image
        src="/logo.png"
        alt="Your Brand Name"
        width={90}
        height={90}
        priority
        className="h-8 w-auto object-contain"
      />
    </Link>
  );
}
