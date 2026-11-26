import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RelatedNotes } from "@/components/RelatedNotes";
import { MobileCta } from "@/components/MobileCta";
import { Testimonials } from "@/components/Testimonials";
import { faqJsonLd } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { aggregate } from "@/lib/gsc";
import { fixAreas, free, monthly, sprint } from "@/lib/pricing";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

export const revalidate = 3600;

export const metadata = pageMeta({
  title: "Local SEO pricing: the Google fix and monthly plan",
  description:
    "Every price in full. The Google fix: $2,500, a four-week sprint with local link building. Monthly growth: $1,000 a month. The audit and intro call are free.",
  path: "/pricing",
});

/*
 * Laid out like a studio pricing page: the plan list on the left, every plan in
 * full on the right, then proof, reviews, what owners ask before they sign, and
 * the questions. Every figure comes from lib/pricing.ts and lib/gsc.ts.
 */

const FAQ = [
  { q: `What's in the ${sprint.price} Google fix?`, a: `${sprint.steps.map((s) => s.name).join(", ")}. Done in ${sprint.weeks} weeks, ${sprint.upfront} up front and ${sprint.onHandover} on handover.` },
  { q: "Why $2,500?", a: "It is four weeks of work across six areas, including a link-building campaign that wins at least 10 local links. Most agencies charge that for links alone. You pay for the work, not for account managers or a sales team." },
  { q: "What counts as a local link?", a: "A link to your site from a real local or trade website: a supplier's dealer page, a trade association, a sponsorship, a local news story or a directory people use. No paid link networks, nothing that could get you penalized." },
  { q: "Is the audit really free?", a: "Yes. In 5 business days you get a written list of what's costing you calls, a check of your tracking and Business Profile, and a recorded walkthrough. You keep it whether you hire me or not." },
  { q: "Do you guarantee rankings?", a: "No, and be careful with anyone who does. Nobody controls Google. What I guarantee is the work on the list, done on the dates we agree." },
  { q: `Do I need the ${monthly.price} monthly plan?`, a: "No. The sprint stands on its own. The monthly plan is for owners who want the links, the pages and the profile to keep growing." },
  { q: "Can I start with the monthly plan?", a: "Only after the sprint, or after an audit shows your profile, listings and tracking are already in shape. Monthly work on a broken base is money wasted." },
  { q: "What happens if I stop the monthly plan?", a: "You keep everything: the accounts, the profile, the listings, the pages and every link. Give me 30 days' notice and I hand it all over." },
  { q: "How do I pay?", a: "ACH bank transfer. The audit and the intro call are never invoiced." },
];

const TRUST = [
  { t: "Your accounts, your links", b: "I work inside your Google profile, ad account and site. Every link and page stays yours if you leave." },
  { t: "Half up front", b: `${sprint.upfront} to start the sprint, ${sprint.onHandover} on handover, when you've seen the report.` },
  { t: "Month to month", b: "The monthly plan has no contract. Give 30 days' notice and it stops." },
  { t: "No shortcuts", b: "No paid link networks, fake reviews or keyword stuffing. Nothing that puts your profile at risk." },
  { t: "Numbers you can check", b: "Every report uses your own Search Console, Analytics and call tracking. Nothing you can't open yourself." },
  { t: "Same-day replies", b: "One person does the work and answers the email. Calls at a time that suits you." },
];

const offers = [
  { "@type": "Offer", name: sprint.name, price: sprint.amount, priceCurrency: "USD", url: "https://koinophobe.com/pricing#fix", description: sprint.steps.map((s) => s.name).join(". ") },
  {
    "@type": "Offer",
    name: monthly.name,
    priceCurrency: "USD",
    url: "https://koinophobe.com/pricing#monthly",
    description: monthly.items.map((i) => i.name).join(". "),
    priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "USD", price: monthly.amount, unitCode: "MON" },
  },
  ...free.map((f) => ({ "@type": "Offer", name: f.name, price: 0, priceCurrency: "USD", url: `https://koinophobe.com/pricing#${f.key}` })),
].map((o) => ({ ...o, seller: { "@id": "https://koinophobe.com/#organization" }, areaServed: site.areaServed }));

