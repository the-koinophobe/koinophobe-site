import Link from "next/link";
import {
  Search,
  MousePointerClick,
  BarChart3,
  MapPin,
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
import { SerpDemo } from "@/components/SerpDemo";
import { ShaderAurora } from "@/components/ShaderAurora";
import { AISection } from "@/components/AISection";
import { Carousel } from "@/components/Carousel";
import { ToolsStrip } from "@/components/ToolsStrip";
import { OrbitRings, DotMatrix, TopoField, WaveLines } from "@/components/Decor";
import { WordRise } from "@/components/WordRise";
import { Spotlight } from "@/components/Spotlight";
import { ProcessPinned } from "@/components/ProcessPinned";
import { BigMarquee } from "@/components/BigMarquee";
import { capabilities, services, projects, faqs, packages } from "@/lib/content";
import { stats } from "@/lib/site";

const capIcons = [Search, MousePointerClick, BarChart3, MapPin];

// Only direct clients get named publicly. Everything else is white-label or
// under NDA, so it stays anonymous.
const directClients = [
  "Over The Table Top",
  "Tintlordz Auto Spa",
  "Palm Bay Marketing SEO",
  "Lumagrid Solar",
];

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
      <div>
      {/* HERO — full-width statement + live results */}
      <section className="grain relative overflow-hidden">
        <div className="hero-aurora pointer-events-none" aria-hidden />
        <ShaderAurora className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <div className="container-pad pb-16 pt-40 sm:pt-44">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Freelance SEO &amp; conversion tracking
            </span>
          </Reveal>

          <h1 className="mt-4 font-display text-[clamp(2.75rem,7.2vw,6.75rem)] font-semibold leading-[0.98] tracking-tight text-ink">
            <span className="block">
              <WordRise
                delay={0.1}
                tokens={[{ t: "SEO" }, { t: "that" }, { t: "proves" }, { t: "it," }]}
              />
            </span>
            <span className="block">
              <WordRise
                delay={0.34}
                tokens={[
                  { t: "in" },
                  { t: "leads,", className: "accent" },
                  { t: "not" },
                  { t: "rankings.", className: "text-outline" },
                ]}
              />
            </span>
          </h1>

          <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <Reveal delay={0.12}>
                <p className="max-w-xl text-lg text-muted sm:text-xl">
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

              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-6">
                  <div>
                    <div className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      3.2×
                    </div>
                    <div className="mt-0.5 text-xs text-muted">organic clicks, 6 months</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      787K
                    </div>
                    <div className="mt-0.5 text-xs text-muted">impressions tracked</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      6.1%
                    </div>
                    <div className="mt-0.5 text-xs text-muted">peak CTR</div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <SerpDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Reveal>
        <Marquee />
      </Reveal>

      {/* STATS — dark band with live results */}
      <section className="dark relative overflow-hidden bg-bg py-16 sm:py-20">
        <OrbitRings className="pointer-events-none absolute -right-24 -top-28 w-[440px] text-ink/[0.05]" />
        <div className="container-pad">
          <SectionHeading
            kicker="Proof"
            title="Numbers from live client work"
            intro="Real Search Console data from sites I build, rank and track. No projections, no stock screenshots."
          />
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <Reveal>
              <ResultsPanel />
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
                {stats.map((s) => (
                  <Stat key={s.label} value={s.value} label={s.label} />
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLIENT WALL */}
      <section className="container-pad relative overflow-hidden py-14">
        <DotMatrix className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[560px] -translate-x-1/2 -translate-y-1/2 text-ink/[0.04]" />
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
            Built for businesses like
          </p>
        </Reveal>
        <Stagger className="mx-auto mt-8 flex max-w-4xl flex-wrap items-baseline justify-center gap-x-8 gap-y-3">
          {projects
            .filter((p) => directClients.includes(p.name))
            .map((p, i) => (
              <span
                key={p.name}
                className={`${
                  i % 2 === 1
                    ? "font-serif italic text-brand/60"
                    : "font-display text-muted/50"
                } text-xl font-semibold transition-colors duration-300 hover:text-ink sm:text-2xl`}
              >
                {p.name}
              </span>
            ))}
          <span className="font-display text-xl font-semibold text-muted/50 transition-colors duration-300 hover:text-ink sm:text-2xl">
            and more
          </span>
        </Stagger>
      </section>

      {/* TOOLS STRIP */}
      <section className="container-pad py-10">
        <ToolsStrip />
      </section>

      {/* PROCESS — pinned horizontal scroll */}
      <div className="relative bg-bg">
        <ProcessPinned />
      </div>

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

      {/* BIG MARQUEE */}
      <BigMarquee />

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

      {/* MISSION — the name, writ large */}
      <section className="dark relative overflow-hidden bg-bg py-20 sm:py-28">
        <TopoField className="pointer-events-none absolute inset-0 h-full w-full text-ink/[0.05]" />
        <div className="container-pad text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              Why &ldquo;Koinophobe&rdquo;
            </span>
            <p className="mx-auto mt-5 max-w-4xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Koinophobia: <span className="accent">the fear of being ordinary.</span>
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              It is the standard every build, every page and every report gets
              held to. If the work does not move a number that matters, it does
              not ship.
            </p>
          </Reveal>
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

      {/* CTA BAND — full-bleed, oversized */}
      <section className="dark relative overflow-hidden bg-bg py-24 sm:py-32">
        <OrbitRings className="drift pointer-events-none absolute -right-24 -top-32 w-[460px] text-ink/[0.06]" />
        <WaveLines className="pointer-events-none absolute -bottom-6 left-0 w-full text-ink/[0.05]" />
        <div className="container-pad relative isolate text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              Next step
            </span>
            <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Let&apos;s turn your search traffic into{" "}
              <span className="accent">leads</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-muted sm:text-lg">
              Tell me what&apos;s on your plate. I reply quickly, and I&apos;ll tell
              you straight if I&apos;m not the right fit.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <BookCall label="Book a call" />
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand"
              >
                Get a free teardown
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      </div>
    </>
  );
}
