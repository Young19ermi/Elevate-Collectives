import Image from "next/image";
import Link from "next/link";
import HomePage from "@/app/(storefront)/page";

export function Logo_mobile() {
  return (
    <Image
      src="/logo.png"
      alt="Your Brand Name"
      width={90}
      height={90}
      priority
      className="h-8 w-auto object-contain"
    />
  );
}
