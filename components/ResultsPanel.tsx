"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LineChart, TrendingUp } from "lucide-react";
import { resultsPanel } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ResultsPanel() {
  const { label, rows, spark } = resultsPanel;
  const max = Math.max(...spark);
  const pts = spark
    .map((v, i) => {
      const x = (i / (spark.length - 1)) * 100;
      const y = 100 - (v / max) * 100;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const areaPts = `0,100 ${pts} 100,100`;

  const lineRef = useRef<SVGPolylineElement | null>(null);
  const areaRef = useRef<SVGPolygonElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line || !wrapRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const len = line.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(areaRef.current, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: "top 80%", once: true },
      });
      tl.to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" })
        .to(areaRef.current, { opacity: 1, duration: 0.6 }, "-=0.6");
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="rounded-3xl border border-line bg-surface/70 p-5 shadow-sm backdrop-blur sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <LineChart size={15} strokeWidth={2} className="text-brand" />
          {label}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[11px] font-medium text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> live
        </span>
      </div>

      <div className="relative mb-5 h-24 w-full overflow-hidden rounded-2xl border border-line bg-bg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--brand))" stopOpacity="0.28" />
              <stop offset="100%" stopColor="rgb(var(--brand))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon ref={areaRef} points={areaPts} fill="url(#sparkfill)" />
          <polyline
            ref={lineRef}
            points={pts}
            fill="none"
            stroke="rgb(var(--brand))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="divide-y divide-line">
        {rows.map((r) => (
          <div key={r.metric} className="flex items-center justify-between py-2.5">
            <span className="text-sm text-muted">{r.metric}</span>
            <span className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted/70">{r.from}</span>
              <span className="text-muted/50">→</span>
              <span className="font-semibold text-ink">{r.to}</span>
              <span className="flex items-center gap-0.5 rounded-md bg-accent/15 px-1.5 py-0.5 text-[11px] font-medium text-accent">
                <TrendingUp size={11} strokeWidth={2.5} />
                {r.delta}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
