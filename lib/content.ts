export const services = {
  agencies: {
    kicker: "For agencies",
    title: "White-label SEO and tracking, under your brand",
    body:
      "Hand off the SEO and the measurement. I rank your clients for buyers, wire up the tracking, and report in numbers you can put in front of them.",
    points: [
      "Technical and on-page SEO",
      "GA4, GTM and Search Console setup",
      "Call and form conversion tracking",
      "Keyword and competitor research",
      "Monthly reporting tied to leads, not rankings",
      "Local and AI-search visibility",
    ],
    cta: "Talk about overflow capacity",
  },
  businesses: {
    kicker: "For businesses",
    title: "Get found by buyers, and see the proof",
    body:
      "You do not need to understand SEO. You need more calls, and proof they came from search. I deliver both, with tracking on every lead.",
    points: [
      "Local SEO and Google visibility",
      "Tracking on every call and form",
      "Plain-English reporting you can trust",
      "Faster pages that hold rankings",
      "A clear line from search to revenue",
    ],
    cta: "Get more leads from search",
  },
};

// Edit prices to real figures when ready. Labels (One-off/Monthly/Custom) are
// honest placeholders so nothing is invented.
export const packages = [
  {
    name: "SEO Audit & Roadmap",
    price: "One-off",
    tagline: "Know exactly what's holding your site back.",
    features: [
      "Technical and on-page audit",
      "Conversion tracking review",
      "Prioritised fix list",
      "90-minute walkthrough call",
    ],
    cta: "Request an audit",
    highlight: false,
  },
  {
    name: "Growth Retainer",
    price: "Monthly",
    tagline: "Ongoing SEO and tracking that compounds.",
    features: [
      "Everything in the audit",
      "Ongoing technical and on-page SEO",
      "GA4 / GTM and conversion tracking",
      "Content and local SEO",
      "Monthly reporting tied to leads",
    ],
    cta: "Start a retainer",
    highlight: true,
  },
  {
    name: "White-label",
    price: "Custom",
    tagline: "I plug into your agency, under your brand.",
    features: [
      "Flexible capacity",
      "Your brand, your client relationships",
      "SEO, builds and tracking",
      "Reporting your clients can read",
      "No long onboarding",
    ],
    cta: "Talk capacity",
    highlight: false,
  },
];

export const aiPoints = [
  {
    icon: "ScanSearch",
    title: "Show up in AI answers",
    body: "When people ask ChatGPT, Gemini or Google's AI for a recommendation, your business should be in the reply. I optimise for answer engines, not just blue links.",
  },
  {
    icon: "Sparkles",
    title: "Content at the speed of search",
    body: "AI-assisted research and drafting to publish more of the pages buyers actually search for, without dropping quality or accuracy.",
  },
  {
    icon: "LineChart",
    title: "Sharper insight from your data",
    body: "I use AI to read your analytics faster, spot what's converting, and turn it into clear next steps.",
  },
  {
    icon: "Bot",
    title: "AI on your site",
    body: "Chat and lead capture that answers visitor questions and books work around the clock, wired into your tracking.",
  },
];

export const capabilities = [
  {
    title: "Technical & on-page SEO",
    body: "Audits, crawl and indexing fixes, and on-page work that targets people ready to buy, not just traffic.",
  },
  {
    title: "Conversion tracking",
    body: "GA4, GTM, plus call and form tracking, so every action is measured and nothing is a guess.",
  },
  {
    title: "Analytics & reporting",
    body: "Dashboards and monthly reports that tie rankings to leads and revenue.",
  },
  {
    title: "Local & AI search",
    body: "Show up in maps and AI answers where local buyers actually look.",
  },
];

export const process = [
  {
    step: "01",
    title: "Rank for buyers",
    body: "Keyword and technical work aimed at search intent that converts, not vanity traffic.",
    image: "/process/rank.webp",
    hint: "SERP / keyword research",
  },
  {
    step: "02",
    title: "Track everything",
    body: "GA4, GTM and call/form tracking wired to every meaningful action on the site.",
    image: "/process/track.webp",
    hint: "GA4 / GTM dashboard",
  },
  {
    step: "03",
    title: "Prove it converts",
    body: "Monthly reporting that connects search performance to real leads and revenue.",
    image: "/process/prove.webp",
    hint: "Search Console / report",
  },
];

