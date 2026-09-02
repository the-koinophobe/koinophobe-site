import { Fragment } from "react";

/**
 * Masked word rise for the above-the-fold headline. Pure CSS keyframes on a
 * per-word delay, so the largest text on the page paints immediately instead
 * of waiting for a script to hydrate.
 */
export function HeroHeadline({
  segments,
  className = "",
}: {
  segments: { text: string; muted?: boolean }[];
  className?: string;
}) {
  const label = segments.map((s) => s.text).join(" ");
  let n = 0;

  return (
    <h1 className={`word-rise ${className}`} aria-label={label}>
      {segments.map((seg, si) => (
        <span key={si} className="block">
          {seg.text.split(" ").map((w, wi) => {
            const delay = (n++ * 0.045 + 0.05).toFixed(2);
            return (
              <Fragment key={wi}>
                <span
                  className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-baseline"
                  aria-hidden
                >
                  <span
                    data-word
                    className={`inline-block ${seg.muted ? "text-muted" : ""}`}
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {w}
                  </span>
                </span>{" "}
              </Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
