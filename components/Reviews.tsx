import { Star } from "lucide-react";
import { reviews } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Reviews() {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
      {reviews.map((r, i) => (
        <Reveal key={i} delay={(i % 3) * 0.08} className="break-inside-avoid">
          <figure className="rounded-3xl border border-line bg-surface/60 p-6">
            <div className="mb-3 flex gap-0.5 text-brand" aria-hidden>
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={15} className="fill-brand" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="text-ink">“{r.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft font-display text-sm font-bold text-ink">
                {r.name.trim().charAt(0)}
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-ink">{r.name}</span>
                <span className="block text-muted">{r.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
