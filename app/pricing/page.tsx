import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ban, CalendarClock, Check, KeyRound, Landmark, Video } from "lucide-react";
import { Availability } from "@/components/Availability";
import { RelatedNotes } from "@/components/RelatedNotes";
import { getNote } from "@/lib/notes";
import { BookCta, BookNote, EmailCta } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { agency, monthly, oneTime, startup, type Plan } from "@/lib/pricing";
import { site } from "@/lib/site";
import { FaqSchema } from "@/components/Faq";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SEO pricing in US dollars. A free intro call, a $300 tracking fix, a $750 site audit, a $1,800 setup sprint, and monthly plans from $600. AI search optimization at $1,000 a month. White-label for agencies from $850 a site.",
  alternates: { canonical: "/pricing" },
};

const TERMS = [
  {
    icon: <KeyRound size={19} aria-hidden />,
    t: "You own every account.",
    b: "Google Analytics, Search Console, your Business Profile, the site. If we stop working together, nothing is held back.",
  },
  {
    icon: <CalendarClock size={19} aria-hidden />,
    t: "3 months minimum on home service plans.",
    b: "SEO takes that long to show up in Google. After that it's month to month, with 30 days' notice to cancel. The software startup plan has no minimum: either side can stop with 30 days' notice.",
  },
  {
    icon: <Landmark size={19} aria-hidden />,
    t: "Invoices in US dollars.",
    b: "US clients pay by ACH bank transfer. In Australia or Europe, I'll send payment details that work from where you are.",
  },
  {
    icon: <Ban size={19} aria-hidden />,
    t: "Not included.",
    b: "Ad spend and ad management. Long-form articles are only in the software startup plan. If you need something else, I'll say so up front and point you to someone.",
  },
];

const FAQ = [
  {
    q: "Which one do I need?",
    a: "If you just want your calls and forms counted, the $300 Tracking Fix. If you don't know what else is wrong, start with the audit. If you know what's broken and want it fixed once, the Setup Sprint. If you want someone on it every month, Growth. The intro call is free if you'd rather ask me.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No, and be careful with anyone who does. Nobody controls Google. What you get is the work in your plan done every month, and a report that shows you what changed and what it did to your clicks and calls.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep everything: the accounts, the pages, the tracking. Give me 30 days' notice after the first three months and I'll hand it all over in order.",
  },
  {
    q: "Do you only work with home service businesses?",
    a: "Most of my work is roofers, pool deck, lawn and shutter companies, but I also work with clinics, shops and auto businesses at the same prices. Any business that wants to show up in AI answers can use the Search + AI plan, $1,000 a month.",
  },
];

