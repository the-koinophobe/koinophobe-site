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
import { site } from "@/lib/site";
import { Faq, type FaqItem } from "@/components/Faq";

// Related notes appear on their publish date without a deploy.
export const revalidate = 3600;

export const metadata = {
  title: "About Michael Edward, technical SEO for home services",
  description:
    "Koinophobe is the SEO practice of Michael Edward. How he works and what he does: technical SEO, call tracking, local search and WordPress for home service businesses and the agencies that serve them.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    icon: <Database size={24} aria-hidden />,
    title: "I start with the export, not the audit.",
    body: "Most audits are a checklist run against a site that never asked for one. I'd rather read twelve months of your own Search Console and GA4 first, because the site already knows what's wrong with it. The audit comes second and it's shorter.",
  },
  {
    icon: <TriangleAlert size={24} aria-hidden />,
    title: "You'll hear the bad number from me first.",
    body: "Every case on the work page has one, and I put it in writing before the client found it. A falling click-through rate, a flat year, a ceiling I can't move. If the only thing I ever send you is up and to the right, you should stop believing me.",
  },
  {
    icon: <Layers size={24} aria-hidden />,
    title: "I can work under your brand.",
    body: "Most of what I've done in the last two years has gone out with an agency's name on it. Thirty-plus WordPress sites across roofing, real estate, wellness, legal, lawn care and HOA compliance. I'm comfortable being invisible, and I write reports your account manager can send without editing.",
  },
  {
    icon: <Store size={24} aria-hidden />,
    title: "Small businesses, real stakes.",
    body: "A clinic, a tint shop, a game store. Nobody here has a budget to waste on a strategy that takes two years to prove. So I build the measurement first, on your property, and you can check my work whenever you want.",
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
    body: "GA4 and GTM set up right, Search Console configured, conversion and call tracking wired to the things that make money. If it isn't measured I won't claim it.",
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
    body: "I slot in under your brand, work your process, and hand back deliverables your team can ship. Available for retainer or per-project.",
  },
];

const WORKING = [
  {
    icon: <Layers size={17} aria-hidden />,
    title: "Prices in USD, on the site.",
    body: "Monthly plans or one-time projects. See the pricing page.",
  },
  {
    icon: <Users size={17} aria-hidden />,
    title: "Under your brand or mine.",
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

// Same @id as the Person in the root layout, so this page enriches that one
// entity instead of introducing a second Michael Edward.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://koinophobe.com/#michael",
  worksFor: { "@id": "https://koinophobe.com/#organization" },
  name: site.owner,
  url: "https://koinophobe.com/about",
  email: site.email,
  sameAs: [site.linkedin, site.x],
  image: "https://koinophobe.com/me/michael-edward.webp",
  jobTitle: "Technical SEO and analytics consultant",
  knowsAbout: [
    "Technical SEO",
    "Local SEO",
    "Google Analytics 4",
    "Google Tag Manager",
    "Google Search Console",
    "Core Web Vitals",
    "WordPress",
  ],
};

const ABOUT_FAQ: FaqItem[] = [
  {
    q: "Who is Michael Edward?",
    a: "I run Koinophobe, a technical SEO and call tracking practice for home service businesses in the US, Australia and Europe. I've worked on 30+ sites over two years.",
  },
  {
    q: "What does Koinophobe mean?",
    a: "A koinophobe is someone afraid of living an ordinary life. The word comes from koinophobia, coined by John Koenig in The Dictionary of Obscure Sorrows, and I named the practice after it.",
  },
  {
    q: "Do you work with marketing agencies?",
    a: "Yes. 11 of the 15 sites on my portfolio wall went out under an agency's name. Agency pricing starts at $850 per site per month, or $900 for a 10-hour block.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
      />

      <section className="hero-bg">
        <div className="container-pad grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="t-h1 mt-5 max-w-[18ch]">I&rsquo;m Michael Edward. Koinophobe is my SEO practice.</h1>
            <p className="t-lead mt-6 max-w-[58ch]">
              I do technical SEO, local SEO and call tracking for home service businesses in the US, Australia and Europe, and
              for the marketing agencies that serve them. There isn&rsquo;t much mystery in this job:
              there&rsquo;s the data you already own, the parts of the site stopping it from working, and
              whether the person reporting on it will tell you something you don&rsquo;t want to hear.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="about_hero" />
              <PageCta href="/work" label="See the work" from="about_hero" />
            </div>
          </Reveal>
          <div className="mx-auto w-full max-w-[440px] lg:mx-0">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface shadow-float">
              <Image
                src="/me/michael-edward.webp"
                alt="Michael Edward, founder of Koinophobe"
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover"
              />
            </div>
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
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How I work</p>
            <h2 className="t-h2 mt-5">Four promises, and you can hold me to all of them</h2>
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

      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What I do</p>
            <h2 className="t-h2 mt-5">Technical, measurable, and mostly in WordPress</h2>
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
