import { Eye, Flag, Search, ShieldAlert } from "lucide-react";
import { Availability } from "@/components/Availability";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { SpikeChart } from "@/components/GscCharts";
import { cases, EXPORT_DATE, spamQueries } from "@/lib/gsc";
import { site } from "@/lib/site";

export const metadata = {
  title: "The ledger",
  description:
    "Five local-business Search Console case studies: a pain clinic, a roofer, a tint shop, a game store and a marketing agency. Each with the number I'd raise before you found it.",
  alternates: { canonical: "/work" },
};

const READ_THIS = [
  {
    icon: <Search size={15} aria-hidden />,
    title: "Source.",
    body: `Google Search Console exports pulled ${EXPORT_DATE}. Nothing here is estimated or modelled.`,
  },
  {
    icon: <Flag size={15} aria-hidden />,
    title: "Every case has a flagged number.",
    body: "The one I would raise before you found it.",
  },
  {
    icon: <Eye size={15} aria-hidden />,
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
              Five properties, and the numbers behind each one.
            </h1>
            <p className="mt-6 max-w-[62ch] text-[17.5px] text-muted">
              Each one gets the same four metrics Search Console gives you, the story behind them, and
              the number I&rsquo;d bring up on the call whether you asked or not.
            </p>
          </Reveal>
          <Stagger className="border-t border-line">
            {READ_THIS.map((r) => (
              <div
                key={r.title}
                className="grid grid-cols-[22px_1fr] items-baseline gap-3.5 border-b border-line py-3.5"
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

      <section
        id="flagged"
        className="mt-24 scroll-mt-28 border-y border-line bg-surface pb-20 pt-20"
      >
        <div className="container-pad">
          <Reveal>
          <p className="eyebrow flex items-center gap-2 text-accent">
            <ShieldAlert size={13} aria-hidden /> [ Flagged ]
          </p>
          <h2 className="mt-3.5 max-w-[20ch] font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05] tracking-tight text-balance">
            The best thing I did last year was distrust a good number.
          </h2>
          </Reveal>

          <div className="mt-10 grid gap-9 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <Reveal>
              <p className="text-[17.5px]">
                On 8 July 2026, one of the sites I manage did 2,184 clicks in a single day. Its normal
                day is three.
              </p>
              <p className="mt-4">
                A lot of people would have screenshotted that and sent it to the client. I opened the
                query report instead, because a Florida marketing agency does not suddenly go viral on
                a Wednesday.
              </p>
              <p className="mt-4">
                The top queries were <span className="font-mono text-[0.94em]">pg11</span>,{" "}
                <span className="font-mono text-[0.94em]">impor88</span>,{" "}
                <span className="font-mono text-[0.94em]">tribun855</span> and{" "}
                <span className="font-mono text-[0.94em]">kopi77</span>. Indonesian gambling terms.
                They were ranking at positions 1 to 4, and they were ranking on the site&rsquo;s real
                service pages: the contact page, the about page, the main digital marketing page.
                Cloaked injections served to Googlebot and nobody else.
              </p>
              <p className="mt-4">
                Over the year, 2,164 of that property&rsquo;s clicks came from Indonesia. 2,049 of
                them came through AMP pages the business never built. It was cleaned, the pages were
                revalidated, and the spike never came back.
              </p>
              <p className="mt-4 text-muted">
                That&rsquo;s why the headline click count on this site is 3,077 and not 5,241.
                Subtracting 2,164 clicks from my own portfolio is the whole argument for hiring me.
                The report only means something if the person writing it is willing to make it
                smaller.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <figure>
                <SpikeChart title="Clicks per day" range="8 Jun – 8 Aug 2026" />
                <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
                  Source: Search Console daily export. One day at 2,184 clicks against a 62-day median
                  of 4. The axis is compressed above 12 so the ordinary days stay readable.
                </figcaption>
              </figure>
              <div className="mt-7 border-t border-line">
                {spamQueries.map(([q, m]) => (
                  <div
                    key={q}
                    className="flex justify-between gap-3.5 border-b border-line py-2.5 font-mono text-[12.5px]"
                  >
                    <b className="font-medium tracking-wide">{q}</b>
                    <span className="tnum text-muted">{m}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3.5 font-mono text-[11px] text-muted">
                Not one of these is a service the business sells.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Availability />
    </>
  );
}
