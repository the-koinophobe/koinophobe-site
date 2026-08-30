import { reviews, upwork } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Stagger } from "./Stagger";

/**
 * No stars, no avatars, no slider. The rest of the site asks you to read
 * numbers, so the quotes are set the same way: a hairline list with the
 * source stated, and the rating that needs explaining explained rather
 * than hidden.
 *
 * Deliberately no Review/AggregateRating JSON-LD. Self-serving review
 * markup on your own site is against Google's structured data guidelines,
 * and an SEO's own site is a bad place to test that.
 */
export function Reviews() {
  return (
    <>
      <Reveal>
        <p className="eyebrow">[ In their words ]</p>
        <h2 className="mt-3.5 max-w-[24ch] font-display text-[clamp(1.85rem,3.9vw,2.95rem)] leading-[1.05] tracking-tight text-balance">
          Six clients, and the rating I&rsquo;d rather explain than hide.
        </h2>
      </Reveal>

      <Stagger className="mt-11 grid border-t border-line md:grid-cols-2">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className={`border-b border-line py-7 pr-8 ${
              i % 2 === 1 ? "md:border-l md:border-line md:pl-8" : ""
            }`}
          >
            <blockquote className="font-display text-[1.12rem] leading-[1.45] tracking-tight text-balance">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
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

      <Reveal className="mt-9 grid gap-7 lg:grid-cols-[auto_1fr] lg:gap-14">
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          {[
            [upwork.jobSuccess, "Job success"],
            [upwork.rating, `Rating, ${upwork.reviews} reviews`],
            [String(upwork.jobs), "Jobs completed"],
            [String(upwork.hours), "Hours tracked"],
          ].map(([value, label]) => (
            <div key={label}>
              <dd className="tnum font-display text-[1.6rem] leading-none tracking-tight">{value}</dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="max-w-[52ch] border-l border-line pl-6 text-[15px] text-muted lg:pl-8">
          {upwork.caveat}
        </p>
      </Reveal>
    </>
  );
}
