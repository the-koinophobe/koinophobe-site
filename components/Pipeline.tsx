"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Microscope, Wrench, LineChart } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * SEO is invisible work, so the process gets drawn rather than described.
 * The audience toggle changes what each step means to the person reading,
 * not what actually happens.
 */

type Audience = "agency" | "owner";

const STEPS = [
  {
    key: "export",
    label: "Export",
    icon: Download,
    week: "Week 1",
    agency:
      "You give me read access to the client's Search Console and GA4. I pull sixteen months and read it before I form an opinion, so my first call with you isn't a list of questions you've already answered.",
    owner:
      "You give me read access to your Search Console and GA4, or I help you claim the property if nobody ever did. I read twelve to sixteen months of it before I say anything about your site.",
    proof: "16 months pulled per property",
  },
  {
    key: "diagnose",
    label: "Diagnose",
    icon: Microscope,
    week: "Weeks 1–2",
    agency:
      "Index coverage, titles and metas, schema, Core Web Vitals, internal linking, and the query set: what the site ranks for, what it nearly ranks for, and what it has no business chasing. You get it as a document your account manager can forward without editing.",
    owner:
      "Index coverage, titles and metas, schema, site speed, and the query set: what you rank for, what you nearly rank for, and what is not worth chasing. Written in plain language, with the reasoning shown.",
    proof: "893 of 1,099 queries were invisible on one site",
  },
  {
    key: "ship",
    label: "Ship",
    icon: Wrench,
    week: "Weeks 2–12",
    agency:
      "I work inside your process and your stack, under your brand. WordPress, Elementor, AIOSEO or Yoast day to day, and React, TypeScript or Django when a plugin can't do it. Your client never has to know I exist.",
    owner:
      "The fixes go live in your CMS on a schedule you approve, smallest-effort-highest-return first. Nothing goes out without you seeing what changed and why.",
    proof: "20+ WordPress sites shipped",
  },
  {
    key: "measure",
    label: "Measure",
    icon: LineChart,
    week: "Monthly, ongoing",
    agency:
      "The same four metrics every month against the same baseline, with the rows that moved the wrong way left in. If a quarter goes flat you hear it from me before the client asks.",
    owner:
      "The same four metrics every month against the same baseline. Clicks, impressions, click-through rate, average position. Including the ones that went the wrong way, because that's where the next job is.",
    proof: "Every case on this site carries its bad number",
  },
] as const;

export function Pipeline() {
  const [audience, setAudience] = useState<Audience>("owner");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Draw the connecting rail once the section is in view.
  useEffect(() => {
    const el = rootRef.current;
    const line = lineRef.current;
    if (!el || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(line, { scaleX: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        el.querySelectorAll("[data-node]"),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // Sub-100ms swap when the reader changes step or audience.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" });
    }, el);
    return () => ctx.revert();
  }, [active, audience]);

  const step = STEPS[active];

  return (
    <div ref={rootRef}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow">[ How the work goes ]</p>
        <div
          className="inline-flex rounded-sm border border-line p-0.5"
          role="tablist"
          aria-label="Who is reading"
        >
          {(
            [
              ["owner", "I run the business"],
              ["agency", "I'm an agency"],
            ] as [Audience, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={audience === key}
              onClick={() => setAudience(key)}
              className={`rounded-[2px] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors duration-100 ${
                audience === key ? "bg-ink text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <h2 className="mt-3.5 max-w-[24ch] font-display text-[clamp(1.85rem,3.9vw,2.95rem)] leading-[1.05] tracking-tight text-balance">
        Four steps, and you can see into all of them.
      </h2>

      {/* the rail */}
      <div className="relative mt-12">
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[13px] block h-px origin-left bg-line"
          ref={lineRef}
        />
        <div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-4" role="tablist" aria-label="Process steps">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const on = i === active;
            return (
              <button
                key={s.key}
                data-node
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className="group flex flex-col items-start pr-4 text-left"
              >
                <span
                  className={`grid h-[27px] w-[27px] place-items-center rounded-full border transition-colors duration-100 ${
                    on
                      ? "border-brand bg-brand text-bg"
                      : "border-line bg-bg text-muted group-hover:border-muted group-hover:text-ink"
                  }`}
                >
                  <Icon size={13} aria-hidden />
                </span>
                <span
                  className={`mt-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-100 ${
                    on ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} {s.label}
                </span>
                <span className="mt-1 font-mono text-[10.5px] text-muted">{s.week}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* the panel */}
      <div
        ref={bodyRef}
        className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14"
      >
        <p className="text-[17.5px]">{step[audience]}</p>
        <div className="border-l border-line pl-6">
          <span className="eyebrow block">From the exports</span>
          <p className="mt-2 font-mono text-[13px] leading-relaxed text-brand">{step.proof}</p>
        </div>
      </div>
    </div>
  );
}