// Real numbers used in the hero results panel (myofascial client, 6-month compare).
export const resultsPanel = {
  label: "Client results, last 6 months",
  rows: [
    { metric: "Organic clicks", from: "158", to: "501", delta: "+217%" },
    { metric: "Impressions", from: "2.2K", to: "8.7K", delta: "+297%" },
    { metric: "Avg. CTR", from: "—", to: "6.1%", delta: "peak" },
  ],
  // simple upward sparkline (0-100 scale)
  spark: [8, 12, 10, 18, 16, 24, 22, 30, 28, 38, 44, 52, 60, 58, 72, 86],
};

export type Review = {
  quote: string;
  name: string;
  role: string;
};

export const reviews: Review[] = [
  {
    quote:
      "Michael did a wonderful job. Everything went smoothly, communication was fluent, on time and as expected. I highly recommend working with Michael.",
    name: "Mehdi D.",
    role: "Iteration X",
  },
  {
    quote:
      "Michael handles the build and technical side for my agency's clients, and he's the one I trust to just get it done. Fast, reliable, and he keeps the quality tight across a lot of sites. We've come a long way working together.",
    name: "Brian Reid",
    role: "Founder, Palm Bay Marketing SEO",
  },
  {
    quote:
      "He's been on top of things, not only what I asked, but also outside the scope.",
    name: "Daniel Folks",
    role: "Owner, Over The Table Top",
  },
  {
    quote:
      "Best to work with, will hire all the time. Straight forward, doesn't waste time. If he can't do something he'll tell you.",
    name: "Johnny Urena",
    role: "via Upwork",
  },
  {
    quote:
      "This was not an easy job. It required a lot of research and hard work, and I really appreciate the end result. He was good in communication and skilled.",
    name: "Elmer Blackburn",
    role: "via Upwork",
  },
  {
    quote: "Good guy to work with. Attention to detail.",
    name: "TintLordz Auto Spa",
    role: "via Upwork",
  },
];

export const faqs = [
  {
    q: "Do you work white-label under my agency's brand?",
    a: "Yes. Most of my work is white-label. I stay invisible to your clients, hit your timelines, and report back to you however you prefer.",
  },
  {
    q: "What does 'tie SEO to revenue' actually mean?",
    a: "I set up GA4, Google Tag Manager and Search Console with conversion tracking, so you can see the line from the work I do to real form fills and phone calls, not just ranking positions.",
  },
  {
    q: "Do you build websites too?",
    a: "Yes, but the website is the means, not the product. I build and optimise sites (mostly WordPress, with a full-stack background for custom work) so they rank and convert. The goal is always measurable leads.",
  },
  {
    q: "What tools do you track with?",
    a: "GA4, Google Tag Manager, Google Search Console, plus call and form tracking. I report with dashboards that connect search to leads.",
  },
  {
    q: "How fast can you start?",
    a: "Quickly. No long onboarding. Send me the work and access, and I slot in. I am used to carrying several live sites at once without dropping detail.",
  },
  {
    q: "Where are you based and what hours do you keep?",
    a: "I work remotely on US hours with full overlap to Eastern and Central time.",
  },
  {
    q: "How do you price?",
    a: "Project rates for one-off builds and audits, monthly retainers for ongoing SEO and site care. Tell me the scope and I will give you a clear number.",
  },
];

export type Project = {
  name: string;
  category: string;
  url: string;
  image: string; // poster, e.g. /work/<slug>.webp
  video?: string; // optional looping preview, e.g. /work/<slug>.mp4 (plays on hover)
};

