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
 * The delivery guarantee. Every mention of it on the site reads from here,
 * so the promise and its terms can never say different things. It covers the
 * work, not results: the first payment comes back only if the month-one list
 * isn't finished in 30 days. Nov 2026: replaced the no-questions refund, which
 * let a client keep a full month of fixes and still take the money back.
 * Every line in the lists must be something I control and can show as done.
 */
export const guarantee = {
  name: "Delivery guarantee",
  days: 30,
  short: "If I don't finish the month-one list within 30 days, you get your first payment back.",
  terms:
    "Your first month has a fixed list of work. If any of it isn't finished within 30 days of your first payment, email me and I refund that payment in full. You keep whatever I did finish. Days I spend waiting on you for a login or an OK don't count toward the 30. Once the list is done, the payment isn't refundable, because the work is already on your site. You can still cancel on the normal terms. A refund ends the plan, minimum term included.",
  monthOne: [
    "Call and form tracking set up and tested",
    "Your Google Business Profile updated: services, service areas, hours, photos and a first post",
    "The site fixes marked \"fix first\" in your free audit",
    "2 new service or town pages live on your site",
  ],
  aiMonthOne: [
    "Citation tracking set up, with the first run across 4 assistants",
    "4 in-depth articles written and sent to you for your OK",
    "20+ fixes to pages you already have",
  ],
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
  terms: "Stop the add-on any time with 30 days' notice. Its first month is covered by the delivery guarantee.",
};

/** The plan plus the add-on, for "both together" lines. */
export const withAi = plan.amount + startup.amount;
