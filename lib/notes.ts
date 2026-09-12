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
const PUBLIC = path.join(process.cwd(), "public");

/**
 * Intrinsic size straight from the file header, so every image ships with
 * width and height and nothing on the page moves while it loads. PNG, JPEG and
 * WebP cover everything the CMS produces.
 */
function imageSize(rel: string): { w: number; h: number } | null {
  try {
    const file = path.join(PUBLIC, rel.replace(/^\//, ""));
    if (!fs.existsSync(file)) return null;
    const b = fs.readFileSync(file);

    // PNG: IHDR width/height are two big-endian 32-bit ints at offset 16.
    if (b.length > 24 && b.toString("hex", 0, 8) === "89504e470d0a1a0a") {
      return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    }
    // JPEG: walk the segment chain to the first SOF marker.
    if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length - 9) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1];
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
          return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
        }
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
    // WebP, VP8X and lossy VP8 forms.
    if (b.length > 30 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const fourcc = b.toString("ascii", 12, 16);
      if (fourcc === "VP8X") {
        return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
      }
      if (fourcc === "VP8 ") {
        return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
      }
    }
  } catch {}
  return null;
}

/**
 * Two fixes applied to marked's output.
 *
 * Images: a bare relative path in a note means "an image I uploaded", so it
 * resolves against the CMS media folder. Each one gets its intrinsic size, lazy
 * loading, and its alt text promoted to a visible caption, because in a
 * data-heavy note the alt text is the figure caption.
 *
 * Tables: wrapped so a wide table scrolls inside its own box. Without this a
 * seven-column table pushes the whole page sideways on a phone.
 */
function enrich(html: string): string {
  return html
    .replace(/<img([^>]*?)>/g, (whole, attrs: string) => {
      const src = /src="([^"]*)"/.exec(attrs)?.[1] ?? "";
      const alt = /alt="([^"]*)"/.exec(attrs)?.[1] ?? "";
      let resolved = /^(https?:|\/|data:)/.test(src) ? src : `/notes/${src.replace(/^\.\//, "")}`;
      // Write .png in the markdown, serve .webp when one sits beside it. Keeps
      // the note portable while the page ships the smaller file.
      const webp = resolved.replace(/\.(png|jpe?g)$/i, ".webp");
      if (webp !== resolved && fs.existsSync(path.join(PUBLIC, webp.replace(/^\//, "")))) {
        resolved = webp;
      }
      const size = imageSize(resolved);
      const dims = size ? ` width="${size.w}" height="${size.h}"` : "";
      const img = `<img src="${resolved}" alt="${alt}"${dims} loading="lazy" decoding="async">`;
      return alt
        ? `<figure>${img}<figcaption>${alt}</figcaption></figure>`
        : `<figure>${img}</figure>`;
    })
    // marked already wrapped a lone image in a paragraph; unwrap so the figure
    // is a block rather than illegal markup inside a <p>.
    .replace(/<p>(<figure>[\s\S]*?<\/figure>)<\/p>/g, "$1")
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");
}

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
      html: enrich(marked.parse(content, { async: false }) as string),
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
