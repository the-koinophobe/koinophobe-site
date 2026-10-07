import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Calculator,
  Check,
  FileText,
  GitCompareArrows,
  GitMerge,
  GitPullRequest,
  KeyRound,
  MailCheck,
  Map,
  MessageSquareText,
  ScanSearch,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Availability } from "@/components/Availability";
import { BookCta, BookNote, TextCta } from "@/components/Cta";
import { Faq, type FaqItem } from "@/components/Faq";
import { MobileCta } from "@/components/MobileCta";
import { RelatedNotes } from "@/components/RelatedNotes";
import { Reveal } from "@/components/Reveal";
import { StartSentence } from "@/components/StartSentence";
import { aggregate } from "@/lib/gsc";
import { startup } from "@/lib/pricing";

// Related notes appear on their publish date without a deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SaaS SEO and AI search for software startups",
  description:
    "Done-for-you SEO and AI visibility for software startups. One change shipped to your site every working day, up to 12 articles a month, and AI answer tracking across ChatGPT, Claude and Perplexity. $1,500 a month, first month refundable.",
  alternates: { canonical: "/saas-seo" },
};

const ASSISTANTS = ["Google", "ChatGPT", "Claude", "Perplexity", "Gemini", "Copilot", "Bing", "AI Overviews"];

/** Every figure here is from the September 11, 2026 citation study note. */
const STUDY = [
  {
    v: "2% to 12%",
    l: "of the pages assistants cited were also in Google's top ten for the same question.",
  },
  {
    v: "34% to 54%",
    l: "of the companies they cited were. They agree with Google on who, and pick a different page.",
  },
  {
    v: "41.6% vs 0%",
    l: "of cited pages carried Article markup, against pages that ranked and were never cited.",
  },
  {
    v: "4.5%",
    l: "of ChatGPT's cited pages came back in all three runs of the same question. AI Overviews kept 62.7%.",
  },
];

const CHECKS = [
  {
    icon: <ScanSearch size={20} aria-hidden />,
    t: "Can the crawlers get in?",
    b: "A robots.txt line, a Cloudflare bot setting or a page that stays blank until JavaScript runs can keep GPTBot, ClaudeBot and PerplexityBot out. It takes one request to check, so it's the first thing I look at.",
  },
  {
    icon: <Search size={20} aria-hidden />,
    t: "Do you rank for what buyers type?",
    b: "In my study, a third to half of the companies the assistants named were also in Google's top ten. Ranking for \"best tool for X\" and \"X alternatives\" puts you in the pool they pick from.",
  },
  {
    icon: <FileText size={20} aria-hidden />,
    t: "Is there a page worth quoting?",
    b: "Cited pages were guides, comparisons and roundups. Product and pricing pages ranked and got passed over. A homepage, a pricing page and a docs subdomain give an answer nothing to quote.",
  },
];

const WORK = [
  {
    icon: <Search size={20} aria-hidden />,
    t: "Research",
    b: "What your buyers type and ask, and who shows up for it today, on Google and in the AI answers.",
  },
  {
    icon: <Map size={20} aria-hidden />,
    t: "Keyword map",
    b: "Every page gets its own searches, so two of your pages never fight over one query.",
  },
  {
    icon: <FileText size={20} aria-hidden />,
    t: "In-depth articles",
    b: "Long guides written to beat the page that ranks now, with Article markup and a named author.",
  },
  {
    icon: <GitCompareArrows size={20} aria-hidden />,
    t: "Comparison pages",
    b: "\"You vs them\" and \"alternatives to\" pages. Head-to-head questions pulled the tightest sets of sources in my study, so these pages get read.",
  },
  {
    icon: <Calculator size={20} aria-hidden />,
    t: "Free tools",
    b: "A calculator, generator or checker your buyers would bookmark, when your category has room for one.",
  },
  {
    icon: <Wrench size={20} aria-hidden />,
    t: "Fixes to existing pages",
    b: "Titles, copy, speed, internal links and schema on the pages you already have. Fifty or more a month.",
  },
  {
    icon: <MessageSquareText size={20} aria-hidden />,
    t: "AI answer tracking",
    b: "A fixed set of buyer questions, asked across the assistants every month, so you see who gets named and whether it's you.",
  },
  {
    icon: <ScanSearch size={20} aria-hidden />,
    t: "Index checks",
    b: "Crawlers can reach, render and keep every page. Index requests go in for anything new.",
  },
  {
    icon: <BadgeCheck size={20} aria-hidden />,
    t: "Fact checks",
    b: "Prices, limits and feature claims kept current on your site and in the directories that quote you, so an assistant doesn't repeat last year's pricing.",
  },
];

