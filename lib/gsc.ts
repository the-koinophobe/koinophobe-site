/**
 * Every figure here is read straight out of the Google Search Console exports
 * pulled on 28-30 August 2026. Nothing is estimated, rounded up, or modelled.
 * If a number changes, re-export and update it here rather than in a component.
 */

export const EXPORT_DATE = "28-30 Aug 2026";

export const aggregate = {
  /** Sites worked on across two years. The body of work. */
  sitesWorked: 30,
  /**
   * The five properties there are live Search Console exports for. This is the
   * evidence set, NOT the portfolio. Never let this number stand in for the
   * work done: every figure below is scoped to these five only.
   */
  properties: 5,
  impressions: 1031312,
  clicks: 3077,
  queries: 4981,
  /** Position 10 or better, across the five measured properties. */
  pageOne: 2096,
  topThree: 624,
  window: "Apr 2025 to Aug 2026",
};

export type Metric = {
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "down";
};

export type CaseStudy = {
  slug: string;
  index: string;
  client: string;
  place: string;
  title: string;
  meta: string;
  headline: { value: string; label: string };
  metrics: Metric[];
  body: string[];
  /** The opportunity still on the table. Honest, but sold forward. */
  next: string;
  chart: "myofascial" | "roofing" | "tint" | "gameshop" | "agency";
  chartTitle: string;
  chartRange: string;
  caption: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "myofascial-clinic",
    index: "01",
    client: "Myofascial pain clinic",
    place: "Brevard County, FL",
    title: "Four clicks a month to a hundred, and it stayed there.",
    meta: "Aug 2025 to Aug 2026 · white-label, clinic unnamed",
    headline: { value: "854", label: "clicks in 12 months" },
    metrics: [
      { label: "Clicks", value: "854", delta: "4 → 83/mo", tone: "up" },
      { label: "Impressions", value: "14,788", delta: "177 → 1,967/mo", tone: "up" },
      { label: "CTR", value: "5.77%", delta: "11.3% mobile", tone: "up" },
      { label: "Top-3 queries", value: "167", delta: "of 882" },
    ],
    body: [
      "The first full month of data on this property was four clicks. It now runs between 83 and 104 a month, and it has held that band for most of a year.",
      "This is what a small local practice should look like when the fundamentals are right. The intent is close-range and the therapist's name is a query in its own right: `carolyn hough` sits at position 2.4 with a 19.5% click-through rate. The category terms came next. `fascia release near me` converts at 25.2%. `myofascial release melbourne fl` sits at 1.8.",
      "415 separate \"near me\" variations now show this clinic. They're worth 179 clicks between them. That's the shape of local search: no single keyword carries you, a few hundred small ones do.",
    ],
    next: "Phones are carrying this: 678 of the 854 clicks at 11.3% CTR. Desktop is still sitting at 2%, which means there is a second clinic's worth of traffic in this account that nobody has gone and taken yet. That's the next six months, and it's the easy kind of work because the rankings are already there.",
    chart: "myofascial",
    chartTitle: "Clicks per month",
    chartRange: "Aug 2025 – Aug 2026",
    caption:
      "Source: Search Console, 16-month export. August 2026 is a partial month (data to the 27th).",
  },
  {
    slug: "roofing-contractor",
    index: "02",
    client: "Roofing contractor",
    place: "Brevard County, FL",
    title: "From page five to page two, on a thousand queries at once.",
    meta: "Oct 2025 – Aug 2026 vs the eleven months before · white-label, contractor unnamed",
    headline: { value: "×25.8", label: "impressions, year on year" },
    metrics: [
      { label: "Impressions", value: "139,639", delta: "×25.8", tone: "up" },
      { label: "Clicks", value: "266", delta: "×7.8", tone: "up" },
      { label: "Avg position", value: "14.9", delta: "from 47.9", tone: "up" },
      { label: "CTR", value: "0.19%", delta: "from 0.63%", tone: "down" },
    ],
    body: [
      "893 of the 1,099 searches this site now appears for did not return it at all a year ago. It wasn't ranking badly for them. It wasn't in the index for them.",
      "The work was unglamorous: title and meta rewrites across the whole site, service pages built per town instead of one page trying to cover the county, FAQ and service schema, and a set of long-form articles aimed at the questions Florida homeowners actually type after a storm. Then I waited, because that's the part nobody sells.",
      "The geographic terms are where it shows. `roofing melbourne fl` went from position 77 to 12.9. `roof replacement melbourne fl` from 70 to 15. Those are the searches that turn into a truck in a driveway.",
    ],
    next: "The hard part is done. This site now shows up 26 times more often than it did, which is the part that takes a year. Turning those impressions into clicks is a snippet problem, not a ranking problem, and it is already moving: last quarter's CTR is 0.24% against 0.17% the quarter before. Same site, same rankings, better titles.",
    chart: "roofing",
    chartTitle: "Average position · lower is better",
    chartRange: "Then → now",
    caption:
      "Source: Search Console, 1 Oct 2025 – 28 Aug 2026 compared with 28 Apr – 30 Sep 2025. The axis is inverted because in search, falling is winning.",
  },
  {
    slug: "tint-lordz",
    index: "03",
    client: "Tint Lordz Auto Spa",
    place: "Lawrence, MA",
    title: "The brand is locked. The category is still open.",
    meta: "Jul 2025 to Aug 2026 · direct client",
    headline: { value: "1.98", label: "avg position on brand" },
    metrics: [
      { label: "Impressions", value: "32,913", delta: "1,071 → 4,186/mo", tone: "up" },
      { label: "Clicks", value: "393", delta: "Aug: 25 → 42", tone: "up" },
      { label: "Brand position", value: "1.98", delta: "“tint lordz”", tone: "up" },
      { label: "Top-10 queries", value: "306", delta: "of 1,000" },
    ],
    body: [
      "When the data starts, this site was pulling about a thousand impressions a month. It now pulls three to four thousand, and every version of the shop's own name lands at position two or better.",
      "That matters more than it sounds. A tint shop lives on people who heard the name from a friend and half-remember it. `tint lordz auto spa lawrence` at position 1.9 with 11.2% CTR is a referral that completes instead of leaking to a competitor. `window tint lawrence ma` at 2.6 is the same job done for the map pack.",
      "August was the best month on record at 42 clicks, and the trend under it is impressions climbing steadily since January rather than one spike.",
    ],
    next: "`window tinting near me` already shows this shop 358 times a period and sits at 19. Getting that one phrase onto page one is worth more than everything else in the account combined, and it is a Google Business Profile and review-velocity job, not a rewrite. That is the plan, and the brand rankings mean we start from strength.",
    chart: "tint",
    chartTitle: "Impressions per month",
    chartRange: "Jul 2025 – Aug 2026",
    caption:
      "Source: Search Console, 16-month export. August 2026 is a partial month (data to the 27th).",
  },
  {
    slug: "over-the-table-top",
    index: "04",
    client: "Over The Table Top",
    place: "Charles County, MD",
    title: "614 keywords on page one, for a shop with one location.",
    meta: "Apr 2025 to Aug 2026 · direct client",
    headline: { value: "614", label: "keywords on page one" },
    metrics: [
      { label: "Clicks", value: "353", delta: "18 months" },
      { label: "Impressions", value: "14,175", delta: "412 → 993/mo", tone: "up" },
      { label: "Avg position", value: "19.7", delta: "from 24.2", tone: "up" },
      { label: "Top-3 queries", value: "149", delta: "of 1,000" },
    ],
    body: [
      "An independent board game and trading card shop, competing for the same searches as every big-box retailer and Google's own local pack. It now owns 614 keywords on page one.",
      "The queries are the ones that walk through a door. `board game stores near me` at 9.1. `local game stores near me` at 7.3. `pokemon cards near me` at 9.0, which is the phrase that brings a parent and a kid in on a Saturday. For a store this size that is the difference between a quiet weekend and a busy one.",
      "398 \"near me\" variants now surface this shop, up from a handful. Product schema is live on the inventory, and the custom woodwork page they nearly deleted quietly pulls its own traffic.",
    ],
    next: "Impressions more than doubled while clicks held, which for a shop this size means the visibility is bought and the conversion is the next lever. Better titles on the category pages and a real Google Business Profile push are worth more here than another hundred keywords, and both are cheap.",
    chart: "gameshop",
    chartTitle: "Clicks per month",
    chartRange: "Apr 2025 – Aug 2026",
    caption:
      "Source: Search Console, 16-month export. August 2026 is a partial month (data to the 27th).",
  },
  {
    slug: "marketing-agency",
    index: "05",
    client: "Marketing agency",
    place: "Palm Bay, FL",
    title: "830,000 impressions from a town of 130,000 people.",
    meta: "Apr 2025 to Aug 2026 · ongoing",
    headline: { value: "829K", label: "impressions in 18 months" },
    metrics: [
      { label: "Impressions", value: "829,797", delta: "18 months" },
      { label: "Clicks", value: "1,211", delta: "excl. spam event" },
      { label: "Avg position", value: "14.9", delta: "from 19.1", tone: "up" },
      { label: "Best money term", value: "7.0", delta: "“palm bay seo”" },
    ],
    body: [
      "Three articles about a town of 130,000 people now carry more than 155,000 impressions between them: what it costs to live in Palm Bay, how far it is to Orlando, whether Melbourne is safe. That is what owning a local topic looks like.",
      "It worked at what it was for. Average position across the property went from 19.1 to 14.9, the site owns a wide band of local informational search, and the service pages benefit from sitting on a domain Google has decided knows the area.",
      "The commercial terms follow behind: `palm bay seo` at position 7.0, `seo agency in florida` converting at 22.7%, `marketing agency near me` at 5.0.",
    ],
    next: "The informational content bought the domain its authority. Now it gets spent: `seo agency in florida` already converts at 22.7% and `palm bay seo` sits at 7.0, so the same effort pointed at four commercial pages and the Google Business Profile is worth more than another 87,000 impressions on a driving-time article.",
    chart: "agency",
    chartTitle: "Impressions by page · top 6",
    chartRange: "Informational vs commercial",
    caption:
      "Source: Search Console, 16-month export. Click-through rate shown against each bar.",
  },
];

