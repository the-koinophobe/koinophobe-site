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
} from "lucide-react";
import { Availability } from "@/components/Availability";
import { BookCta, PageCta } from "@/components/Cta";
import { RelatedNotes } from "@/components/RelatedNotes";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { CaseSpark } from "@/components/CaseSpark";
import { aggregate, cases } from "@/lib/gsc";
import { site } from "@/lib/site";
import { Faq, type FaqItem } from "@/components/Faq";

// Related notes appear on their publish date without a deploy.
export const revalidate = 3600;

export const metadata = {
  title: { absolute: "About Koinophobe, an SEO agency for service businesses" },
  description:
    "I'm Michael Edward. I run Koinophobe, an SEO agency for service businesses: local SEO, call tracking and AI search, with my numbers on the work page.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    icon: <Database size={24} aria-hidden />,
    title: "I start with your data, not a checklist.",
    body: "Most audits are a checklist run on a site that never asked for one. I'd rather read a year of your own Google data first, because your site already knows what's wrong with it. The audit comes second, and it's shorter.",
  },
  {
    icon: <TriangleAlert size={24} aria-hidden />,
    title: "You'll hear the bad number from me first.",
    body: "Every case on my work page has one, and I put it in writing before the client found it. Fewer clicks, a flat year, a ceiling I can't move. If all I ever send you is good news, stop believing me.",
  },
  {
    icon: <Store size={24} aria-hidden />,
    title: "Small businesses, real stakes.",
    body: "A clinic, a tint shop, a roofer. Nobody here has money to burn on a plan that takes two years to prove. So I set up the tracking first, in your own accounts, and you can check my work any time.",
  },
];

const SERVICES = [
  {
    icon: <Settings2 size={20} aria-hidden />,
    title: "Technical SEO",
    body: "I find and fix what stops Google from reading your site: pages it can't find, slow loading, broken links and messy moves to a new site. It's the work behind every jump on my work page.",
  },
  {
    icon: <BarChart3 size={20} aria-hidden />,
    title: "Measurement",
    body: "I set up Google Analytics and Tag Manager right, so every call, form and booking gets counted. If I can't measure it, I won't claim it.",
  },
  {
    icon: <MapPin size={20} aria-hidden />,
    title: "Local search",
    body: "Town pages that actually help people, your Google Business Profile, a steady flow of reviews, and the map. This is where local businesses win or lose.",
  },
  {
    icon: <PenLine size={20} aria-hidden />,
    title: "Content that ranks",
    body: "Better page titles, service page copy, and longer guides built on what people really search for, not a keyword tool's guess.",
  },
  {
    icon: <Code2 size={20} aria-hidden />,
    title: "Build and fix",
    body: "WordPress, Elementor, AIOSEO and Yoast, day to day. I studied computer science too, so when a site needs something a plugin can't do, I write the code myself.",
  },
];

