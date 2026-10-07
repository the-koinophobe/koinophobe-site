import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarClock,
  Check,
  FileText,
  GitMerge,
  GitPullRequest,
  Gauge,
  PhoneCall,
  RefreshCw,
  ScanSearch,
  Search,
  Wrench,
} from "lucide-react";
import { AiCheck } from "@/components/AiCheck";
import { Availability } from "@/components/Availability";
import { BookCta, BookNote, TextCta } from "@/components/Cta";
import { Faq, type FaqItem } from "@/components/Faq";
import { MobileCta } from "@/components/MobileCta";
import { RelatedNotes } from "@/components/RelatedNotes";
import { Reveal } from "@/components/Reveal";
import { aggregate } from "@/lib/gsc";
import { startup } from "@/lib/pricing";

// Related notes appear on their publish date without a deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SaaS SEO and AI search for software startups",
  description:
    "SEO and AI search for software startups, run like a measurement study: your buyer questions tracked across ChatGPT, Claude, Perplexity and AI Overviews, fixes shipped as pull requests, 12 articles a month. $1,000 a month, no contract.",
  alternates: { canonical: "/saas-seo" },
};

/** Notes this page leans on. Linked inline and in the reading row. */
const N = {
  study: "/notes/ai-cited-vs-ranked-page",
  crawlers: "/notes/ai-crawlers-robots-txt",
  compare: "/notes/saas-comparison-pages",
  tracking: "/notes/track-ai-search-visibility",
};

/** The channels the study measured, and the plan tracks. */
const MEASURED = ["ChatGPT", "Claude", "Perplexity", "Google AI Overviews"];

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
    b: "A robots.txt line, a Cloudflare bot setting or a page that stays blank until JavaScript runs can keep OAI-SearchBot, Claude-SearchBot and PerplexityBot out.",
    link: { href: N.crawlers, label: "Which crawlers matter" },
  },
  {
    icon: <Search size={20} aria-hidden />,
    t: "Do you rank for what buyers type?",
    b: "In my study, a third to half of the companies the assistants named were also in Google's top ten. Ranking puts you in the pool they pick from.",
    link: { href: N.study, label: "The overlap numbers" },
  },
  {
    icon: <FileText size={20} aria-hidden />,
    t: "Is there a page worth quoting?",
    b: "Cited pages were guides, comparisons and roundups. Product and pricing pages ranked and got passed over, so a homepage and a pricing page give an answer nothing to quote.",
    link: { href: N.compare, label: "Pages that get cited" },
  },
];

const LOOP = [
  {
    icon: <Gauge size={20} aria-hidden />,
    t: "Measure",
    b: "Your buyer questions, frozen, asked across four assistants three times each, with every cited source logged. Three runs because one ChatGPT answer tells you almost nothing.",
    link: { href: N.tracking, label: "How the tracking works" },
  },
  {
    icon: <Wrench size={20} aria-hidden />,
    t: "Fix",
    b: "50+ fixes a month on pages you already have: crawler access, text that only appears after JavaScript, Article markup, titles, internal links. Each one a pull request.",
    link: { href: N.crawlers, label: "The crawler side" },
  },
  {
    icon: <FileText size={20} aria-hidden />,
    t: "Publish",
    b: "12 in-depth articles a month, comparison and alternatives pages included, plus a free tool when your category has room for one.",
    link: { href: N.compare, label: "How I build comparison pages" },
  },
  {
    icon: <RefreshCw size={20} aria-hidden />,
    t: "Measure again",
    b: "Same questions, same method, at month end. You see which of your pages got cited, by which assistant, against last month.",
    link: { href: N.study, label: "The method" },
  },
];

const BEFORE = [
  {
    t: "Your category is new?",
    b: "If nobody searches your category's name yet, I'll say so on the call. The work then goes after searches that exist: the tool you replace, the integrations your customers already use, and your own name.",
  },
  {
    t: "No ranking promises.",
    b: "Nobody controls what Google or ChatGPT shows. You get the work in the plan every month and a report that says what it did, with its limits stated.",
  },
  {
    t: "You own everything.",
    b: "Repo, CMS, Search Console, Analytics, the tracking sheet. If you cancel, every page and every account stays with you.",
  },
  {
    t: "Five seats.",
    b: "I write the code and the articles myself, and five is as many sites as one person can run this loop for each month.",
  },
];

