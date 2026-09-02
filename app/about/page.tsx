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
import { CtaBand } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/Spotlight";
import { Stagger } from "@/components/Stagger";
import { site } from "@/lib/site";

export const metadata = {
  title: "Approach",
  description:
    "How Michael Edward works and what he actually does: technical SEO, measurement, local search and WordPress for small businesses and the agencies that serve them.",
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
    body: "GA4 and GTM built properly, Search Console configured, conversion and call tracking wired to the things that make money. If it isn't measured I won't claim it.",
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
    title: "Retainer or per-project.",
    body: "Whichever fits the work in front of us.",
  },
  {
    icon: <Users size={17} aria-hidden />,
    title: "Under your brand or mine.",
    body: "Agencies get deliverables their team can ship unedited.",
  },
  {
    icon: <Globe size={17} aria-hidden />,
    title: "US Eastern hours.",
    body: "Calls, standups and turnaround on your clock.",
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
      areaServed: "United States",
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
  sameAs: [site.linkedin],
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

      <section className="pt-32 sm:pt-36">
        <div className="container-pad grid items-end gap-9 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(2.2rem,5.4vw,4.05rem)] leading-[1.04] tracking-tight text-balance">
              Four promises, and you can hold me to all of them.
            </h1>
            <p className="mt-6 max-w-[62ch] text-[17.5px] text-muted">
              There isn&rsquo;t much mystery in this job. There&rsquo;s the data you already own, the
              parts of the site stopping it from working, and whether the person reporting on it is
              willing to tell you something you don&rsquo;t want to hear.
            </p>
          </Reveal>
          <Stagger className="border-t border-line">
            {WORKING.map((r) => (
              <div
                key={r.title}
                className="grid grid-cols-[24px_1fr] items-start gap-4 border-b border-line py-3.5"
              >
                <span className="text-brand">{r.icon}</span>
                <p className="text-[14.5px] text-muted">
                  <b className="font-medium text-ink">{r.title}</b> {r.body}
                </p>
              </div>
            ))}
          </Stagger>
        </div>

        <div className="container-pad">
          <Stagger className="mt-12 grid gap-px bg-line md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Spotlight
                key={p.title}
                className={`bg-bg py-8 md:pr-8 ${i % 2 === 1 ? "md:pl-8" : ""}`}
              >
                <span className="mb-3.5 block text-brand">{p.icon}</span>
                <h2 className="mb-3 font-display text-[1.4rem] leading-snug tracking-tight text-balance">
                  {p.title}
                </h2>
                <p className="text-[15.5px] text-muted">{p.body}</p>
              </Spotlight>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-pad pb-24 pt-24">
        <Reveal>
        <p className="eyebrow">What I actually do</p>
        <h2 className="mt-3.5 max-w-[22ch] font-display text-[clamp(1.85rem,3.9vw,2.95rem)] leading-[1.05] tracking-tight text-balance">
          Technical, measurable, and mostly in WordPress.
        </h2>
        </Reveal>
        <Stagger className="mt-11 border-t border-line">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="grid grid-cols-[26px_1fr] items-baseline gap-4 border-b border-line py-5 sm:grid-cols-[26px_20ch_1fr] sm:gap-6"
            >
              <span className="text-brand">{s.icon}</span>
              <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
              <p className="col-start-2 text-[15.5px] text-muted sm:col-start-3">{s.body}</p>
            </div>
          ))}
        </Stagger>
      </section>

      <CtaBand
        line="Sound like the way you want this done?"
        from="after_services"
        secondary={{ href: "/work", label: "See the numbers" }}
      />

      <Availability />
      <MobileCta />
    </>
  );
}