const WORKING = [
  {
    icon: <Layers size={17} aria-hidden />,
    title: "Prices on the site.",
    body: "One plan at $500 a month, and the audit is free. See the pricing page.",
  },
  {
    icon: <Globe size={17} aria-hidden />,
    title: "Replies the same day.",
    body: "Calls at a time that suits you. Emails answered the same business day.",
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
    a: "Koinophobe is my SEO agency for service businesses: local SEO, call tracking and AI search. I've built and ranked 30+ sites, and five of them have their Google data open on my work page.",
  },
  {
    q: "Who can get my business recommended by ChatGPT and other AI assistants?",
    a: "Koinophobe does. I get businesses found and named by ChatGPT, Perplexity, Gemini, Claude and AI agents like Manus. I fix what stops AI tools from reading your site, write the pages they quote, and check what they say about you every month. AI search optimization is an add-on to the SEO plan, $300 more a month, with no extra contract.",
  },
  {
    q: "What does Koinophobe mean?",
    a: "A koinophobe is someone afraid of living an ordinary life. The word comes from koinophobia, coined by John Koenig in The Dictionary of Obscure Sorrows. I named the agency after it.",
  },
  {
    q: "Who owns the accounts and pages?",
    a: "You do. Google Analytics, Search Console, your Business Profile and the website stay in your name. If you leave, you keep all of it.",
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

      <section className="page-hero hero-bg">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-pad relative grid items-center gap-12 pb-16 pt-14 sm:pb-20 sm:pt-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="t-h1 mt-6 max-w-[18ch]">An SEO agency that shows its work</h1>
            <p className="t-lead mt-6 max-w-[58ch]">
              I&rsquo;m {site.owner}. I run Koinophobe, and I do the SEO, call tracking and AI search
              work for service businesses myself. Before this, I spent years building and ranking sites
              under other agencies&rsquo; names. There&rsquo;s not much mystery to the job: the data you
              already own, the parts of your site that are broken, and whether the person reporting to you
              will tell you the bad news too. I will.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="about_hero" />
              <PageCta href="/work" label="See the work" from="about_hero" />
            </div>
          </Reveal>
          <div className="mx-auto w-full max-w-[440px] lg:mx-0">
            <div data-anim="rise" className="card-dark grid grid-cols-2 overflow-hidden p-2">
              {[
                { v: `${aggregate.sitesWorked}+`, l: "sites built and ranked" },
                { v: aggregate.clicks.toLocaleString("en-US"), l: "visits from Google, five sites" },
                { v: aggregate.pageOne.toLocaleString("en-US"), l: "searches on page one" },
                { v: aggregate.topThree.toLocaleString("en-US"), l: "searches in the top 3" },
              ].map((x) => (
                <div key={x.l} className="p-5 sm:p-6 [&:nth-child(-n+2)]:border-b [&:nth-child(-n+2)]:border-white/10 [&:nth-child(odd)]:border-r [&:nth-child(odd)]:border-white/10">
                  <p className="font-display text-[clamp(1.8rem,3.2vw,2.4rem)] font-extrabold leading-none tracking-tight text-mint">{x.v}</p>
                  <p className="mt-2 text-[13.5px] leading-snug text-muted">{x.l}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12.5px] text-muted">From my clients&rsquo; own Google data, {aggregate.window}.</p>
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
          <Reveal className="stage-head">
            <p className="eyebrow">The work</p>
            <h2 className="t-h2 mt-5">My SEO results: judge me on these, not on this page</h2>
            <div className="mt-8 flex justify-center">
              <PageCta href="/work" label="All case studies" from="about_work" size="md" />
            </div>
          </Reveal>
          <div data-anim="cards" className="mt-14 grid gap-5 md:grid-cols-2">
            {cases
              .filter((c) => CASE_IMG[c.slug])
              .map((c) => (
                <Link key={c.slug} href={`/work#${c.slug}`} className="card card-hover press group flex flex-col overflow-hidden p-2.5 sm:flex-row">
                  <div className="relative aspect-[16/9] flex-none overflow-hidden rounded-2xl bg-surface sm:aspect-auto sm:w-[190px]">
                    <Image src={CASE_IMG[c.slug]} alt="" fill sizes="(min-width: 640px) 190px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transform-none" />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[13.5px] text-muted">
                      {c.client} &middot; {c.place}
                    </p>
                    <p className="mt-2 font-display text-[1.2rem] leading-snug tracking-tight">{c.title}</p>
                    <p className="mt-auto flex items-baseline gap-2 pt-5">
                      <span className="font-display text-[2rem] font-extrabold leading-none tracking-tight text-brand">{c.headline.value}</span>
                      <span className="text-[13.5px] text-muted">{c.headline.label}</span>
                    </p>
                    <CaseSpark c={c} className="mt-3" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">How I work</p>
            <h2 className="t-h2 mt-5">How I work: three SEO promises you can hold me to</h2>
          </Reveal>
          <div data-anim="cards" className="mt-14 grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              // The middle promise sits on a dark card; the last runs full width.
              <div key={p.title} className={`p-7 sm:p-10 ${i === 1 ? "card-dark" : "card"} ${i === 2 ? "md:col-span-2" : ""}`}>
                <span className="icon-tile">{p.icon}</span>
                <h3 className="t-h3 mt-6 !text-[1.45rem]">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">What I do</p>
            <h2 className="t-h2 mt-5">My SEO services: technical, measurable, and mostly in WordPress</h2>
          </Reveal>
          <div data-anim="cards" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="card p-7 sm:p-8">
                <span className="icon-tile">{s.icon}</span>
                <h3 className="t-h3 mt-5">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <PageCta href="/pricing" label="See pricing" from="about_services" />
            <PageCta href="/roofing-seo" label="Roofing SEO" from="about_services" />
            <PageCta href="/home-remodeling-seo" label="Home remodeling SEO" from="about_services" />
          </div>
        </div>
      </section>

      <Faq items={ABOUT_FAQ} className="section" />

      <RelatedNotes
        title="Where to start reading"
        slugs={["what-is-a-koinophobe", "hiring-an-seo-questions-to-ask", "call-tracking-for-contractors", "near-me-searches-local-seo-data"]}
      />

      <Availability />
      <MobileCta />
    </>
  );
}
