import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/gsc";
import { monthly } from "@/lib/gsc";
import { PageBars, PositionLadder, Sparkline } from "./GscCharts";
import { Reveal } from "./Reveal";

/** Backticks in the copy are query strings. Render them in mono. */
function Prose({ text, className = "mb-4 last:mb-0" }: { text: string; className?: string }) {
  const parts = text.split("`");
  return (
    <p className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-mono text-[0.94em]">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

function Chart({ c }: { c: CaseStudy }) {
  const props = { title: c.chartTitle, range: c.chartRange };
  if (c.chart === "roofing") return <PositionLadder {...props} />;
  if (c.chart === "agency") return <PageBars {...props} />;
  const data =
    c.chart === "myofascial" ? monthly.myofascial : c.chart === "tint" ? monthly.tint : monthly.gameshop;
  const unit = c.chart === "tint" ? "impressions" : "clicks";
  return <Sparkline data={data} unit={unit} {...props} />;
}

export function CaseStudyBlock({ c }: { c: CaseStudy }) {
  return (
    <article id={c.slug} className="scroll-mt-24 border-b border-line py-10 sm:py-14">
      <Reveal>
      <div className="flex flex-wrap items-center gap-3.5">
        {[c.client, c.place].map((t) => (
          <span
            key={t}
            className="rounded-sm border border-line px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <h2 className="mt-4 max-w-[26ch] font-display text-[clamp(1.55rem,3vw,2.2rem)] leading-[1.09] tracking-tight text-balance">
        {c.title}
      </h2>
      <p className="mt-2.5 font-mono text-[11.5px] text-muted">{c.meta}</p>
      </Reveal>

      <div className="metric-row mt-7 grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-4">
        {c.metrics.map((m, i) => (
          <div
            key={m.label}
            className={`py-4 pr-4 ${i === 0 ? "" : "min-[420px]:pl-4"} ${
              i % 2 === 1
                ? "min-[420px]:border-l min-[420px]:border-line"
                : i > 0
                  ? "sm:border-l sm:border-line"
                  : ""
            } ${i > 0 ? "border-t border-line min-[420px]:border-t-0" : ""} ${
              i > 1 ? "min-[420px]:border-t min-[420px]:border-line sm:border-t-0" : ""
            }`}
          >
            <span className="eyebrow-flat mb-1.5 block text-[10px]">{m.label}</span>
            <span className="tnum text-xl font-medium tracking-tight">{m.value}</span>
            {m.delta ? (
              <span
                className={`ml-2 whitespace-nowrap font-mono text-[11px] ${
                  m.tone === "up" ? "text-brand" : m.tone === "down" ? "text-accent" : "text-muted"
                }`}
              >
                {m.delta}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
        <div className="[&>p:first-child]:text-[17.5px]">
          {c.body.map((t) => (
            <Prose key={t.slice(0, 24)} text={t} />
          ))}
        </div>
        <div className="flex flex-col">
          <figure>
            <Chart c={c} />
            <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
              {c.caption}
            </figcaption>
          </figure>
          <div className="mt-7 border-t border-line pt-4">
            <span className="mb-3 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
              <ArrowUpRight size={17} aria-hidden />
              What&rsquo;s next
            </span>
            <Prose text={c.next} className="text-[15.5px] text-muted" />
          </div>
        </div>
      </div>
    </article>
  );
}
