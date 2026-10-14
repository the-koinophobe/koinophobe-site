import type { TopicKey } from "./topics";

/**
 * The service pages, in one place, so every page that links between them
 * (the "more services" row, the note sidebar) uses the same names and lines.
 * The header and footer keep their own shorter lists.
 */
export type ServicePage = { href: string; title: string; desc: string; cta: string };

export const servicePages: ServicePage[] = [
  {
    href: "/roofing-seo",
    title: "Roofing SEO",
    desc: "Town pages, storm pages, Business Profile and call tracking for roofing companies.",
    cta: "See roofing SEO",
  },
  {
    href: "/home-remodeling-seo",
    title: "Home remodeling SEO",
    desc: "Project pages, cost pages and ChatGPT visibility for kitchen, bath and whole-home remodelers.",
    cta: "See remodeling SEO",
  },
  {
    href: "/ai-search-optimization",
    title: "AI search optimization",
    desc: "Get named by ChatGPT, Claude, Perplexity and Google's AI Overviews, measured every month.",
    cta: "See AI search",
  },
  {
    href: "/saas-seo",
    title: "SaaS SEO and AI search",
    desc: "Found on Google and cited by ChatGPT, with every change sent as a pull request.",
    cta: "See the startup plan",
  },
  {
    href: "/pricing#agencies",
    title: "White-label for agencies",
    desc: "Technical SEO and tracking under your brand, from $850 a site.",
    cta: "See agency rates",
  },
];

/**
 * Notes whose reader is most likely a remodeler: photo-heavy project work,
 * estimate pages, long consideration. Their sidebar points at the remodeling page.
 */
const REMODEL_NOTES = new Set([
  "before-after-gallery-seo",
  "lawrence-ma-free-estimate-page",
  "contractor-homepage-that-converts",
  "image-optimization-contractor-websites",
  "seasonal-content-calendar-home-services",
  "concrete-driveway-paving-seo",
]);

/** The service page that best fits a note, or null when pricing is the better next step. */
export function serviceForNote(slug: string, topic: TopicKey): ServicePage | null {
  const by = (href: string) => servicePages.find((s) => s.href === href)!;
  if (REMODEL_NOTES.has(slug)) return by("/home-remodeling-seo");
  if (topic === "roofing") return by("/roofing-seo");
  if (topic === "ai") return by("/ai-search-optimization");
  if (topic === "startups") return by("/saas-seo");
  return null;
}
