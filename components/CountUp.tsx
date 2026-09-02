"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a figure up when it scrolls into view. The real number is rendered on
 * the server, so it is correct before this runs and correct if it never does.
 */
export function CountUp({
  value,
  display,
  className = "",
}: {
  value: number;
  display: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1200, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent =
            p < 1 ? Math.round(value * eased).toLocaleString("en-US") : display;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, display]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
