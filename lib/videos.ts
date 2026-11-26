/**
 * Case Files on YouTube, each paired with one note on the site.
 *
 * To publish a video: paste its 11-character YouTube id into `id` (the part
 * after watch?v=) and set `uploadDate` to the moment it went public, with the
 * timezone. Until `id` is filled, the note shows a quiet "coming to YouTube"
 * panel instead of an embed, and no VideoObject schema is emitted, because
 * schema for a video that doesn't exist yet would be a false claim.
 */

export type Chapter = { at: string; title: string };

export type Video = {
  /** The note this video is paired with. */
  note: string;
  /** YouTube video id. Empty until the video is public. */
  id: string;
  title: string;
  description: string;
  /** ISO 8601 duration, e.g. PT6M22S. */
  duration: string;
  /** Human duration for captions. */
  length: string;
  /** ISO 8601 with timezone, e.g. 2026-11-25T18:00:00-05:00. Empty until public. */
  uploadDate: string;
  /** Used until YouTube's own thumbnail exists. */
  thumbnail: string;
  chapters: Chapter[];
  series: "Case Files" | "Map explainers";
};

export const videos: Video[] = [
  {
    note: "chatgpt-business-profiles",
    id: "",
    title: "ChatGPT Now Lists Businesses. Here's Who Decides If It Names Yours",
    description:
      "Case File 001. OpenAI now lets businesses claim a profile inside ChatGPT, but its own answers still come from your file: your site, reviews, listings and what others wrote. Four anonymised client files, and four steps to open yours this week.",
    duration: "PT6M22S",
    length: "6:22",
    uploadDate: "",
    thumbnail: "/video/case001-thumb.webp",
    series: "Case Files",
    chapters: [
      { at: "0:00", title: "Cold open: two shops, one answer" },
      { at: "1:08", title: "The old file" },
      { at: "1:32", title: "The new reader: AI reads you first" },
      { at: "2:04", title: "File 002: famous by name, invisible by need" },
      { at: "2:55", title: "File 003: the page nobody planned" },
      { at: "3:36", title: "File 004: answers, not adverts" },
      { at: "4:19", title: "Back to the clinic: what we changed" },
      { at: "5:11", title: "Open your own file this week" },
      { at: "5:56", title: "Case closed?" },
    ],
  },
  {
    note: "clinic-4-to-104-clicks",
    id: "",
    title: "How a Florida clinic went from 4 to 104 Google clicks a month",
    description: "The five steps, in order, behind a small clinic's climb on Google, and the summer dip nobody can explain.",
    duration: "PT2M46S",
    length: "2:46",
    uploadDate: "",
    thumbnail: "",
    series: "Map explainers",
    chapters: [
      { at: "0:00", title: "Cold open" },
      { at: "0:18", title: "Where it started" },
      { at: "0:34", title: "Step one: move the authority" },
      { at: "1:02", title: "Steps two and three: build the site, a page for every treatment" },
      { at: "1:27", title: "Step four: the on-page SEO" },
      { at: "1:47", title: "Step five: tracking" },
      { at: "2:02", title: "What the numbers did" },
      { at: "2:18", title: "What to copy" },
    ],
  },
  {
    note: "speed-plugin-broke-contact-form",
    id: "",
    title: "Contact form not working? Two causes I found on client sites",
    description: "An email change and a speed plugin, two quiet ways a contact form stops sending, and the monthly test that catches the next one.",
    duration: "PT2M17S",
    length: "2:17",
    uploadDate: "",
    thumbnail: "",
    series: "Map explainers",
    chapters: [
      { at: "0:00", title: "Cold open" },
      { at: "0:14", title: "Cause one: an email change" },
      { at: "1:03", title: "Cause two: a speed plugin" },
      { at: "1:32", title: "The test that catches the next one" },
      { at: "1:59", title: "Close" },
    ],
  },
  {
    note: "website-migration-without-losing-rankings",
    id: "",
    title: "How to redesign or move a website without losing Google rankings",
    description: "The domain first, the one line that hides a site from Google, and the map of every old address to its new home.",
    duration: "PT2M56S",
    length: "2:56",
    uploadDate: "",
    thumbnail: "",
    series: "Map explainers",
    chapters: [
      { at: "0:00", title: "Cold open" },
      { at: "0:15", title: "The domain first" },
      { at: "0:52", title: "The line that hides you from Google" },
      { at: "1:13", title: "Before launch: list and map everything" },
      { at: "2:06", title: "Keep what ranks" },
      { at: "2:22", title: "After launch" },
      { at: "2:36", title: "Close" },
    ],
  },
  {
    note: "zero-click-rankings-title-tags",
    id: "",
    title: "Ranking on Google but getting no clicks? Fix this first",
    description: "Why a good ranking can earn no clicks, how to find yours in five minutes, and the fix in order.",
    duration: "PT2M22S",
    length: "2:22",
    uploadDate: "",
    thumbnail: "",
    series: "Map explainers",
    chapters: [
      { at: "0:00", title: "Cold open" },
      { at: "0:15", title: "It gets worse in the top five" },
      { at: "0:39", title: "Why a good ranking gets no clicks" },
      { at: "1:03", title: "The booking example" },
      { at: "1:28", title: "Find yours in five minutes" },
      { at: "1:54", title: "The fix, in order" },
      { at: "2:06", title: "Close" },
    ],
  },
  {
    note: "get-business-recommended-by-chatgpt",
    id: "",
    title: "How to get your business recommended by ChatGPT",
    description: "What's actually documented, what we measured, and four steps to get named when customers ask ChatGPT who to call.",
    duration: "PT2M43S",
    length: "2:43",
    uploadDate: "",
    thumbnail: "",
    series: "Map explainers",
    chapters: [
      { at: "0:00", title: "Cold open" },
      { at: "0:10", title: "What's actually documented" },
      { at: "0:40", title: "What we measured" },
      { at: "1:22", title: "Step one: make your site readable" },
      { at: "1:35", title: "Step two: be findable beyond Google" },
      { at: "1:53", title: "Step three: be consistent everywhere" },
      { at: "2:10", title: "Step four: check it" },
      { at: "2:25", title: "Close" },
    ],
  },
];

