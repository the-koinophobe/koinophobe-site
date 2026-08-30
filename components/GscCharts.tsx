"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { agencyPages, positionLadder, spikeDaily, spikeStart } from "@/lib/gsc";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Charts draw themselves when they scroll into view. Every animation is
 * opacity/transform or a dash offset, and reduced-motion skips straight to the
 * finished state, so the figures are never withheld from anyone.
 */
function useDrawIn(build: (el: HTMLElement, tl: gsap.core.Timeline) => void) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 84%", once: true },
      });
      build(el, tl);
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/* ------------------------------------------------------------------ shell */

/**
 * Resolves the theme tokens to real colour strings. SVG presentation attributes
 * take var() in modern browsers, but resolving them here means the rendered
 * markup never depends on that, and the charts repaint when the theme flips.
 */
function useVar() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    const obs = new MutationObserver(bump);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    bump();
    return () => obs.disconnect();
  }, []);
  return useCallback(
    (name: string, alpha = 1) => {
      if (tick === 0 || typeof window === "undefined") return `rgb(var(${name}) / ${alpha})`;
      const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return raw ? `rgb(${raw} / ${alpha})` : `rgb(var(${name}) / ${alpha})`;
    },
    [tick]
  );
}

function Frame({
  title,
  range,
  children,
  innerRef,
}: {
  title: string;
  range: string;
  children: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div ref={innerRef} className="relative rounded-md border border-line bg-surface p-4 sm:p-[18px]">
      <div className="mb-3.5 flex flex-wrap justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
        <span>{title}</span>
        <span>{range}</span>
      </div>
      {children}
    </div>
  );
}

const MONO = "var(--font-mono), ui-monospace, monospace";

/* --------------------------------------------------------------- sparkline */

export function Sparkline({
  data,
  unit,
  title,
  range,
}: {
  data: [string, number][];
  unit: string;
  title: string;
  range: string;
}) {
  const v = useVar();
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const frameRef = useDrawIn((el, tl) => {
    const path = el.querySelector<SVGPathElement>("[data-spark-line]");
    const area = el.querySelector<SVGPathElement>("[data-spark-area]");
    const cap = el.querySelectorAll("[data-spark-cap]");
    if (path) {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(path, { strokeDashoffset: 0, duration: 1.25, ease: "power2.inOut" });
    }
    if (area) tl.fromTo(area, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.3);
    if (cap.length) tl.fromTo(cap, { opacity: 0, scale: 0.6, transformOrigin: "center" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.25");
  });

  const W = 560, H = 210, PL = 46, PR = 14, PT = 14, PB = 30;
  const max = Math.max(...data.map((d) => d[1]));
  const q = max > 2000 ? 1000 : max > 500 ? 500 : max > 100 ? 50 : 25;
  const nice = Math.ceil(max / q) * q;
  const x = (i: number) => PL + (i * (W - PL - PR)) / (data.length - 1);
  const y = (val: number) => PT + (1 - val / nice) * (H - PT - PB);
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i)} ${y(d[1])}`).join(" ");
  const last = data.length - 1;

  return (
    <Frame title={title} range={range} innerRef={frameRef}>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full overflow-visible"
          role="img"
          aria-label={`${title}, ${range}`}
          onPointerMove={(e) => {
            const r = svgRef.current!.getBoundingClientRect();
            const px = ((e.clientX - r.left) / r.width) * W;
            const i = Math.round((px - PL) / ((W - PL - PR) / (data.length - 1)));
            setHover(Math.max(0, Math.min(last, i)));
          }}
          onPointerLeave={() => setHover(null)}
        >
          {[0, nice / 2, nice].map((g) => (
            <g key={g}>
              <line x1={PL} x2={W - PR} y1={y(g)} y2={y(g)} stroke={v("--line")} strokeWidth={1} />
              <text
                x={PL - 9} y={y(g) + 4} textAnchor="end" fill={v("--muted")}
                fontFamily={MONO} fontSize={10}
              >
                {g >= 1000 ? `${g / 1000}k` : g}
              </text>
            </g>
          ))}
          <path data-spark-area d={`${line} L${x(last)} ${y(0)} L${x(0)} ${y(0)} Z`} fill={v("--brand", 0.13)} />
          <path
            data-spark-line
            d={line} fill="none" stroke={v("--brand")} strokeWidth={2}
            strokeLinejoin="round" strokeLinecap="round"
          />
          <circle data-spark-cap cx={x(last)} cy={y(data[last][1])} r={4} fill={v("--brand")} />
          <text
            data-spark-cap
            x={x(last)} y={y(data[last][1]) - 12} textAnchor="end" fill={v("--ink")}
            fontFamily={MONO} fontSize={11} fontWeight={500}
          >
            {data[last][1].toLocaleString("en-US")}
          </text>
          {data.map((d, i) =>
            i % (data.length > 14 ? 3 : 2) === 0 || i === last ? (
              <text
                key={d[0] + i} x={x(i)} y={H - 9} textAnchor="middle"
                fill={v("--muted")} fontFamily={MONO} fontSize={10}
              >
                {d[0]}
              </text>
            ) : null
          )}
          {hover !== null && (
            <>
              <line x1={x(hover)} x2={x(hover)} y1={PT} y2={H - PB} stroke={v("--line")} strokeWidth={1} />
              <circle
                cx={x(hover)} cy={y(data[hover][1])} r={4.5}
                fill={v("--brand")} stroke={v("--surface")} strokeWidth={2}
              />
            </>
          )}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-[124%] whitespace-nowrap rounded-sm bg-ink px-2.5 py-1.5 font-mono text-[11px] leading-snug text-bg"
            style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(data[hover][1]) / H) * 100}%` }}
          >
            <b>{data[hover][1].toLocaleString("en-US")}</b> {unit}
            <br />
            {data[hover][0]}
          </div>
        )}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------- position dumbbell */

