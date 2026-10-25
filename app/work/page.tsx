import { Eye, Search, Sparkles } from "lucide-react";
import { AISection } from "@/components/AISection";
import { Availability } from "@/components/Availability";
import { CtaBand } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { SiteWall } from "@/components/SiteWall";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { RelatedNotes } from "@/components/RelatedNotes";
import { cases, EXPORT_DATE } from "@/lib/gsc";

// Related notes appear on their publish date without a deploy.
export const revalidate = 3600;

export const metadata = {
  title: "SEO case studies for local businesses",
  description:
    "Five Search Console case studies from 30+ local business sites: a pain clinic, a roofer, a tint shop, a game store and an agency, with what comes next.",
  alternates: { canonical: "/work" },
};

const READ_THIS = [
  {
    icon: <Search size={17} aria-hidden />,
    title: "Source.",
    body: `Live Search Console data, pulled ${EXPORT_DATE}. Nothing estimated or modeled.`,
  },
  {
    icon: <Sparkles size={17} aria-hidden />,
    title: "Every case says what's next.",
    body: "The opportunity still sitting on the table.",
  },
  {
    icon: <Eye size={17} aria-hidden />,
    title: "Two clients are unnamed.",
    body: "White-label work stays under the agency's name.",
  },
];

const casesLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Client search performance case studies",
  itemListElement: cases.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: c.title,
      about: `${c.client}, ${c.place}`,
      headline: `${c.headline.value} ${c.headline.label}`,
      author: { "@id": "https://koinophobe.com/#organization" },
      url: `https://koinophobe.com/work#${c.slug}`,
    },
  })),
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(casesLd) }}
      />
      <section className="page-hero hero-bg">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-pad relative grid items-center gap-10 pb-16 pt-14 sm:pb-20 sm:pt-24 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow">Case studies</p>
            <h1 className="t-h1 mt-6 max-w-[20ch]">SEO case studies from real Search Console accounts</h1>
            <p className="t-lead mt-6 max-w-[60ch]">
              Thirty-plus sites in two years. Here are the five we can put the Search Console data on the table
              for: same four numbers each time, the story behind them, and what we&rsquo;d go after next. Then every
              site we kept a screenshot of.
            </p>
            <nav aria-label="Case studies" className="mt-8 flex flex-wrap gap-2">
              {cases.map((c) => (
                <a key={c.slug} href={`#${c.slug}`} className="btn btn-sm btn-secondary">
                  {c.client}
                </a>
              ))}
            </nav>
          </Reveal>
          <ul data-anim="rise" className="card-dark divide-y divide-white/10 px-6 py-2 sm:px-8">
            {READ_THIS.map((r) => (
              <li key={r.title} className="flex items-start gap-3.5 py-5">
                <span className="mt-0.5 text-brand">{r.icon}</span>
                <p className="text-[15px] text-muted">
                  <b className="font-semibold text-ink">{r.title}</b> {r.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">The numbers</p>
            <h2 className="t-h2 mx-auto mt-5 max-w-[24ch]">Five SEO case studies, with the Search Console left open</h2>
            <p className="t-lead mt-5 max-w-[52ch]">
              The greatest hits, if you like. Same four numbers for each, the story behind them, and what
              we&rsquo;d go after next.
            </p>
          </Reveal>
          {/* One case per card: each gets the screen to itself. */}
          <div className="mt-14 grid gap-6">
            {cases.map((c) => (
              <div key={c.slug} className="card px-5 sm:px-10">
                <CaseStudyBlock c={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-4">
        <CtaBand
          line="Want numbers like these on your site?"
          from="work_after_cases"
          secondary={{ href: "/pricing", label: "See pricing" }}
        />
      </div>

      <section className="section">
        <div className="container-pad">
          <SiteWall />
        </div>
      </section>

      <section className="section section-tint">
        <div className="container-pad">
          <AISection />
        </div>
      </section>

      <RelatedNotes
        className="!bg-bg"
        title="The SEO case studies, written up"
        slugs={["clinic-158-to-501", "charles-county-md-game-shop-seo", "lawrence-ma-window-tint-seo", "near-me-searches-local-seo-data", "zero-click-rankings-title-tags", "ai-cited-vs-ranked-page"]}
      />

      <Availability />
      <MobileCta />
    </>
  );
}
