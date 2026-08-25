import type { MetadataRoute } from "next";
import { locales } from "@/lib/translations";
import { languageAlternates, pageKeys, pageUrl, type PageKey } from "@/lib/seo";

const priorities: Record<PageKey, number> = {
  home: 1,
  services: 0.9,
  italy: 0.9,
  turkey: 0.9,
  startup: 0.8,
  pricing: 0.8,
  about: 0.7,
  methodology: 0.7,
  contact: 0.7,
  faq: 0.6,
  portal: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pageKeys.flatMap((key) =>
    locales.map((locale) => ({
      url: pageUrl(locale, key),
      lastModified,
      changeFrequency: key === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: priorities[key],
      alternates: {
        languages: languageAlternates(key),
      },
    })),
  );
}
