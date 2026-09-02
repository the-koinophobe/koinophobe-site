import type { Metadata } from "next";
import { CalendarCheck, MessageSquare, Search } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { XIcon } from "@/components/Availability";
import { Linkedin } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send me your URL and what you want more of. I'll look at your site properly, then we get on a call and I tell you straight whether there's something worth paying for.",
  alternates: { canonical: "/contact" },
};

const STEPS = [
  {
    icon: <MessageSquare size={22} aria-hidden />,
    title: "You write",
    body: "The URL, what you sell and where, and what you actually want more of. Three lines is plenty.",
  },
  {
    icon: <Search size={22} aria-hidden />,
    title: "I look",
    body: "Properly, before we speak. Rankings, structure, speed, and whether the pages that should exist do.",
  },
  {
    icon: <CalendarCheck size={22} aria-hidden />,
    title: "We talk",
    body: "Twenty minutes. I tell you what I'd do and what it costs, or that it isn't worth doing. Either way it's free.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 sm:pt-36">
        <div className="container-pad">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 max-w-[17ch] font-display text-[clamp(2.2rem,5.4vw,4.05rem)] leading-[1.04] tracking-tight text-balance">
              Tell me the site and the goal. I&rsquo;ll do the rest.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17.5px] text-muted">
              No pricing page and no funnel. You send a few lines, I look at your site properly, and
              we get twenty minutes on a call. If I&rsquo;m not the right person for it you&rsquo;ll
              hear that in the reply and it costs you nothing.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-px bg-line sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className={`bg-bg py-8 sm:pr-8 ${i > 0 ? "sm:pl-8" : ""}`}>
                <span className="block text-brand">{s.icon}</span>
                <h2 className="mt-4 font-display text-[1.35rem] leading-snug tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-2.5 text-[15.5px] text-muted">{s.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mt-20 border-t border-line bg-surface">
        <div className="container-pad grid gap-12 py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Or just email me</p>
            <a
              href={`mailto:${site.email}?subject=My%20site`}
              className="mt-4 block font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight tracking-tight transition-colors duration-100 hover:text-brand"
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-[42ch] text-muted">
              I read everything myself and reply within a working day. Available now, working US
              Eastern hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a
                href={site.linkedin}
                className="inline-flex items-center gap-2 font-mono text-[11.5px] text-muted transition-colors duration-100 hover:text-ink"
              >
                <Linkedin size={16} aria-hidden />
                {site.linkedinHandle}
              </a>
              <a
                href={site.x}
                className="inline-flex items-center gap-2 font-mono text-[11.5px] text-muted transition-colors duration-100 hover:text-ink"
              >
                <XIcon />
                {site.xHandle}
              </a>
            </div>
            <figure className="mt-12 border-t border-line pt-8">
              <blockquote className="font-display text-[1.18rem] leading-[1.45] tracking-tight text-balance">
                &ldquo;Best to work with, will hire all the time. Straight forward, doesn&rsquo;t
                waste time. If he can&rsquo;t do something he&rsquo;ll tell you.&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3">
                <span className="text-[15px] font-medium">Johnny Urena</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                  Verified &middot; Upwork
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">Three things in the first email</p>
            <ol className="mt-6 space-y-5">
              {[
                ["Your URL.", "That is the only thing I actually need to start."],
                [
                  "What you want more of.",
                  "Calls, bookings, quotes, foot traffic. Not rankings, the thing rankings are supposed to buy you.",
                ],
                [
                  "What you have already tried.",
                  "So I do not spend the first call recommending something that failed last year.",
                ],
              ].map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[1.6rem_1fr] gap-x-4">
                  <span className="tnum font-mono text-[12px] text-brand">0{i + 1}</span>
                  <span>
                    <span className="block text-[16.5px] font-medium">{t}</span>
                    <span className="mt-1 block max-w-[42ch] text-[15px] leading-relaxed text-muted">
                      {b}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-9 max-w-[42ch] text-[15px] text-muted">
              No form, no autoresponder, no drip sequence. It comes straight to my inbox and I
              answer it myself.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
