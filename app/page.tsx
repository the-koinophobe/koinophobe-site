import Link from "next/link";
import { ArrowRight, Eye, Globe, MousePointerClick, Search, ShieldAlert } from "lucide-react";
import { Availability } from "@/components/Availability";
import { CountUp } from "@/components/CountUp";
import { HeroHeadline } from "@/components/HeroHeadline";
import { MetricStrip } from "@/components/MetricStrip";
import { QueryFieldCanvas } from "@/components/QueryField";
import { QueryField } from "@/components/QueryFieldGL";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { Stagger } from "@/components/Stagger";
import { Pipeline } from "@/components/Pipeline";
import { Ticker } from "@/components/Ticker";
import { TrustRow } from "@/components/TrustRow";
import { aggregate, cases } from "@/lib/gsc";

export const metadata = {
  description:
    "Michael Edward. Technical SEO and measurement for local businesses. Two years of client work and a million impressions of live Search Console data, good rows and bad rows.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="pt-32 sm:pt-36">
        <div className="container-pad">
          <p className="eyebrow">[ Technical SEO &amp; measurement &middot; local businesses ]</p>
          <HeroHeadline
            className="mt-5 max-w-[19ch] font-display text-[clamp(2.5rem,6.6vw,5.35rem)] font-normal leading-[1.03] tracking-tight"
            segments={[
              { text: "Numbers don't lie. Most people just stop reading at" },
              { text: "the good ones.", muted: true },
            ]}
          />
          <Reveal as="p" delay={0.35} className="mt-7 max-w-[60ch] text-[17.5px] text-muted">
            I&rsquo;m Michael Edward. I&rsquo;ve spent the last two years doing technical SEO,
            analytics and WordPress work for small local businesses: a pain clinic, a roofer, a tint
            shop, a game store, a marketing agency.{" "}
            <strong className="font-medium text-ink">
              Every figure on this site comes out of a live Search Console export.
            </strong>{" "}
            Including the rows that don&rsquo;t flatter me.
          </Reveal>

          <Reveal delay={0.45} className="mt-11">
            <QueryField fallback={<QueryFieldCanvas />} />
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
              Every query these five properties rank for, one point each. Height is average position,
              width is how often it gets searched, depth and size are clicks earned. The band along
              the top is the part that pays.
            </p>
          </Reveal>

          <MetricStrip
            cells={[
              {
                label: "Impressions",
                value: (
                  <CountUp value={aggregate.impressions} display={aggregate.impressions.toLocaleString("en-US")} />
                ),
                note: aggregate.window,
                icon: <Eye size={13} aria-hidden />,
              },
              {
                label: "Clicks",
                value: <CountUp value={aggregate.clicks} display={aggregate.clicks.toLocaleString("en-US")} />,
                icon: <MousePointerClick size={13} aria-hidden />,
                note: (
                  <>
                    {aggregate.rawClicks.toLocaleString("en-US")} in the raw export.
                    <br />
                    <Link href="/work#flagged" className="text-ink underline decoration-line underline-offset-4">
                      Here&rsquo;s why I subtract {aggregate.spamClicks.toLocaleString("en-US")}.
                    </Link>
                  </>
                ),
              },
              {
                label: "Properties",
                value: <CountUp value={aggregate.properties} display={String(aggregate.properties)} />,
                note: "Plus 15+ more under NDA",
                icon: <Globe size={13} aria-hidden />,
              },
              {
                label: "Queries ranked",
                value: <CountUp value={aggregate.queries} display={aggregate.queries.toLocaleString("en-US")} />,
                icon: <Search size={13} aria-hidden />,
                note: (
                  <>
                    {aggregate.topThree} inside the top 3. The export
                    <br />
                    caps at 1,000 rows per site.
                  </>
                ),
              },
            ]}
          />
          <TrustRow />
        </div>
        <Ticker />
      </section>

      <section className="container-pad pt-24">
        <Reveal>
          <p className="eyebrow">[ The ledger ]</p>
          <h2 className="mt-3.5 max-w-[22ch] font-display text-[clamp(1.85rem,3.9vw,2.95rem)] leading-[1.05] tracking-tight text-balance">
            Five properties, read the way I&rsquo;d read them for you.
          </h2>
          <p className="mt-5 max-w-[62ch] text-muted">
            One headline number each. The full read, the charts and the number I&rsquo;d raise on the
            call whether you asked or not all live on the work page.
          </p>
        </Reveal>

        <Stagger className="mt-11 border-t border-line">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/work#${c.slug}`}
              className="ledger-row group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line py-6 lg:grid-cols-[1.55fr_1fr_150px] lg:gap-7"
            >
              <div>
                <p className="font-display text-[1.32rem] leading-snug tracking-tight">{c.title}</p>
                <p className="mt-1.5 font-mono text-[11px] tracking-wide text-muted">
                  {c.client} &middot; {c.place}
                </p>
              </div>
              <div>
                <span className="tnum font-display text-[1.9rem] leading-none tracking-tight text-brand">
                  {c.headline.value}
                </span>
                <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-[0.11em] text-muted">
                  {c.headline.label}
                </span>
              </div>
              <span className="hidden items-center justify-self-end gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-ink lg:flex">
                Read
                <ArrowRight
                  size={13}
                  aria-hidden
                  className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transform-none"
                />
              </span>
            </Link>
          ))}
        </Stagger>
      </section>

      <section className="container-pad pt-24">
        <Pipeline />
      </section>

      <section className="container-pad pt-24">
        <Reviews />
      </section>

      <section className="container-pad grid gap-9 pb-24 pt-24 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-accent">
            <ShieldAlert size={13} aria-hidden /> [ Flagged ]
          </p>
          <h2 className="mt-3.5 max-w-[18ch] font-display text-[clamp(1.85rem,3.9vw,2.95rem)] leading-[1.05] tracking-tight text-balance">
            The best thing I did last year was distrust a good number.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[17.5px]">
            On 8 July 2026, one of the sites I manage did 2,184 clicks in a single day. Its normal day
            is three.
          </p>
          <p className="mt-4 text-muted">
            It was Indonesian gambling spam, cloaked onto the site&rsquo;s real service pages and
            ranking at positions 1 to 4. I found it in the query report before anyone had a chance to
            celebrate the traffic.
          </p>
          <p className="mt-4 text-muted">
            That&rsquo;s why the click count above says 3,077 and not 5,241.
          </p>
          <Link
            href="/work#flagged"
            className="group mt-6 inline-flex items-center gap-2.5 border-b border-line pb-1 font-mono text-[11.5px] uppercase tracking-[0.11em] hover:text-brand"
          >
            The whole story
            <ArrowRight
              size={13}
              aria-hidden
              className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Link>
        </Reveal>
      </section>

      <Availability />
    </>
  );
}
