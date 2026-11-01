import type { MetadataRoute } from "next";
import { modifiedDate, notesPage, publishedNotes } from "@/lib/notes";
import { topics } from "@/lib/topics";

const base = "https://koinophobe.com";

// Scheduled notes join the sitemap on their publish date, without a deploy.
export const revalidate = 3600;

/**
 * lastModified is only ever a date the content actually changed. Google stops
 * trusting lastmod on a site where it moves on every fetch, so pages with no
 * reliable date leave it out rather than claim "now".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const notes = publishedNotes();
  const latest = (list: typeof notes) =>
    list.length ? new Date(list.map(modifiedDate).sort().at(-1)!) : undefined;
  // The homepage, the notes index and its pages all list the newest notes, so
  // they change when a note is published.
  const newest = latest(notes);

  const notePages: MetadataRoute.Sitemap = notes.map((n) => ({
    url: `${base}/notes/${n.slug}`,
    lastModified: new Date(modifiedDate(n)),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const { pages } = notesPage(1);
  const listPages: MetadataRoute.Sitemap = [
    ...topics.map((t) => ({
      url: `${base}/notes/topic/${t.key}`,
      lastModified: latest(notes.filter((n) => n.topic === t.key)),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({
      url: `${base}/notes/page/${i + 2}`,
      lastModified: newest,
      changeFrequency: "weekly" as const,
      priority: 0.3,
    })),
  ];

  return [
    { url: `${base}/`, lastModified: newest, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/roofing-seo`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/home-remodeling-seo`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ai-search-optimization`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/notes`, lastModified: newest, changeFrequency: "monthly", priority: 0.6 },
    ...listPages,
    ...notePages,
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
