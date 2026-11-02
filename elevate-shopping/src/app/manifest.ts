import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Elevate Collectives",
    short_name: "Elevate",
    description:
      "Discover and shop fashion, perfumes, watches, and accessories from Elevate Collectives.",

    start_url: "/?source=pwa",
    scope: "/",

    display: "standalone",
    display_override: ["standalone"],

    background_color: "#faf7f1",
    theme_color: "#17130f",
    orientation: "portrait",

    categories: ["shopping", "fashion", "lifestyle"],
    prefer_related_applications: false,

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],

    shortcuts: [
      {
        name: "Shop Products",
        short_name: "Shop",
        url: "/products",
      },
      {
        name: "View Cart",
        short_name: "Cart",
        url: "/cart",
      },
    ],
  };
}