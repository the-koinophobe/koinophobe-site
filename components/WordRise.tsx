"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";

type Token = { t: string; className?: string };

// Word-by-word masked rise for headlines. Initial hidden state comes from CSS
// (.js-anim .js-words) so there is no flash before hydration, and reduced
// motion gets static text.
export function WordRise({
  tokens,
  delay = 0,
  className = "",
}: {
  tokens: Token[];
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(words, { yPercent: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115 },
        { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.06, delay }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <span ref={ref} className={`js-words ${className}`}>
      {tokens.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-baseline">
            <span
              data-word
              className={`inline-block will-change-transform ${w.className ?? ""}`}
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