/* ---- chart series, all straight from the exports ---- */

export const monthly = {
  myofascial: [
    ["Aug 25", 2], ["Sep", 4], ["Oct", 49], ["Nov", 59], ["Dec", 60], ["Jan 26", 74],
    ["Feb", 62], ["Mar", 72], ["Apr", 104], ["May", 96], ["Jun", 94], ["Jul", 95], ["Aug", 83],
  ] as [string, number][],
  tint: [
    ["Jul 25", 56], ["Aug", 1071], ["Sep", 868], ["Oct", 813], ["Nov", 1174], ["Dec", 1493],
    ["Jan 26", 2603], ["Feb", 2131], ["Mar", 2689], ["Apr", 3976], ["May", 3891], ["Jun", 4883],
    ["Jul", 4186], ["Aug", 3079],
  ] as [string, number][],
  gameshop: [
    ["Apr 25", 0], ["May", 21], ["Jun", 31], ["Jul", 22], ["Aug", 21], ["Sep", 11], ["Oct", 14],
    ["Nov", 41], ["Dec", 34], ["Jan 26", 23], ["Feb", 19], ["Mar", 18], ["Apr", 23], ["May", 16],
    ["Jun", 18], ["Jul", 13], ["Aug", 28],
  ] as [string, number][],
};

