"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Trailing cursor accent: a snappy brand dot plus a lagging ring that grows
// over interactive elements. The native cursor stays visible (no usability
// tax). Desktop pointers only; off under reduced motion.
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduce || !dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const interactive = (e.target as Element | null)?.closest?.(
        "a, button, [role='button'], input, textarea, select, label"
      );
      gsap.to(ring, { scale: interactive ? 1.9 : 1, duration: 0.3, ease: "power3.out" });
    };
    const leave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const enter = () => {
      if (shown) gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border-2 border-brand/50 opacity-0"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-brand opacity-0"
      />
    </>
  );
}
