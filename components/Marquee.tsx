const items = [
  "Technical SEO",
  "Conversion tracking",
  "GA4 + GTM",
  "Call & form tracking",
  "Keyword research",
  "Search Console",
  "Local & AI search",
  "CRO",
  "Revenue reporting",
  "Core Web Vitals",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee-mask relative flex overflow-hidden border-y border-line bg-surface/40 py-4">
      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-sm font-medium uppercase tracking-wider text-muted">
              {t}
            </span>
            <span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
