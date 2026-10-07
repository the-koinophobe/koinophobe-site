import type { MetadataRoute } from "next";
import { notesPage, publishedNotes } from "@/lib/notes";
import { topics } from "@/lib/topics";

const base = "https://koinophobe.com";

// Scheduled notes join the sitemap on their publish date, without a deploy.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const notePages: MetadataRoute.Sitemap = publishedNotes().map((n) => ({
    url: `${base}/notes/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const { pages } = notesPage(1);
  const listPages: MetadataRoute.Sitemap = [
    ...topics.map((t) => ({ url: `${base}/notes/topic/${t.key}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.5 })),
    ...Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({
      url: `${base}/notes/page/${i + 2}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.3,
    })),
  ];

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/roofing-seo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/saas-seo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/notes`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...listPages,
    ...notePages,
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
