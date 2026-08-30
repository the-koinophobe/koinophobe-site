"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Masked word rise for an above-the-fold headline. Runs on mount rather than
 * on scroll, and the words render visible first so no-JS and reduced-motion
 * readers never see a blank heading.
 */
export function HeroHeadline({
  segments,
  className = "",
}: {
  segments: { text: string; muted?: boolean }[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 108 },
        { yPercent: 0, duration: 0.85, ease: "power3.out", stagger: 0.045, delay: 0.05 }
      );
    });
    return () => ctx.revert();
  }, []);

  const label = segments.map((s) => s.text).join(" ");

  return (
    <h1 ref={ref} className={className} aria-label={label}>
      {segments.map((seg, si) => (
        <Fragment key={si}>
          {seg.text.split(" ").map((w, wi) => (
            <Fragment key={wi}>
              <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-baseline" aria-hidden>
                <span
                  data-word
                  className={`inline-block will-change-transform ${seg.muted ? "text-muted" : ""}`}
                >
                  {w}
                </span>
              </span>{" "}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </h1>
  );
}
