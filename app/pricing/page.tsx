import type { Metadata } from "next";
import Link from "next/link";
import { Ban, CalendarClock, Check, KeyRound, Landmark, Video } from "lucide-react";
import { Availability } from "@/components/Availability";
import { BookCta, BookNote, CtaBand, EmailCta } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { agency, monthly, oneTime, type Plan } from "@/lib/pricing";
import { site } from "@/lib/site";
import { FaqSchema } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SEO pricing in US dollars. A free intro call, a $750 site audit, a $1,800 setup sprint, and monthly plans from $600. White-label for agencies from $850 a site.",
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
    t: "3 months minimum on monthly plans.",
    b: "SEO takes that long to show up in Google. After that it's month to month, with 30 days' notice to cancel.",
  },
  {
    icon: <Landmark size={19} aria-hidden />,
    t: "Invoices in US dollars.",
    b: "You pay by ACH bank transfer, the same way you'd pay any US vendor.",
  },
  {
    icon: <Ban size={19} aria-hidden />,
    t: "Not included.",
    b: "Ad spend, ad management and long-form blog writing. If you need those, I'll say so up front and point you to someone.",
  },
];

const FAQ = [
  {
    q: "Which one do I need?",
    a: "If you don't know whether your calls and forms are being tracked, start with the audit. If you know what's broken and want it fixed once, the Setup Sprint. If you want someone on it every month, Growth. The intro call is free if you'd rather ask me.",
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
    a: "Most of my work is roofers, pool deck, lawn and shutter companies, but I also work with clinics, shops and auto businesses. Same prices.",
  },
  {
    q: "What hours do you work?",
    a: "9 to 5 Eastern. I reply to email the same business day.",
  },
];

function PlanCard({ p }: { p: Plan }) {
  return (
    <div
      className={`flex h-full flex-col gap-5 rounded-md border bg-surface p-6 sm:p-7 ${
        p.pick ? "border-ink shadow-[inset_0_0_0_1px_rgb(var(--ink))]" : "border-line"
      }`}
    >
      <div className="flex min-h-[24px] items-center justify-between gap-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          {p.kicker}
        </span>
        {p.pick && (
          <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-bg">
            Most clients
          </span>
        )}
      </div>
      <div>
        <h3 className="font-display text-[1.5rem] leading-tight tracking-tight">{p.name}</h3>
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
  areaServed: { "@type": "Country", name: "United States" },
});

const pricingLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Koinophobe pricing",
  url: "https://koinophobe.com/pricing",
  itemListElement: [
    ...oneTime.map(offer),
    ...monthly.map(offer),
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

      <section className="pt-28 sm:pt-36">
        <div className="container-pad">
          <Reveal>
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-4 max-w-[19ch] font-display text-[clamp(2.2rem,5.4vw,4.05rem)] leading-[1.04] tracking-tight text-balance">
              For owners who want the price before the call.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17.5px] text-muted">
              Everything here is in US dollars. You&rsquo;re invoiced in USD and pay by ACH bank
              transfer. If you&rsquo;re not sure which one fits, the intro call is free and
              I&rsquo;ll tell you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <BookCta from="pricing_hero" />
              <EmailCta from="pricing_hero" />
            </div>
            <BookNote className="mt-4" />
          </Reveal>
        </div>
      </section>

      <section className="container-pad pt-20">
        <h2 className="eyebrow-flat">Start here</h2>
        <Stagger className="mt-6 grid gap-4 md:grid-cols-3">
          {oneTime.map((p) => (
            <PlanCard key={p.key} p={p} />
          ))}
        </Stagger>
      </section>

      <section className="container-pad pt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="eyebrow-flat">Monthly</h2>
          <p className="font-mono text-[11px] text-muted">
            3-month minimum, then month to month
          </p>
        </div>
        <Stagger className="mt-6 grid gap-4 md:grid-cols-3">
          {monthly.map((p) => (
            <PlanCard key={p.key} p={p} />
          ))}
        </Stagger>
      </section>

      <section className="container-pad pt-16">
        <h2 className="eyebrow-flat">For agencies</h2>
        <div className="mt-6 border-t border-line">
          {agency.map((a) => (
            <div
              key={a.name}
              className="grid gap-2 border-b border-line py-5 sm:grid-cols-[14ch_22ch_1fr] sm:gap-6"
            >
              <span className="font-medium">{a.name}</span>
              <span className="tnum font-display text-[1.2rem] leading-snug tracking-tight">
                {a.price}
              </span>
              <span className="text-[15px] text-muted">{a.body}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[15px] text-muted">
          How white-label works day to day is on the{" "}
          <Link href="/about" className="text-ink underline underline-offset-4">
            about page
          </Link>
          .
        </p>
      </section>

      <section className="container-pad pt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">The terms</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
              What you can count on.
            </h2>
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
            <div className="mt-10 rounded-md border border-line bg-surface p-6">
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

      <section className="pt-24">
        <CtaBand line="Not sure which one fits? That's what the free call is for." from="pricing_end" />
      </section>

      <Availability />
      <MobileCta />
    </>
  );
}
