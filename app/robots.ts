import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
