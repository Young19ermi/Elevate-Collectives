import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata: Metadata = {
  title: { default: "Elevate Shopping", template: "%s | Elevate Shopping" },
  description: "Shop online in Ethiopia.",
};
export const viewport: Viewport = {
  themeColor: "#111827",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-gray-900 antialiased">
        <Header />
        <main>{children}</main>

        <BottomNav />
      </body>
    </html>
  );
}
