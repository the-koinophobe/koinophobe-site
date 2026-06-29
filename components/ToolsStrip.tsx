import { Reveal } from "./Reveal";

const tools = [
  "GA4",
  "Google Tag Manager",
  "Search Console",
  "Semrush",
  "Ahrefs",
  "Screaming Frog",
  "WordPress",
  "Elementor",
];

export function ToolsStrip() {
  return (
    <Reveal className="flex flex-col items-center gap-5 text-center">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
        The stack I work in
      </span>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {tools.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line bg-surface/60 px-4 py-2 font-mono text-sm text-ink"
          >
            {t}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
