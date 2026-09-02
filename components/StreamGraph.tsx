"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sectors, streamMonths } from "@/lib/gsc";

/**
 * Monthly organic clicks by sector, stacked as a stream. Hover or drag across
 * it to read a month; hover a band to isolate that sector and see how many of
 * its keywords sit on page one. Touch works the same way.
 */

const W = 1000;
const H = 320;
const PAD = { t: 22, r: 18, b: 18, l: 18 };
const N = streamMonths.length;
/** Four steps of one hue, spread far enough apart to separate at a glance. */
const BAND_ALPHA = [0.2, 0.42, 0.66, 0.95];

/** Catmull-Rom to bezier, so the bands read as flow rather than a bar chart. */
function smooth(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function StreamGraph() {
  const [hoverMonth, setHoverMonth] = useState<number | null>(null);
  const [hoverBand, setHoverBand] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const { bands, totals, max } = useMemo(() => {
    const totals = Array.from({ length: N }, (_, i) =>
      sectors.reduce((sum, s) => sum + s.clicks[i], 0)
    );
    const max = Math.max(...totals);
    const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / (N - 1);
    const plotH = H - PAD.t - PAD.b;
    // centred stack: the classic stream silhouette
    const baseline = totals.map((t) => (H - PAD.b) - plotH / 2 - (t / max) * plotH / 2);
    const running = [...baseline];
    const bands = sectors.map((s) => {
      const top: [number, number][] = [];
      const bottom: [number, number][] = [];
      for (let i = 0; i < N; i++) {
        const h = (s.clicks[i] / max) * plotH;
        bottom.push([x(i), running[i]]);
        running[i] += h;
        top.push([x(i), running[i]]);
      }
      const d = `${smooth(top)} L${bottom[N - 1][0]},${bottom[N - 1][1]} ${smooth(
        [...bottom].reverse()
      ).replace(/^M[^C]*/, "")} Z`;
      return { ...s, d, top };
    });
    return { bands, totals, max };
  }, []);

  const xFor = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / (N - 1);

  const track = (clientX: number) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = ((clientX - r.left) / r.width) * W;
    const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (N - 1));
    setHoverMonth(Math.max(0, Math.min(N - 1, i)));
  };

  const active = hoverBand ? sectors.find((s) => s.key === hoverBand) : null;

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative overflow-hidden rounded-md border border-line bg-surface">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 pt-4 sm:px-5">
          <span className="eyebrow-flat">Organic clicks by sector</span>
          <span className="eyebrow-flat">{streamMonths[0]} to {streamMonths[N - 1]} 2026</span>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full touch-pan-y"
          role="img"
          aria-label="Stream graph of monthly organic clicks across four client sectors, April 2025 to August 2026"
          onPointerMove={(e) => track(e.clientX)}
          onPointerLeave={() => { setHoverMonth(null); setHoverBand(null); }}
        >
          {bands.map((b) => {
            const dim = hoverBand !== null && hoverBand !== b.key;
            return (
              <path
                key={b.key}
                data-band
                d={b.d}
                className="cursor-pointer transition-opacity duration-150"
                fill="rgb(var(--brand))"
                stroke="rgb(var(--surface))"
                strokeWidth={2.5}
                opacity={dim ? 0.12 : BAND_ALPHA[sectors.findIndex((s) => s.key === b.key)]}
                onPointerEnter={() => setHoverBand(b.key)}
              />
            );
          })}

          {hoverMonth !== null && (
            <line
              x1={xFor(hoverMonth)}
              x2={xFor(hoverMonth)}
              y1={PAD.t - 8}
              y2={H - PAD.b + 4}
              stroke="rgb(var(--ink))"
              strokeWidth={1}
              opacity={0.45}
            />
          )}

        </svg>

        <div className="flex justify-between px-4 pb-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted sm:px-5 sm:text-[11px]">
          {[0, Math.floor(N / 3), Math.floor((2 * N) / 3), N - 1].map((i) => (
            <span key={i}>{streamMonths[i]}</span>
          ))}
        </div>

        {hoverMonth !== null && (
          <div
            className="pointer-events-none absolute top-12 z-10 -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink px-3 py-2 font-mono text-[11px] leading-relaxed text-bg"
            style={{ left: `${(xFor(hoverMonth) / W) * 100}%` }}
          >
            <b>{streamMonths[hoverMonth]}</b> · {totals[hoverMonth]} clicks
            {sectors.map((s) => (
              <span key={s.key} className="block opacity-75">
                {s.label} {s.clicks[hoverMonth]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* legend doubles as the page-one readout */}
      <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
        {sectors.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onPointerEnter={() => setHoverBand(s.key)}
            onPointerLeave={() => setHoverBand(null)}
            onFocus={() => setHoverBand(s.key)}
            onBlur={() => setHoverBand(null)}
            className="group text-left"
          >
            <span className="flex items-center gap-2">
              <i
                aria-hidden
                className="h-2.5 w-2.5 flex-none rounded-full bg-brand"
                style={{ opacity: BAND_ALPHA[i] }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.11em] text-muted transition-colors duration-100 group-hover:text-ink">
                {s.label}
              </span>
            </span>
            <span className="tnum mt-1.5 block font-display text-[1.35rem] leading-none tracking-tight">
              {s.pageOne}
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              on page one
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 min-h-[2.6em] font-mono text-[11px] leading-relaxed text-muted">
        {active
          ? active.note
          : "Four sectors, seventeen months, every click Google actually sent. Hover a month or a band."}
      </p>
    </div>
  );
}
