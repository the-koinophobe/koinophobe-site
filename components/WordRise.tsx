import { Fragment } from "react";

type Token = { t: string; className?: string };

// Word-by-word masked rise, pure CSS (see .word-rise in globals.css).
// No JS required: renders server-side, animates via keyframes with a
// per-word delay, and goes static under prefers-reduced-motion.
export function WordRise({
  tokens,
  delay = 0,
  className = "",
}: {
  tokens: Token[];
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`word-rise ${className}`}>
      {tokens.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-baseline">
            <span
              data-word
              className={`inline-block ${w.className ?? ""}`}
              style={{ animationDelay: `${(delay + i * 0.06).toFixed(2)}s` }}
            >
              {w.t}
            </span>
          </span>
          {i < tokens.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