/** query, position a year ago, position now */
export const positionLadder: [string, number, number][] = [
  ["roofing melbourne fl", 77.0, 12.9],
  ["roof replacement melbourne fl", 70.0, 15.0],
  ["roofers in brevard county fl", 86.7, 28.5],
  ["roof repair melbourne fl", 51.0, 18.0],
  ["homepage, all queries", 54.2, 13.7],
];

/** page, impressions, ctr, kind */
export const agencyPages: [string, number, string, "info" | "comm"][] = [
  ["/how-far-is-palm-bay-from-orlando", 87354, "0.13%", "info"],
  ["/ (homepage)", 457705, "0.14%", "info"],
  ["/cost-of-living-in-palm-bay-fl", 35321, "0.34%", "info"],
  ["/is-melbourne-fl-safe", 32600, "0.33%", "info"],
  ["/melbourne-fl-digital-marketing", 30643, "2.86%", "comm"],
  ["/florida-real-estate-marketing-seo", 4961, "4.72%", "comm"],
];


/**
 * Monthly organic clicks by sector, Apr 2025 to Aug 2026, straight from the
 * per-property Chart.csv exports. July 2026 for Marketing is day-adjusted: a
 * single compromised day added 2,184 clicks that were never real traffic, so
 * they are excluded rather than left to distort the shape. The roofing
 * property has no continuous monthly series in the export set, so it is not a
 * band here; its numbers live on the work page.
 */
export const streamMonths = [
  "Apr 25", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  "Jan 26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
];

export type Sector = {
  key: string;
  label: string;
  clicks: number[];
  pageOne: number;
  note: string;
};

export const sectors: Sector[] = [
  {
    key: "marketing",
    label: "Marketing",
    clicks: [1, 23, 31, 43, 47, 56, 53, 81, 97, 77, 91, 120, 92, 93, 99, 129, 58],
    pageOne: 396,
    note: "Local informational content feeding an agency's service pages.",
  },
  {
    key: "wellness",
    label: "Wellness",
    clicks: [0, 0, 0, 0, 2, 4, 49, 59, 60, 74, 62, 72, 104, 96, 94, 95, 83],
    pageOne: 506,
    note: "A pain clinic that went from four clicks a month to a hundred.",
  },
  {
    key: "automotive",
    label: "Automotive",
    clicks: [0, 0, 0, 0, 25, 28, 35, 33, 28, 20, 20, 36, 32, 32, 25, 37, 42],
    pageOne: 306,
    note: "Every version of a tint shop's name at position two or better.",
  },
  {
    key: "retail",
    label: "Retail",
    clicks: [0, 21, 31, 22, 21, 11, 14, 41, 34, 23, 19, 18, 23, 16, 18, 13, 28],
    pageOne: 614,
    note: "An independent game shop owning the near-me searches in its county.",
  },
];
