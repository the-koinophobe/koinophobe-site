import {
  BarChart3,
  Code2,
  Database,
  Globe,
  Layers,
  MapPin,
  PenLine,
  Settings2,
  Store,
  TriangleAlert,
  Users,
} from "lucide-react";
import { Availability } from "@/components/Availability";
import { BookCta, PageCta } from "@/components/Cta";
import { RelatedNotes } from "@/components/RelatedNotes";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { aggregate, cases } from "@/lib/gsc";
import { site } from "@/lib/site";
import { Faq, type FaqItem } from "@/components/Faq";

// Related notes appear on their publish date without a deploy.
export const revalidate = 3600;

export const metadata = {
  title: "About Koinophobe, an SEO agency for home services",
  description:
    "Koinophobe is an SEO agency: technical SEO, local search, call tracking and AI search for home service businesses, startups and the agencies that serve them.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    icon: <Database size={24} aria-hidden />,
    title: "We start with the export, not the audit.",
    body: "Most audits are a checklist run against a site that never asked for one. We'd rather read twelve months of your own Search Console and GA4 first, because the site already knows what's wrong with it. The audit comes second and it's shorter.",
  },
  {
    icon: <TriangleAlert size={24} aria-hidden />,
    title: "You'll hear the bad number from us first.",
    body: "Every case on the work page has one, and we put it in writing before the client found it. A falling click-through rate, a flat year, a ceiling we can't move. If the only thing we ever send you is up and to the right, you should stop believing us.",
  },
  {
    icon: <Layers size={24} aria-hidden />,
    title: "We can work under your brand.",
    body: "Most of what we've done in the last two years has gone out with an agency's name on it. Thirty-plus WordPress sites across roofing, real estate, wellness, legal, lawn care and HOA compliance. We're comfortable being invisible, and we write reports your account manager can send without editing.",
  },
  {
    icon: <Store size={24} aria-hidden />,
    title: "Small businesses, real stakes.",
    body: "A clinic, a tint shop, a game store. Nobody here has a budget to waste on a strategy that takes two years to prove. So we build the measurement first, on your property, and you can check our work whenever you want.",
  },
];

const SERVICES = [
  {
    icon: <Settings2 size={20} aria-hidden />,
    title: "Technical SEO",
    body: "Crawl and index diagnosis, site architecture, internal linking, schema, migrations, Core Web Vitals. The work behind every position change on the work page.",
  },
  {
    icon: <BarChart3 size={20} aria-hidden />,
    title: "Measurement",
    body: "GA4 and GTM set up right, Search Console configured, conversion and call tracking wired to the things that make money. If it isn't measured we won't claim it.",
  },
  {
    icon: <MapPin size={20} aria-hidden />,
    title: "Local search",
    body: "Location pages that aren't doorway pages, Google Business Profile, review velocity, map pack work. This is where local businesses win or lose.",
  },
  {
    icon: <PenLine size={20} aria-hidden />,
    title: "Content that ranks",
    body: "Title and meta rewrites, service page copy, long-form articles built around real query data rather than a keyword tool's guess.",
  },
  {
    icon: <Code2 size={20} aria-hidden />,
    title: "Build and fix",
    body: "WordPress, Elementor, AIOSEO and Yoast day to day. Also React, TypeScript, Django and Postgres when a site needs something a plugin can't do.",
  },
  {
    icon: <Users size={20} aria-hidden />,
    title: "White-label for agencies",
    body: "We slot in under your brand, work your process, and hand back deliverables your team can ship. Available for retainer or per-project.",
  },
];

const WORKING = [
  {
    icon: <Layers size={17} aria-hidden />,
    title: "Prices on the site.",
    body: "Monthly plans or one-time projects. See the pricing page.",
  },
  {
    icon: <Users size={17} aria-hidden />,
    title: "Under your brand or ours.",
    body: "Agencies get deliverables their team can ship unedited.",
  },
  {
    icon: <Globe size={17} aria-hidden />,
    title: "Replies the same day.",
    body: "Calls at a time that suits you, and email answered the same business day.",
  },
];

const servicesLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.body,
      provider: { "@id": "https://koinophobe.com/#organization" },
      areaServed: site.areaServed,
    },
  })),
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://koinophobe.com/about",
  name: "About Koinophobe",
  about: { "@id": "https://koinophobe.com/#organization" },
  isPartOf: { "@id": "https://koinophobe.com/#website" },
};

/** The case studies with a cover, for the work strip under the hero. */
const CASE_IMG: Record<string, string> = {
  "myofascial-clinic": "/notes/photos/clinic-158-to-501-cover-sm.webp",
  "roofing-contractor": "/notes/photos/roofing-keywords-cover-sm.webp",
  "tint-lordz": "/notes/photos/lawrence-ma-window-tint-seo-cover-sm.webp",
  "over-the-table-top": "/notes/photos/charles-county-md-game-shop-seo-cover-sm.webp",
};