// Sites built/managed. Snapshots + screen-record previews live in public/work/.
export const projects: Project[] = [
  {
    name: "Over The Table Top",
    category: "Custom woodworking shop",
    url: "https://overthetabletop.shop/",
    image: "/work/overthetabletop.webp",
    video: "/work/overthetabletop.mp4",
  },
  {
    name: "Myofascial Pain Brevard",
    category: "Therapy clinic",
    url: "https://myofascialpainbrevard.com/",
    image: "/work/myofascial.webp",
    video: "/work/myofascial.mp4",
  },
  {
    name: "Tintlordz Auto Spa",
    category: "Window tint",
    url: "https://tintlordzautospa.com/",
    image: "/work/tintlordz.webp",
    video: "/work/tintlordz.mp4",
  },
  {
    name: "HH Roofing & Repairs",
    category: "Roofing",
    url: "https://hhroofingandrepairs.com/",
    image: "/work/hhroofing.webp",
    video: "/work/hhroofing.mp4",
  },
  {
    name: "Palm Bay Marketing SEO",
    category: "Marketing agency",
    url: "https://palmbaymarketingseo.com/",
    image: "/work/pbseo.webp",
    video: "/work/pbseo.mp4",
  },
  {
    name: "Krupption / Brevard Pool Deck Repair",
    category: "Pool deck repair",
    url: "https://brevardpooldeckrepair.com/",
    image: "/work/krupption.webp",
    video: "/work/krupption.mp4",
  },
  {
    name: "Atlanta Mobile Detail",
    category: "Auto detailing",
    url: "https://atlantamobiledetail.co/",
    image: "/work/atlantamobiledetail.webp",
    video: "/work/atlantamobiledetail.mp4",
  },
  {
    name: "Titusville Homes For Sale",
    category: "Real estate",
    url: "https://titusvillehomesforsale.com/",
    image: "/work/titusville.webp",
    video: "/work/titusville.mp4",
  },
  {
    name: "Pro Star Lawn Service",
    category: "Lawn & landscaping",
    url: "https://prostarlawnservice.com/",
    image: "/work/prostar.webp",
    video: "/work/prostar.mp4",
  },
  {
    name: "Roof It Brevard",
    category: "Roofing",
    url: "https://roofitbrevard.com/",
    image: "/work/roofit.webp",
  },
  {
    name: "Cocoa Beach Myofascial Release",
    category: "Myofascial release",
    url: "https://cocoabeachmyofascialrelease.com/",
    image: "/work/cocoa.webp",
    video: "/work/cocoa.mp4",
  },
  {
    name: "Brevard Hurricane Protection",
    category: "Hurricane protection",
    url: "https://brevardhurricaneprotection.com/",
    image: "/work/bhp.webp",
    video: "/work/bhp.mp4",
  },
  {
    name: "The Dream Property",
    category: "Real estate",
    url: "https://thedreamproperty.com/",
    image: "/work/dreamproperty.webp",
    video: "/work/dreamproperty.mp4",
  },
  {
    name: "Melbourne Roof Repair",
    category: "Roofing",
    url: "https://melbourneroofrepairs.com/",
    image: "/work/melbourne-roof.webp",
    video: "/work/melbourne-roof.mp4",
  },
  {
    name: "Lumagrid Solar",
    category: "Solar",
    url: "https://www.lumagridsolar.com/",
    image: "/work/lumagrid.webp",
    video: "/work/lumagrid.mp4",
  },
];

export type CaseStudy = {
  industry: string;
  problem: string;
  work: string;
  result: string;
  slug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    industry: "Roofing (local service)",
    problem: "Low local visibility and a site that did not turn searchers into calls.",
    work: "Built location pages, fixed technical SEO, and set up conversion tracking.",
    result: "Reached top-3 local and AI-search visibility for priority keywords (confirmed in Semrush).",
  },
  {
    industry: "Multi-client agency portfolio",
    problem: "An agency needed reliable technical execution across many client sites.",
    work: "Managed 20+ WordPress sites: audits, migrations, GA4/GTM tracking and ongoing care.",
    result: "Drove ~787K search impressions and ~2,350 organic clicks across the portfolio in 12 months.",
  },
  {
    industry: "Wellness clinic (local)",
    problem: "A local therapy practice had thin organic visibility and few enquiries from search.",
    work: "Content, on-page SEO and clean technical foundations, tracked in Search Console.",
    result: "Tripled organic clicks (158 → 501) and nearly 4x'd impressions (2.2K → 8.7K) in 6 months.",
    slug: "wellness-clinic",
  },
  {
    industry: "Performance & Core Web Vitals",
    problem: "Client sites loaded slowly on mobile, hurting rankings and conversions.",
    work: "Optimised images, scripts and delivery; tuned Core Web Vitals.",
    result: "Lifted mobile PageSpeed from sub-40 into the 70s.",
  },
];
