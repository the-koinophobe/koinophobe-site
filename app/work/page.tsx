import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BookCall } from "@/components/BookCall";
import { Spotlight } from "@/components/Spotlight";
import { caseStudies, projects } from "@/lib/content";
import { BrowserFrame } from "@/components/BrowserFrame";
import { OrbitRings } from "@/components/Decor";

export const metadata: Metadata = {
  title: "Work",
  description: "Anonymised results from white-label and direct client work.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0 -z-10" />
        <OrbitRings className="pointer-events-none absolute -right-28 -top-24 -z-10 w-[420px] text-ink/[0.05]" />
        <div className="container-pad pb-12 pt-36 sm:pt-40">
          <SectionHeading
            titleAs="h1"
            kicker="Work"
            title="Results, not just rankings"
            intro="Most of my work is white-label or under NDA, so it is shown by industry. The numbers are real."
          />
        </div>
      </section>

      <section className="container-pad py-10">
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((c, i) => (
            <Reveal key={c.industry} delay={(i % 2) * 0.08} className="h-full">
              <Spotlight className="lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/60 p-7">
                <TrendingUp
                  aria-hidden
                  strokeWidth={1}
                  className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-ink/[0.05]"
                />
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                    {c.industry}
                  </span>
                  <span className="font-mono text-xs text-muted/50">0{i + 1}</span>
                </div>

                <p className="mt-6 font-display text-2xl font-semibold leading-snug text-ink sm:text-[1.7rem]">
                  {c.result}
                </p>

                <dl className="mt-6 space-y-4 border-t border-line pt-5 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted/70">
                      The problem
                    </dt>
                    <dd className="mt-1 text-muted">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted/70">
                      What I did
                    </dt>
                    <dd className="mt-1 text-muted">{c.work}</dd>
                  </div>
                </dl>

                {c.slug && (
                  <a
                    href={`/work/${c.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand"
                  >
                    Read the full case study
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                )}
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SELECTED BUILDS GALLERY */}
      <section className="container-pad py-12">
        <SectionHeading
          kicker="Selected builds"
          title="Sites I've built and run"
          intro="Fifteen of the live sites in my portfolio, across roofing, real estate, wellness, home services and more."
        />
        <div className="mt-10 grid auto-rows-[220px] grid-cols-1 gap-4 [grid-auto-flow:dense] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((p, i) => {
            const featuredNames = [
              "Palm Bay Marketing SEO",
              "Krupption / Brevard Pool Deck Repair",
              "Over The Table Top",
            ];
            const featured = featuredNames.includes(p.name);
            return (
              <Reveal
                key={p.name}
                delay={(i % 4) * 0.05}
                className={`h-full ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
              >
                <BrowserFrame project={p} />
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-pad py-16">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-line bg-surface/50 p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Want results like these on your sites?
            </h2>
            <BookCall label="Book a call" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
