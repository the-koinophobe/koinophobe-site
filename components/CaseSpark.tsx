import { monthly, positionLadder, type CaseStudy } from "@/lib/gsc";

/*
 * Small charts for case cards, drawn from the Search Console exports in
 * lib/gsc.ts. They animate when their card scrolls in (the shared observer
 * marks the card grid data-in), and are complete, static charts without it.
 */

const W = 200;
const H = 44;

/** A month-by-month line from a real series; the line draws in, the area fades up. */
function Spark({ data, label }: { data: [string, number][]; label: string }) {
  const max = Math.max(...data.map(([, v]) => v));
  const pts = data.map(([, v], i) => [(i / (data.length - 1)) * W, H - 2 - (v / max) * (H - 6)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="spark h-11 w-full overflow-visible" role="img" aria-label={label}>
      <path d={area} className="spark-area" />
      <path
        d={line}
        className="spark-line"
        pathLength={1000}
        strokeDasharray="1000"
        data-draw
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={lx} cy={ly} r="3" className="spark-end" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * One query's average Google position a year ago and now. Position 1 sits at
 * the left, so the dot travels left as the ranking improves.
 */
export function RankRow({ was, now, query }: { was: number; now: number; query?: string }) {
  const at = (p: number) => `${Math.min(p, 90) / 90 * 100}%`;
  return (
    <div className="rank-row" style={{ ["--was" as string]: at(was), ["--now" as string]: at(now) }}>
      {query ? <span className="rank-q">{query}</span> : null}
      <span className="rank-track" aria-hidden>
        <span className="rank-was" />
        <span className="rank-trail" />
        <span className="rank-dot" />
      </span>
      <span className="rank-num">
        #{Math.round(was)} &rarr; #{Math.round(now)}
      </span>
    </div>
  );
}

const SERIES: Partial<Record<CaseStudy["chart"], [string, number][]>> = {
  myofascial: monthly.myofascial,
  tint: monthly.tint,
  gameshop: monthly.gameshop,
};

/** The chart that fits a case: its monthly series, or the roofer's ranking climb. */
export function CaseSpark({ c, className = "" }: { c: CaseStudy; className?: string }) {
  if (c.chart === "roofing") {
    return (
      <div className={`grid gap-1.5 ${className}`}>
        {positionLadder.slice(0, 3).map(([q, was, now]) => (
          <RankRow key={q} was={was} now={now} query={q} />
        ))}
      </div>
    );
  }
  const data = SERIES[c.chart];
  if (!data) return null;
  const unit = c.chart === "tint" ? "impressions" : "clicks";
  return (
    <div className={className}>
      <Spark data={data} label={`${c.client}: monthly ${unit} from ${data[0][0]} to ${data[data.length - 1][0]}, from Search Console`} />
    </div>
  );
}
