import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BookCall } from "@/components/BookCall";
import { caseStudies, projects } from "@/lib/content";
import { BrowserFrame } from "@/components/BrowserFrame";

export const metadata: Metadata = {
  title: "Work",
  description: "Anonymised results from white-label and direct client work.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0 -z-10" />
        <div className="container-pad pb-12 pt-16 sm:pt-20">
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
            <Reveal key={c.industry} delay={(i % 2) * 0.08}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-surface/60 p-7">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {c.industry}
                </span>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-ink">The problem</dt>
                    <dd className="mt-1 text-muted">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">What I did</dt>
                    <dd className="mt-1 text-muted">{c.work}</dd>
                  </div>
                </dl>
                <p className="mt-5 rounded-2xl bg-brand-soft p-4 font-display text-base font-semibold text-ink">
                  {c.result}
                </p>
                {c.slug && (
                  <a
                    href={`/work/${c.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                  >
                    Read the case study →
                  </a>
                )}
              </article>
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
        <div className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-4 [grid-auto-flow:dense] md:grid-cols-3 lg:grid-cols-4">
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
