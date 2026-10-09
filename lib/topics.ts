/**
 * Note topics. Each note belongs to one topic, set by `topic:` in its
 * frontmatter (the CMS has a dropdown for it). Notes without one fall back to
 * the map below, and then to "strategy".
 */
export type TopicKey = "roofing" | "local" | "trades" | "tracking" | "technical" | "ai" | "startups" | "strategy";

export const topics: { key: TopicKey; label: string; title: string; blurb: string }[] = [
  {
    key: "roofing",
    label: "Roofing",
    title: "SEO for roofing companies",
    blurb: "Town pages, storm pages, Business Profile and the roofing keywords worth a page.",
  },
  {
    key: "local",
    label: "Local SEO",
    title: "Local SEO and the map pack",
    blurb: "Google Business Profile, near-me searches, citations and ranking in the towns you serve.",
  },
  {
    key: "trades",
    label: "By trade",
    title: "SEO by trade",
    blurb: "Plumbing, HVAC, cleaning, moving, auto repair, solar and more, trade by trade.",
  },
  {
    key: "tracking",
    label: "Call tracking",
    title: "Call tracking and analytics",
    blurb: "Counting calls and forms in GA4, Tag Manager and Search Console, and reports worth reading.",
  },
  {
    key: "technical",
    label: "Technical SEO",
    title: "Technical SEO for business websites",
    blurb: "Indexing statuses, sitemaps, canonicals, speed, migrations and what breaks when a site moves.",
  },
  {
    key: "ai",
    label: "AI search",
    title: "AI search and SaaS SEO",
    blurb: "How ChatGPT, Claude, Perplexity and AI Overviews pick their sources, measured, and what any business can do to get named.",
  },
  {
    key: "startups",
    label: "Startups",
    title: "SEO for startup founders",
    blurb: "When to start, the pages to build first, Next.js and React SEO, domain changes and the first backlinks.",
  },
  {
    key: "strategy",
    label: "Strategy",
    title: "Strategy, costs and case studies",
    blurb: "What SEO costs, how long it takes, who to hire, and what happened on real sites.",
  },
];

export const topicLabel = (key: string) => topics.find((t) => t.key === key)?.label ?? "Strategy";

export const TOPIC_BY_SLUG: Record<string, TopicKey> = {
  // roofing
  "roofing-contractor-schema": "roofing",
  "google-business-profile-for-roofers": "roofing",
  "roofing-service-area-pages": "roofing",
  "google-reviews-for-roofers": "roofing",
  "roofing-seo-cost": "roofing",
  "storm-damage-roofing-pages": "roofing",
  "roof-replacement-service-page": "roofing",
  "local-services-ads-vs-seo-roofers": "roofing",
  "roofing-keywords": "roofing",
  "flat-roof-service-page-build": "roofing",
  // local
  "near-me-searches-local-seo-data": "local",
  "nap-citations-contractors": "local",
  "ranking-for-your-business-name": "local",
  "google-map-pack-ranking": "local",
  "google-business-profile-suspended": "local",
  "local-seo-checklist-home-services": "local",
  "charles-county-md-small-business-seo": "local",
  "merrimack-valley-contractor-seo": "local",
  "hurricane-shutter-seo-next-county": "local",
  // trades
  "plumbing-seo": "trades",
  "hvac-seo": "trades",
  "pool-deck-repair-seo": "trades",
  "lawn-care-seo": "trades",
  "mobile-detailing-seo": "trades",
  "pest-control-seo": "trades",
  "concrete-driveway-paving-seo": "trades",
  "electrician-seo": "trades",
  "tree-service-seo": "trades",
  "garage-door-repair-seo": "trades",
  "pressure-washing-seo": "trades",
  "before-after-gallery-seo": "trades",
  "seasonal-content-calendar-home-services": "trades",
  // tracking
  "three-events-local-business": "tracking",
  "rankings-without-tracking": "tracking",
  "gtm-phone-click-tracking": "tracking",
  "speed-plugin-broke-contact-form": "tracking",
  "call-tracking-for-contractors": "tracking",
  "google-search-console-for-contractors": "tracking",
  "ga4-reports-for-contractors": "tracking",
  "monthly-seo-report-contractors": "tracking",
  // technical
  "website-migration-without-losing-rankings": "technical",
  "image-optimization-contractor-websites": "technical",
  "contractor-website-not-showing-on-google": "technical",
  "core-web-vitals-contractor-websites": "technical",
  "zero-click-rankings-title-tags": "technical",
  "contractor-homepage-that-converts": "technical",
  // ai search
  "ai-cited-vs-ranked-page": "ai",
  "ai-search-local-business": "ai",
  "ai-crawlers-robots-txt": "ai",
  "saas-comparison-pages": "ai",
  "track-ai-search-visibility": "ai",
  // strategy and case studies
  "hiring-an-seo-questions-to-ask": "strategy",
  "how-long-does-seo-take": "strategy",
  "seo-vs-google-ads-contractors": "strategy",
  "shared-leads-vs-your-own-website": "strategy",
  "white-label-technical-seo-for-agencies": "strategy",
  "what-is-a-koinophobe": "strategy",
  "clinic-158-to-501": "strategy",
  "charles-county-md-game-shop-seo": "strategy",
  "lawrence-ma-window-tint-seo": "strategy",
  "lawrence-ma-free-estimate-page": "strategy",
};
