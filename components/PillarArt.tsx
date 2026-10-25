import { Check, MapPin, PhoneCall } from "lucide-react";
import { monthly as gscMonthly } from "@/lib/gsc";

/*
 * The picture at the top of each bento card in "What we do". Decorative only,
 * drawn in CSS and SVG so there's nothing to download, and animated by the
 * shared observer: each one plays when its card scrolls in.
 */

/** A browser window whose speed ring fills and whose checks tick in. */
export function FixArt() {
  return (
    <div className="art-stage" aria-hidden data-anim="art">
      <div className="art-window">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-muted/40" />
          <span className="h-2 w-2 rounded-full bg-muted/30" />
          <span className="h-2 w-2 rounded-full bg-muted/20" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-surface" />
        </div>
        <div className="flex items-center gap-4 p-4">
          <svg viewBox="0 0 64 64" className="h-[68px] w-[68px] flex-none -rotate-90">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgb(var(--line))" strokeWidth="7" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="rgb(var(--brand))"
              strokeWidth="7"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
              data-draw
              style={{ ["--len" as string]: "100" }}
            />
          </svg>
          <div className="flex-1 space-y-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="art-tick flex items-center gap-2" style={{ transitionDelay: `${0.5 + i * 0.18}s` }}>
                <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-brand text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="h-2 rounded-full bg-surface" style={{ width: `${[80, 64, 72][i]}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** A dot-grid map with pins dropping onto it. */
export function TownsArt() {
  const pins = [
    { x: 24, y: 34, d: 0.25 },
    { x: 62, y: 22, d: 0.4 },
    { x: 46, y: 60, d: 0.55, lead: true },
    { x: 78, y: 66, d: 0.7 },
  ];
  return (
    <div className="art-stage art-dots" aria-hidden data-anim="art">
      {pins.map((p, i) => (
        <span
          key={i}
          className={`art-pin ${p.lead ? "art-pin-lead" : ""}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, transitionDelay: `${p.d}s` }}
        >
          <MapPin size={p.lead ? 22 : 17} strokeWidth={2.4} />
        </span>
      ))}
    </div>
  );
}

/** A ringing phone over the pain clinic's real monthly clicks. */
export function CallsArt() {
  const clinic = gscMonthly.myofascial;
  const max = Math.max(...clinic.map(([, v]) => v));
  return (
    <div className="art-stage flex-col justify-end px-6 pb-6" aria-hidden data-anim="art">
      <span className="art-ring absolute left-6 top-6 grid h-14 w-14 place-items-center rounded-2xl bg-pop text-on-pop">
        <PhoneCall size={22} strokeWidth={2.2} />
      </span>
      <div className="flex h-[42%] w-full items-end gap-[4px]">
        {clinic.map(([, v], i) => (
          <span
            key={i}
            className="art-col flex-1 rounded-t-[3px] bg-brand"
            style={{ height: `${Math.max(5, (v / max) * 100)}%`, opacity: 0.3 + (v / max) * 0.7, transitionDelay: `${0.2 + i * 0.04}s` }}
          />
        ))}
      </div>
    </div>
  );
}