export function PositionLadder({ title, range }: { title: string; range: string }) {
  const v = useVar();
  const frameRef = useDrawIn((el, tl) => {
    const conns = el.querySelectorAll("[data-ladder-line]");
    const nows = el.querySelectorAll("[data-ladder-now]");
    const vals = el.querySelectorAll("[data-ladder-val]");
    tl.fromTo(conns, { scaleX: 0, transformOrigin: "right center" }, { scaleX: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 })
      .fromTo(nows, { x: (i: number) => Number((nows[i] as SVGElement).getAttribute("data-travel")) }, { x: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, "-=0.45")
      .fromTo(vals, { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.06 }, "-=0.5");
  });
  const rows = positionLadder;
  const W = 560, RH = 52, PT = 28, PB = 22, PL = 8, PR = 64;
  const H = PT + PB + rows.length * RH;
  const x = (p: number) => PL + (p / 95) * (W - PL - PR);

  return (
    <Frame title={title} range={range} innerRef={frameRef}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible" role="img"
        aria-label="Average position a year ago compared with now, five queries">
        {[1, 25, 50, 75].map((g) => (
          <g key={g}>
            <line x1={x(g)} x2={x(g)} y1={PT - 12} y2={H - PB + 2} stroke={v("--line")} strokeWidth={1} />
            <text x={x(g)} y={PT - 18} textAnchor="middle" fill={v("--muted")} fontFamily={MONO} fontSize={10}>
              {g === 1 ? "pos 1" : g}
            </text>
          </g>
        ))}
        {rows.map((r, i) => {
          const cy = PT + i * RH + 16;
          return (
            <g key={r[0]}>
              <text x={PL} y={cy - 12} fill={v("--muted")} fontFamily={MONO} fontSize={11}>{r[0]}</text>
              <line data-ladder-line x1={x(r[2])} x2={x(r[1])} y1={cy + 6} y2={cy + 6} stroke={v("--muted", 0.55)} strokeWidth={1.5} />
              <circle cx={x(r[1])} cy={cy + 6} r={5} fill={v("--surface")} stroke={v("--muted")} strokeWidth={1.6} />
              <circle data-ladder-now data-travel={x(r[1]) - x(r[2])} cx={x(r[2])} cy={cy + 6} r={5.5} fill={v("--brand")} />
              <text x={x(r[1]) + 10} y={cy + 10} fill={v("--muted")} fontFamily={MONO} fontSize={10.5}>
                {r[1].toFixed(1)}
              </text>
              <text data-ladder-val x={x(r[2]) - 9} y={cy + 10} textAnchor="end" fill={v("--ink")} fontFamily={MONO} fontSize={11} fontWeight={500}>
                {r[2].toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3.5 flex flex-wrap gap-4 font-mono text-[10.5px] uppercase tracking-wider text-muted">
        <span className="flex items-center gap-2">
          <i className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-muted" />A year ago
        </span>
        <span className="flex items-center gap-2">
          <i className="inline-block h-2.5 w-2.5 rounded-full bg-brand" />Now
        </span>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------- page bars */

export function PageBars({ title, range }: { title: string; range: string }) {
  const v = useVar();
  const frameRef = useDrawIn((el, tl) => {
    tl.fromTo(el.querySelectorAll("[data-bar]"), { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.75, ease: "power3.out", stagger: 0.07 })
      .fromTo(el.querySelectorAll("[data-bar-val]"), { opacity: 0, x: -6 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 }, "-=0.6");
  });
  const rows = agencyPages;
  const W = 560, RH = 46, PT = 6, PB = 8, PL = 6, GUT = 152;
  const H = PT + PB + rows.length * RH;
  const max = 457705;
  const barMax = W - PL - GUT;

  return (
    <Frame title={title} range={range} innerRef={frameRef}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible" role="img"
        aria-label="Impressions by page, informational pages against commercial pages">
        {rows.map((r, i) => {
          const top = PT + i * RH;
          const w = Math.max(3, (r[1] / max) * barMax);
          const comm = r[3] === "comm";
          return (
            <g key={r[0]}>
              <text x={PL} y={top + 13} fill={v("--muted")} fontFamily={MONO} fontSize={11}>{r[0]}</text>
              <rect data-bar x={PL} y={top + 20} width={w} height={11} rx={3}
                fill={comm ? v("--brand") : v("--muted", 0.5)} />
              <text data-bar-val x={W - 76} y={top + 30} textAnchor="end" fill={v("--ink")} fontFamily={MONO} fontSize={11} fontWeight={500}>
                {r[1].toLocaleString("en-US")}
              </text>
              <text data-bar-val x={W} y={top + 30} textAnchor="end" fill={comm ? v("--brand") : v("--accent")} fontFamily={MONO} fontSize={11}>
                {r[2]} CTR
              </text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ------------------------------------------------------------- spike chart */

export function SpikeChart({ title, range }: { title: string; range: string }) {
  const v = useVar();
  const [hover, setHover] = useState<number | null>(null);
  const frameRef = useDrawIn((el, tl) => {
    tl.fromTo(el.querySelectorAll("[data-day]"), { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, duration: 0.5, ease: "power2.out", stagger: 0.008 })
      .fromTo(el.querySelectorAll("[data-anomaly]"), { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, duration: 0.7, ease: "power4.out" }, "-=0.15")
      .fromTo(el.querySelectorAll("[data-anomaly-label]"), { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }, "-=0.3");
  });
  const W = 560, H = 230, PL = 40, PR = 14, PT = 16, PB = 30;
  const plotH = H - PT - PB;
  const breakY = PT + plotH * 0.3;
  const y = (val: number) =>
    val <= 12 ? H - PB - (val / 12) * (plotH * 0.62) : breakY - Math.min(1, (val - 12) / 2200) * (plotH * 0.14);
  const x = (i: number) => PL + (i * (W - PL - PR)) / (spikeDaily.length - 1);
  const bw = Math.max(3, (W - PL - PR) / spikeDaily.length - 2);
  const dateOf = (i: number) =>
    new Date(spikeStart + i * 86400000).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", timeZone: "UTC",
    });

  return (
    <Frame title={title} range={range} innerRef={frameRef}>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible" role="img"
          aria-label="Clicks per day for two months, with one anomalous day at 2,184 clicks">
          {[0, 6, 12].map((g) => (
            <g key={g}>
              <line x1={PL} x2={W - PR} y1={y(g)} y2={y(g)} stroke={v("--line")} strokeWidth={1} />
              <text x={PL - 9} y={y(g) + 4} textAnchor="end" fill={v("--muted")} fontFamily={MONO} fontSize={10}>{g}</text>
            </g>
          ))}
          <path
            d={`M${PL - 6} ${breakY + plotH * 0.06 + 5} l 12 -5 M${PL - 6} ${breakY + plotH * 0.06 + 11} l 12 -5`}
            stroke={v("--muted")} strokeWidth={1.2} fill="none"
          />
          {spikeDaily.map((val, i) => {
            const isSpike = val > 100;
            const yy = y(val);
            return (
              <rect
                {...(isSpike ? { "data-anomaly": "" } : { "data-day": "" })}
                key={i} x={x(i) - bw / 2} y={yy} width={bw} height={Math.max(1.5, H - PB - yy)} rx={2}
                fill={isSpike ? v("--accent") : v("--brand", 0.72)}
                onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}
              />
            );
          })}
          <text data-anomaly-label x={x(30) + 9} y={y(2184) + 11} fill={v("--accent")} fontFamily={MONO} fontSize={11} fontWeight={500}>
            2,184 &middot; 8 Jul
          </text>
          {[["8 Jun", 0], ["8 Jul", 30], ["8 Aug", 61]].map(([lab, i]) => (
            <text key={lab as string} x={x(i as number)} y={H - 9} textAnchor="middle"
              fill={v("--muted")} fontFamily={MONO} fontSize={10}>
              {lab}
            </text>
          ))}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-[124%] whitespace-nowrap rounded-sm bg-ink px-2.5 py-1.5 font-mono text-[11px] leading-snug text-bg"
            style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(spikeDaily[hover]) / H) * 100}%` }}
          >
            <b>{spikeDaily[hover].toLocaleString("en-US")}</b> clicks
            <br />
            {dateOf(hover)} 2026
          </div>
        )}
      </div>
    </Frame>
  );
}