function BookBtn({ from, label = "Book a call" }: { from: string; label?: string }) {
  return (
    <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from={from} className="btn btn-lg btn-primary">
      {label}
    </a>
  );
}

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "OfferCatalog", name: "Koinophobe prices", url: "https://koinophobe.com/pricing", itemListElement: offers }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }} />

      {/* ── Head ───────────────────────────────────────────────── */}
      <section className="container-pad pb-12 pt-10 sm:pt-14">
        <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} className="mb-8" />
        <div className="head-c">
          <p className="kicker">Pricing</p>
          <h1 className="t-h1 mt-5">Every price, written out in full</h1>
          <p className="t-lead mt-6 max-w-[52ch]">
            One sprint to fix how you&rsquo;re found, one monthly plan to keep growing, and two things that cost nothing. Pick one to see exactly what you get.
          </p>
        </div>
      </section>

      {/* ── Plans: list left, plans right ──────────────────────── */}
      <section className="container-pad pb-24">
        <div className="pgrid">
          <nav className="plist" aria-label="Plans">
            <p className="grp">One time</p>
            <a href="#fix"><span>{sprint.name}<span className="tag">Start here</span></span><span>{sprint.price}</span></a>
            <p className="grp">Every month</p>
            <a href="#monthly"><span>{monthly.name}</span><span>{monthly.price}/mo</span></a>
            <p className="grp">Free</p>
            {free.map((f) => (
              <a key={f.key} href={`#${f.key}`}><span>{f.name}</span><span>$0</span></a>
            ))}
            <div className="ask mt-8">
              <p className="kicker">For B2B startups</p>
              <p className="mt-3 text-[17px] font-semibold tracking-[-0.01em]">Growth and GTM strategy for founders</p>
              <p className="mt-2 text-[14.5px] text-muted">A newer line of work: who to sell to, which motion fits your deal size, and the system that runs it.</p>
              <Link href="/gtm" className="link-u mt-4 inline-flex items-center gap-1.5 text-[15px]">See the GTM page <ArrowRight size={15} aria-hidden /></Link>
            </div>
          </nav>

          <div>
            {/* The Google fix */}
            <article id="fix" className="plan">
              <div className="plan-top">
                <div>
                  <h2 className="t-h3 !text-[1.6rem]">{sprint.name}</h2>
                  <p className="mt-2 max-w-[46ch] text-muted">
                    A {sprint.weeks}-week sprint that rebuilds how you&rsquo;re found: your profile, listings, ads, pages, tracking and a local link-building campaign.
                  </p>
                  <p className="amt mt-6">{sprint.price}<small>one time</small></p>
                  <p className="mt-2 text-[14.5px] text-muted">{sprint.upfront} to start, {sprint.onHandover} on handover.</p>
                </div>
                <BookBtn from="pricing_fix" />
              </div>
              <div className="plan-sec">
                <p className="kicker">Week by week</p>
                <ul className="plan-items">
                  {sprint.steps.map((s) => (
                    <li key={s.name}><span className="wk">Week {s.week}</span><b>{s.name}</b><span>{s.what}</span></li>
                  ))}
                </ul>
              </div>
              <div className="plan-sec">
                <p className="kicker">What it covers</p>
                <ul className="plan-items">
                  {fixAreas.map((a) => (
                    <li key={a.name}><b>{a.name}</b><span>{a.says}</span></li>
                  ))}
                </ul>
              </div>
              <div className="plan-sec">
                <p className="kicker">Terms</p>
                <ul className="plan-items">
                  {sprint.terms.map((t) => (<li key={t}><span className="!mt-0 !text-[15px]">{t}</span></li>))}
                </ul>
              </div>
            </article>

            {/* Monthly growth */}
            <article id="monthly" className="plan">
              <div className="plan-top">
                <div>
                  <h2 className="t-h3 !text-[1.6rem]">{monthly.name}</h2>
                  <p className="mt-2 max-w-[46ch] text-muted">After the sprint. The links keep coming, a new page goes up each month, and someone watches what Google and AI say about you.</p>
                  <p className="amt mt-6">{monthly.price}<small>a month</small></p>
                  <p className="mt-2 text-[14.5px] text-muted">{monthly.terms}</p>
                </div>
                <BookBtn from="pricing_monthly" />
              </div>
              <div className="plan-sec">
                <p className="kicker">Every month</p>
                <ul className="plan-items">
                  {monthly.items.map((i) => (
                    <li key={i.name}><b>{i.name}</b><span>{i.what}</span></li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Free */}
            <article id="free" className="plan">
              <div className="plan-top">
                <div>
                  <h2 className="t-h3 !text-[1.6rem]">The intro call and audit</h2>
                  <p className="mt-2 max-w-[46ch] text-muted">Find out what&rsquo;s wrong before you pay anything. Both are yours to keep whether you hire me or not.</p>
                  <p className="amt mt-6">$0</p>
                </div>
                <BookBtn from="pricing_free" label="Book the free call" />
              </div>
              {free.map((f) => (
                <div key={f.key} id={f.key} className="plan-sec scroll-mt-28">
                  <p className="kicker">{f.name}, {f.unit}</p>
                  <ul className="plan-items">
                    {f.items.map((it) => (<li key={it}><span className="!mt-0 !text-[15px]">{it}</span></li>))}
                  </ul>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      {/* ── Proof ──────────────────────────────────────────────── */}
      <section className="section !pt-0">
        <div className="container-pad">
          <div className="head-c">
            <p className="kicker">Proof</p>
            <h2 className="t-h2 mt-4">Results from client Search Console</h2>
            <p className="t-lead mt-5">{aggregate.window}, across {aggregate.sitesWorked} sites. Every figure from a live export.</p>
          </div>
          <div className="stats6 mt-12">
            <div><b>{(aggregate.impressions / 1e6).toFixed(1)}M</b><span>times client sites were shown on Google</span></div>
            <div><b>{aggregate.pageOne.toLocaleString("en-US")}</b><span>searches with a client on page one</span></div>
            <div><b>{aggregate.topThree.toLocaleString("en-US")}</b><span>searches with a client in the top three</span></div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/work" className="btn btn-lg btn-secondary">See the case studies</Link>
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-pad">
          <Testimonials heading="What owners say about the work" />
        </div>
      </section>

      {/* ── Before you sign ────────────────────────────────────── */}
      <section className="section !pt-0">
        <div className="container-pad">
          <div className="head-c">
            <p className="kicker">Before you sign</p>
            <h2 className="t-h2 mt-4">What owners ask about money and access</h2>
          </div>
          <div className="trust6 mt-12">
            {TRUST.map((x, i) => (
              <div key={x.t}>
                <h3>{x.t}</h3>
                <p>{x.b}</p>
                <span className="ix">{String(i + 1).padStart(2, "0")} / {String(TRUST.length).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="questions" className="section !pt-0 scroll-mt-20">
        <div className="container-pad faq6">
          <div>
            <p className="kicker">FAQ</p>
            <h2 className="t-h2 mt-4">Questions about prices</h2>
            <div className="ask mt-8">
              <div className="relative h-[72px] w-[72px] overflow-hidden bg-surface">
                <Image src="/site/michael-edward.jpg" alt="" fill sizes="72px" className="object-cover object-top" />
              </div>
              <p className="mt-6 text-[22px] font-semibold tracking-[-0.01em]">Still deciding?</p>
              <p className="mt-2 text-muted">I&rsquo;ll look at your profile first and tell you which plan fits, or that you need neither.</p>
              <div className="mt-6"><BookBtn from="pricing_faq" /></div>
              <p className="mt-5 text-[14.5px] text-muted">Or email <a href={`mailto:${site.email}`} className="link-u text-ink">{site.email}</a></p>
            </div>
          </div>
          <div className="qrows">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary><span className="box" aria-hidden />{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedNotes
        title="Read before you hire anyone"
        slugs={["how-long-does-seo-take", "hiring-an-seo-questions-to-ask", "roofing-seo-cost", "monthly-seo-report-contractors", "seo-vs-google-ads-contractors"]}
      />
      <MobileCta />
    </>
  );
}
