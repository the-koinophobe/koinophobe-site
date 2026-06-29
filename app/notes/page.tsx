import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { notes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short, practical notes on SEO, conversion tracking, and turning search traffic into measurable leads.",
  alternates: { canonical: "/notes" },
};

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NotesPage() {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0 -z-10" />
        <div className="container-pad pb-10 pt-16 sm:pt-20">
          <SectionHeading
            titleAs="h1"
            kicker="Notes"
            title="Practical SEO, minus the fluff"
            intro="Short notes on ranking for buyers and proving it converts. The same things I do for clients."
          />
        </div>
      </section>

      <section className="container-pad py-8">
        <div className="grid gap-5">
          {sorted.map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 0.06}>
              <Link
                href={`/notes/${n.slug}`}
                className="lift block rounded-3xl border border-line bg-surface/60 p-7"
              >
                <span className="font-mono text-xs text-muted">{fmt(n.date)}</span>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                  {n.title}
                </h2>
                <p className="mt-2 text-muted">{n.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
