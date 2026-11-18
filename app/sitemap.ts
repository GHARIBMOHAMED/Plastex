import type { MetadataRoute } from "next";
import { siteUrl } from "./data";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/brake-discs",
    "/clutch-discs",
    "/brake-drums",
    "/brake-pads",
    "/expertise",
    "/expertise/production",
    "/expertise/logistics",
    "/expertise/transport",
    "/our-story",
    "/careers",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
  ].flatMap((path) => {
    const fr = `${siteUrl}${path}/`;
    const en = `${siteUrl}/en${path}/`;
    return [fr, en].map((url) => ({
      url,
      alternates: { languages: { fr, en } },
      changeFrequency: path ? "monthly" as const : "weekly" as const,
      priority: path ? 0.7 : 1,
    }));
  });
}