const BEFORE = [
  {
    t: "Your category is new?",
    b: "If nobody searches your category's name yet, I'll say so on the call. The work then goes after searches that exist: the tool you replace, the integrations your customers already use, and your own name.",
  },
  {
    t: "No ranking promises.",
    b: "Nobody controls what Google or ChatGPT shows. You get the work in the plan every month and a report that says what it did.",
  },
  {
    t: "You own everything.",
    b: "Repo, CMS, Search Console, Analytics. If you cancel, every page and every account stays with you.",
  },
  {
    t: "Five seats.",
    b: "I write the code and the articles myself, and five is how many sites one person can ship a change to every working day.",
  },
];

const STEPS = [
  {
    icon: <MailCheck size={20} aria-hidden />,
    when: "Within one business day",
    t: "I write back",
    b: "I look at your site and your question, then reply with a yes and what I need, or an honest no.",
  },
  {
    icon: <KeyRound size={20} aria-hidden />,
    when: "The day you say yes",
    t: "You share access",
    b: "From a short checklist: your repo or CMS, Search Console and Analytics.",
  },
  {
    icon: <GitMerge size={20} aria-hidden />,
    when: "Every working day after",
    t: "Changes ship",
    b: "One a day, each one checked before it goes live. The report lands Monday morning.",
  },
];

/** The closing band's call bullets, written for a founder. */
const CALL = [
  "I check your robots.txt, your rendering and what the assistants say about your category before we talk.",
  "You get the first few changes I'd ship, in order.",
  "If it isn't a fit, I'll tell you that on the call.",
];

