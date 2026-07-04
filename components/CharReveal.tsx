"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Character-level masked rise on scroll for headings. Text is visible by
// default (SSR/no-JS safe); GSAP hides and reveals it only once mounted, so
// it can never strand a heading invisible.
export function CharReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.016,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden>
            {Array.from(w).map((c, ci) => (
              <span
                key={ci}
                className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-baseline"
              >
                <span data-char className="inline-block will-change-transform">
                  {c}
                </span>
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
