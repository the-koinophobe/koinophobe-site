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
 * Every file under public/notes, indexed by bare filename, so an image
 * resolves whether the note writes `figures/chart.png` (hand-written) or
 * `chart.png` (what the CMS media picker inserts). Built once at startup.
 */
const mediaByName: Map<string, string> = (() => {
  const map = new Map<string, string>();
  const root = path.join(PUBLIC, "notes");
  const walk = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const url = "/" + path.relative(PUBLIC, full).split(path.sep).join("/");
      const base = entry.name.toLowerCase();
      if (!map.has(base)) map.set(base, url);
      // also index under the original extension, so a .png reference finds
      // the .webp that replaced it
      const stem = base.replace(/\.[^.]+$/, "");
      for (const ext of ["png", "jpg", "jpeg", "webp"]) {
        const key = `${stem}.${ext}`;
        if (!map.has(key)) map.set(key, url);
      }
    }
  };
  walk(root);
  return map;
})();

/** Resolve whatever a note wrote to a file that actually exists. */
function resolveImage(src: string): string {
  if (/^(https?:|data:)/.test(src)) return src;
  const clean = src.replace(/^\.\//, "");
  const candidates = [
    clean.startsWith("/") ? clean : `/notes/${clean}`,
    clean.startsWith("/") ? clean : `/${clean}`,
  ];
  for (const c of candidates) {
    const webp = c.replace(/\.(png|jpe?g)$/i, ".webp");
    if (webp !== c && fs.existsSync(path.join(PUBLIC, webp.replace(/^\//, "")))) return webp;
    if (fs.existsSync(path.join(PUBLIC, c.replace(/^\//, "")))) return c;
  }
  // Last resort: match on the filename alone, wherever it lives under
  // public/notes. This is what makes a CMS upload and a hand-written path
  // behave the same.
  const found = mediaByName.get(path.posix.basename(clean).toLowerCase());
  return found ?? (clean.startsWith("/") ? clean : `/notes/${clean}`);
}

/**
 * Two fixes applied to marked's output.
 *
 * Images: the path is resolved against the media folder, gets its intrinsic
 * size so nothing shifts while it loads, and has its alt text promoted to a
 * visible caption, because in a data-heavy note the alt text is the caption.
 *
 * Tables: wrapped so a wide table scrolls inside its own box. Without this a
 * seven-column table pushes the whole page sideways on a phone.
 */
function enrich(html: string): string {
  return html
    .replace(/<img([^>]*?)>/g, (whole, attrs: string) => {
      const src = /src="([^"]*)"/.exec(attrs)?.[1] ?? "";
      const alt = /alt="([^"]*)"/.exec(attrs)?.[1] ?? "";
      const resolved = resolveImage(src);
      const size = imageSize(resolved);
      const dims = size ? ` width="${size.w}" height="${size.h}"` : "";
      const img = `<img src="${resolved}" alt="${alt}"${dims} loading="lazy" decoding="async">`;
      return alt
        ? `<figure>${img}<figcaption>${alt}</figcaption></figure>`
        : `<figure>${img}</figure>`;
    })
    .replace(/<p>(<figure>[\s\S]*?<\/figure>)<\/p>/g, "$1")
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");
}

/**
 * YAML turns an unquoted `2026-09-12` into a Date object, not a string, so
 * String().slice(0,10) used to produce "Sat Sep 12" — a date with no year,
 * which JavaScript then reads as 2001. The CMS writes dates unquoted, so this
 * hit every note published from the phone. Normalise both shapes to
 * YYYY-MM-DD, and return "" for anything unparseable rather than guessing.
 */
function isoDate(value: unknown): string {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "" : value.toISOString().slice(0, 10);
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value ?? "").trim());
  return match ? match[0] : "";
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
      date: isoDate(data.date),
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
    .filter((n) => {
      if (n.draft || !n.title || !n.date) return false;
      const at = new Date(`${n.date}T00:00:00Z`).getTime();
      return !Number.isNaN(at) && at <= now;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNote(slug: string): Note | undefined {
  return publishedNotes().find((n) => n.slug === slug);
}