const SAAS_FAQ: FaqItem[] = [
  {
    q: "Can you guarantee ChatGPT will recommend us?",
    a: "No. Nobody can, and in my own test ChatGPT cited a different set of pages almost every time it was asked the same question. What I can do is make sure you can be read, that you rank, and that there's a page worth quoting, then track the answers every month so you see a trend instead of one screenshot.",
  },
  {
    q: "What is AI search visibility?",
    a: "Whether assistants like ChatGPT, Claude, Perplexity and Google's AI Overviews name your product, and link to you, when a buyer asks them for a tool like yours. It depends on whether their crawlers can read your site, whether you rank for the same questions on Google, and whether you have pages they choose to cite.",
  },
  {
    q: "Do you need access to our codebase?",
    a: "If your marketing site lives in a repo, yes. I work on a branch and open pull requests, and nothing merges without the review you want. On Webflow, Framer or WordPress I work in the CMS. Your product app stays untouched.",
  },
  {
    q: "Who writes the articles?",
    a: "I do, from research into what your buyers ask. Anything that makes a claim about your product goes to you before it publishes, unless you tell me to skip that step.",
  },
  {
    q: "How does the refund work?",
    a: "If the first month isn't worth $1,500 to you, ask within 7 days of it ending and you get the $1,500 back. Everything shipped that month stays live. After that it's month to month, with 30 days' notice to cancel.",
  },
  {
    q: "What's in the Monday report?",
    a: "What shipped last week, clicks and rankings from Search Console, what the assistants said for your tracked questions, and what I'm shipping next.",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO and AI search for software startups",
  serviceType: "Search engine optimization and AI search visibility",
  url: "https://koinophobe.com/saas-seo",
  provider: { "@id": "https://koinophobe.com/#organization" },
  areaServed: { "@type": "Country", name: "United States" },
  audience: { "@type": "BusinessAudience", name: "Software startups" },
  offers: {
    "@type": "Offer",
    name: startup.name,
    description: startup.items.join(". "),
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "USD",
      price: startup.amount,
      unitCode: "MON",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
    seller: { "@id": "https://koinophobe.com/#organization" },
  },
};

/** The hero visual: what a day's change looks like when it reaches you. */
function PullRequestCard() {
  return (
    <div className="card overflow-hidden shadow-float">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand-soft text-brand">
          <GitPullRequest size={16} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium">Add YourApp vs Acme comparison page</p>
          <p className="truncate font-mono text-[12px] text-muted">seo/compare-acme &rarr; main &middot; ready for review</p>
        </div>
      </div>
      <div className="space-y-1 bg-surface px-5 py-4 font-mono text-[12px] leading-relaxed sm:text-[12.5px]">
        <p className="truncate text-[#b42318] dark:text-[#f97066]">- &lt;title&gt;Compare | YourApp&lt;/title&gt;</p>
        <p className="truncate text-brand">+ &lt;title&gt;YourApp vs Acme: pricing, limits, setup&lt;/title&gt;</p>
        <p className="truncate text-brand">+ &quot;@type&quot;: &quot;Article&quot;,</p>
        <p className="truncate text-brand">+ &quot;author&quot;: &#123; &quot;name&quot;: &quot;Your founder&quot; &#125;,</p>
        <p className="truncate text-brand">+ &lt;a href=&quot;/alternatives/acme&quot;&gt;</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-5 py-3.5 text-[12.5px] text-muted">
        {["Build passed", "Links checked", "Indexable"].map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5">
            <Check size={14} aria-hidden className="text-brand" />
            {c}
          </span>
        ))}
        <span className="ml-auto font-mono">+214 &minus;6</span>
      </div>
    </div>
  );
}

