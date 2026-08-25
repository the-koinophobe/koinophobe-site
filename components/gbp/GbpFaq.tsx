"use client";

import { useState } from "react";

// Same interaction as the site FAQ, but takes its items as a prop so the
// landing page can carry its own questions.
export function GbpFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y-[3px] divide-[rgb(var(--edge))] overflow-hidden rounded-[28px] border-[3px] border-[rgb(var(--edge))] bg-surface shadow-[8px_8px_0_0_rgb(var(--edge))]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-semibold text-ink sm:text-lg">
                {item.q}
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-[3px] border-[rgb(var(--edge))] font-bold transition-transform ${
                  isOpen ? "rotate-45 bg-brand text-[rgb(var(--edge))]" : "bg-bg text-ink"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
