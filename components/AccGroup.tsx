"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Wraps a list of <details> rows (the numbered "How I help" list) and makes it
 * behave like one accordion: opening a row closes the one that was open, and
 * both slide rather than snap. The markup stays plain <details>, so it works
 * with no JavaScript and keeps native keyboard support. A video inside the open
 * row plays; the rest pause. Reduced motion gets the same behaviour, no slide.
 */
export function AccGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll<HTMLDetailsElement>(":scope > details"));
    const running = new Map<HTMLDetailsElement, Animation>();
    const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

    const media = (d: HTMLDetailsElement, play: boolean) => {
      d.querySelectorAll("video").forEach((v) => {
        if (play && !still()) v.play().catch(() => {});
        else v.pause();
      });
    };

    /* Run `done` once, when the animation ends or, if the tab is hidden and
       animations are paused, shortly after it should have. */
    const finish = (a: Animation, ms: number, done: () => void) => {
      let ran = false;
      const once = () => {
        if (ran) return;
        ran = true;
        done();
      };
      a.onfinish = once;
      window.setTimeout(once, ms + 60);
    };

    const settle = (d: HTMLDetailsElement) => {
      running.get(d)?.cancel();
      running.delete(d);
      d.style.height = "";
      d.style.overflow = "";
    };

    const open = (d: HTMLDetailsElement) => {
      const sum = d.querySelector("summary") as HTMLElement;
      const from = d.offsetHeight;
      settle(d);
      d.open = true;
      media(d, true);
      if (still()) return;
      const to = d.offsetHeight;
      d.style.overflow = "hidden";
      const a = d.animate({ height: [`${Math.max(from, sum.offsetHeight)}px`, `${to}px`] }, { duration: 420, easing: EASE });
      running.set(d, a);
      const body = d.querySelector<HTMLElement>(".body, .acc-body");
      body?.animate({ opacity: [0, 1], transform: ["translateY(10px)", "translateY(0)"] }, { duration: 380, delay: 80, easing: EASE, fill: "backwards" });
      finish(a, 420, () => {
        if (running.get(d) === a) settle(d);
      });
    };

    const close = (d: HTMLDetailsElement) => {
      const sum = d.querySelector("summary") as HTMLElement;
      media(d, false);
      if (still()) {
        d.open = false;
        return;
      }
      const from = d.offsetHeight;
      settle(d);
      d.style.overflow = "hidden";
      const a = d.animate({ height: [`${from}px`, `${sum.offsetHeight}px`] }, { duration: 320, easing: EASE });
      running.set(d, a);
      finish(a, 320, () => {
        if (running.get(d) !== a) return; // a newer open or close took over
        d.open = false;
        settle(d);
      });
    };

    const handlers = rows.map((d) => {
      const sum = d.querySelector("summary");
      const onClick = (e: Event) => {
        e.preventDefault();
        if (d.open && !running.has(d)) {
          close(d);
          return;
        }
        if (d.open) return;
        rows.forEach((o) => o !== d && o.open && close(o));
        open(d);
      };
      sum?.addEventListener("click", onClick);
      return () => sum?.removeEventListener("click", onClick);
    });

    return () => {
      handlers.forEach((off) => off());
      rows.forEach(settle);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