export default function SaasSeoPage() {
  const seatsLine =
    startup.seatsOpen > 0
      ? `${startup.seatsOpen} of ${startup.seats} seats open`
      : "All seats taken, ask to join the waitlist";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-pad relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pb-24">
          <Reveal>
            <p className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              SEO and AI search for software startups
            </p>
            <h1 className="t-h1 mt-6 max-w-[18ch]">
              For software founders whose buyers ask ChatGPT and hear about{" "}
              <span className="text-brand">a competitor</span>.
            </h1>
            <p className="t-lead mt-6 max-w-[58ch]">
              I&rsquo;m Michael Edward, a developer who does SEO. Every working day I ship one change to your
              site, usually as a pull request you can read before it merges. The goal is two things: ranking
              on Google for what your buyers search, and getting named when they ask ChatGPT, Claude,
              Perplexity or Google&rsquo;s AI Overviews.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="saas_hero" />
              <a href="#start" data-track="cta_link" data-from="saas_hero" className="btn btn-lg btn-secondary">
                Start with one sentence
              </a>
            </div>
            <p className="mt-4 text-[13.5px] text-muted">
              {startup.price} a month &middot; first month refundable &middot; {seatsLine}
            </p>
          </Reveal>

          <div className="relative mx-auto w-full max-w-[540px] pb-36 lg:mx-0">
            <div className="float-in" style={{ animationDelay: "0.15s" }}>
              <PullRequestCard />
            </div>
            <div
              className="float-card float-in bottom-0 right-0 w-[250px] p-4 sm:right-[-6%]"
              style={{ animationDelay: "0.45s" }}
            >
              <p className="font-mono text-[12px] text-muted">Cited by AI and ranked on Google</p>
              <p className="mt-2 font-display text-[1.65rem] leading-none tracking-tight">2% to 12%</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-muted">
                of cited pages, from my 96-run citation study
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where it shows up ───────────────────────────────────── */}
      <section className="border-y border-line">
        <div className="container-pad flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-8">
          <p className="eyebrow-flat flex-none">Where your buyers ask</p>
          <ul className="flex flex-wrap gap-2">
            {ASSISTANTS.map((a) => (
              <li key={a} className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-[14px]">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Why you're missing ──────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Why you&rsquo;re missing from the answer</p>
            <h2 className="t-h2 mt-5">An assistant can only name you if it can read you first</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              Three things have to be true before ChatGPT recommends a product. Most startup sites I check
              fail at least one of them, and the first is usually a setting nobody chose on purpose.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 md:grid-cols-3">
            {CHECKS.map((c) => (
              <div key={c.t} className="card p-7">
                <span className="icon-tile">{c.icon}</span>
                <h3 className="t-h3 mt-5">{c.t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The study ───────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">What I measured</p>
            <h2 className="t-h2 mt-5 max-w-[20ch]">I ran 96 AI searches in a software category and checked what got cited</h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              On September 11, 2026 I asked ChatGPT, Claude, Perplexity and Google AI Overviews twelve buyer
              questions about web scraping APIs. I recorded every page they cited, then measured those pages
              against the ones Google ranked for the same questions.
            </p>
            <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-muted">
              That&rsquo;s why the plan leans on articles and comparison pages, puts Article markup where it
              belongs, and re-asks the questions every month. One category, one evening, small samples: the
              study says so too.
            </p>
            <TextCta href="/notes/ai-cited-vs-ranked-page" label="Read the study" from="saas_study" className="mt-7" />
          </Reveal>
          <div data-anim="cards" className="grid content-start gap-4 self-center sm:grid-cols-2">
            {STUDY.map((s) => (
              <div key={s.v} className="card p-6 sm:p-7">
                <p className="tnum font-display text-[clamp(1.9rem,3.4vw,2.5rem)] leading-none tracking-tight text-brand">
                  {s.v}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The work ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Every working day</p>
            <h2 className="t-h2 mt-5">One change a day, picked by what it&rsquo;s most likely to move</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              Each morning I pick the change with the best odds of moving your search or AI traffic, make it,
              check it and ship it. You see every one.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((w) => (
              <div key={w.t} className="card p-7">
                <span className="icon-tile">{w.icon}</span>
                <h3 className="t-h3 mt-5">{w.t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{w.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[15.5px] text-muted">
            Also in the plan: directory listings, link outreach, and a Monday report on what moved.
          </p>
        </div>
      </section>

      {/* ── Who does it ─────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="hero-photo mx-auto aspect-[4/5] w-full max-w-[400px] lg:mx-0">
              <Image
                src="/me/michael-edward.webp"
                alt="Michael Edward, the developer behind Koinophobe"
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Who does the work</p>
            <h2 className="t-h2 mt-5 max-w-[20ch]">A developer, so the fix arrives as code</h2>
            <p className="t-lead mt-5 max-w-[58ch]">
              Most SEO shows up as a forty-page audit your engineers never get to. I write the change myself,
              in your repo or your CMS, and open it for review. Next.js, Astro, Webflow, Framer and WordPress
              are all fine.
            </p>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-muted">
              On July 8, 2026 one client site logged 2,184 Search Console clicks in a day against a median of
              4. I traced it to gambling spam cloaked onto real pages through AMP URLs the business never
              built, and took 2,164 clicks out of my own reported numbers. Your Monday report gets the same
              treatment.
            </p>
            <div className="mt-8 grid max-w-[520px] grid-cols-2 gap-4 border-t border-line pt-7">
              <div>
                <p className="tnum font-display text-[2rem] leading-none tracking-tight">{aggregate.sitesWorked}+</p>
                <p className="mt-2 text-[14px] text-muted">sites over two years</p>
              </div>
              <div>
                <p className="tnum font-display text-[2rem] leading-none tracking-tight">
                  {aggregate.impressions.toLocaleString("en-US")}
                </p>
                <p className="mt-2 text-[14px] text-muted">
                  impressions across the {aggregate.properties} properties I have exports for
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-[58ch] text-[14.5px] text-muted">
              My Search Console numbers so far come from local businesses, all on the{" "}
              <Link href="/work" className="text-ink underline underline-offset-4">
                work page
              </Link>{" "}
              with the accounts open. The AI numbers come from the study above.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The plan ────────────────────────────────────────────── */}
      <section id="plan" className="section scroll-mt-24">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">The plan</p>
            <h2 className="t-h2 mt-5">One plan, one price, no setup fee</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="card flex flex-col gap-6 border-ink/60 p-7 shadow-float sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] font-medium text-muted">{startup.kicker}</span>
                <span className="eyebrow !text-[12px]">{seatsLine}</span>
              </div>
              <div>
                <h3 className="t-h3 !text-[1.6rem]">{startup.name}</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="tnum font-display text-[3rem] leading-none tracking-tight">{startup.price}</span>
                  <span className="text-[15px] text-muted">{startup.unit}</span>
                </p>
              </div>
              <div className="border-t border-line pt-6">
                <p className="text-[14px] font-medium text-muted">Every month:</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {startup.items.map((it) => (
                    <li key={it} className="grid grid-cols-[18px_1fr] gap-2.5 text-[15.5px]">
                      <Check size={16} aria-hidden className="mt-1 text-brand" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 rounded-2xl bg-cream p-5 text-ink">
                <ShieldCheck size={20} aria-hidden className="mt-0.5 flex-none text-brand" />
                <p className="text-[15px] leading-relaxed">
                  <span className="font-medium">{startup.guarantee}</span> {startup.terms}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <BookCta from="saas_plan" size="md" />
                <a href="#start" data-track="cta_link" data-from="saas_plan" className="btn btn-md btn-secondary">
                  Start with one sentence
                </a>
              </div>
            </div>

            <Reveal delay={0.1}>
              <p className="eyebrow">Before you book</p>
              <div className="mt-6 border-t border-line">
                {BEFORE.map((x) => (
                  <div key={x.t} className="border-b border-line py-5">
                    <p className="text-[16.5px] font-medium">{x.t}</p>
                    <p className="mt-1.5 max-w-[52ch] text-[15px] leading-relaxed text-muted">{x.b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[14.5px] text-muted">
                Run a home service business instead? Those plans are on the{" "}
                <Link href="/pricing" className="text-ink underline underline-offset-4">
                  pricing page
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Start ───────────────────────────────────────────────── */}
      <section id="start" className="section section-tint scroll-mt-24">
        <div className="container-pad">
          <div className="card bg-bg p-7 sm:p-10 lg:p-14">
            <p className="eyebrow">Start</p>
            <h2 className="t-h2 mt-5">Start with one sentence</h2>
            <p className="mt-3 max-w-[56ch] text-[16px] text-muted">
              Fill in the blanks. It takes about a minute and opens an email to me with your answer in it.
            </p>
            <div className="mt-10 max-w-[62rem]">
              <StartSentence />
            </div>
            <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.t}>
                  <span className="icon-tile">{s.icon}</span>
                  <p className="mt-5 font-mono text-[12.5px] text-muted">{s.when}</p>
                  <p className="mt-1.5 text-[17px] font-medium">{s.t}</p>
                  <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-muted">{s.b}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-3 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[16px] font-medium">Rather talk it through first?</p>
              <div>
                <BookCta from="saas_start" size="md" label="Book 20 minutes" />
                <BookNote className="mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq items={SAAS_FAQ} title="Questions founders ask first" className="section" />

      <RelatedNotes
        title="AI search notes"
        slugs={[
          "ai-cited-vs-ranked-page",
          "ai-search-local-business",
          "website-migration-without-losing-rankings",
          "zero-click-rankings-title-tags",
          "contractor-website-not-showing-on-google",
        ]}
      />

      <Availability call={CALL} />
      <MobileCta />
    </>
  );
}
