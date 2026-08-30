import { Eye, Search, Sparkles } from "lucide-react";
import { Availability } from "@/components/Availability";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { cases, EXPORT_DATE } from "@/lib/gsc";
import { site } from "@/lib/site";

export const metadata = {
  title: "The ledger",
  description:
    "Five local-business Search Console case studies: a pain clinic, a roofer, a tint shop, a game store and a marketing agency. Each with the number I'd raise before you found it.",
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
              Five businesses, and exactly what moved.
            </h1>
            <p className="mt-6 max-w-[62ch] text-[17.5px] text-muted">
              Same four numbers every time, the story behind them, and what I&rsquo;d go after next.
              All of it from the client&rsquo;s own Search Console data, not a rank tracker&rsquo;s guess.
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

        <div className="container-pad">
          <div className="mt-12 border-t border-line">
            {cases.map((c) => (
              <CaseStudyBlock key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      <Availability />
    </>
  );
}
