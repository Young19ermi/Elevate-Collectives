import Image from "next/image";
import Link from "next/link";
import HomePage from "@/app/(storefront)/page";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Go to homepage"
      className="flex shrink-0 items-center"
    >
      <Image
        src="/logo_two.png"
        alt="Your Brand Name"
        width={120}
        height={120}
        priority
        className="h-8 w-auto object-contain"
      />
    </Link>
  );
}
