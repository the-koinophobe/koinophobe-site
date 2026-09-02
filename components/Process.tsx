"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneCall, FileText, Hammer, TrendingUp } from "lucide-react";

type Audience = "owner" | "agency";

const STEPS = [
  {
    key: "call",
    label: "The call",
    icon: PhoneCall,
    when: "Day one",
    owner:
      "Twenty minutes, no deck. What does the business actually need more of, and who do you need it from? Half the time the answer isn't more traffic at all, it's the wrong three pages ranking.",
    agency:
      "Twenty minutes with you, not your client. What has been promised, what has already been tried, and where the account is bleeding time. I have sat on your side of that call plenty of times.",
  },
  {
    key: "scope",
    label: "Scope",
    icon: FileText,
    when: "Within a few days",
    owner:
      "You get it in writing: what I will do, in what order, what it costs, and what has to be true for it to work. If I think the money is better spent somewhere that isn't me, that goes in the document too.",
    agency:
      "A scope your account manager can forward to the client without editing a line. Fixed price or retainer, your call, and I stay invisible in every document that leaves your office.",
  },
  {
    key: "work",
    label: "The work",
    icon: Hammer,
    when: "Weeks two to twelve",
    owner:
      "Titles, structure, schema, speed, the pages that should exist and don't. Shipped into your CMS on a schedule you approve, biggest return first, and nothing goes live without you seeing what changed.",
    agency:
      "I work in your stack and your process. WordPress, Elementor, AIOSEO or Yoast day to day, React, TypeScript or Django when a plugin cannot do it. Thirty-plus sites and counting.",
  },
  {
    key: "proof",
    label: "Proof",
    icon: TrendingUp,
    when: "Monthly, ongoing",
    owner:
      "Now the data matters. Same four numbers every month against the same baseline, so you can see the work landing instead of taking my word for it. That is the whole reason this site is built out of client data.",
    agency:
      "A monthly report in your template with your logo on it. Same four numbers, same baseline, written so a client can read it without a phone call afterwards.",
  },
] as const;

export function Process() {
  const [audience, setAudience] = useState<Audience>("owner");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);

  // The rail and the nodes are CSS. This only measures the path once and
  // marks the section when it arrives, which is the whole animation budget.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const rail = el.querySelector<SVGPathElement>("[data-rail]");
    if (rail) {
      const len = rail.getTotalLength();
      rail.style.strokeDasharray = String(len);
      rail.style.setProperty("--len", String(len));
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-in", "");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        el.setAttribute("data-in", "");
        io.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <div ref={rootRef}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow">How it goes</p>
        <div className="inline-flex rounded-sm border border-line p-0.5" role="tablist" aria-label="Who you are">
          {([["owner", "I run the business"], ["agency", "I'm an agency"]] as [Audience, string][]).map(
            ([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={audience === key}
                onClick={() => setAudience(key)}
                className={`rounded-[2px] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors duration-100 ${
                  audience === key ? "bg-ink text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
        We talk first. Everything else follows from that.
      </h2>
      <p className="mt-5 max-w-[58ch] text-muted">
        Nobody should hand over analytics access to a stranger on day one. I want to know what
        the business is chasing before I look at a single number.
      </p>

      {/* rail: draws itself as you scroll past */}
      <div className="relative mt-14">
        <svg
          className="pointer-events-none absolute inset-x-0 top-[22px] z-0 hidden h-px w-full overflow-visible sm:block"
          viewBox="0 0 1000 1"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path data-rail d="M0 0.5 H1000" stroke="rgb(var(--line))" strokeWidth={1} fill="none" />
        </svg>

        <div className="grid gap-y-10 sm:grid-cols-4 sm:gap-x-6" role="tablist" aria-label="Steps">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const on = i === active;
            return (
              <button
                key={s.key}
                data-node
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className="group flex items-start gap-4 text-left sm:flex-col sm:gap-0"
              >
                <span
                  className={`relative z-10 grid h-11 w-11 flex-none place-items-center rounded-full border transition-all duration-150 ${
                    on
                      ? "border-brand bg-brand text-bg"
                      : "border-line bg-bg text-muted group-hover:border-brand group-hover:text-ink"
                  }`}
                >
                  <Icon
                    size={20}
                    aria-hidden
                    className="transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none"
                  />
                </span>
                <span className="sm:mt-4">
                  <span
                    className={`block font-mono text-[12px] uppercase tracking-[0.12em] transition-colors duration-100 ${
                      on ? "text-ink" : "text-muted group-hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-muted">{s.when}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p key={`${active}-${audience}`} ref={bodyRef} className="step-body mt-10 max-w-[62ch] border-t border-line pt-8 text-[17.5px]">
        {step[audience]}
      </p>
    </div>
  );
}