export const videoForNote = (slug: string) => videos.find((v) => v.note === slug);

/** "1:08" -> 68 */
export function seconds(at: string) {
  return at.split(":").reduce((t, n) => t * 60 + Number(n), 0);
}

export function iso(at: string) {
  return `PT${seconds(at)}S`;
}

export const watchUrl = (v: Video, at?: string) =>
  `https://www.youtube.com/watch?v=${v.id}${at ? `&t=${seconds(at)}s` : ""}`;

export const thumbUrl = (v: Video) =>
  v.id ? `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg` : v.thumbnail ? `https://koinophobe.com${v.thumbnail}` : "";

/**
 * VideoObject with one Clip per chapter, for the paired note. Returns null
 * while the video has no id, so nothing unverifiable reaches the page.
 */
export function videoJsonLd(v: Video, pageUrl: string) {
  if (!v.id || !v.uploadDate) return null;
  const marks = v.chapters.map((c) => seconds(c.at));
  const total = seconds(v.length);
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: v.title,
    description: v.description,
    thumbnailUrl: [thumbUrl(v)],
    uploadDate: v.uploadDate,
    duration: v.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: watchUrl(v),
    author: { "@type": "Person", name: "Michael Edward", url: "https://koinophobe.com/about" },
    publisher: { "@id": "https://koinophobe.com/#organization" },
    isPartOf: { "@type": "CreativeWorkSeries", name: `Michael Edward · ${v.series}` },
    hasPart: v.chapters.map((c, i) => ({
      "@type": "Clip",
      name: c.title,
      startOffset: marks[i],
      endOffset: marks[i + 1] ?? total,
      url: watchUrl(v, c.at),
    })),
  };
}
