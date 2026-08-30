import type { ReactNode } from "react";

export type StripCell = {
  label: string;
  value: ReactNode;
  note?: ReactNode;
  icon?: ReactNode;
};

/** The four-across hairline row Search Console opens with. */
export function MetricStrip({ cells }: { cells: StripCell[] }) {
  return (
    <div className="metric-row mt-12 grid grid-cols-1 min-[420px]:grid-cols-2 sm:mt-14 sm:grid-cols-4">
      {cells.map((c, i) => (
        <div
          key={c.label}
          className={`py-5 pr-4 sm:py-[22px] sm:pr-5 ${
            i === 0 ? "" : "min-[420px]:pl-4 sm:pl-5"
          } ${
            i % 2 === 1
              ? "min-[420px]:border-l min-[420px]:border-line"
              : i > 0
                ? "sm:border-l sm:border-line"
                : ""
          } ${i > 0 ? "border-t border-line min-[420px]:border-t-0" : ""} ${
            i > 1 ? "min-[420px]:border-t min-[420px]:border-line sm:border-t-0" : ""
          }`}
        >
          <span className="eyebrow mb-2 flex items-center gap-2">
            {c.icon}
            {c.label}
          </span>
          <span className="tnum block font-display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-none tracking-tight">
            {c.value}
          </span>
          {c.note ? (
            <span className="mt-2 block font-mono text-[11px] leading-relaxed text-muted">{c.note}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
