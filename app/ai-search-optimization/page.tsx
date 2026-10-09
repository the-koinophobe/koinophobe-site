import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  Check,
  Code2,
  FileText,
  Gauge,
  Home,
  RefreshCw,
  ScanSearch,
  ShoppingBag,
  Wrench,
} from "lucide-react";
import { AiCheck } from "@/components/AiCheck";
import { Availability } from "@/components/Availability";
import { BookCta, BookNote, TextCta } from "@/components/Cta";
import { Faq, type FaqItem } from "@/components/Faq";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { getNote } from "@/lib/notes";
import { site } from "@/lib/site";
import { startup } from "@/lib/pricing";

// Guides appear on their publish date without a deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI search optimization for business owners",
  description:
    "Get your business named by ChatGPT, Claude, Perplexity and Google's AI Overviews. Crawler fixes, cited pages and monthly tracking. $1,000 a month, no contract.",
  alternates: { canonical: "/ai-search-optimization" },
};

const STUDY = "/notes/ai-cited-vs-ranked-page";

const WHO = [
  {
    icon: <Home size={20} aria-hidden />,
    t: "Local and home service businesses",
    b: "Customers ask for \"a good roofer near me\" or \"best bakery downtown.\" Listings, reviews and plain answers decide who gets named.",
    link: { href: "/notes/get-business-recommended-by-chatgpt", label: "Get recommended by ChatGPT" },
  },
  {
    icon: <Briefcase size={20} aria-hidden />,
    t: "Dentists, lawyers, accountants, clinics",
    b: "High-trust choices made close to booking. Credentials, cost pages and consistent profiles, written within your field's advertising rules.",
    link: { href: "/notes/ai-search-professional-services", label: "AI search for practices" },
  },
  {
    icon: <ShoppingBag size={20} aria-hidden />,
    t: "Online stores",
    b: "ChatGPT now shows product carousels. Clean product data, buying guides and a crawlable store get you into them.",
    link: { href: "/notes/chatgpt-shopping-products", label: "ChatGPT shopping" },
  },
  {
    icon: <Code2 size={20} aria-hidden />,
    t: "Software companies",
    b: "Buyers ask assistants to shortlist tools. Comparison pages and fixes shipped as pull requests, on a page of its own.",
    link: { href: "/saas-seo", label: "SaaS SEO and AI search" },
  },
];

const FACTS = [
  { v: "34% to 54%", l: "of the companies AI assistants cited also ranked in Google's top ten. Ranking still gets you into the conversation." },
  { v: "2% to 12%", l: "of the pages they cited did. Which page gets quoted is a separate job." },
  { v: "41.6% vs 0%", l: "of cited pages were marked up as articles, against pages that ranked and were never cited." },
  { v: "4.5%", l: "of ChatGPT's cited pages survived three runs of the same question. One screenshot proves nothing." },
];

const LOOP = [
  { icon: <Gauge size={20} aria-hidden />, t: "Measure", b: "Your customers' questions, asked across ChatGPT, Claude, Perplexity and Google AI Overviews, three runs each, every source logged." },
  { icon: <Wrench size={20} aria-hidden />, t: "Fix", b: "50+ fixes a month: AI crawler access, text hidden behind JavaScript, schema, titles, listings, internal links." },
  { icon: <FileText size={20} aria-hidden />, t: "Publish", b: "12 in-depth pages a month answering what customers ask: costs, comparisons, what to expect, is it worth it." },
  { icon: <RefreshCw size={20} aria-hidden />, t: "Measure again", b: "Same questions, same method, at month end. You see who got named and cited, against last month." },
];

/** The guide hub. Grouped by what an owner is trying to do. */
const GUIDES: { title: string; slugs: string[] }[] = [
  {
    title: "Start here",
    slugs: ["how-to-rank-in-chatgpt", "get-business-recommended-by-chatgpt", "generative-engine-optimization", "geo-vs-seo-vs-aeo", "is-seo-dead"],
  },
  {
    title: "Google's AI features",
    slugs: ["how-to-appear-in-google-ai-overviews", "google-ai-mode-seo", "ai-overviews-traffic-drop", "schema-markup-for-ai-search"],
  },
  {
    title: "ChatGPT, Claude, Perplexity, Copilot",
    slugs: ["ai-crawlers-robots-txt", "perplexity-seo", "chatgpt-shopping-products", "llms-txt", "bing-copilot-ai-performance-report"],
  },
  {
    title: "What gets cited",
    slugs: ["content-ai-cites", "saas-comparison-pages", "brand-mentions-ai-search", "reddit-ai-search", "ai-search-professional-services", "ai-search-local-business"],
  },
  {
    title: "Measuring and buying",
    slugs: ["ai-cited-vs-ranked-page", "track-ai-search-visibility", "track-chatgpt-traffic-ga4", "ai-seo-pricing", "hire-ai-seo-agency"],
  },
];

