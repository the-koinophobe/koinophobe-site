"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, MousePointerClick, PhoneCall, Banknote } from "lucide-react";
import { aggregate } from "@/lib/gsc";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

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
      "Somebody types the thing. You are in that result set or you are not, and nothing further down this line happens until you are. This step is entirely mine.",
  },
  {
    key: "click",
    label: "Click",
    icon: MousePointerClick,
    value: aggregate.clicks,
    unit: "of them chose the client over everyone else on the page",
    owner: "mine",
    body:
      "Now they pick one. Position, title, and what your Business Profile says about you decide which one. Still mine, still in the data, still not money.",
  },
  {
    key: "call",
    label: "Call",
    icon: PhoneCall,
    owner: "yours",
    slot: "Your number, not mine",
    body:
      "The phone rings, or the form comes in, or nothing happens and you never find out why. Search Console has never once told me this. It is trackable, but only if somebody bothered to wire it up.",
  },
  {
    key: "revenue",
    label: "Revenue",
    icon: Banknote,
    owner: "yours",
    slot: "Not in any tool I own",
    body:
      "What the job was actually worth once it closed. No tool I own can see this number. You have it sitting in your books right now, and it is the only one of the four that pays anybody.",
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
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration: 1.1,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.n).toLocaleString("en-US");
      },
      onComplete: () => {
        el.textContent = value.toLocaleString("en-US");
      },
    });
    return () => {
      tween.kill();
    };
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
      gsap.set(fill, { scaleY: 1 });
      gsap.set(dot, { autoAlpha: 0 });
      setActive(NODES.length - 1);
      return;
    }

    const setFromProgress = (p: number) => {
      const y = p * len;
      let n = 0;
      for (let i = 0; i < centers.length; i++) {
        if (centers[i] - top <= y + 4) n = i;
      }
      if (n !== activeRef.current) {
        activeRef.current = n;
        setActive(n);
      }
    };

    const ctx = gsap.context(() => {
      gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(dot, { y: 0 });
      const st = ScrollTrigger.create({
        trigger: list,
        start: "top 62%",
        end: "bottom 78%",
        scrub: 0.55,
        onRefresh: () => {
          top = measure();
        },
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(fill, { scaleY: p });
          gsap.set(dot, { y: p * len });
          setFromProgress(p);
        },
      });
      return () => st.kill();
    }, el);

    const onResize = () => {
      top = measure();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
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
          Every SEO report you have ever been sent stops at step two, because step two is
          where the tools stop. Nothing in Search Console has ever told me whether your phone
          rang. That half is yours, and it is the half that pays for the other half.
        </p>
        <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
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
                <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-muted">
                  0{i + 1} &middot; {n.label}
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
                    <p className="mt-2.5 max-w-[34ch] font-mono text-[11px] leading-relaxed text-muted">
                      {n.unit}
                    </p>
                  </>
                ) : (
                  <p className="mt-3">
                    <span
                      className={`inline-flex items-center gap-2.5 rounded-sm border border-dashed px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.13em] transition-colors duration-300 ${
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
        The distance between {aggregate.clicks.toLocaleString("en-US")} clicks and your bank
        account is the whole conversation. Tell me what step three is worth to you and I will
        work backwards from there.
      </p>
    </div>
  );
}
