import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ban, CalendarClock, Check, KeyRound, Landmark, ShieldCheck, Video } from "lucide-react";
import { Availability } from "@/components/Availability";
import { RelatedNotes } from "@/components/RelatedNotes";
import { BookCta, BookNote, EmailCta } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { free, guarantee, plan, startup, withAi, type Plan } from "@/lib/pricing";
import { site } from "@/lib/site";
import { FaqList, FaqSchema } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SEO pricing for service businesses",
  description:
    "SEO for service businesses: one plan at $500 a month, free audits, and Google and AI search for $300 more. Delivery guarantee on month one.",
  alternates: { canonical: "/pricing" },
};

const TERMS = [
  {
    icon: <ShieldCheck size={19} aria-hidden />,
    t: `${guarantee.name}.`,
    b: guarantee.terms,
  },
  {
    icon: <KeyRound size={19} aria-hidden />,
    t: "You own every account.",
    b: "Google Analytics, Search Console, your Business Profile, the site. If we stop working together, nothing is held back.",
  },
  {
    icon: <CalendarClock size={19} aria-hidden />,
    t: "3 months minimum on the SEO plan.",
    b: "SEO takes that long to show up in Google. After that it's month to month, with 30 days' notice to cancel. The AI search add-on has no extra minimum: stop it any time with 30 days' notice.",
  },
  {
    icon: <Landmark size={19} aria-hidden />,
    t: "Simple invoicing.",
    b: "Pay by ACH bank transfer, at the start of each month. The audit and the intro call are never invoiced.",
  },
  {
    icon: <Ban size={19} aria-hidden />,
    t: "Not included.",
    b: "Ad spend and ad management. Long-form articles are only in the AI search add-on. If you need something else, I'll say so up front and point you to someone good.",
  },
];

const FAQ = [
  {
    q: "What do I get for $500 a month?",
    a: `Everything, every month. I fix your site and count every call and form. I build 2 new service or town pages. I keep your Google Business Profile up to date. And you get a one-page report and a short call. There's only one plan, so there's nothing to choose. Want to show up in ChatGPT too? Add AI search for $${startup.amount} more a month, $${withAi.toLocaleString("en-US")} in total.`,
  },
  {
    q: "Is the audit really free?",
    a: "Yes. In 5 business days you get a written list of what's costing you calls, a check of your tracking and Business Profile, and a recorded video walkthrough. You keep it whether you hire me or not.",
  },
  {
    q: "Why does it cost less than most agencies?",
    a: "No account managers, no sales team and no office. You pay for the work, and I'm the one doing it. You can see every change in your own accounts. And if I don't finish the month-one list within 30 days, you get your first payment back.",
  },
  {
    q: "Is there a guarantee?",
    a: `Yes. ${guarantee.terms}`,
  },
  {
    q: "Do you guarantee rankings?",
    a: "No, and be careful with anyone who does. Nobody controls Google. What I guarantee is the work: if I don't finish the month-one list within 30 days, you get your first payment back. After that you get the work in your plan done every month, and a report that shows what changed and what it did to your clicks and calls.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep everything: the accounts, the pages, the tracking. Give me 30 days' notice after the first three months and I'll hand it all over, neat and tidy.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: `Local service businesses that customers find on Google: roofers, remodelers, pool and lawn care, plumbing and HVAC, auto detailing and window tint, clinics and more. The AI search add-on, $${startup.amount} more a month on top of the SEO plan, is for service businesses that want to show up in AI answers as well as on Google.`,
  },
];

