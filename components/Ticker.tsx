const PHRASES = [
  "More calls from Google",
  "Calls and forms tracked",
  "Map pack",
  "Service and city pages",
  "Fast sites",
  "30+ sites shipped",
  "Two years of client work",
  "Site migrations",
  "White-label for agencies",
  "Same-day replies",
];

export function Ticker() {
  const run = [...PHRASES, ...PHRASES];
  return (
    <div className="marquee-mask overflow-hidden border-b border-line py-3.5" aria-hidden>
      <div className="animate-marquee-slow flex w-max">
        {run.map((p, i) => (
          <span
            key={`${p}-${i}`}
            className="whitespace-nowrap border-r border-line px-[26px] font-mono text-[11.5px] uppercase tracking-[0.13em] text-muted"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
