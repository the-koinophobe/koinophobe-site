import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { Availability } from "@/components/Availability";
import { MobileCta } from "@/components/MobileCta";
import { notes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short, practical notes on technical SEO, tracking, and turning search traffic into leads a local business can actually count.",
  alternates: { canonical: "/notes" },
};

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NotesPage() {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <section className="pt-28 sm:pt-36">
        <div className="container-pad">
          <Reveal>
            <p className="eyebrow">Notes</p>
            <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,5.4vw,4.05rem)] leading-[1.04] tracking-tight text-balance">
              The things I&rsquo;d tell you on the call anyway.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17.5px] text-muted">
              Written for the business owner, not the search engine. No listicles, no
              &ldquo;10 tips&rdquo;, nothing I don&rsquo;t do for paying clients.
            </p>
          </Reveal>

          <Stagger className="mt-14 border-t border-line">
            {sorted.map((n) => (
              <Link
                key={n.slug}
                href={`/notes/${n.slug}`}
                className="ledger-row group flex flex-col gap-3 border-b border-line py-7 lg:grid lg:grid-cols-[110px_1fr_120px] lg:items-baseline lg:gap-8"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {fmt(n.date)}
                </span>
                <span>
                  <span className="block font-display text-[1.3rem] leading-snug tracking-tight sm:text-[1.45rem]">
                    {n.title}
                  </span>
                  <span className="mt-2 block max-w-[62ch] text-muted">{n.excerpt}</span>
                </span>
                <span className="hidden items-center justify-self-end gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted transition-colors duration-100 group-hover:text-ink lg:flex">
                  Read
                  <ArrowRight
                    size={15}
                    aria-hidden
                    className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transform-none"
                  />
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="mt-24">
        <Availability />
      </div>
      <MobileCta />
    </>
  );
}
