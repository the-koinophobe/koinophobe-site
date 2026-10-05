import Image from "next/image";
import Link from "next/link";
import type { Note } from "@/lib/notes";
import { topicLabel } from "@/lib/topics";

export function fmtDate(date: string, month: "short" | "long" = "short") {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month,
    day: "numeric",
  });
}

/** A note as a card: photo, topic, title, excerpt, date. */
export function NoteCard({ note, priority = false, large = false }: { note: Note; priority?: boolean; large?: boolean }) {
  const img = note.coverSm || note.cover;
  return (
    <Link
      href={`/notes/${note.slug}`}
      className={`card card-hover group flex h-full flex-col overflow-hidden ${large ? "md:grid md:grid-cols-[1.25fr_1fr]" : ""}`}
    >
      <div className={`relative aspect-[16/9] w-full overflow-hidden bg-surface ${large ? "md:aspect-auto md:min-h-[320px]" : ""}`}>
        {img ? (
          <Image
            src={large ? note.cover || img : img}
            alt={note.coverAlt}
            fill
            priority={priority}
            sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : null}
      </div>
      <div className={`flex flex-1 flex-col p-6 ${large ? "md:justify-center md:p-10" : ""}`}>
        <span className="eyebrow self-start !text-[12.5px]">{topicLabel(note.topic)}</span>
        <h3 className={`mt-4 font-display tracking-tight text-balance ${large ? "text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.12]" : "text-[1.3rem] leading-[1.22]"}`}>
          {note.title}
        </h3>
        <p className={`mt-3 text-[15px] leading-relaxed text-muted ${large ? "" : "line-clamp-3"}`}>{note.excerpt}</p>
        <p className="mt-auto pt-5 text-[13.5px] text-muted">
          {fmtDate(note.date)} &middot; {note.minutes} min read
        </p>
      </div>
    </Link>
  );
}
