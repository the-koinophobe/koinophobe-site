import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { CharReveal } from "@/components/CharReveal";
import { WordRise } from "@/components/WordRise";
import { WhatsAppButton } from "@/components/gbp/WhatsAppButton";
import { MapPack } from "@/components/gbp/MapPack";
import { GbpFaq } from "@/components/gbp/GbpFaq";
import { GbpThemeToggle } from "@/components/gbp/GbpThemeToggle";
import { Vsl } from "@/components/gbp/Vsl";
import { Bolt, Burst, GhostStars, Sparkle, Star } from "@/components/gbp/Stickers";
import { site } from "@/lib/site";
import {
  DELIVERY_DAYS,
  PRICE_FROM,
  PRICE_FROM_NUMERIC,
  PRICE_MONTHLY,
  anchors,
  deliverables,
  faqs,
  heroFacts,
  included,
  objections,
  painPoints,
  proofStats,
  timeline,
  vslChapters,
} from "@/lib/gbp";

const title = "Get your business on Google Maps";
const description = `Google Business Profile setup and verification for Nigerian businesses. Claimed, verified, built out and sending you calls in ${DELIVERY_DAYS} days. From ${PRICE_FROM}, fixed.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/google-business-profile" },
  openGraph: {
    type: "website",
    url: "https://koinophobe.com/google-business-profile",
    siteName: site.name,
    title: `${title} — ${site.name}`,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Google Business Profile setup and verification",
      serviceType: "Local SEO",
      description,
      provider: {
        "@type": "ProfessionalService",
        name: site.name,
        url: "https://koinophobe.com",
        founder: { "@type": "Person", name: site.owner },
      },
      areaServed: { "@type": "Country", name: "Nigeria" },
      offers: {
        "@type": "Offer",
        priceCurrency: "NGN",
        price: PRICE_FROM_NUMERIC,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "NGN",
          minPrice: PRICE_FROM_NUMERIC,
        },
        availability: "https://schema.org/InStock",
        url: "https://koinophobe.com/google-business-profile",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// Forest card: hard edge, hard offset shadow, no blur anywhere.
const card =
  "rounded-[26px] border-[3px] border-[rgb(var(--edge))] bg-surface shadow-[6px_6px_0_0_rgb(var(--edge))]";

// page    = on the pale lime page background
// onDark  = on the deep green band
// onLime  = on the acid lime band
type Tone = "page" | "onDark" | "onLime";

const headTones: Record<Tone, { chip: string; title: string; intro: string }> = {
  page: { chip: "bg-brand text-[rgb(var(--edge))]", title: "text-ink", intro: "text-muted" },
  onDark: { chip: "bg-brand text-[rgb(var(--edge))]", title: "text-bg", intro: "text-bg/80" },
  onLime: { chip: "bg-surface text-ink", title: "text-[rgb(var(--edge))]", intro: "text-[rgb(var(--edge)/0.75)]" },
};

function Head({
  kicker,
  title: heading,
  intro,
  center = false,
  tone = "page",
}: {
  kicker: string;
  title: string;
  intro?: string;
  center?: boolean;
  tone?: Tone;
}) {
  const t = headTones[tone];
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <span
        className={`mb-4 inline-block rounded-full border-[3px] border-[rgb(var(--edge))] px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_0_rgb(var(--edge))] ${t.chip}`}
      >
        {kicker}
      </span>
      <h2
        className={`font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl ${t.title}`}
      >
        <CharReveal text={heading} />
      </h2>
      {intro && <p className={`mt-5 text-lg ${t.intro}`}>{intro}</p>}
    </Reveal>
  );
}

// Applied before paint so a returning visitor never sees the wrong theme flash.
const themeScript = `(function(){try{if(localStorage.getItem('gbp-theme')==='light'){document.documentElement.classList.add('gbp-light')}else{document.documentElement.classList.remove('gbp-light')}}catch(e){}})()`;

export default function GoogleBusinessProfilePage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <div className="gbp-theme min-h-screen bg-bg text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* STICKY BAR — pill, one action, no links off the page */}
      <div className="sticky top-3 z-50 px-4 sm:top-5 sm:px-8">
        <div className="mx-auto flex max-w-content items-center gap-3">
          <div className="flex flex-1 items-center gap-4 rounded-full border-[3px] border-[rgb(var(--edge))] bg-surface px-5 py-2.5 shadow-[5px_5px_0_0_rgb(var(--edge))] sm:gap-7 sm:px-7 sm:py-3">
            <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={35}
                priority
                className="gbp-logo h-6 w-auto"
              />
              <span className="font-display text-base font-bold tracking-tight text-ink">
                {site.name}
              </span>
            </Link>
            <span className="hidden h-6 w-[2px] bg-[rgb(var(--edge))] lg:block" aria-hidden />
            <nav className="hidden items-center gap-6 lg:flex">
              {anchors.map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  className="text-sm font-semibold text-ink transition-colors hover:text-[rgb(var(--deep))]"
                >
                  {a.label}
                </a>
              ))}
            </nav>
          </div>
          <GbpThemeToggle />
          <WhatsAppButton
            location="sticky_bar"
            label="WhatsApp"
            variant="accent"
            className="shrink-0"
          />
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
        <GhostStars className="ghost-fade pointer-events-none absolute inset-0 h-full w-full text-[rgb(var(--edge)/0.05)]" />

        <div className="container-pad relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            {/* LEFT */}
            <div>
              <Reveal>
                <span className="mb-7 inline-flex items-center gap-2 rounded-full border-[3px] border-[rgb(var(--edge))] bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-bg shadow-[3px_3px_0_0_rgb(var(--edge))]">
                  For Nigerian businesses
                </span>
              </Reveal>

              <h1 className="font-display text-[clamp(2.75rem,6.6vw,5.5rem)] font-bold leading-[0.98] tracking-tight text-[rgb(var(--deep))]">
                <span className="block">
                  <WordRise delay={0.1} tokens={[{ t: "Get" }, { t: "on" }, { t: "Maps." }]} />
                </span>
                <span className="flex flex-wrap items-center gap-x-4">
                  <WordRise delay={0.3} tokens={[{ t: "Get" }, { t: "called." }]} />
                  <Burst className="inline-block h-8 w-8 shrink-0 text-brand sm:h-11 sm:w-11" />
                </span>
              </h1>

              <Reveal delay={0.12}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/85">
                  Most Nigerian businesses either have no Google Business Profile or one
                  that never made it through verification. I claim yours, get it verified,
                  and build it out until it produces calls and WhatsApp messages instead of
                  sitting there.
                </p>
              </Reveal>

              {/* STACKED FACT + CTA CARDS */}
              <Reveal delay={0.2}>
                <div className="relative mt-11 max-w-md">
                  <Sparkle className="absolute -left-3 -top-5 z-20 h-10 w-10 text-brand" />

                  <div className={`${card} relative z-10 flex items-stretch divide-x-[3px] divide-[rgb(var(--edge))]`}>
                    {heroFacts.map((f) => (
                      <div key={f.label} className="flex-1 px-5 py-4">
                        <div className="font-display text-2xl font-bold tracking-tight text-[rgb(var(--deep))]">
                          {f.value}
                        </div>
                        <div className="mt-0.5 text-xs font-medium text-muted">{f.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="relative -mt-4 ml-8 flex flex-wrap items-center gap-3 rounded-[26px] border-[3px] border-[rgb(var(--edge))] bg-brand-soft px-4 pb-4 pt-8 shadow-[6px_6px_0_0_rgb(var(--edge))]">
                    <WhatsAppButton location="hero" label="Send a WhatsApp message" />
                    <span className="font-display text-lg font-bold tracking-tight text-ink">
                      From {PRICE_FROM}
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-ink/80">
                  {objections.map((o) => (
                    <li key={o} className="flex items-center gap-1.5">
                      <Check size={15} strokeWidth={3} className="text-[rgb(var(--deep))]" />
                      {o}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* RIGHT — collage */}
            <Reveal delay={0.22}>
              <div className="relative mx-auto w-full max-w-lg">
                <Star
                  stroke={false}
                  className="absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-[52%] text-brand-soft"
                />
                <Bolt className="absolute -right-6 -top-8 z-20 h-20 w-14 text-accent" />
                <Bolt className="absolute -bottom-4 -left-7 z-20 h-16 w-11 rotate-[200deg] text-accent" />
                <div className="relative z-10">
                  <MapPack />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VSL */}
      <section id="watch" className="container-pad scroll-mt-28 py-16">
        <Head
          kicker="Watch first"
          title="Three minutes on why nobody finds you on Maps."
          intro="If you would rather see it than read it, start here. No signup, no email, it just plays."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
          <Reveal>
            <Vsl />
          </Reveal>

          <Reveal delay={0.1}>
            <div className={`${card} flex h-full flex-col p-7`}>
              <span className="inline-block self-start rounded-full border-[3px] border-[rgb(var(--edge))] bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[rgb(var(--edge))]">
                In the video
              </span>
              <ul className="mt-6 flex-1 space-y-4">
                {vslChapters.map((c) => (
                  <li key={c.at} className="flex gap-3.5">
                    <span className="font-mono text-xs font-bold text-[rgb(var(--deep))]">{c.at}</span>
                    <span className="text-sm font-medium leading-snug text-ink">
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <WhatsAppButton
                  location="vsl"
                  label="Skip it, just message me"
                  variant="primary"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="container-pad scroll-mt-28 py-16">
        <Head
          kicker="Sound familiar"
          title="The listing is not the hard part. Getting it live is."
          intro="Four things stop almost every Nigerian business from showing up on the map. All four are fixable in a week."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {painPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className={`${card} h-full p-7 transition-transform hover:-translate-y-1`}>
                <span className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-[rgb(var(--edge))] bg-brand font-mono text-sm font-bold text-[rgb(var(--edge))]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section id="whats-included" className="container-pad scroll-mt-28 py-16">
        <Head
          kicker="What you get"
          title="Everything, done for you, in one week."
          intro="Not a checklist emailed to you. The work itself, finished, with the profile in your name at the end of it."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((d, i) => (
            <Reveal key={d.title} delay={(i % 4) * 0.05}>
              <div className={`${card} h-full p-6 transition-transform hover:-translate-y-1`}>
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border-[3px] border-[rgb(var(--edge))] ${
                    i % 2 === 0 ? "bg-brand text-[rgb(var(--edge))]" : "bg-accent text-bg"
                  }`}
                >
                  <Check size={17} strokeWidth={3.2} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-base font-bold tracking-tight text-ink">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-pad py-16">
        <Head kicker="How the week goes" title="Seven days, three stages." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {timeline.map((t, i) => (
            <Reveal key={t.day} delay={i * 0.06}>
              <div className={`${card} h-full p-7`}>
                <span className="inline-block rounded-full border-[3px] border-[rgb(var(--edge))] bg-accent px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-bg">
                  {t.day}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
                  {t.title}
                </h3>
                <p className="mt-2.5 text-muted">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROOF — full-bleed lime band */}
      <section className="relative overflow-hidden border-y-[3px] border-[rgb(var(--edge))] bg-accent py-20">
        <GhostStars className="ghost-fade pointer-events-none absolute inset-0 h-full w-full text-bg/[0.09]" />
        <Bolt className="pointer-events-none absolute right-4 top-8 h-16 w-11 text-brand" />
        <div className="container-pad relative">
          <Head
            tone="onDark"
            kicker="Who is doing the work"
            title="I do this for agencies abroad. Same work, priced for here."
            intro="I run technical SEO, local search and analytics for a US marketing agency and its clients. This page is the same discipline, scoped down to the one thing most Nigerian businesses are missing."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {proofStats.map((s) => (
              <div
                key={s.label}
                className="rounded-[26px] border-[3px] border-[rgb(var(--edge))] bg-surface p-6 shadow-[6px_6px_0_0_rgb(var(--edge))]"
              >
                <div className="font-display text-4xl font-bold tracking-tight text-[rgb(var(--deep))] sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="container-pad scroll-mt-28 py-20">
        <Head kicker="Price" title="One payment. No retainer, unless you want one." center />

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-3xl">
            <Burst className="absolute -right-4 -top-6 z-20 h-12 w-12 text-brand" />
            <div className="overflow-hidden rounded-[30px] border-[3px] border-[rgb(var(--edge))] bg-surface shadow-[10px_10px_0_0_rgb(var(--edge))]">
              <div className="grid gap-8 p-8 sm:grid-cols-[0.9fr_1.1fr] sm:p-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Setup and verification
                  </span>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-sm font-bold text-muted">From</span>
                    <span className="font-display text-5xl font-bold tracking-tight text-[rgb(var(--deep))]">
                      {PRICE_FROM}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted">
                    Final price is agreed before I start and depends on whether the listing
                    already exists, and whether it is suspended.
                  </p>
                  <div className="mt-7">
                    <WhatsAppButton location="pricing" label="Ask what yours costs" />
                  </div>
                </div>

                <div className="sm:border-l-[3px] sm:border-[rgb(var(--edge))] sm:pl-8">
                  <ul className="space-y-2.5 text-sm">
                    {included.map((line) => (
                      <li key={line} className="flex items-start gap-2.5 font-medium text-ink">
                        <Check
                          size={16}
                          strokeWidth={3.2}
                          className="mt-0.5 shrink-0 text-[rgb(var(--deep))]"
                          aria-hidden
                        />
                        {line}
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5 pt-1 text-muted">
                      <X size={16} strokeWidth={3.2} className="mt-0.5 shrink-0" aria-hidden />
                      No website build, no ads management, not in this price
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t-[3px] border-[rgb(var(--edge))] bg-brand-soft px-8 py-5 text-sm text-ink sm:px-10">
                Want it kept alive afterwards? Weekly posts, review replies and a monthly
                report on calls and direction requests, from{" "}
                <span className="font-bold text-[rgb(var(--deep))]">{PRICE_MONTHLY}</span> a month.
                Optional, cancel whenever.
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-pad scroll-mt-28 py-16">
        <Head kicker="Questions" title="The things people ask first." center />
        <div className="mt-12">
          <GbpFaq items={faqs} />
        </div>
      </section>

      {/* CTA BAND — full-bleed emerald */}
      <section className="relative overflow-hidden border-y-[3px] border-[rgb(var(--edge))] bg-brand py-24 sm:py-28">
        <GhostStars className="ghost-fade pointer-events-none absolute inset-0 h-full w-full text-[rgb(var(--edge)/0.07)]" />
        <Bolt className="pointer-events-none absolute right-[8%] top-10 h-20 w-14 text-accent" />
        <Sparkle className="pointer-events-none absolute bottom-12 left-[7%] h-12 w-12 text-accent" />
        <div className="container-pad relative isolate text-center">
          <Reveal>
            <span className="inline-block rounded-full border-[3px] border-[rgb(var(--edge))] bg-surface px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink shadow-[3px_3px_0_0_rgb(var(--edge))]">
              Next step
            </span>
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-[rgb(var(--edge))] sm:text-6xl">
              Send me your business name. I&apos;ll tell you what Google already has on
              you.
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-[rgb(var(--edge)/0.75)] sm:text-lg">
              Free, takes me a few minutes, and you get a straight answer on whether this is
              worth paying for in your case.
            </p>
            <div className="mt-10 flex justify-center">
              <WhatsAppButton location="cta_band" variant="onBright" className="px-8 py-4" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="bg-bg">
        <div className="container-pad flex flex-col items-center justify-between gap-3 py-8 text-sm font-medium text-muted sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} {site.name}. {site.owner}.
          </span>
          <div className="flex items-center gap-5">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-[rgb(var(--deep))]">
              Main site
              <ArrowRight size={14} strokeWidth={2.6} />
            </Link>
            <Link href="/privacy" className="hover:text-[rgb(var(--deep))]">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
