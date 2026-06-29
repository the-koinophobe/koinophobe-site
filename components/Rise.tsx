"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

// Masked "rise up" line reveal. Wrap a single line of text.
// Animates immediately on mount (reliable for above-the-fold content).
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(inner, { yPercent: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.95, delay, ease: "power4.out" }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <span ref={ref} className={`js-rise block overflow-hidden pb-[0.08em] ${className}`}>
      <span className="block will-change-transform">{children}</span>
    </span>
  );
}
