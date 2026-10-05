import { reviews } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * No stars, no aggregate. Just what people said and where you can verify it.
 *
 * Deliberately no Review/AggregateRating JSON-LD: self-serving review markup
 * breaks Google's structured data guidelines.
 */
export function Reviews({ exclude = [] }: { exclude?: string[] }) {
  const list = reviews.filter((r) => !exclude.includes(r.name));
  return (
    <>
      <Reveal className="max-w-3xl">
        <p className="eyebrow">In their words</p>
        <h2 className="t-h2 mt-5">What clients say about working with me</h2>
      </Reveal>
      <div data-anim="cards" className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <figure key={r.name} className="card flex flex-col p-7">
            <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden className="text-brand/40">
              <path fill="currentColor" d="M0 22V12.4C0 5.6 3.9 1.5 11.7 0l1.2 3C8.6 4.3 6.4 6.6 6.1 10H12v12H0zm16 0V12.4C16 5.6 19.9 1.5 27.7 0l1.2 3c-4.3 1.3-6.5 3.6-6.8 7H28v12H16z" />
            </svg>
            <blockquote className="mt-5 flex-1 text-[16.5px] leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 border-t border-line pt-5">
              <span className="block text-[15px] font-medium">{r.name}</span>
              <span className="mt-0.5 flex flex-wrap items-center justify-between gap-2 text-[13.5px] text-muted">
                {r.role}
                <span className={r.source === "Upwork" ? "text-brand" : ""}>
                  {r.source === "Upwork" ? "Verified on Upwork" : "Direct client"}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
