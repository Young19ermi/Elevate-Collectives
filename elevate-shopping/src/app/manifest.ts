
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Elevate Collectives",
    short_name: "Elevate",
    description:
      "Discover and shop fashion, perfumes, watches, and accessories from Elevate Collectives.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#17130f",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg",
      },
      {
        src: "/icons/icon-192.svg",
        sizes: "512x512",
        type: "image/svg",
      },
    ],
  };
}
