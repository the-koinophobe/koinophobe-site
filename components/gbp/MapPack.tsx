import { MapPin, Phone, Navigation, Star, Search } from "lucide-react";

const results = [
  { name: "Your business", rating: "4.9", count: "31", meta: "Open now · 1.2 km", you: true },
  { name: "Competitor listed since 2023", rating: "4.4", count: "18", meta: "Open now · 2.6 km" },
  { name: "Competitor with two reviews", rating: "3.8", count: "2", meta: "Closes 6 pm · 4.1 km" },
];

function Stars({ filled }: { filled: number }) {
  return (
    <span className="flex items-center gap-[1px]" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={11}
          className={i < filled ? "fill-[rgb(var(--deep))] text-[rgb(var(--deep))]" : "text-line/25"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

// Stylised illustration of a local map pack. Not a screenshot, no live data:
// it exists to make the offer concrete above the fold.
export function MapPack() {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-[28px] border-[3px] border-[rgb(var(--edge))] bg-surface shadow-[10px_10px_0_0_rgb(var(--edge))]">
        <div className="flex items-center gap-2 border-b-[3px] border-[rgb(var(--edge))] bg-bg/60 px-4 py-3">
          <Search size={14} className="text-muted" aria-hidden />
          <span className="font-mono text-xs text-muted">solar installer near me</span>
        </div>

        <div className="relative h-24 overflow-hidden border-b-[3px] border-[rgb(var(--edge))] bg-brand-soft/60">
          <svg
            viewBox="0 0 400 96"
            className="absolute inset-0 h-full w-full text-ink/[0.10]"
            fill="none"
            aria-hidden
            preserveAspectRatio="none"
          >
            <path d="M0 62h150l40-34h210M0 22h96l34 40M250 96V42h150" stroke="currentColor" strokeWidth="1.4" />
            <path d="M0 84h400M120 0v96M310 0v96" stroke="currentColor" strokeWidth="1" strokeDasharray="4 7" />
          </svg>
          <span className="absolute left-[26%] top-[38%] grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-[3px] border-[rgb(var(--edge))] bg-accent text-bg">
            <MapPin size={14} strokeWidth={2.4} aria-hidden />
          </span>
          <span className="absolute left-[62%] top-[62%] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ink/40 bg-surface" />
          <span className="absolute left-[82%] top-[30%] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ink/40 bg-surface" />
        </div>

        <ul className="divide-y divide-line">
          {results.map((r, i) => (
            <li
              key={r.name}
              className={`flex items-start gap-3 px-4 py-3.5 ${
                r.you ? "bg-brand-soft/40" : ""
              }`}
            >
              <span
                className={`mt-0.5 font-mono text-[11px] ${
                  r.you ? "text-[rgb(var(--deep))]" : "text-muted/70"
                }`}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`truncate text-sm font-semibold ${
                      r.you ? "text-ink" : "text-muted"
                    }`}
                  >
                    {r.name}
                  </span>
                  {r.you && (
                    <span className="rounded-full border-2 border-[rgb(var(--edge))] bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--edge))]">
                      Verified
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted">
                  <Stars filled={r.you ? 5 : 4} />
                  <span className="font-mono">
                    {r.rating} ({r.count})
                  </span>
                  <span className="truncate">{r.meta}</span>
                </div>
                {r.you && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full border-2 border-[rgb(var(--edge))] bg-bg px-2.5 py-1 text-[11px] font-bold text-ink">
                      <Phone size={11} strokeWidth={2.2} aria-hidden /> Call
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border-2 border-[rgb(var(--edge))] bg-bg px-2.5 py-1 text-[11px] font-bold text-ink">
                      <Navigation size={11} strokeWidth={2.2} aria-hidden /> Directions
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border-2 border-[rgb(var(--edge))] bg-bg px-2.5 py-1 text-[11px] font-bold text-ink">
                      WhatsApp
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-muted">
        Illustration, not a screenshot
      </p>
    </div>
  );
}
