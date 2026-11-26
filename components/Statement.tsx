"use client";

import { useEffect, useRef, useState } from "react";

/*
 * One statement that rests at half ink and turns to full ink word by word as
 * it crosses the middle of the screen. Under reduced motion it is simply ink.
 * Words in `strong` are the statement's one emphasis.
 */
export function Statement({ before, strong, after }: { before: string; strong: string; after: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [lit, setLit] = useState(Infinity);
  const words = [...before.split(" ").map((w) => ({ w, s: false })), { w: strong, s: true }, ...after.split(" ").filter(Boolean).map((w) => ({ w, s: false }))];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = (vh * 0.75 - r.top) / (r.height + vh * 0.3);
        setLit(Math.round(Math.min(1, Math.max(0, p)) * words.length));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className="statement">
      {words.map((x, i) => {
        const span = (
          <span className="w" style={{ opacity: i < lit ? 1 : 0.32 }}>
            {x.w}
          </span>
        );
        return (
          <span key={i}>
            {x.s ? <strong>{span}</strong> : span}{" "}
          </span>
        );
      })}
    </p>
  );
}
