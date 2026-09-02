import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Note = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  draft: boolean;
  /** Rendered at build time. Server only, so no markdown parser reaches the browser. */
  html: string;
};

const DIR = path.join(process.cwd(), "content", "notes");

/**
 * Notes are markdown files in content/notes, written from the CMS at /admin.
 * They are read once per server start, since the files are baked at build.
 */
const all: Note[] = (fs.existsSync(DIR) ? fs.readdirSync(DIR) : [])
  .filter((f) => f.endsWith(".md"))
  .map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
    return {
      slug: file.replace(/\.md$/, ""),
      title: String(data.title ?? ""),
      date: String(data.date ?? "").slice(0, 10),
      excerpt: String(data.excerpt ?? ""),
      draft: data.draft === true,
      html: marked.parse(content, { async: false }) as string,
    };
  });

/**
 * What the public may see. A draft is never published; a post dated in the
 * future waits for that date to arrive. The check runs per call rather than at
 * module load, so a scheduled post appears on the next revalidation instead of
 * needing a deploy.
 */
export function publishedNotes(): Note[] {
  const now = Date.now();
  return all
    .filter((n) => !n.draft && n.title && new Date(n.date).getTime() <= now)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNote(slug: string): Note | undefined {
  return publishedNotes().find((n) => n.slug === slug);
}
