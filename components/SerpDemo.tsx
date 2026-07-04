"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Search, TrendingUp } from "lucide-react";

// Animated SERP simulation: the query types itself, results render, and the
// client's page climbs to #1 with the real +217% result attached. Server
// renders the final state, so no-JS visitors and reduced-motion users see the
// client already ranked #1.

const QUERY = "myofascial release brevard fl";

type Row = { title: string; url: string; client?: boolean };

const ROWS: Row[] = [
  { title: "Top 10 massage clinics near you", url: "bigdirectory.com" },
  { title: "Find a local therapist, compare prices", url: "listing-network.com" },
  { title: "What is myofascial release? Overview", url: "health-encyclopedia.com" },
  { title: "National chain: book a massage today", url: "spa-chain.com" },
  { title: "Myofascial Pain Relief | Brevard Clinic", url: "myofascialpainbrevard.com", client: true },
];

const ROW_H = 58;

export function SerpDemo() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  // Initial state = finished state (SSR-safe, no-JS-safe).
  const [typed, setTyped] = useState(QUERY);
  const [pos, setPos] = useState(0);
  const [done, setDone] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep the static #1 state
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Perspective tilt toward the cursor (desktop only).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 7);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        setTyped("");
        setPos(ROWS.length - 1);
        setDone(false);
        await sleep(500);
        for (let i = 1; i <= QUERY.length && alive; i++) {
          setTyped(QUERY.slice(0, i));
          await sleep(42);
        }
        await sleep(650);
        for (let p = ROWS.length - 2; p >= 0 && alive; p--) {
          setPos(p);
          await sleep(720);
        }
        if (!alive) break;
        setDone(true);
        await sleep(4200);
      }
    })();
    return () => {
      alive = false;
    };
  }, [started]);

  const indexOf = (r: Row, i: number) => {
    if (r.client) return pos;
    const competitorIdx = ROWS.slice(0, i).filter((x) => !x.client).length;
    return competitorIdx < pos ? competitorIdx : competitorIdx + 1;
  };

  return (
    <div
      ref={wrapRef}
      className="rounded-3xl border border-line bg-surface/70 p-5 shadow-sm backdrop-blur sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </span>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[11px] font-medium text-ink">
          demo · real result
        </span>
      </div>

      <div className="flex items-center gap-2.5 rounded-full border border-line bg-bg px-4 py-2.5">
        <Search size={15} className="shrink-0 text-muted" />
        <span className="truncate font-mono text-sm text-ink">
          {typed}
          <span className="animate-pulse text-brand">|</span>
        </span>
      </div>

      <div className="relative mt-4" style={{ height: ROWS.length * ROW_H }}>
        {ROWS.map((r, i) => {
          const idx = indexOf(r, i);
          const isTop = r.client && idx === 0;
          return (
            <div
              key={r.url}
              className="absolute inset-x-0 transition-all duration-500 ease-out"
              style={{ top: idx * ROW_H }}
            >
              <div
                className={`flex h-[50px] items-center gap-3 rounded-xl border px-3 ${
                  r.client
                    ? `bg-brand-soft/70 ${isTop && done ? "border-brand" : "border-brand/40"}`
                    : "border-transparent"
                }`}
              >
                <span
                  className={`w-5 shrink-0 text-center font-mono text-[11px] ${
                    r.client ? "font-bold text-brand" : "text-muted/70"
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[13px] font-medium ${
                      r.client ? "text-ink" : "text-muted"
                    }`}
                  >
                    {r.title}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-muted/60">
                    {r.url}
                  </span>
                </span>
                {r.client && (
                  <span
                    className={`ml-auto flex shrink-0 items-center gap-1 rounded-md bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent transition-all duration-500 ${
                      done ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`}
                  >
                    <TrendingUp size={10} strokeWidth={2.5} />
                    +217% clicks
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Real client, real climb:{" "}
        <Link href="/work/wellness-clinic" className="font-medium text-brand">
          see the case study
        </Link>
      </p>
    </div>
  );
}
