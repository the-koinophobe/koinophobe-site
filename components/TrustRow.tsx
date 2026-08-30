const SECTORS = [
  "Roofing",
  "Wellness",
  "Automotive",
  "Retail",
  "Real estate",
  "Legal",
  "Lawn care",
  "HOA compliance",
];

/**
 * The honest version of a logo wall. Two clients can be named; the rest is
 * white-label and stays anonymous, so the sectors carry the proof instead.
 */
export function TrustRow() {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-line py-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-muted">
        <span className="text-ink">20+ sites</span> across{" "}
        {SECTORS.map((s, i) => (
          <span key={s}>
            {s}
            {i < SECTORS.length - 1 ? <span className="text-muted/50"> · </span> : null}
          </span>
        ))}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-muted">
        Two named on this site &middot; the rest is white-label and stays anonymous
      </p>
    </div>
  );
}
