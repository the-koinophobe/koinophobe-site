import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publishedNotes } from "@/lib/notes";
import { NoteCard } from "./NoteCard";

/**
 * A row of notes for a service page. Pass the slugs in order of preference;
 * anything not yet published is skipped, so a page never links to a note that
 * would 404, and scheduled notes appear here on their own date.
 */
export function RelatedNotes({
  slugs,
  title = "Related reading",
  more = { href: "/notes", label: "All notes" },
  max = 3,
  className = "",
}: {
  slugs: string[];
  title?: string;
  more?: { href: string; label: string };
  max?: number;
  className?: string;
}) {
  const live = publishedNotes();
  const picked = slugs.map((s) => live.find((n) => n.slug === s)).filter(Boolean).slice(0, max) as typeof live;
  if (!picked.length) return null;
  return (
    <section className={`section-tint py-20 ${className}`}>
      <div className="container-pad">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="t-h2 !text-[clamp(1.6rem,2.8vw,2.2rem)]">{title}</h2>
          <Link href={more.href} className="link-arrow">
            {more.label} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {picked.map((n) => (
            <NoteCard key={n.slug} note={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
