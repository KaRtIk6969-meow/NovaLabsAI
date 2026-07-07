import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/solutions`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return routes;
}
