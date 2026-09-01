import { reviews } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Stagger } from "./Stagger";

/**
 * No stars, no avatars, no slider, no aggregate. Just what people said and
 * whether you can go and verify it.
 *
 * Deliberately no Review/AggregateRating JSON-LD: self-serving review markup
 * breaks Google's structured data guidelines, and an SEO's own site is a bad
 * place to test that.
 */
export function Reviews() {
  return (
    <>
      <Reveal>
        <p className="eyebrow">In their words</p>
        <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
          The part I can&rsquo;t put in a chart.
        </h2>
      </Reveal>

      <Stagger className="mt-11 grid border-t border-line md:grid-cols-2">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className={`border-b border-line py-8 md:pr-10 ${
              i % 2 === 1 ? "md:border-l md:border-line md:pl-10" : ""
            }`}
          >
            <blockquote className="font-display text-[1.18rem] leading-[1.45] tracking-tight text-balance sm:text-[1.28rem]">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[15px] font-medium">{r.name}</span>
              <span className="font-mono text-[11px] text-muted">{r.role}</span>
              <span
                className={`ml-auto font-mono text-[10px] uppercase tracking-[0.12em] ${
                  r.source === "Upwork" ? "text-brand" : "text-muted"
                }`}
              >
                {r.source === "Upwork" ? "Verified · Upwork" : "Direct client"}
              </span>
            </figcaption>
          </figure>
        ))}
      </Stagger>
    </>
  );
}
