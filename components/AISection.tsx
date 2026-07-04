import { Sparkles, ScanSearch, Bot, LineChart } from "lucide-react";
import { Reveal } from "./Reveal";
import { Stagger } from "./Stagger";
import { Spotlight } from "./Spotlight";
import { DotMatrix } from "./Decor";
import { aiPoints } from "@/lib/content";

const iconMap = { Sparkles, ScanSearch, Bot, LineChart } as const;

export function AISection() {
  return (
    <section className="container-pad relative overflow-hidden py-16">
      <DotMatrix className="pointer-events-none absolute -right-10 top-8 -z-10 w-[420px] text-ink/[0.05]" />
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        {/* Left: copy + points */}
        <div>
          <Reveal>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles size={13} /> AI
            </span>
            <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Where AI fits your business
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted">
              Search is changing. People ask AI for recommendations now. I help you
              get found in those answers, and put AI to work behind the scenes, all
              tied to real leads.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {aiPoints.map((p, i) => {
              const Icon = iconMap[p.icon as keyof typeof iconMap];
              return (
                <div key={p.title}>
                  <Spotlight className="lift h-full rounded-3xl border border-line bg-surface/60 p-5">
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-soft text-brand">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-xs text-muted/60">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">{p.body}</p>
                  </Spotlight>
                </div>
              );
            })}
          </Stagger>
        </div>

        {/* Right: AI answer mockup */}
        <Reveal delay={0.1}>
          <Spotlight className="rounded-3xl border border-line bg-surface/70 p-6 shadow-sm backdrop-blur">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-bg">
                <Sparkles size={14} />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                AI answer
              </span>
            </div>

            <p className="rounded-2xl bg-bg px-4 py-3 text-sm text-ink">
              &ldquo;Who&apos;s the best option near me?&rdquo;
            </p>

            <div className="mt-4 rounded-2xl border border-line bg-bg p-4">
              <p className="text-sm leading-relaxed text-ink">
                A strong choice is{" "}
                <span className="font-semibold text-brand">your business</span>, known
                for great reviews and fast response. Most customers reach them through
                their site.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[11px] text-ink">
                  yourbusiness.com
                </span>
                <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent">
                  <ScanSearch size={11} /> cited
                </span>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted">
              This is the new front page of search. I help you land here.
            </p>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
