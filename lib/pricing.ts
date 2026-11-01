/**
 * Every price on the site lives here. The pricing page, its schema and the
 * "$300 a month" lines elsewhere all read from this file, so a change is one
 * edit. All figures are USD.
 *
 * Nov 2026: one monthly plan at $500, audits free, AI search an add-on at
 * $300 more. The old Care/Growth/Multi-location plans, the paid audit, the
 * Setup Sprint and the Tracking Fix were folded into these. $500 sits above
 * the "cheap SEO" tier the notes warn about and well under the market rate
 * for monthly building work; the notes explain the gap as no overhead.
 */

export type Plan = {
  key: string;
  kicker: string;
  name: string;
  /** Number for schema. */
  amount: number;
  /** How the price is shown. */
  price: string;
  unit: string;
  monthly?: boolean;
  pick?: boolean;
  items: string[];
  note: string;
};

/** What costs nothing: the intro call and the audit. */
export const free: Plan[] = [
  {
    key: "intro",
    kicker: "Free",
    name: "Intro call",
    amount: 0,
    price: "$0",
    unit: "20 minutes",
    items: [
      "I look at your site before we talk",
      "The two or three things I'd fix first",
      "What they'd cost, or that nothing needs fixing",
    ],
    note: "Yours to keep whether you hire me or not.",
  },
  {
    key: "audit",
    kicker: "Free",
    name: "Site Audit",
    amount: 0,
    price: "$0",
    unit: "free, in 5 business days",
    items: [
      "A written list of what's costing you calls, worst first",
      "A check that your calls and forms are being counted",
      "A look at your Google Business Profile",
      "A 30-minute recorded walkthrough",
    ],
    note: "Yours to keep whether you hire me or not.",
  },
];

/** The one monthly plan. */
export const plan: Plan = {
  key: "seo",
  kicker: "Everything, every month",
  name: "SEO plan",
  amount: 500,
  price: "$500",
  unit: "/month",
  monthly: true,
  pick: true,
  items: [
    "I fix what keeps Google from showing your site: slow pages, broken forms, pages Google can't find",
    "Every call and form counted, and your forms tested every month",
    "2 new pages a month for your services and towns",
    "Your Google Business Profile kept up to date, with regular posts",
    "Site updates, backups and uptime checks",
    "A one-page report and a short call every month",
  ],
  note: "3-month minimum, then month to month. You own every account.",
};

/**
 * The money-back guarantee. Every mention of it on the site reads from here,
 * so the promise and its terms can never say different things. Covers the
 * first month of the plan and of the AI search add-on.
 */
export const guarantee = {
  name: "100% money-back guarantee",
  days: 30,
  short: "Not happy within 30 days of your first payment? You get all of it back.",
  terms:
    "Ask within 30 days of your first payment and I refund 100% of it: your first month of the SEO plan, and of the AI search add-on if you have it. No forms, no conditions, and no questions you have to answer. A refund ends the plan, minimum term included. Later monthly payments aren't refundable, but you can still cancel on the normal terms.",
};

/**
 * Search + AI: Google and AI search, sold on /ai-search-optimization as an
 * add-on to the SEO plan. (The `startup` name is historical.) `items` is what
 * ships every month, so every line in it must be something countable that we
 * control. Anything conditional goes in `extras`.
 *
 * `seatsOpen` is printed on the page. Only ever set it to the real number of
 * open seats; the cap is capacity, so it is never a scarcity line.
 */
export const startup: Plan & {
  seats: number;
  seatsOpen: number;
  extras: string[];
  termsLead: string;
  terms: string;
} = {
  key: "startup",
  kicker: "Add-on: Google and AI search",
  name: "Search + AI",
  amount: 300,
  price: "+$300",
  unit: "/month",
  monthly: true,
  seats: 5,
  seatsOpen: 5,
  items: [
    "Citation tracking: your buyer questions across 4 assistants, 3 runs each",
    "4 in-depth articles, cost and comparison pages included",
    "20+ fixes to pages you already have",
    "Nothing that makes claims about your business goes live without your OK",
    "A Friday changelog and a month-end citation report",
  ],
  note: "Added to the SEO plan. Measured, fixed and written every month. Five clients at a time.",
  extras: ["A free tool when your category has room for one"],
  termsLead: "Added to the SEO plan, no extra contract.",
  terms: "Stop the add-on any time with 30 days' notice. Its first month is covered by the 100% money-back guarantee.",
};

/** The plan plus the add-on, for "both together" lines. */
export const withAi = plan.amount + startup.amount;
