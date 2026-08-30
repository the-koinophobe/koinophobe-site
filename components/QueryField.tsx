"use client";

import { useEffect, useRef } from "react";
import { queryPoints } from "@/lib/queryPoints";

/**
 * 2D fallback for QueryFieldGL: the same plot without WebGL.
 * Every query the five client properties rank for, one dot each.
 * y = average position (1 at the top, 100 at the bottom, sqrt scale so the
 * dense end gets the room), x = log impressions, radius = clicks earned.
 * The dots in the top band are the ones that pay.
 */
export function QueryFieldCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const PADL = 54, PADR = 26, PADT = 40, PADB = 40;
    const MAX_IMP = Math.log10(460000);

    let W = 0, H = 0, raf = 0;
    let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
    const start = performance.now();
    type Dot = { x: number; y: number; r: number; top: boolean; cl: number; seed: number; d: number };
    let dots: Dot[] = [];

    const cssv = (n: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const rgb = (n: string) => `rgb(${cssv(n) || "0 0 0"})`;
    const rgba = (n: string, a: number) => `rgb(${cssv(n) || "0 0 0"} / ${a})`;

    const py = (pos: number) =>
      PADT + Math.sqrt(Math.min(1, (pos - 1) / 99)) * (H - PADT - PADB);

    function layout() {
      dots = queryPoints.map((p, i) => {
        const lx = Math.log10(Math.max(1, p[0]));
        return {
          x: PADL + (lx / MAX_IMP) * (W - PADL - PADR),
          y: py(p[1]),
          r: p[2] > 0 ? 1.6 + Math.min(3, Math.sqrt(p[2]) * 0.9) : 1.2,
          top: p[1] <= 3,
          cl: p[2],
          seed: (i * 2.399963) % 6.283,
          d: (i % 37) / 37,
        };
      });
    }

    function size() {
      const r = cv!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      cv!.width = W * dpr;
      cv!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    }

    function frame(now: number) {
      const t = (now - start) / 1000;
      const prog = reduce ? 1 : Math.min(1, t / 2.4);
      const brand = rgb("--brand");
      const muted = rgb("--muted");

      ctx!.clearRect(0, 0, W, H);
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      // the band that pays
      const bandTop = py(1) - 6;
      const bandBot = py(3) + 2;
      ctx!.fillStyle = rgba("--brand", 0.13);
      ctx!.fillRect(PADL, bandTop, W - PADL - PADR, Math.max(8, bandBot - bandTop));

      ctx!.strokeStyle = rgba("--line", 1);
      ctx!.lineWidth = 1;
      ctx!.font = '10px var(--font-mono), ui-monospace, monospace';
      ctx!.fillStyle = muted;
      ctx!.textAlign = "right";
      for (const pos of [1, 10, 25, 50, 100]) {
        const y = py(pos);
        ctx!.beginPath();
        ctx!.moveTo(PADL, y);
        ctx!.lineTo(W - PADR, y);
        ctx!.stroke();
        ctx!.fillText(String(pos), PADL - 10, y + 3.5);
      }
      ctx!.textAlign = "left";

      for (const p of dots) {
        if (p.d > prog) continue;
        const app = Math.min(1, (prog - p.d) * 6);
        const drift = reduce ? 0 : Math.sin(t * 0.28 + p.seed) * 2.2;
        const x = p.x + drift + (mx - 0.5) * (p.top ? 16 : 8);
        const y = p.y + Math.cos(t * 0.23 + p.seed) * 1.6 + (my - 0.5) * (p.top ? 10 : 5);
        ctx!.beginPath();
        ctx!.arc(x, y, p.r * app, 0, 6.2832);
        if (p.top) {
          ctx!.fillStyle = brand;
          ctx!.globalAlpha = 0.9 * app;
          ctx!.shadowColor = brand;
          ctx!.shadowBlur = 7;
        } else {
          ctx!.fillStyle = muted;
          ctx!.globalAlpha = (p.cl > 0 ? 0.45 : 0.2) * app;
          ctx!.shadowBlur = 0;
        }
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width;
      tmy = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => { tmx = 0.5; tmy = 0.5; };
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(size, 150); };

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    size();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="block h-full w-full"
      aria-label="Every query these five sites rank for, plotted by average position against how often the term is searched"
    />
  );
}
