"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const phrases = ["Rank for buyers", "Track everything", "Prove it converts"];

// Oversized editorial marquee. The strip skews with scroll velocity: scroll
// hard and the type leans into the motion, then eases back upright. The skew
// lives on its own wrapper so it never fights the CSS marquee transform.
export function BigMarquee() {
  const skewRef = useRef<HTMLDivElement | null>(null);
  const row = [...phrases, ...phrases, ...phrases, ...phrases];

  useEffect(() => {
    const el = skewRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const proxy = { skew: 0 };
    const setSkew = gsap.quickSetter(el, "skewX", "deg");
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const s = gsap.utils.clamp(-8, 8, self.getVelocity() / -350);
        if (Math.abs(s) > Math.abs(proxy.skew)) {
          proxy.skew = s;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.9,
            ease: "power3",
            overwrite: true,
            onUpdate: () => setSkew(proxy.skew),
          });
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div aria-hidden className="marquee-mask relative overflow-hidden bg-bg py-8 sm:py-10">
      <div ref={skewRef} className="flex will-change-transform">
        <div className="animate-marquee-slow flex shrink-0 items-baseline gap-10 pr-10 sm:gap-14 sm:pr-14">
          {row.map((t, i) => (
            <span key={i} className="flex items-baseline gap-10 whitespace-nowrap sm:gap-14">
              <span
                className={`font-display text-5xl font-semibold tracking-tight sm:text-7xl ${
                  i % 2 ? "text-outline" : "text-ink"
                }`}
              >
                {t}
              </span>
              <span className="text-3xl text-brand sm:text-4xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
