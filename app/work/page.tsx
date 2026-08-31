import { Eye, Search, Sparkles } from "lucide-react";
import { Availability } from "@/components/Availability";
import { CtaBand } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { SiteWall } from "@/components/SiteWall";
import { Stagger } from "@/components/Stagger";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { cases, EXPORT_DATE } from "@/lib/gsc";
import { site } from "@/lib/site";

export const metadata = {
  title: "The ledger",
  description:
    "Five local-business Search Console case studies out of thirty-plus sites: a pain clinic, a roofer, a tint shop, a game store and a marketing agency. Each with what I would go after next.",
  alternates: { canonical: "/work" },
};

const READ_THIS = [
  {
    icon: <Search size={17} aria-hidden />,
    title: "Source.",
    body: `Live Search Console data, pulled ${EXPORT_DATE}. Nothing estimated, nothing modelled.`,
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
      author: { "@type": "Person", name: site.owner },
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
      <section className="pt-32 sm:pt-36">
        <div className="container-pad grid items-end gap-9 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow">[ The ledger ]</p>
            <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(2.2rem,5.4vw,4.05rem)] leading-[1.04] tracking-tight text-balance">
              The wall, and the five I opened up.
            </h1>
            <p className="mt-6 max-w-[62ch] text-[17.5px] text-muted">
              Thirty-plus sites in two years. Below is every one I kept a screenshot of, then the
              five I can put the Search Console data on the table for. Same four numbers each time,
              the story behind them, and what I&rsquo;d go after next.
            </p>
          </Reveal>
          <Stagger className="border-t border-line">
            {READ_THIS.map((r) => (
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

      </section>

      <section className="pt-24">
        <div className="container-pad">
          <SiteWall />
        </div>
      </section>

      <section className="pt-16">
        <CtaBand
          line="Want your site on a wall like this?"
          from="after_wall"
          secondary={{ href: "/about", label: "How I work" }}
        />
      </section>

      <section className="pt-24">
        <div className="container-pad">
          <Reveal>
            <p className="eyebrow">[ The numbers ]</p>
            <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
              Five of them, with the Search Console left open.
            </h2>
          </Reveal>
          <div className="mt-12 border-t border-line">
            {cases.map((c) => (
              <CaseStudyBlock key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      <Availability />
      <MobileCta />
    </>
  );
}
