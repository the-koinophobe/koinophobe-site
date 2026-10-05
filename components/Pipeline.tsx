"use client";

import { useEffect, useRef, useState } from "react";
import { Search, MousePointerClick, PhoneCall, Banknote } from "lucide-react";
import { aggregate } from "@/lib/gsc";

type Node = {
  key: string;
  label: string;
  icon: typeof Search;
  /** Numeric figure, only where Search Console can actually see it. */
  value?: number;
  unit?: string;
  owner: "mine" | "yours";
  /** Stand-in shown where there is no figure I can honestly put up. */
  slot?: string;
  body: string;
};

const NODES: Node[] = [
  {
    key: "search",
    label: "Search",
    icon: Search,
    value: aggregate.impressions,
    unit: "times a client site was put in front of someone",
    owner: "mine",
    body:
      "Somebody types the thing. If you're not in the results, nothing below this happens. This part is my job.",
  },
  {
    key: "click",
    label: "Click",
    icon: MousePointerClick,
    value: aggregate.clicks,
    unit: "of them chose the client over everyone else on the page",
    owner: "mine",
    body:
      "They pick one. Your position, your title and what your Business Profile says decide which. Search Console shows me this part too.",
  },
  {
    key: "call",
    label: "Call",
    icon: PhoneCall,
    owner: "yours",
    slot: "Your number, not mine",
    body:
      "The phone rings or a form comes in. Search Console can't see this. It can be tracked, but only if someone sets it up, and on most sites I take over nobody has.",
  },
  {
    key: "revenue",
    label: "Revenue",
    icon: Banknote,
    owner: "yours",
    slot: "Not in any tool I own",
    body:
      "What the job was worth once it closed. No tool I use can see it. You have it in your books, and it's the number that decides whether any of this was worth paying for.",
  },
];

/** Counts up when its node lights, not on its own scroll trigger. */
function Figure({ value, run }: { value: number; run: boolean }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !run || done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1100, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent =
        p < 1 ? Math.round(value * eased).toLocaleString("en-US") : value.toLocaleString("en-US");
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);

  return (
    <span ref={ref} className="tnum">
      {value.toLocaleString("en-US")}
    </span>
  );
}

export function Pipeline() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const list = el.querySelector<HTMLElement>("[data-list]");
    const fill = el.querySelector<HTMLElement>("[data-fill]");
    const dot = el.querySelector<HTMLElement>("[data-dot]");
    if (!list || !fill || !dot) return;

    const markers = Array.from(list.querySelectorAll<HTMLElement>("[data-marker]"));
    if (markers.length < 2) return;

    let centers: number[] = [];
    let len = 0;

    const measure = () => {
      const base = list.getBoundingClientRect().top;
      centers = markers.map(
        (m) => m.getBoundingClientRect().top - base + m.offsetHeight / 2
      );
      const top = centers[0];
      len = centers[centers.length - 1] - top;
      list.style.setProperty("--rail-top", `${top}px`);
      list.style.setProperty("--rail-len", `${len}px`);
      return top;
    };

    let top = measure();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      fill.style.transform = "scaleY(1)";
      dot.style.opacity = "0";
      setActive(NODES.length - 1);
      return;
    }

    // Progress is just where the rail sits in the viewport. One passive
    // listener, coalesced into a frame, is the whole scroll engine.
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = r.height - vh * 0.34 || 1;
      const p = Math.min(Math.max((vh * 0.62 - r.top) / span, 0), 1);
      fill.style.transform = `scaleY(${p})`;
      dot.style.transform = `translate(-50%, -50%) translateY(${p * len}px)`;
      const y = p * len;
      let n = 0;
      for (let i = 0; i < centers.length; i++) if (centers[i] - top <= y + 4) n = i;
      if (n !== activeRef.current) {
        activeRef.current = n;
        setActive(n);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onResize = () => {
      top = measure();
      onScroll();
    };

    fill.style.transformOrigin = "top center";
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="grid gap-12 lg:grid-cols-[0.92fr_1fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="eyebrow">The line from search to money</p>
        <h2 className="mt-4 max-w-[15ch] font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-tight text-balance">
          Four steps. I can only see the first two.
        </h2>
        <p className="mt-6 max-w-[46ch] text-[17.5px] text-muted">
          Most SEO reports stop at clicks, because that&rsquo;s where the tools stop. Search
          Console can&rsquo;t tell me whether your phone rang, so call and form tracking is the
          first thing I set up on any site.
        </p>
        <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 font-mono text-[11.5px] uppercase tracking-[0.13em] text-muted">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-brand" />
            In the data
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full border border-dashed border-accent"
            />
            Only you can see it
          </span>
        </p>
      </div>

      <ol data-list className="relative lg:pt-2">
        {/* the rail, drawn between the first and last marker only */}
        <span
          aria-hidden
          className="absolute left-[23px] w-px bg-line"
          style={{ top: "var(--rail-top, 0px)", height: "var(--rail-len, 0px)" }}
        />
        <span
          data-fill
          aria-hidden
          className="absolute left-[23px] w-px origin-top scale-y-0 bg-brand"
          style={{ top: "var(--rail-top, 0px)", height: "var(--rail-len, 0px)" }}
        />
        <span
          data-dot
          aria-hidden
          className="pipe-dot absolute left-[23px] h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand"
          style={{ top: "var(--rail-top, 0px)" }}
        />

        {NODES.map((n, i) => {
          const Icon = n.icon;
          const on = i <= active;
          const yours = n.owner === "yours";
          return (
            <li
              key={n.key}
              className="grid grid-cols-[46px_1fr] gap-x-5 pb-14 last:pb-0 sm:gap-x-8"
            >
              <span
                data-marker
                className={`z-10 grid h-[46px] w-[46px] place-items-center rounded-full border bg-bg transition-colors duration-300 ${
                  on
                    ? yours
                      ? "border-accent text-accent"
                      : "border-brand bg-brand text-bg"
                    : "border-line text-muted"
                }`}
              >
                <Icon size={19} aria-hidden strokeWidth={1.9} />
              </span>

              <div className="min-w-0 pt-2">
                <p className="font-mono text-[12px] uppercase tracking-[0.13em] text-muted">
                  {n.label}
                </p>

                {n.value !== undefined ? (
                  <>
                    <p
                      className={`mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] leading-none tracking-tight transition-colors duration-300 ${
                        on ? "text-brand" : "text-muted/50"
                      }`}
                    >
                      <Figure value={n.value} run={on} />
                    </p>
                    <p className="mt-2.5 max-w-[34ch] font-mono text-[12px] leading-relaxed text-muted">
                      {n.unit}
                    </p>
                  </>
                ) : (
                  <p className="mt-3">
                    <span
                      className={`inline-flex items-center gap-2.5 rounded-sm border border-dashed px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.13em] transition-colors duration-300 ${
                        on ? "border-accent text-accent" : "border-line text-muted/60"
                      }`}
                    >
                      {n.slot}
                    </span>
                  </p>
                )}

                <p className="mt-5 max-w-[54ch] text-[16.5px] leading-relaxed text-muted">
                  {n.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      </div>

      <p className="mt-14 max-w-[62ch] border-t border-line pt-8 font-display text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug tracking-tight text-balance">
        In July I noticed form submissions on a client&rsquo;s site had been dropping since
        March. It was an email setting. Four months, and nobody caught it, me included. I check
        form delivery on every site every month now.
      </p>
    </div>
  );
}
