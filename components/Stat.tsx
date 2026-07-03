"use client";

import { useEffect, useRef, useState } from "react";

// Animates a leading number inside a string like "20+" or "40 → 70+".
// Non-numeric values just fade in.
export function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+)(.*)$/);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!match || reduce) {
      setDisplay(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const dur = 900;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(`${Math.round(target * eased)}${suffix}`);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="bg-bg p-6">
      <div className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {display}
      </div>
      <div className="mt-1.5 text-xs text-muted">{label}</div>
    </div>
  );
}
