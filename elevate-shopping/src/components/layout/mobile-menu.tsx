"use client";
import Link from "next/link";
import { useState } from "react";
import { categoryTree, type Category } from "@/features/products/api/get-categories";
import { Logo } from "./logo";

const href = (c: Category) => `/categories/${c.slug}`;
const Chevron = ({ up }: { up: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={up ? "" : "rotate-180"}><path d="m6 15 6-6 6 6"/></svg>
);

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>("apparel");
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-50 md:hidden">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Logo />
        <button onClick={onClose} aria-label="Close menu" className="p-2"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
      <div className="px-4 pt-8">
        <Link href="/products" onClick={onClose} className="block border-b pb-4 text-lg text-gray-600">All</Link>
        {categoryTree.map((c) => (
          <div key={c.slug} className="border-b">
            <button onClick={() => setOpen(open === c.slug ? null : c.slug)} className="flex w-full items-center justify-between py-4 text-lg font-semibold">
              {c.name}<Chevron up={open === c.slug} />
            </button>
            {open === c.slug && (
              <div className="pb-5">
                {c.children?.map((g) => g.children ? (
                  <div key={g.slug} className="mb-4">
                    <Link href={href(g)} onClick={onClose} className="font-semibold">{g.name}</Link>
                    <ul className="ml-1 mt-2 border-l pl-4">
                      {g.children.map((l) => <li key={l.slug}><Link href={href(l)} onClick={onClose} className="block py-2 text-gray-600">{l.name}</Link></li>)}
                    </ul>
                  </div>
                ) : <Link key={g.slug} href={href(g)} onClick={onClose} className="mb-4 block font-semibold">{g.name}</Link>)}
                <Link href={href(c)} onClick={onClose} className="mt-2 block border-t pt-4">View all {c.name}</Link>
              </div>
            )}
          </div>
        ))}
        <form action="/products" className="mt-6">
          <input name="q" placeholder="Search for products..." className="h-12 w-full rounded-lg bg-gray-100 px-4 outline-none" />
        </form>
      </div>
    </div>
  );
}