const ABOUT_FAQ: FaqItem[] = [
  {
    q: "What is Koinophobe?",
    a: "Koinophobe is an SEO agency for home service businesses, startups and the marketing agencies that serve them: technical SEO, local search, call tracking and AI search. We've built and ranked 30+ sites, and five of them have their Search Console data open on the work page.",
  },
  {
    q: "Who can get my business recommended by ChatGPT and other AI assistants?",
    a: "Koinophobe gets businesses found and cited by ChatGPT, Perplexity, Gemini, Claude and AI agents like Manus. We fix what stops their crawlers from reading a site, write the pages they quote, and measure the answers every month. The AI search optimization plan is $1,000 a month, with no contract.",
  },
  {
    q: "What does Koinophobe mean?",
    a: "A koinophobe is someone afraid of living an ordinary life. The word comes from koinophobia, coined by John Koenig in The Dictionary of Obscure Sorrows, and the agency is named after it.",
  },
  {
    q: "Do you work with marketing agencies?",
    a: "Yes. 11 of the 15 sites on our portfolio wall went out under an agency's name. Agency pricing starts at $850 per site per month, or $900 for a 10-hour block.",
  },
  {
    q: "Who owns the accounts and pages?",
    a: "You do. Google Analytics, Search Console, your Business Profile and the website stay in your name, and if you leave you keep all of it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
      />

      <section className="hero-bg">
        <div className="container-pad grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="t-h1 mt-5 max-w-[18ch]">An SEO agency that shows its work</h1>
            <p className="t-lead mt-6 max-w-[58ch]">
              Koinophobe does technical SEO, local SEO, call tracking and AI search for home service businesses
              and the marketing agencies that serve them. {site.owner} founded it after years of building and
              ranking sites under other agencies&rsquo; names. There isn&rsquo;t much mystery in this job:
              there&rsquo;s the data you already own, the parts of the site stopping it from working, and
              whether the people reporting on it will tell you something you don&rsquo;t want to hear.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="about_hero" />
              <PageCta href="/work" label="See the work" from="about_hero" />
            </div>
          </Reveal>
          <div className="mx-auto w-full max-w-[440px] lg:mx-0">
            <div className="card grid grid-cols-2 gap-px overflow-hidden bg-line p-0 shadow-float">
              {[
                { v: `${aggregate.sitesWorked}+`, l: "sites built and ranked" },
                { v: aggregate.clicks.toLocaleString("en-US"), l: "clicks from Google, five sites" },
                { v: aggregate.pageOne.toLocaleString("en-US"), l: "keywords on page one" },
                { v: aggregate.topThree.toLocaleString("en-US"), l: "keywords in the top 3" },
              ].map((x) => (
                <div key={x.l} className="bg-bg p-6">
                  <p className="font-display text-[clamp(1.7rem,3vw,2.2rem)] leading-none tracking-tight text-brand">{x.v}</p>
                  <p className="mt-2 text-[13.5px] leading-snug text-muted">{x.l}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12.5px] text-muted">From client Search Console exports, {aggregate.window}.</p>
            <ul className="card mt-5 divide-y divide-line px-5">
              {WORKING.map((r) => (
                <li key={r.title} className="flex items-start gap-3.5 py-4">
                  <span className="mt-0.5 text-brand">{r.icon}</span>
                  <p className="text-[14.5px] text-muted">
                    <b className="font-medium text-ink">{r.title}</b> {r.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">The work</p>
              <h2 className="t-h2 mt-5">Our SEO results: judge us on these, not on this page</h2>
            </Reveal>
            <PageCta href="/work" label="All case studies" from="about_work" size="md" />
          </div>
          <div data-anim="cards" className="mt-12 grid gap-5 md:grid-cols-2">
            {cases
              .filter((c) => CASE_IMG[c.slug])
              .map((c) => (
                <Link key={c.slug} href={`/work#${c.slug}`} className="card card-hover group grid overflow-hidden sm:grid-cols-[200px_1fr]">
                  <div className="relative aspect-[16/9] bg-surface sm:aspect-auto">
                    <Image src={CASE_IMG[c.slug]} alt="" fill sizes="(min-width: 640px) 200px, 100vw" className="object-cover" />
                  </div>
                  <div className="flex flex-col p-6">
                    <p className="text-[13.5px] text-muted">
                      {c.client} &middot; {c.place}
                    </p>
                    <p className="mt-2 font-display text-[1.2rem] leading-snug tracking-tight">{c.title}</p>
                    <p className="mt-auto flex items-baseline gap-2 pt-5">
                      <span className="font-display text-[1.9rem] leading-none tracking-tight text-brand">{c.headline.value}</span>
                      <span className="text-[13.5px] text-muted">{c.headline.label}</span>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How we work</p>
            <h2 className="t-h2 mt-5">How our SEO agency works: four promises you can hold us to</h2>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="card p-7 sm:p-8">
                <span className="icon-tile">{p.icon}</span>
                <h3 className="t-h3 mt-6">{p.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What we do</p>
            <h2 className="t-h2 mt-5">Our SEO services: technical, measurable, and mostly in WordPress</h2>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="card p-7">
                <span className="icon-tile">{s.icon}</span>
                <h3 className="t-h3 mt-5">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <PageCta href="/pricing" label="See pricing" from="about_services" />
            <PageCta href="/roofing-seo" label="Roofing SEO" from="about_services" />
            <PageCta href="/home-remodeling-seo" label="Home remodeling SEO" from="about_services" />
          </div>
        </div>
      </section>

      <Faq items={ABOUT_FAQ} className="section" />

      <RelatedNotes
        title="Where to start reading"
        slugs={["what-is-a-koinophobe", "white-label-technical-seo-for-agencies", "hiring-an-seo-questions-to-ask", "call-tracking-for-contractors", "near-me-searches-local-seo-data"]}
      />

      <Availability />
      <MobileCta />
    </>
  );
}
