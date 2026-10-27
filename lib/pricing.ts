/**
 * Every price on the site lives here. The pricing page, its schema and the
 * "from $600" lines elsewhere all read from this file, so a change is one edit.
 * All figures are USD.
 */

export type Plan = {
  key: string;
  kicker: string;
  name: string;
  /** Number for schema. For "from" plans, the floor. */
  amount: number;
  /** How the price is shown. */
  price: string;
  unit: string;
  from?: boolean;
  monthly?: boolean;
  pick?: boolean;
  items: string[];
  note: string;
};

export const oneTime: Plan[] = [
  {
    key: "intro",
    kicker: "Free",
    name: "Intro call",
    amount: 0,
    price: "$0",
    unit: "20 minutes",
    items: [
      "We look at your site before we talk",
      "The two or three things we'd fix first",
      "What they'd cost, or that nothing needs fixing",
    ],
    note: "Yours to keep whether you hire us or not.",
  },
  {
    key: "tracking",
    kicker: "Small fix",
    name: "Tracking Fix",
    amount: 300,
    price: "$300",
    unit: "one-time, 5 business days",
    items: [
      "Calls, form fills and quote requests counted in GA4",
      "Set up through Google Tag Manager, tested end to end",
      "One Google Business Profile cleanup",
      "A short video showing where to see your numbers",
    ],
    note: "You pay after you see it working in your own account. Credited toward the Setup Sprint within 30 days.",
  },
  {
    key: "audit",
    kicker: "Paid audit",
    name: "Site Audit",
    amount: 750,
    price: "$750",
    unit: "one-time",
    items: [
      "Written audit, ranked by what affects calls",
      "Check that your calls and forms are being counted",
      "Google Business Profile review",
      "30-minute recorded walkthrough",
      "Delivered in 5 business days",
    ],
    note: "Credited in full if you start a monthly plan within 30 days.",
  },
  {
    key: "sprint",
    kicker: "Fix it once",
    name: "Setup Sprint",
    amount: 1800,
    price: "$1,800",
    unit: "one-time, 3 to 4 weeks",
    items: [
      "Everything in the audit, then the fixes",
      "Call and form tracking wired into GA4",
      "Google Business Profile cleaned up",
      "Speed, schema and technical fixes",
      "Monthly form-delivery check set up",
    ],
    note: "For owners who want it done right once and then run it themselves.",
  },
];

export const monthly: Plan[] = [
  {
    key: "care",
    kicker: "Keep it healthy",
    name: "Care",
    amount: 600,
    price: "$600",
    unit: "/month",
    monthly: true,
    items: [
      "Updates, backups, uptime and speed checks",
      "Monthly form and tracking check",
      "Up to 3 hours of fixes",
      "One-page monthly report: clicks, calls, forms",
    ],
    note: "For sites already in good shape.",
  },
  {
    key: "growth",
    kicker: "More calls",
    name: "Growth",
    amount: 1500,
    price: "$1,500",
    unit: "/month",
    monthly: true,
    pick: true,
    items: [
      "Everything in Care",
      "2 new service or city pages a month",
      "Google Business Profile posts and upkeep",
      "On-page and internal linking work",
      "Monthly call on what moved and what's next",
    ],
    note: "For one location that wants more calls.",
  },
  {
    key: "multi",
    kicker: "More ground",
    name: "Multi-location",
    amount: 2500,
    price: "$2,500",
    unit: "/month",
    from: true,
    monthly: true,
    items: [
      "Everything in Growth, for each market",
      "Location pages and profiles for each branch",
      "Quoted after the intro call",
    ],
    note: "For businesses with 2 or more locations, or a big metro.",
  },
];

/**
 * The money-back guarantee. Every mention of it on the site reads from here,
 * so the promise and its terms can never say different things. Covers the
 * first payment on anything: a one-time project in full, or the first month
 * of any monthly plan.
 */
export const guarantee = {
  name: "100% money-back guarantee",
  days: 30,
  short: "Not happy within 30 days of your first payment? You get all of it back.",
  terms:
    "Ask within 30 days of your first payment and we refund 100% of it: the full price of a one-time project, or the first month of any monthly plan. No forms, no conditions, and no questions you have to answer. A refund ends the plan, minimum term included. Later monthly payments aren't refundable, but you can still cancel on the normal terms.",
};

/** Lowest monthly price, for "plans from" lines elsewhere on the site. */
export const monthlyFrom = Math.min(...monthly.map((p) => p.amount));

/**
 * Search + AI: Google and AI search for home service businesses, sold on
 * /ai-search-optimization. Different work from the local plans above, so it
 * keeps its own terms: no contract, and either side can stop with 30 days'
 * notice. (The `startup` name is historical.) `items` is what ships every month, so every line in it must be
 * something countable that we control. Anything conditional goes in `extras`.
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
  kicker: "Google and AI search",
  name: "Search + AI",
  amount: 1000,
  price: "$1,000",
  unit: "/month",
  monthly: true,
  seats: 5,
  seatsOpen: 5,
  items: [
    "Citation tracking: your buyer questions across 4 assistants, 3 runs each",
    "12 in-depth articles, cost and comparison pages included",
    "50+ fixes to pages you already have",
    "Nothing that makes claims about your business goes live without your OK",
    "A Friday changelog and a month-end citation report",
  ],
  note: "Measured, fixed and written every month. Five clients at a time.",
  extras: ["A free tool when your category has room for one"],
  termsLead: "No contract.",
  terms: "If you're not satisfied at any point, tell us and we stop 30 days later. Your first month is covered by a 100% money-back guarantee.",
};
