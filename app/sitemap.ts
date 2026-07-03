import type { MetadataRoute } from "next";
import { notes } from "@/lib/notes";

const base = "https://koinophobe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const notePages: MetadataRoute.Sitemap = notes.map((n) => ({
    url: `${base}/notes/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/wellness-clinic`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/notes`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...notePages,
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
