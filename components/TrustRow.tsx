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
    <div className="flex flex-col gap-y-2.5 border-b border-line py-5 lg:flex-row lg:items-baseline lg:justify-between lg:gap-x-8">
      <p className="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.11em] text-muted sm:text-[11px] sm:tracking-[0.13em]">
        <span className="text-ink">30+ sites</span> across{" "}
        {SECTORS.map((s, i) => (
          <span key={s}>
            {s}
            {i < SECTORS.length - 1 ? <span className="text-muted/50"> · </span> : null}
          </span>
        ))}
      </p>
      <p className="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.11em] text-muted sm:text-[11px] sm:tracking-[0.13em]">
        Two named on this site &middot; the rest is white-label and stays anonymous
      </p>
    </div>
  );
}
