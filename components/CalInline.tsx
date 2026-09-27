"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
};
type CalWindow = Window & { Cal?: CalFn };

const NS = "intro";

/**
 * Cal.com's inline calendar, loaded only when someone asks for it. Until the
 * click, the page ships no third-party script, so /contact keeps its score.
 * This is Cal's own loader snippet, typed.
 */
function loadCal(w: CalWindow) {
  if (w.Cal) return;
  const d = w.document;
  const push = (api: { q: unknown[] }, args: unknown) => api.q.push(args);
  const cal = function (this: unknown, ...ar: unknown[]) {
    const c = w.Cal!;
    if (!c.loaded) {
      c.ns = {};
      c.q = c.q || [];
      const s = d.createElement("script");
      s.src = "https://app.cal.com/embed/embed.js";
      s.async = true;
      d.head.appendChild(s);
      c.loaded = true;
    }
    if (ar[0] === "init") {
      const api = function (...a: unknown[]) {
        push(api as unknown as { q: unknown[] }, a);
      } as unknown as { q: unknown[] } & ((...a: unknown[]) => void);
      api.q = api.q || [];
      const namespace = ar[1];
      if (typeof namespace === "string") {
        c.ns![namespace] = c.ns![namespace] || api;
        push(c.ns![namespace] as unknown as { q: unknown[] }, ar);
        push(c as unknown as { q: unknown[] }, ["initNamespace", namespace]);
      } else push(c as unknown as { q: unknown[] }, ar);
      return;
    }
    push(c as unknown as { q: unknown[] }, ar);
  } as CalFn;
  w.Cal = cal;
}

export function CalInline() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();

  const start = () => {
    if (open) return;
    setOpen(true);
    const w = window as CalWindow;
    loadCal(w);
    const Cal = w.Cal!;
    Cal("init", NS, { origin: "https://cal.com" });
    // wait a frame so the container is in the DOM
    requestAnimationFrame(() => {
      const api = Cal.ns![NS];
      api("inline", {
        elementOrSelector: "#cal-inline",
        calLink: site.calLink,
        config: { layout: "month_view", theme: resolvedTheme === "dark" ? "dark" : "light" },
      });
      api("ui", {
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { "cal-brand": "#032b14" },
          dark: { "cal-brand": "#FBF7ED" },
        },
      });
      api("on", {
        action: "bookingSuccessful",
        callback: () => track("booking_complete", { from: "contact_inline" }),
      });
    });
  };

  return (
    <div className="rounded-md border border-line bg-bg">
      {!open && (
        <div className="flex flex-col items-start gap-5 p-7 sm:p-9">
          <p className="max-w-[40ch] text-[15.5px] text-muted">
            Pick a time that suits you. The calendar shows your local time, and every slot is
            inside {site.hours.split(",")[0]}.
          </p>
          <button
            type="button"
            onClick={start}
            data-track="cta_book"
            data-from="contact_inline"
            className="inline-flex items-center gap-2.5 rounded-sm bg-ink px-6 py-4 text-[16px] font-medium text-bg transition-[transform,opacity] duration-150 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transform-none"
          >
            <CalendarCheck size={19} aria-hidden />
            Show available times
          </button>
          <p className="font-mono text-[11px] text-muted">
            Loads the calendar from Cal.com. Or{" "}
            <a href={site.booking} target="_blank" rel="noopener" className="underline">
              open it in a new tab
            </a>
            .
          </p>
        </div>
      )}
      <div
        id="cal-inline"
        ref={box}
        className={open ? "min-h-[640px] w-full overflow-auto" : "hidden"}
      />
    </div>
  );
}
