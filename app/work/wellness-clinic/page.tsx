import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { BookCall } from "@/components/BookCall";

export const metadata: Metadata = {
  title: "Case study: wellness clinic SEO",
  description:
    "How a local therapy clinic tripled organic clicks and nearly 4x'd impressions in 6 months with SEO and conversion tracking.",
  alternates: { canonical: "/work/wellness-clinic" },
};

const metrics = [
  { label: "Organic clicks", before: "158", after: "501", delta: "+217%" },
  { label: "Impressions", before: "2.2K", after: "8.7K", delta: "+297%" },
  { label: "Peak CTR", before: "—", after: "6.1%", delta: "best" },
  { label: "Avg. position", before: "~20", after: "~15", delta: "↑" },
];

export default function WellnessCaseStudy() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0 -z-10" />
        <div className="container-pad pb-10 pt-16 sm:pt-20">
          <Reveal>
            <Link href="/work" className="text-sm font-semibold text-brand">
              ← Back to work
            </Link>
            <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted">
              Case study · Wellness clinic (local)
            </span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Tripled organic clicks in{" "}
              <span className="accent">six months</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              A local therapy practice was almost invisible in search. Here is what
              changed, and how I measured it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      <section className="container-pad py-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-bg p-6">
                <dt className="text-xs text-muted">{m.label}</dt>
                <dd className="mt-2 font-mono text-2xl font-semibold text-ink">
                  {m.after}
                </dd>
                <dd className="mt-1 font-mono text-xs text-muted">
                  from {m.before} · {m.delta}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted">
            Source: Google Search Console, last 6 months vs previous 6 months.
          </p>
        </Reveal>
      </section>

      {/* Narrative */}
      <section className="container-pad py-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">The problem</h2>
              <p className="mt-3 text-muted">
                The clinic had a website but barely registered in search. Few people
                found it, fewer enquired, and there was no way to tell which efforts
                were working because nothing was being tracked properly.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">What I did</h2>
              <ul className="mt-4 space-y-3 text-muted">
                {[
                  "Fixed the technical foundations: indexing, crawlability and on-page structure.",
                  "Targeted the search terms real patients use, not vanity keywords.",
                  "Built and tightened service pages around local intent.",
                  "Set up Search Console and conversion tracking so every enquiry was measured.",
                  "Reviewed the data monthly and doubled down on what converted.",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <span className="text-brand">✓</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">The result</h2>
              <p className="mt-3 text-muted">
                Over six months, organic clicks went from 158 to 501 and impressions
                from 2.2K to 8.7K, with click-through rate peaking at 6.1%. The dip in
                average CTR over the period is simply because reach grew faster than
                clicks, which is exactly what you want early in a growth curve. Most
                importantly, the clinic could finally see search turning into real
                enquiries.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-24 rounded-3xl border border-line bg-surface/60 p-7">
              <p className="font-display text-lg font-semibold text-ink">
                Want numbers like these?
              </p>
              <p className="mt-2 text-sm text-muted">
                I&apos;ll show you where your search traffic is leaking before you commit
                to anything.
              </p>
              <div className="mt-5">
                <BookCall label="Get a free teardown" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
