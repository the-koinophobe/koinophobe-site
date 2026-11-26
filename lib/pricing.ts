/**
 * Every price on the site lives here. All figures are USD.
 *
 * Nov 26 2026: the Google fix is $2,500, a four-week sprint (20 working days)
 * that now includes a local link-building campaign; half up front, half on
 * handover. Monthly growth is $1,000 a month and keeps the links coming. The
 * $750 and $300 prices, the $500 plan, the add-ons and the guarantee are
 * retired. The audit and the intro call stay free.
 */

export type Step = { week: number; name: string; what: string };

/** The Google fix, run as a four-week sprint. */
export const sprint = {
  key: "fix",
  name: "The Google fix",
  amount: 2500,
  price: "$2,500",
  days: 20,
  weeks: 4,
  upfront: "$1,250",
  onHandover: "$1,250",
  steps: [
    { week: 1, name: "Starting numbers", what: "Your calls and form fills, your map position across your service area for five searches, and what ChatGPT, Gemini, Claude and Perplexity say about you today" },
    { week: 1, name: "Competitor teardown", what: "The three businesses that beat you in the map: their categories, reviews, pages and links, and what to take from each" },
    { week: 1, name: "Google Business Profile rebuilt", what: "Main and extra categories, every service, towns served, hours, booking link, description and your best photos" },
    { week: 2, name: "Listings AI tools read", what: "The same name, phone, services and towns on Google, Bing, Apple Maps, BBB, Yelp, Angi, Nextdoor and the data suppliers that feed them" },
    { week: 2, name: "Local Services Ads", what: "Set up with your license and insurance so you pay per lead, with the Google Screened badge" },
    { week: 2, name: "Tracking you can trust", what: "Call tracking, GA4 and every form and phone link tested, so each lead is counted and none goes missing" },
    { week: 3, name: "Pages that win the call", what: "Your homepage headline and three service pages rewritten around why you, with schema so Google and AI tools read them right" },
    { week: 3, name: "Review engine", what: "A text and QR code your crew sends after each job, and replies drafted for every review you already have" },
    { week: 3, name: "Link-building campaign", what: "At least 10 local links from suppliers, trade groups, sponsorships, local news and directories that matter, each one listed with its page" },
    { week: 4, name: "Handover", what: "A before and after report, a 90-day plan, and a 30-minute call to walk you through both" },
  ] as Step[],
  terms: [
    "Done in four weeks from the day I get access",
    "Every account and every link stays yours",
    "Google's ad background check and some link placements can land after week 4; I see them through",
  ],
};

/** The areas the fix covers, in the owner's words. */
export const fixAreas = [
  { name: "Google Business Profile", says: "Show up in the map, not on page two." },
  { name: "Link building", says: "Local sites vouch for you, so Google trusts you." },
  { name: "AI search", says: "Get named when people ask ChatGPT who to call." },
  { name: "Local Services Ads", says: "Pay per lead, with the Google Screened badge." },
  { name: "Pages and offer", says: "Say why you, not “quality you can trust.”" },
  { name: "Tracking", says: "Know which calls came from where." },
];

/** After the sprint. */
export const monthly = {
  key: "monthly",
  name: "Monthly growth",
  amount: 1000,
  price: "$1,000",
  items: [
    { name: "Four new local links a month", what: "The link-building campaign keeps going, each link listed with its page" },
    { name: "Weekly profile posts and photos", what: "Your Google profile kept fresh, with replies to every new review" },
    { name: "One new page a month", what: "A service or town page, written to win the call" },
    { name: "AI search check", what: "What ChatGPT, Gemini, Claude and Perplexity say about you, and what I changed" },
    { name: "Map position tracked", what: "Your rank across the service area for the searches that pay" },
    { name: "Forms and calls tested", what: "Every form and phone link, every month" },
    { name: "A report and a call", what: "Calls, map position, links won and next month's plan, in 20 minutes" },
  ],
  terms: "Month to month, 30 days' notice.",
};

/** What costs nothing. */
export const free = [
  {
    key: "intro",
    name: "Intro call",
    price: "$0",
    unit: "20 minutes",
    items: ["I look at your site and Google profile before we talk", "The two or three things I'd fix first", "What they'd cost, or that nothing needs fixing"],
  },
  {
    key: "audit",
    name: "Site audit",
    price: "$0",
    unit: "in 5 business days",
    items: ["A written list of what's costing you calls, worst first", "A check that your calls and forms are being counted", "A look at your Google Business Profile", "A 30-minute recorded walkthrough"],
  },
];
