"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Counts a figure up when it scrolls into view. `value` is the plain number;
 * `display` is what renders on the server and for reduced-motion, so the real
 * figure is always in the markup.
 */
export function CountUp({
  value,
  display,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  display: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent =
            prefix +
            obj.n.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) +
            suffix;
        },
        onComplete: () => {
          el.textContent = display;
        },
      });
    });
    return () => ctx.revert();
  }, [value, display, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
