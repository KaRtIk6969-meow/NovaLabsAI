import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "NovaLabs",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#3b82f6",
    orientation: "any",
    scope: "/",
    lang: "en",
    categories: ["business", "productivity", "technology"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [],
    related_applications: [],
    prefer_related_applications: false,
  };
}
