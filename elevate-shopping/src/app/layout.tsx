import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";

import { DeviceGate } from "@/components/pwa/device-gate";
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
       <DeviceGate>{children}</DeviceGate>

        <BottomNav />
      </body>
    </html>
  );
}
export const metadata = {
  // Keep your existing metadata fields.
  title: "Elevate Collectives",
  description: "Shop fashion and accessories with Elevate Collectives.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default" as const,
    title: "Elevate",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};