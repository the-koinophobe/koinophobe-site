const PHRASES = [
  "Two years of client work",
  "Technical SEO",
  "GA4 · GTM · Search Console",
  "30+ sites shipped",
  "White-label for agencies",
  "Local search & map pack",
  "Core Web Vitals",
  "Conversion tracking",
  "Schema & structured data",
  "Site migrations",
  "US Eastern hours",
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