function PlanCard({ p }: { p: Plan }) {
  return (
    <div
      id={p.key}
      className={`flex h-full scroll-mt-28 flex-col gap-5 p-6 sm:p-7 ${p.pick ? "card-dark shadow-float" : "card"}`}
    >
      <div className="flex min-h-[28px] items-center justify-between gap-3">
        <span className="text-[14px] font-medium text-muted">{p.kicker}</span>
      </div>
      <div>
        <h3 className="t-h3 !text-[1.5rem]">{p.name}</h3>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="tnum font-display text-[2.6rem] font-extrabold leading-none tracking-tight">
            {p.price}
          </span>
          <span className="text-[14px] text-muted">{p.unit}</span>
        </p>
      </div>
      <ul className="flex flex-1 flex-col gap-2.5 border-t border-line pt-5">
        {p.items.map((it) => (
          <li key={it} className="grid grid-cols-[18px_1fr] gap-2.5 text-[15px]">
            <Check size={16} aria-hidden className="mt-1 text-brand" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <p className="text-[14px] text-muted">{p.note}</p>
    </div>
  );
}

const offer = (p: Plan) => ({
  "@type": "Offer",
  name: p.name,
  description: p.items.join(". "),
  priceCurrency: "USD",
  ...(p.monthly
    ? {
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "USD",
          price: p.amount,
          unitCode: "MON",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
      }
    : { price: p.amount }),
  seller: { "@id": "https://koinophobe.com/#organization" },
  areaServed: site.areaServed,
});

const pricingLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Koinophobe pricing",
  url: "https://koinophobe.com/pricing",
  itemListElement: [
    ...free.map(offer),
    offer(plan),
    offer(startup),
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingLd) }}
      />
      <FaqSchema items={FAQ} />

      <section className="page-hero hero-bg">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-pad relative pb-16 pt-14 text-center sm:pb-20 sm:pt-24">
          <Reveal className="mx-auto max-w-[820px]">
            <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} className="mb-8" center />
            <p className="eyebrow">Pricing</p>
            <h1 className="t-h1 mx-auto mt-6 max-w-[20ch]">
              SEO pricing for service businesses, before the call
            </h1>
            <p className="t-lead mx-auto mt-6 max-w-[58ch]">
              One plan, {plan.price} a month. The audit is free. If I don&rsquo;t finish the month-one list
              within 30 days, you get your first payment back. Not sure it fits? The intro call is free, and I&rsquo;ll tell you straight.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <BookCta from="pricing_hero" />
              <EmailCta from="pricing_hero" />
            </div>
            <BookNote className="mt-4" />
          </Reveal>
        </div>
      </section>

      <section id="guarantee" className="container-pad scroll-mt-28 pt-6">
        <div data-anim="rise" className="card-dark flex flex-col gap-5 p-7 sm:flex-row sm:items-start sm:gap-7 sm:p-10">
          <span className="icon-tile flex-none">
            <ShieldCheck size={22} aria-hidden />
          </span>
          <div>
            <h2 className="t-h3 !text-[1.5rem]">{guarantee.name}</h2>
            <p className="muted mt-3 max-w-[75ch] text-[16px] leading-relaxed">{guarantee.terms}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                { h: "SEO plan, month one", items: guarantee.monthOne },
                { h: "AI search add-on, month one", items: guarantee.aiMonthOne },
              ].map((l) => (
                <div key={l.h}>
                  <h3 className="text-[15px] font-semibold">{l.h}</h3>
                  <ul className="mt-3 grid gap-2">
                    {l.items.map((i) => (
                      <li key={i} className="muted flex items-start gap-2.5 text-[15px] leading-relaxed">
                        <Check size={17} aria-hidden className="mt-1 flex-none text-mint" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-pad pt-24 sm:pt-32">
        <Reveal className="stage-head">
          <h2 className="t-group">Free SEO audit and intro call</h2>
          <p className="t-lead mt-3">Find out what&rsquo;s wrong before you pay anything.</p>
        </Reveal>
        <Stagger className="mx-auto mt-12 grid max-w-[880px] gap-4 md:grid-cols-2">
          {free.map((p) => (
            <PlanCard key={p.key} p={p} />
          ))}
        </Stagger>
      </section>

      <section id="monthly" className="container-pad scroll-mt-28 pt-24 sm:pt-32">
        <Reveal className="stage-head">
          <h2 className="t-group">The monthly SEO plan</h2>
          <p className="t-lead mt-3">One plan with everything in it, and a report you can read.</p>
          <p className="mt-4 inline-flex rounded-full border border-line bg-card px-3.5 py-1.5 text-[14px] font-medium">3-month minimum, then month to month</p>
        </Reveal>
        <div data-anim="rise" className="mx-auto mt-12 max-w-[560px]">
          <PlanCard p={plan} />
        </div>
        <p className="mt-6 text-center text-[15px] text-muted">
          What the plans look like for your trade:{" "}
          <Link href="/roofing-seo" className="text-ink underline underline-offset-4">
            roofing SEO
          </Link>{" "}
          and{" "}
          <Link href="/home-remodeling-seo" className="text-ink underline underline-offset-4">
            home remodeling SEO
          </Link>
          .
        </p>
      </section>

      <section id="ai-search" className="container-pad scroll-mt-28 pt-24 sm:pt-32">
        <Reveal className="stage-head">
          <h2 className="t-group">AI search optimization add-on</h2>
          <p className="t-lead mt-3">Add it to the SEO plan to get named by ChatGPT, Claude, Perplexity and Google&rsquo;s AI.</p>
          <p className="mt-4 inline-flex rounded-full border border-line bg-card px-3.5 py-1.5 text-[14px] font-medium">No extra contract, 30 days&rsquo; notice to stop</p>
        </Reveal>
        <div id={startup.key} data-anim="rise" className="card-dark mt-12 grid scroll-mt-28 gap-8 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[14px] font-medium text-muted">{startup.kicker}</span>
              <span className="eyebrow !text-[12px]">
                {startup.seatsOpen > 0 ? `${startup.seatsOpen} of ${startup.seats} seats open` : "Waitlist"}
              </span>
            </div>
            <div>
              <h3 className="t-h3 !text-[1.5rem]">{startup.name}</h3>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="tnum font-display text-[2.8rem] font-extrabold leading-none tracking-tight text-mint">{startup.price}</span>
                <span className="text-[14px] text-muted">{startup.unit}</span>
              </p>
            </div>
            <div className="flex gap-3 rounded-2xl bg-cream p-4">
              <CalendarClock size={19} aria-hidden className="mt-0.5 flex-none text-brand" />
              <p className="text-[14.5px] leading-relaxed">
                <span className="font-medium">{startup.termsLead}</span> {startup.terms}
              </p>
            </div>
            <Link href="/ai-search-optimization" data-track="cta_link" data-from="pricing_startup" className="btn btn-md btn-light self-start">
              How the plan works
              <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
          <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="text-[14px] font-medium text-muted">Every month:</p>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {startup.items.map((it) => (
                <li key={it} className="grid grid-cols-[18px_1fr] gap-2.5 text-[15px]">
                  <Check size={16} aria-hidden className="mt-1 text-brand" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            {startup.extras.map((x) => (
              <p key={x} className="mt-3 text-[14px] text-muted">
                Plus, when it fits: {x.charAt(0).toLowerCase() + x.slice(1)}.
              </p>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-[15px] text-muted">
          How the AI side is measured:{" "}
          <Link href="/notes/track-ai-search-visibility" className="text-ink underline underline-offset-4">
            tracking AI search visibility
          </Link>
          . Free first step:{" "}
          <Link href="/ai-search-optimization#check" className="text-ink underline underline-offset-4">
            the AI crawler check
          </Link>
          .
        </p>
      </section>

      <section className="container-pad pb-8 pt-28 sm:pt-36">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">The terms</p>
            <h2 className="t-h2 mt-5 max-w-[18ch]">SEO contract terms you can count on</h2>
            <div className="mt-8 border-t border-line">
              {TERMS.map((x) => (
                <div
                  key={x.t}
                  className="grid grid-cols-[24px_1fr] items-start gap-4 border-b border-line py-5"
                >
                  <span className="mt-0.5 text-brand">{x.icon}</span>
                  <p>
                    <span className="block text-[16.5px] font-medium">{x.t}</span>
                    <span className="mt-1 block max-w-[48ch] text-[15px] leading-relaxed text-muted">
                      {x.b}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className="card-dark mt-10 p-7 sm:p-8">
              <span className="icon-tile">
                <Video size={21} aria-hidden />
              </span>
              <p className="mt-4 text-[17px] font-semibold">Not ready for a call?</p>
              <p className="mt-1.5 max-w-[46ch] text-[15px] text-muted">
                Email me your website and I&rsquo;ll send a free 5-minute screen recording of what
                I&rsquo;d fix first.
              </p>
              <EmailCta
                label="Ask for a video review"
                href={`mailto:${site.email}?subject=${encodeURIComponent("Video review")}`}
                from="pricing_video"
                size="md"
                className="mt-5"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">Questions</p>
            <div className="mt-8">
              <FaqList items={FAQ} />
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedNotes
        className="mt-20"
        title="Read before you choose an SEO plan"
        slugs={["how-long-does-seo-take", "hiring-an-seo-questions-to-ask", "roofing-seo-cost", "monthly-seo-report-contractors", "seo-vs-google-ads-contractors"]}
      />

      <Availability />
      <MobileCta />
    </>
  );
}