const CALL = [
  "I check your robots.txt, your rendering and what the assistants say about your business before we talk.",
  "You get the first few changes I'd make, in order.",
  "If it isn't a fit, I'll tell you that on the call.",
];

const FAQ: FaqItem[] = [
  {
    q: "What is AI search optimization?",
    a: "It's the work of getting your business named and linked when customers ask AI assistants like ChatGPT, Claude, Perplexity and Google's AI Overviews for a recommendation. It's also called GEO, AEO or AI SEO. Most of it builds on SEO; the new parts are AI crawler access and measuring the answers.",
  },
  {
    q: "Can you guarantee ChatGPT will recommend my business?",
    a: "No, and nobody honest can. In my own study, ChatGPT kept only 4.5% of its cited pages across three runs of the same question. What I can do is make sure assistants can read your site, that you rank, and that you have pages worth quoting, then measure the answers every month with repeated runs.",
  },
  {
    q: "How long does AI search optimization take to work?",
    a: "Crawler access fixes take effect as soon as assistants recrawl your site. New pages usually take weeks to months to rank and get cited. The monthly tracking shows the trend, so you can judge it on numbers.",
  },
  {
    q: "Do I still need regular SEO?",
    a: "Yes. A third to half of the companies AI assistants cited in my study also ranked in Google's top ten for the same question. The plan includes the SEO work, so you aren't paying twice.",
  },
  {
    q: "How much does it cost?",
    a: "$1,000 a month, no contract. If you're not satisfied, tell me and we stop 30 days later. Every month includes citation tracking across four assistants with three runs each, 12 in-depth pages, 50+ fixes, a Friday changelog and a month-end report.",
  },
  {
    q: "What if I run a local home service business?",
    a: "This plan works for you, and so do my local plans, which focus on Google Maps, town pages and call tracking. The intro call is free and I'll tell you which fits.",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI search optimization",
  alternateName: ["Generative engine optimization", "AI SEO", "Answer engine optimization"],
  serviceType: "AI search optimization",
  url: "https://koinophobe.com/ai-search-optimization",
  provider: { "@id": "https://koinophobe.com/#organization" },
  areaServed: site.areaServed,
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

export default function AiSearchPage() {
  const seatsLine =
    startup.seatsOpen > 0 ? `${startup.seatsOpen} of ${startup.seats} seats open` : "All seats taken, ask to join the waitlist";
  const groups = GUIDES.map((g) => ({
    title: g.title,
    notes: g.slugs.map((s) => getNote(s)).filter(Boolean) as NonNullable<ReturnType<typeof getNote>>[],
  })).filter((g) => g.notes.length);

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
              AI search optimization
            </p>
            <h1 className="t-h1 mt-6 max-w-[18ch]">
              For business owners whose customers ask ChatGPT <span className="text-brand">before they call</span>.
            </h1>
            <p className="t-lead mt-6 max-w-[58ch]">
              I&rsquo;m Michael Edward. I get businesses named and cited by ChatGPT, Claude, Perplexity, Gemini and
              Google&rsquo;s AI Overviews, and readable by AI agents like Manus. I fix what keeps assistants from
              reading your site, write the pages they quote, and measure the answers every month with a method
              I&rsquo;ve published.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="ai_hero" />
              <a href="#check" data-track="cta_link" data-from="ai_hero" className="btn btn-lg btn-secondary">
                <ScanSearch size={18} aria-hidden />
                Check your site free
              </a>
            </div>
            <p className="mt-4 text-[13.5px] text-muted">
              {startup.price} a month &middot; no contract &middot; {seatsLine}
            </p>
          </Reveal>
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="hero-photo aspect-[4/3]">
              <Image
                src="/site/ai-search-hero.webp"
                alt="A business owner on the phone while working on a laptop"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="float-card float-in bottom-[-6%] left-0 w-[250px] p-4 sm:left-[-8%]" style={{ animationDelay: "0.4s" }}>
              <p className="font-mono text-[12px] text-muted">Companies AI cites that rank on Google</p>
              <p className="mt-2 font-display text-[1.65rem] leading-none tracking-tight">34% to 54%</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-muted">From my 96-run citation study</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it's for ────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Who it&rsquo;s for</p>
            <h2 className="t-h2 mt-5">Any business whose customers ask before they buy</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              The work changes with what you sell. The method stays the same: let assistants read you, give them
              something worth quoting, and measure what they say.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHO.map((w) => (
              <div key={w.t} className="card flex flex-col p-7">
                <span className="icon-tile">{w.icon}</span>
                <h3 className="t-h3 mt-5 !text-[1.2rem]">{w.t}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{w.b}</p>
                <Link href={w.link.href} className="link-arrow mt-4 inline-flex text-[14.5px]">
                  {w.link.label} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The check ───────────────────────────────────────────── */}
      <section id="check" className="section section-tint scroll-mt-24">
        <div className="container-pad">
          <div className="card bg-bg p-7 sm:p-10 lg:p-12">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Free check</p>
              <h2 className="t-h2 mt-5">Can ChatGPT read your website?</h2>
              <p className="t-lead mt-4 max-w-[60ch]">
                Type your domain. I read your robots.txt for ten search and AI crawlers, then look at your homepage
                the way a crawler that doesn&rsquo;t run JavaScript sees it. Ten seconds, nothing stored.
              </p>
            </Reveal>
            <div className="mt-9">
              <AiCheck />
            </div>
          </div>
        </div>
      </section>

      {/* ── What I measured ─────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">What I measured</p>
            <h2 className="t-h2 mt-5 max-w-[20ch]">Built on 96 AI searches, not on guesses</h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              On September 11, 2026 I asked ChatGPT, Claude, Perplexity and Google AI Overviews twelve buyer
              questions, recorded every page they cited, and compared those pages with what Google ranked for the
              same questions. Every recommendation on this page comes from that, or from what the platforms
              document themselves.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <TextCta href={STUDY} label="Read the study" from="ai_study" />
              <TextCta href="/notes/how-to-rank-in-chatgpt" label="How to rank in ChatGPT" from="ai_study" />
            </div>
          </Reveal>
          <div data-anim="cards" className="grid content-start gap-4 self-center sm:grid-cols-2">
            {FACTS.map((s) => (
              <div key={s.v} className="card p-6 sm:p-7">
                <p className="tnum font-display text-[clamp(1.9rem,3.4vw,2.5rem)] leading-none tracking-tight text-brand">{s.v}</p>
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
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LOOP.map((w) => (
              <div key={w.t} className="card p-7">
                <span className="icon-tile">{w.icon}</span>
                <h3 className="t-h3 mt-5">{w.t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The plan ────────────────────────────────────────────── */}
      <section id="plan" className="section scroll-mt-24">
        <div className="container-pad grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="card flex flex-col gap-6 border-ink/60 p-7 shadow-float sm:p-9">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[14px] font-medium text-muted">AI search optimization</span>
              <span className="eyebrow !text-[12px]">{seatsLine}</span>
            </div>
            <div>
              <h2 className="t-h3 !text-[1.6rem]">{startup.name}</h2>
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
              <BookCta from="ai_plan" size="md" />
              <a href="#check" data-track="cta_link" data-from="ai_plan" className="btn btn-md btn-secondary">
                Check your site first
              </a>
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="eyebrow">Before you book</p>
            <div className="mt-6 border-t border-line">
              {[
                ["No placement promises.", "Nobody controls what ChatGPT or Google shows. You get the work every month and a report that says what it did, limits included."],
                ["Your rules apply.", "Anything that makes claims about your business goes to you before it publishes. Regulated fields get the same review as an ad."],
                ["You own everything.", "Site, pages, accounts and the tracking sheet stay yours if we stop."],
                ["Five seats.", "I do the work myself, so I take five clients at a time."],
              ].map(([t, b]) => (
                <div key={t} className="border-b border-line py-5">
                  <p className="text-[16.5px] font-medium">{t}</p>
                  <p className="mt-1.5 max-w-[52ch] text-[15px] leading-relaxed text-muted">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14.5px] text-muted">
              Mostly need Google Maps and town pages? The{" "}
              <Link href="/pricing" className="text-ink underline underline-offset-4">
                local plans
              </Link>{" "}
              may fit better. <Link href="/notes/ai-seo-pricing" className="text-ink underline underline-offset-4">What the price covers</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Guides ──────────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Free guides</p>
            <h2 className="t-h2 mt-5">Everything I know about AI search, written down</h2>
            <p className="t-lead mt-4 max-w-[60ch]">Do it yourself with these, or hand it to me. Either way, start with the first group.</p>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="text-[15px] font-medium text-muted">{g.title}</h3>
                <ul className="mt-4 border-t border-line">
                  {g.notes.map((n) => (
                    <li key={n.slug} className="border-b border-line">
                      <Link href={`/notes/${n.slug}`} className="group flex items-start justify-between gap-4 py-3.5 text-[15.5px] leading-snug">
                        <span className="group-hover:underline group-hover:underline-offset-4">{n.title}</span>
                        <ArrowRight size={16} aria-hidden className="mt-1 flex-none text-muted transition-transform duration-150 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-bg p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="t-h3 !text-[1.3rem]">Twenty minutes, and you leave with the first fixes either way.</p>
            <div className="flex-none">
              <BookCta from="ai_guides" size="md" />
              <BookNote className="mt-2" />
            </div>
          </div>
        </div>
      </section>

      <Faq items={FAQ} title="Questions owners ask first" className="section" />

      <Availability call={CALL} />
      <MobileCta />
    </>
  );
}