function PlanCard({ p }: { p: Plan }) {
  return (
    <div
      id={p.key}
      className={`card flex h-full scroll-mt-28 flex-col gap-5 p-6 sm:p-7 ${p.pick ? "border-ink/60 shadow-float" : ""}`}
    >
      <div className="flex min-h-[24px] items-center justify-between gap-3">
        <span className="text-[14px] font-medium text-muted">{p.kicker}</span>
        {p.pick && <span className="eyebrow !text-[12px]">Most clients</span>}
      </div>
      <div>
        <h3 className="t-h3 !text-[1.5rem]">{p.name}</h3>
        <p className="mt-3 flex items-baseline gap-2">
          {p.from && <span className="text-[15px] text-muted">from</span>}
          <span className="tnum font-display text-[2.4rem] leading-none tracking-tight">
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
          ...(p.from ? { minPrice: p.amount } : { price: p.amount }),
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
    ...oneTime.map(offer),
    ...monthly.map(offer),
    offer(startup),
    ...agency.map((a) => ({
      "@type": "Offer",
      name: `Agency white-label: ${a.name}`,
      description: a.body,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: a.amount,
      },
      seller: { "@id": "https://koinophobe.com/#organization" },
    })),
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

      <section className="hero-bg">
        <div className="container-pad pb-14 pt-14 sm:pt-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Pricing</p>
            <h1 className="t-h1 mt-5 max-w-[20ch]">
              SEO pricing for home service businesses, before the call
            </h1>
            <p className="t-lead mt-6 max-w-[58ch]">
              Everything here is in US dollars, for businesses in the US, Australia and Europe.
              You&rsquo;re invoiced in USD. If you&rsquo;re not sure which one fits, the intro call is free and
              I&rsquo;ll tell you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="pricing_hero" />
              <EmailCta from="pricing_hero" />
            </div>
            <BookNote className="mt-4" />
          </Reveal>
        </div>
      </section>

      <section className="container-pad pt-6">
        <h2 className="t-h3">Start here: one-time</h2>
        <p className="mt-1.5 text-[15px] text-muted">A free call, an audit, or a one-off fix.</p>
        <Stagger className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {oneTime.map((p) => (
            <PlanCard key={p.key} p={p} />
          ))}
        </Stagger>
      </section>

      <section id="monthly" className="container-pad scroll-mt-28 pt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 className="t-h3">Monthly SEO plans</h2>
            <p className="mt-1.5 text-[15px] text-muted">Someone on it every month, with a report you can read.</p>
          </div>
          <p className="text-[14px] text-muted">3-month minimum, then month to month</p>
        </div>
        <Stagger className="mt-6 grid gap-4 md:grid-cols-3">
          {monthly.map((p) => (
            <PlanCard key={p.key} p={p} />
          ))}
        </Stagger>
      </section>

      <section id="startups" className="container-pad scroll-mt-28 pt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 className="t-h3">AI search optimization</h2>
            <p className="mt-1.5 text-[15px] text-muted">For any business that wants to be named by ChatGPT, Claude, Perplexity and Google&rsquo;s AI. Software startups get it as pull requests.</p>
          </div>
          <p className="text-[14px] text-muted">No contract, 30 days&rsquo; notice to stop</p>
        </div>
        <div id={startup.key} className="card mt-6 grid scroll-mt-28 gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
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
                <span className="tnum font-display text-[2.4rem] leading-none tracking-tight">{startup.price}</span>
                <span className="text-[14px] text-muted">{startup.unit}</span>
              </p>
            </div>
            <div className="flex gap-3 rounded-2xl bg-cream p-4 text-ink">
              <CalendarClock size={19} aria-hidden className="mt-0.5 flex-none text-brand" />
              <p className="text-[14.5px] leading-relaxed">
                <span className="font-medium">{startup.termsLead}</span> {startup.terms}
              </p>
            </div>
            <Link href="/ai-search-optimization" data-track="cta_link" data-from="pricing_startup" className="btn btn-md btn-secondary self-start">
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
        <p className="mt-4 text-[15px] text-muted">
          How the AI side is measured:{" "}
          <Link href="/notes/track-ai-search-visibility" className="text-ink underline underline-offset-4">
            tracking AI search visibility
          </Link>
          . Free first step:{" "}
          <Link href="/saas-seo#check" className="text-ink underline underline-offset-4">
            the AI crawler check
          </Link>
          .
        </p>
      </section>

      <section id="agencies" className="container-pad scroll-mt-28 pt-20">
        <h2 className="t-h3">White-label for agencies</h2>
        <p className="mt-1.5 text-[15px] text-muted">Technical SEO under your brand. You keep the client relationship.</p>
        <div className="card mt-6 px-6">
          {agency.map((a) => (
            <div
              key={a.name}
              className="grid gap-2 border-b border-line py-5 last:border-0 sm:grid-cols-[14ch_22ch_1fr] sm:gap-6"
            >
              <span className="font-medium">{a.name}</span>
              <span className="tnum font-display text-[1.2rem] leading-snug tracking-tight">
                {a.price}
              </span>
              <span className="text-[15px] text-muted">{a.body}</span>
            </div>
          ))}
        </div>
        {getNote("white-label-technical-seo-for-agencies") ? (
          <p className="mt-4 text-[15px] text-muted">
            How white-label works day to day:{" "}
            <Link href="/notes/white-label-technical-seo-for-agencies" className="text-ink underline underline-offset-4">
              white-label technical SEO for agencies
            </Link>
            .
          </p>
        ) : null}
      </section>

      <section className="container-pad pt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">The terms</p>
            <h2 className="t-h2 mt-5 max-w-[18ch]">What you can count on</h2>
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
            <div className="card mt-10 bg-surface p-6">
              <span className="text-brand">
                <Video size={22} aria-hidden />
              </span>
              <p className="mt-3 text-[16.5px] font-medium">Not ready for a call?</p>
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
            <div className="mt-8 border-t border-line">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-b border-line py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16.5px] font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="font-mono text-[18px] text-muted transition-transform duration-150 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedNotes
        className="mt-24"
        title="Before you choose a plan"
        slugs={["how-long-does-seo-take", "hiring-an-seo-questions-to-ask", "roofing-seo-cost", "monthly-seo-report-contractors", "seo-vs-google-ads-contractors"]}
      />

      <Availability />
      <MobileCta />
    </>
  );
}
