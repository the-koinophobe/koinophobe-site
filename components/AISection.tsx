"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Quote, ShieldCheck, Star, Terminal } from "lucide-react";

/**
 * The answer box. A CSS-only terminal that types two real local queries and
 * shows what comes back. Zero JS beyond the observer that starts it: the
 * typing is `steps()` on a width in `ch`, so it costs nothing at runtime.
 */

const CHAR = 0.048; // seconds per character

type Line = { text: string; delay: number };

const Q1: Line = { text: "myofascial release clinic melbourne fl", delay: 0.3 };
const A1_AT = Q1.delay + Q1.text.length * CHAR + 0.25;
const Q2: Line = { text: "best window tint shop near lawrence ks", delay: A1_AT + 1.35 };
const A2_AT = Q2.delay + Q2.text.length * CHAR + 0.25;

function typeStyle(l: Line): CSSProperties {
  return {
    ["--n" as string]: l.text.length,
    animationDuration: `${(l.text.length * CHAR).toFixed(2)}s`,
    animationDelay: `${l.delay}s`,
  };
}

function fadeStyle(at: number): CSSProperties {
  return { animationDelay: `${at.toFixed(2)}s` };
}

const POINTS = [
  {
    icon: ShieldCheck,
    title: "A profile that agrees with itself",
    body: "Categories, services, hours and address saying the same thing everywhere they appear. Assistants throw out anything they can't corroborate twice.",
  },
  {
    icon: Star,
    title: "Reviews with words in them",
    body: "Not the star count. The sentences. Every summary you have ever read back from an AI was assembled out of what customers actually wrote.",
  },
  {
    icon: Quote,
    title: "Pages that answer the question",
    body: "Plain language, one question per page, the answer near the top. The same thing that has always won featured snippets now wins the spoken answer.",
  },
];

function Answer({
  at,
  domain,
  children,
}: {
  at: number;
  domain: string;
  children: React.ReactNode;
}) {
  return (
    <div className="term-fade mt-3 border-l-2 border-brand/40 pl-4" style={fadeStyle(at)}>
      <p className="text-[14.5px] leading-relaxed text-ink">{children}</p>
      <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.11em] text-muted">
        cited &middot; <span className="text-brand">{domain}</span>
      </p>
    </div>
  );
}

export function AISection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { rootMargin: "-12% 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.02fr] lg:gap-16">
      <div>
        <p className="eyebrow">The answer box</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
          A good number of them are asking a machine now.
        </h2>
        <p className="mt-6 max-w-[54ch] text-[17.5px] text-muted">
          Nobody needs a separate &ldquo;AI strategy&rdquo; for this. Assistants build those
          answers out of the same raw material the map pack has always run on: a Business
          Profile that agrees with itself, reviews with real sentences in them, and pages that
          answer the question in plain words.
        </p>
        <p className="mt-5 max-w-[54ch] text-[17.5px] text-muted">
          That is the work already on this page. The only thing that changed is that it now
          gets read out loud instead of clicked.
        </p>

        <ul className="mt-10 border-t border-line">
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                className="grid grid-cols-[26px_1fr] items-start gap-x-5 border-b border-line py-5"
              >
                <span className="mt-0.5 text-brand">
                  <Icon size={19} aria-hidden strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-[15.5px] font-medium">{p.title}</p>
                  <p className="mt-1.5 max-w-[46ch] text-[14.5px] leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* the terminal */}
      <div
        ref={ref}
        data-run={run ? "true" : "false"}
        className="self-start overflow-hidden rounded-sm border border-line bg-surface lg:sticky lg:top-28"
      >
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3 sm:px-5">
          <Terminal size={14} aria-hidden className="text-brand" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
            What a customer gets asked back
          </span>
        </div>

        <div className="px-4 py-6 sm:px-6 sm:py-8">
          <p className="font-mono text-[11px] leading-relaxed text-brand sm:text-[13px]">
            <span aria-hidden className="select-none pr-2 text-muted">
              &gt;
            </span>
            <span className="term-line align-top" style={typeStyle(Q1)}>
              {Q1.text}
            </span>
          </p>

          <Answer at={A1_AT} domain="the clinic's own site">
            Most people in Melbourne go to a small myofascial practice run by a therapist
            patients name directly in their reviews. It comes up for fascia release and pain
            work rather than general massage, and the site answers what a first visit involves
            before you have to call.
          </Answer>

          <p
            className="term-fade term-caret mt-8 font-mono text-[11px] leading-relaxed text-brand sm:text-[13px]"
            style={fadeStyle(Q2.delay - 0.3)}
          >
            <span aria-hidden className="select-none pr-2 text-muted">
              &gt;
            </span>
            <span className="term-line align-top" style={typeStyle(Q2)}>
              {Q2.text}
            </span>
          </p>

          <Answer at={A2_AT} domain="the shop's own site">
            One shop keeps coming up by name, with reviews that mention the ceramic film and
            the turnaround rather than just the price. Its profile lists the exact services and
            the site has a page for each one, so it is easy to confirm.
          </Answer>

          <p
            className="term-fade mt-8 border-t border-line pt-5 text-[13px] leading-relaxed text-muted"
            style={fadeStyle(A2_AT + 1.1)}
          >
            Neither of those clients did a single thing aimed at a robot. They ranked because
            the fundamentals were right, and the robot read the same page everybody else does.
          </p>
        </div>
      </div>
    </div>
  );
}
