import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MousePointerClick,
  BarChart3,
  MapPin,
  Crosshair,
  Activity,
  BadgeCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { Parallax } from "@/components/Parallax";
import { SectionHeading } from "@/components/SectionHeading";
import { BookCall } from "@/components/BookCall";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Marquee } from "@/components/Marquee";
import { Stat } from "@/components/Stat";
import { ResultsPanel } from "@/components/ResultsPanel";
import { AISection } from "@/components/AISection";
import { Carousel } from "@/components/Carousel";
import { ToolsStrip } from "@/components/ToolsStrip";
import { GrowthLine } from "@/components/GrowthLine";
import { Ripples, Blob } from "@/components/Decor";
import { WordRise } from "@/components/WordRise";
import { Spotlight } from "@/components/Spotlight";
import { capabilities, services, projects, faqs, packages, process } from "@/lib/content";
import { stats } from "@/lib/site";

const capIcons = [Search, MousePointerClick, BarChart3, MapPin];
const procIcons = [Crosshair, Activity, BadgeCheck];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="stack-sections">
      {/* HERO — split: message + live results */}
      <section className="grain relative overflow-hidden">
        <div className="container-pad grid items-center gap-12 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Freelance SEO &amp; conversion tracking
              </span>
            </Reveal>

            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl">
              <WordRise
                delay={0.1}
                tokens={[
                  { t: "SEO" },
                  { t: "that" },
                  { t: "proves" },
                  { t: "it," },
                  { t: "in" },
                  { t: "leads,", className: "accent text-[1.05em]" },
                  { t: "not" },
                  { t: "rankings." },
                ]}
              />
            </h1>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg text-muted">
                I&apos;m Michael, the specialist behind Koinophobe. I grow your
                organic traffic and wire up the tracking that proves it turns into
                calls, forms, and revenue.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <BookCall label="Book a call" />
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand"
                >
                  See the proof
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <Check size={14} strokeWidth={2.5} className="text-accent" /> Free site teardown
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} strokeWidth={2.5} className="text-accent" /> Tracking on every lead
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} strokeWidth={2.5} className="text-accent" /> White-label friendly
                </span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ResultsPanel />
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Reveal>
        <Marquee />
      </Reveal>

      {/* STATS */}
      <section className="container-pad py-16">
        <GrowthLine className="mb-10" />
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </dl>
        </Reveal>
      </section>

      {/* TOOLS STRIP */}
      <section className="container-pad py-10">
        <ToolsStrip />
      </section>

      {/* PROCESS */}
      <section className="container-pad py-12">
        <SectionHeading
          kicker="How I work"
          title="Rank for buyers. Track it. Prove it converts."
          intro="The difference between traffic and a business outcome is measurement. I do both halves."
        />
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {process.map((p, i) => {
            const Icon = procIcons[i % procIcons.length];
            return (
              <div
                key={p.step}
                className="lift h-full rounded-3xl border border-line bg-surface/60 p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
                {p.image && (
                  <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-bg">
                    <Image
                      src={p.image}
                      alt={`${p.title} example`}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </Stagger>
      </section>

      {/* CAPABILITIES — bento */}
      <section className="container-pad py-12">
        <SectionHeading
          kicker="What I do"
          title="SEO and the tracking that backs it up"
          intro="The work that gets you found, and the measurement that proves it paid off."
        />
        <Stagger className="mt-10 grid auto-rows-fr grid-cols-2 gap-4 lg:grid-cols-6">
          {capabilities.map((c, i) => {
            const span =
              i === 0 ? "lg:col-span-3" : i === 1 ? "lg:col-span-3" : "lg:col-span-2";
            const Icon = capIcons[i % capIcons.length];
            return (
              <div key={c.title} className={`col-span-2 ${span}`}>
                <Spotlight className="lift flex h-full flex-col rounded-3xl border border-line bg-surface/60 p-7">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted">{c.body}</p>
                </Spotlight>
              </div>
            );
          })}
          <div className="col-span-2 lg:col-span-2">
            <div className="grain pattern-on-brand relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-brand p-7 text-bg">
              <span className="text-xs font-semibold uppercase tracking-wider text-bg/70">
                The standard
              </span>
              <p className="font-display text-2xl font-semibold leading-tight">
                No vanity metrics.
                <br />
                Only what <span className="font-serif italic font-medium">converts.</span>
              </p>
            </div>
          </div>
        </Stagger>
      </section>

      {/* AI */}
      <AISection />

      {/* WEB DESIGN CAROUSEL */}
      <section className="container-pad py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Web design"
            title="Sites I've built to rank and convert"
            intro="Fast, clean builds with SEO and tracking baked in from day one. Swipe through a few."
          />
          <Reveal>
            <Link
              href="/work"
              className="hidden rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand sm:inline-flex"
            >
              View all work
            </Link>
          </Reveal>
        </div>
        <div className="mt-10">
          <Carousel projects={projects.slice(0, 6)} />
        </div>
      </section>

      {/* AUDIENCE SPLIT */}
      <section className="container-pad py-12">
        <SectionHeading center kicker="Two ways to work with me" title="Pick your lane" />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {[services.agencies, services.businesses].map((s, idx) => (
            <Reveal key={s.kicker} delay={idx * 0.08}>
              <div
                className={`lift flex h-full flex-col rounded-3xl p-8 ${
                  idx === 0
                    ? "grain pattern-on-brand relative overflow-hidden bg-brand text-bg"
                    : "border border-line bg-surface/60 text-ink"
                }`}
              >
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    idx === 0 ? "text-bg/70" : "text-brand"
                  }`}
                >
                  {s.kicker}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
                <p className={`mt-3 ${idx === 0 ? "text-bg/80" : "text-muted"}`}>{s.body}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        strokeWidth={2.25}
                        className={`mt-0.5 shrink-0 ${idx === 0 ? "text-bg" : "text-brand"}`}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <BookCall label={s.cta} subtle={idx === 0} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="container-pad py-12">
        <SectionHeading
          center
          kicker="Pricing"
          title="Simple ways to work together"
          intro="Start with an audit, grow with a retainer, or plug me into your agency. Clear scope, clear reporting."
        />
        <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Spotlight
              key={pkg.name}
              className={`lift relative flex h-full flex-col rounded-3xl p-8 ${
                pkg.highlight
                  ? "border-2 border-brand bg-surface/80 shadow-sm"
                  : "border border-line bg-surface/60"
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-bg">
                  Most popular
                </span>
              )}
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                {pkg.price}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{pkg.name}</h3>
              <p className="mt-2 text-sm text-muted">{pkg.tagline}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-ink">
                    <Check size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <BookCall label={pkg.cta} subtle={!pkg.highlight} />
              </div>
            </Spotlight>
          ))}
        </Stagger>
        <p className="mt-6 text-center text-sm text-muted">
          Not sure which fits? <a href="/contact" className="text-brand">Get a free teardown</a> and I&apos;ll tell you straight.
        </p>
      </section>

      {/* REVIEWS */}
      <section className="container-pad py-16">
        <SectionHeading
          center
          kicker="Reviews"
          title="What people say"
          intro="A few words from agencies and business owners I have worked with."
        />
        <div className="mt-10">
          <Reviews />
        </div>
      </section>

      {/* FAQ */}
      <section className="container-pad py-12">
        <SectionHeading center kicker="FAQ" title="Good questions, answered" />
        <div className="mt-10">
          <FAQ />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="container-pad py-20">
        <Reveal>
          <div className="grain hero-wash relative isolate overflow-hidden rounded-[2rem] border border-line p-10 text-center sm:p-16">
            <Ripples className="drift pointer-events-none absolute -right-20 -top-24 -z-10 w-[360px] text-brand/[0.07]" />
            <Blob className="drift-slow pointer-events-none absolute -bottom-24 -left-20 -z-10 w-[280px] text-accent/[0.05]" />
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Let&apos;s turn your search traffic into{" "}
              <span className="accent">leads</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-muted">
              Tell me what&apos;s on your plate. I reply quickly, and I&apos;ll tell
              you straight if I&apos;m not the right fit.
            </p>
            <div className="mt-8 flex justify-center">
              <BookCall label="Book a call" />
            </div>
          </div>
        </Reveal>
      </section>
      </div>
    </>
  );
}
