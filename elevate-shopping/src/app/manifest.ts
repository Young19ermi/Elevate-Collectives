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

    background_color: "#211d19",
    theme_color: "#17130f",
    orientation: "portrait",

    icons: [
      {
        src: "/icons/icon-512.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      //this one has to be changed 
      {
        src: "/icons/icon-192.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}