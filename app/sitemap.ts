import type { MetadataRoute } from "next";
import { artisans } from "./lib/artisans";
import { site } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/artisans", priority: 0.9, changeFrequency: "weekly" },
    { path: "/specialties", priority: 0.8, changeFrequency: "monthly" },
    { path: "/regions", priority: 0.8, changeFrequency: "monthly" },
    { path: "/safety", priority: 0.6, changeFrequency: "monthly" },
    { path: "/join", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/credits", priority: 0.3, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...artisans.map((artisan) => ({
      url: `${site.url}/artisans/${artisan.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
