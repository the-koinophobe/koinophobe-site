import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedNotes } from "@/components/RelatedNotes";
import { NextSteps } from "@/components/NextSteps";
import { faqJsonLd } from "@/components/Faq";
import { aggregate } from "@/lib/gsc";
import { monthly, sprint } from "@/lib/pricing";
import { site } from "@/lib/site";

/*
 * A short landing page for one trade: the searches that trade lives on, what
 * the plan changes for it, the real figures (scoped to what they measured),
 * the price and the trade's guides. No client results are claimed for a trade
 * the case studies don't cover.
 */
export type Trade = {
  path: string;
  crumb: string;
  kicker: string;
  h1: string;
  lead: string;
  searches: string[];
  fixes: { t: string; b: string }[];
  faq: { q: string; a: string }[];
  notes: string[];
};

export function TradePage({ trade }: { trade: Trade }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(trade.faq)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: trade.h1,
            serviceType: "Local SEO and digital marketing",
            provider: { "@id": "https://koinophobe.com/#organization" },
            areaServed: site.areaServed,
            url: `https://koinophobe.com${trade.path}`,
            offers: { "@type": "Offer", price: sprint.amount, priceCurrency: "USD", url: "https://koinophobe.com/pricing#fix" },
          }),
        }}
      />

      <section className="container-pad pb-16 pt-10 sm:pt-14">
        <Breadcrumbs items={[{ name: trade.crumb, href: trade.path }]} className="mb-8" />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="kicker">{trade.kicker}</p>
            <h1 className="t-h1 mt-5 max-w-[16ch]">{trade.h1}</h1>
            <p className="t-lead mt-6 max-w-[52ch]">{trade.lead}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from={`${trade.crumb}_hero`} className="btn btn-lg btn-primary">Book a call</a>
              <Link href="/pricing" className="btn btn-lg btn-secondary">See the price</Link>
            </div>
          </div>
          <div className="trade-searches">
            <p className="kicker">Searches this is built for</p>
            <ul>
              {trade.searches.map((s) => (
                <li key={s}><span aria-hidden>&#9906;</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-pad">
          <div className="max-w-[46rem]">
            <p className="kicker">What changes</p>
            <h2 className="t-h2 mt-4">What the plan does for your trade</h2>
          </div>
          <div className="trust6 mt-12">
            {trade.fixes.map((f) => (
              <div key={f.t}>
                <h3>{f.t}</h3>
                <p>{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-pad">
          <div className="pair6">
            <div className="!items-start !text-left">
              <p className="kicker">The proof, scoped</p>
              <h2 className="t-h2 mt-4 !text-[clamp(1.8rem,2.6vw,2.3rem)]">{aggregate.pageOne.toLocaleString("en-US")} searches with a client on page one</h2>
              <p className="t-lead mt-4 max-w-[46ch]">Across five client sites I can share, {aggregate.window}. Roofing, a clinic, a tint shop and a game shop, not yet your trade, and I won&rsquo;t pretend otherwise.</p>
              <Link href="/work" className="link-u mt-auto inline-flex items-center gap-1.5 pt-10">See the case studies <ArrowRight size={15} aria-hidden /></Link>
            </div>
            <div className="!items-start !text-left">
              <p className="kicker">The price</p>
              <h2 className="t-h2 mt-4 !text-[clamp(1.8rem,2.6vw,2.3rem)]">{sprint.price}, then {monthly.price} a month</h2>
              <p className="t-lead mt-4 max-w-[46ch]">A four-week fix with local link building, then the monthly plan if you want it to keep growing. The audit and intro call are free.</p>
              <Link href="/pricing" className="link-u mt-auto inline-flex items-center gap-1.5 pt-10">Every price, in full <ArrowRight size={15} aria-hidden /></Link>
            </div>
          </div>
        </div>
      </section>

      <NextSteps from={`${trade.crumb}_steps`} />

      <section className="section !pt-0">
        <div className="container-pad faq6">
          <div>
            <p className="kicker">FAQ</p>
            <h2 className="t-h2 mt-4">Questions owners ask</h2>
          </div>
          <div className="qrows">
            {trade.faq.map((f) => (
              <details key={f.q}>
                <summary><span className="box" aria-hidden />{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedNotes title="Guides for your trade" slugs={trade.notes} />
    </>
  );
}
