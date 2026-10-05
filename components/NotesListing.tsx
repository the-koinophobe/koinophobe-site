import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Note } from "@/lib/notes";
import { topics, type TopicKey } from "@/lib/topics";
import { NoteCard } from "./NoteCard";
import { Availability } from "./Availability";
import { MobileCta } from "./MobileCta";
import { Reveal } from "./Reveal";

/**
 * The notes index, its numbered pages and the topic pages all share this
 * layout: a header, topic chips, a card grid and pagination.
 */
export function NotesListing({
  heading,
  intro,
  items,
  page = 1,
  pages = 1,
  activeTopic,
  featureFirst = false,
  basePath = "/notes",
}: {
  heading: string;
  intro: string;
  items: Note[];
  page?: number;
  pages?: number;
  activeTopic?: TopicKey;
  featureFirst?: boolean;
  basePath?: string;
}) {
  const [first, ...rest] = items;
  const href = (p: number) => (p === 1 ? basePath : `${basePath}/page/${p}`);
  return (
    <>
      <section className="hero-bg">
        <div className="container-pad pb-12 pt-14 sm:pt-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Notes</p>
            <h1 className="t-h1 mt-5">{heading}</h1>
            <p className="t-lead mt-5 max-w-[60ch]">{intro}</p>
          </Reveal>
          <nav aria-label="Topics" className="mt-9 flex flex-wrap gap-2">
            <Link
              href="/notes"
              aria-current={!activeTopic ? "page" : undefined}
              className={`btn btn-sm ${!activeTopic ? "btn-primary" : "btn-secondary"}`}
            >
              All notes
            </Link>
            {topics.map((t) => (
              <Link
                key={t.key}
                href={`/notes/topic/${t.key}`}
                aria-current={activeTopic === t.key ? "page" : undefined}
                className={`btn btn-sm ${activeTopic === t.key ? "btn-primary" : "btn-secondary"}`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="container-pad pb-20">
        {items.length === 0 ? (
          <p className="text-muted">Nothing here yet. New notes go up twice a week.</p>
        ) : featureFirst && first ? (
          <>
            <NoteCard note={first} priority large />
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((n) => (
                <NoteCard key={n.slug} note={n} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n, i) => (
              <NoteCard key={n.slug} note={n} priority={i < 3} />
            ))}
          </div>
        )}

        {pages > 1 ? (
          <nav aria-label="Pagination" className="pager mt-14 flex flex-wrap items-center justify-center gap-2">
            {page > 1 ? (
              <Link href={href(page - 1)} rel="prev" aria-label="Previous page">
                <ArrowLeft size={16} aria-hidden />
              </Link>
            ) : (
              <span className="is-disabled" aria-hidden><ArrowLeft size={16} /></span>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) =>
              p === page ? (
                <span key={p} aria-current="page">{p}</span>
              ) : (
                <Link key={p} href={href(p)} aria-label={`Page ${p}`}>{p}</Link>
              )
            )}
            {page < pages ? (
              <Link href={href(page + 1)} rel="next" aria-label="Next page">
                <ArrowRight size={16} aria-hidden />
              </Link>
            ) : (
              <span className="is-disabled" aria-hidden><ArrowRight size={16} /></span>
            )}
          </nav>
        ) : null}
      </section>

      <Availability />
      <MobileCta />
    </>
  );
}
