"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// A rising "growth" line that draws itself as you scroll past it (DrawSVG-style,
// done with stroke-dashoffset so it needs no premium plugin).
export function GrowthLine({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const line = useRef<SVGPolylineElement | null>(null);
  const dot = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const w = wrap.current;
    const l = line.current;
    if (!w || !l) return;
    const len = l.getTotalLength();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(l, { strokeDasharray: len });
    if (reduce) {
      gsap.set(l, { strokeDashoffset: 0 });
      if (dot.current) gsap.set(dot.current, { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: w,
            start: "top 85%",
            end: "bottom 55%",
            scrub: 1,
          },
        })
        .fromTo(l, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none" })
        .fromTo(dot.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, ">-0.1");
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 w-full sm:h-24">
        <polyline
          ref={line}
          points="0,108 150,96 300,100 450,70 600,78 750,46 900,52 1050,24 1200,8"
          fill="none"
          stroke="rgb(var(--brand))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle ref={dot} cx="1200" cy="8" r="5" fill="rgb(var(--brand))" opacity="0" />
      </svg>
    </div>
  );
}