const START = [
  {
    icon: <ScanSearch size={20} aria-hidden />,
    t: "Run the check",
    b: "The crawler check above, or email me your domain. Either way I look at the site before we talk.",
  },
  {
    icon: <PhoneCall size={20} aria-hidden />,
    t: "20-minute call",
    b: "I bring your crawler result and what the four assistants say about your category today. You bring the questions your buyers ask.",
  },
  {
    icon: <GitMerge size={20} aria-hidden />,
    t: "First pull request",
    b: "Within two working days of getting access, usually the crawler and rendering fixes, since everything else depends on them.",
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
    a: "No. Nobody can, and in my own test ChatGPT cited a different set of pages almost every time it was asked the same question. What I can do is make sure crawlers can read you, that you rank, and that there's a page worth quoting, then measure the answers with repeated runs so you see a trend instead of one screenshot.",
  },
  {
    q: "What is AI search visibility?",
    a: "Whether assistants like ChatGPT, Claude, Perplexity and Google's AI Overviews name your product, and link to you, when a buyer asks them for a tool like yours. It depends on whether their crawlers can read your site, whether you rank for the same questions on Google, and whether you have pages they choose to cite.",
  },
  {
    q: "How is this different from other AI visibility services?",
    a: "The tracking uses the method from my published citation study: frozen questions, repeated runs, and Google's results as a control, with the limits written down. The fixes arrive as code in your repo. And the price is on this page.",
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
    q: "What if we're not happy with the work?",
    a: "Tell me and we stop 30 days later. There's no contract and no minimum term, and every page, pull request and account stays yours.",
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

/** The hero visual: what a change looks like when it reaches you. */
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

function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="link-arrow mt-4 inline-flex text-[14.5px]">
      {label} &rarr;
    </Link>
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
              I&rsquo;m Michael Edward, a developer who does SEO. I measure what ChatGPT, Claude, Perplexity and
              Google&rsquo;s AI Overviews say when your buyers ask, then fix and write until your pages are the
              ones they cite. Every change reaches you as a pull request you can read before it merges.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="saas_hero" />
              <a href="#check" data-track="cta_link" data-from="saas_hero" className="btn btn-lg btn-secondary">
                <ScanSearch size={18} aria-hidden />
                Check your site free
              </a>
            </div>
            <p className="mt-4 text-[13.5px] text-muted">
              {startup.price} a month &middot; no contract &middot; {seatsLine}
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

      {/* ── What gets measured ──────────────────────────────────── */}
      <section className="border-y border-line">
        <div className="container-pad flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-8">
          <p className="eyebrow-flat flex-none">What I measure</p>
          <ul className="flex flex-wrap gap-2">
            {MEASURED.map((a) => (
              <li key={a} className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-[14px]">
                {a}
              </li>
            ))}
            <li className="rounded-full border border-dashed border-line px-3.5 py-1.5 text-[14px] text-muted">
              Google organic, as the control
            </li>
          </ul>
        </div>
      </section>

      {/* ── The check ───────────────────────────────────────────── */}
      <section id="check" className="section scroll-mt-24">
        <div className="container-pad">
          <div className="card p-7 sm:p-10 lg:p-12">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Free check</p>
              <h2 className="t-h2 mt-5">Can AI crawlers read your site?</h2>
              <p className="t-lead mt-4 max-w-[60ch]">
                Type your domain. I read your robots.txt for ten search and AI crawlers, then look at your
                homepage the way a crawler that doesn&rsquo;t run JavaScript sees it. Ten seconds, nothing
                stored.
              </p>
            </Reveal>
            <div className="mt-9">
              <AiCheck />
            </div>
            <p className="mt-8 text-[14.5px] text-muted">
              What each crawler does and what I&rsquo;d set:{" "}
              <Link href={N.crawlers} className="text-ink underline underline-offset-4">
                AI crawlers and robots.txt
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── Why you're missing ──────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Why you&rsquo;re missing from the answer</p>
            <h2 className="t-h2 mt-5">An assistant can only name you if it can read you first</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              Three things have to be true before ChatGPT recommends a product. Most startup sites I check fail
              at least one of them, and the first is usually a setting nobody chose on purpose.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 md:grid-cols-3">
            {CHECKS.map((c) => (
              <div key={c.t} className="card flex flex-col p-7">
                <span className="icon-tile">{c.icon}</span>
                <h3 className="t-h3 mt-5">{c.t}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{c.b}</p>
                <CardLink {...c.link} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The study ───────────────────────────────────────────── */}
      <section className="section">
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
              The plan below is that study, pointed at your category every month. One category, one evening,
              small samples: the study says so too.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <TextCta href={N.study} label="Read the study" from="saas_study" />
              <TextCta href={N.tracking} label="Track it yourself" from="saas_study" />
            </div>
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

      {/* ── The loop ────────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How a month runs</p>
            <h2 className="t-h2 mt-5">Measure, fix, publish, measure again</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              The same loop every month, so the report compares like with like and you can tell what the work
              did.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LOOP.map((w) => (
              <div key={w.t} className="card flex flex-col p-7">
                <span className="icon-tile">{w.icon}</span>
                <h3 className="t-h3 mt-5">{w.t}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{w.b}</p>
                <CardLink {...w.link} />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[70ch] text-[15.5px] text-muted">
            Every Friday you get a changelog: each pull request merged that week, with a line on why. The
            citation report lands at month end.
          </p>
        </div>
      </section>

      {/* ── Who does it ─────────────────────────────────────────── */}
      <section className="section">
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
              built, and took 2,164 clicks out of my own reported numbers. Your citation report gets the same
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
              with the accounts open. The AI numbers come from{" "}
              <Link href={N.study} className="text-ink underline underline-offset-4">
                the study
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The plan ────────────────────────────────────────────── */}
      <section id="plan" className="section section-tint scroll-mt-24">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">The plan</p>
            <h2 className="t-h2 mt-5">{startup.price} a month. Five seats.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="card flex flex-col gap-6 border-ink/60 bg-bg p-7 shadow-float sm:p-9">
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
                {startup.extras.map((x) => (
                  <p key={x} className="mt-3 pl-[28px] text-[14.5px] text-muted">
                    Plus, when it fits: {x.charAt(0).toLowerCase() + x.slice(1)}.
                  </p>
                ))}
              </div>
              <div className="flex gap-3 rounded-2xl bg-cream p-5 text-ink">
                <CalendarClock size={20} aria-hidden className="mt-0.5 flex-none text-brand" />
                <p className="text-[15px] leading-relaxed">
                  <span className="font-medium">{startup.termsLead}</span> {startup.terms}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <BookCta from="saas_plan" size="md" />
                <a href="#check" data-track="cta_link" data-from="saas_plan" className="btn btn-md btn-secondary">
                  Check your site first
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

      {/* ── How we start ────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How we start</p>
            <h2 className="t-h2 mt-5">From your domain to a first pull request</h2>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-8 md:grid-cols-3">
            {START.map((s) => (
              <div key={s.t} className="border-t border-line pt-6">
                <span className="icon-tile">{s.icon}</span>
                <p className="mt-5 text-[17px] font-medium">{s.t}</p>
                <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-muted">{s.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="t-h3 !text-[1.35rem]">Twenty minutes, and you leave with the first fixes either way.</p>
            <div className="flex-none">
              <BookCta from="saas_start" size="md" />
              <BookNote className="mt-2" />
            </div>
          </div>
        </div>
      </section>

      <Faq items={SAAS_FAQ} title="Questions founders ask first" className="section !pt-0" />

      <RelatedNotes
        title="AI search notes"
        more={{ href: "/notes/topic/ai", label: "All AI search notes" }}
        slugs={[
          "ai-crawlers-robots-txt",
          "saas-comparison-pages",
          "track-ai-search-visibility",
          "ai-cited-vs-ranked-page",
          "ai-search-local-business",
        ]}
      />

      <Availability call={CALL} />
      <MobileCta />
    </>
  );
}
