import type { MetadataRoute } from "next";
import { siteUrl } from "./data";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/brake-discs",
    "/clutch-discs",
    "/brake-drums",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
  ].map((path) => ({
    url: `${siteUrl}${path}/`,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
