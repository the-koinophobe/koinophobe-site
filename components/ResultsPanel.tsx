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
    const wrap = wrapRef.current;
    if (!line || !wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const len = line.getTotalLength();
    const rowEls = wrap.querySelectorAll<HTMLElement>("[data-row]");
    const valEls = wrap.querySelectorAll<HTMLElement>("[data-to]");
    const deltaEls = wrap.querySelectorAll<HTMLElement>("[data-delta]");

    const ctx = gsap.context(() => {
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(areaRef.current, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top 80%", once: true },
      });
      tl.to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" })
        .to(areaRef.current, { opacity: 1, duration: 0.6 }, "-=0.6")
        .fromTo(
          rowEls,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" },
          0.15
        );

      // Count the "after" numbers up in place (501, 8.7K, 6.1%…).
      valEls.forEach((el, i) => {
        const final = el.textContent ?? "";
        const m = final.match(/^([\d.]+)(.*)$/);
        if (!m) return;
        const target = parseFloat(m[1]);
        const suffix = m[2];
        const decimals = m[1].includes(".") ? 1 : 0;
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: target,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = obj.v.toFixed(decimals) + suffix;
            },
            onComplete: () => {
              el.textContent = final;
            },
          },
          0.35 + i * 0.12
        );
      });

      tl.fromTo(
        deltaEls,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.2)", stagger: 0.12 },
        1.0
      );
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
          <div key={r.metric} data-row className="flex items-center justify-between py-2.5">
            <span className="text-sm text-muted">{r.metric}</span>
            <span className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted/70">{r.from}</span>
              <span className="text-muted/50">→</span>
              <span data-to className="font-semibold text-ink">{r.to}</span>
              <span data-delta className="flex items-center gap-0.5 rounded-md bg-accent/15 px-1.5 py-0.5 text-[11px] font-medium text-accent">
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
