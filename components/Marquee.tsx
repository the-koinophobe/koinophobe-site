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
    <div className="marquee-mask relative flex overflow-hidden border-y border-line bg-surface/40 py-5">
      <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-base font-medium uppercase tracking-wider text-muted sm:text-lg">
              {t}
            </span>
            <span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
