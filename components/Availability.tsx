import { Linkedin, Mail } from "lucide-react";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const ASK = [
  "The URL, and whether you own the Search Console property or need me to help you claim it.",
  "What you sell and where you sell it. Local search lives or dies on the second half of that.",
  "The thing that's actually bothering you. Rankings, leads, a site that got slow, a report you don't trust.",
];

/** Every page ends here. Availability, not a pricing table. */
export function Availability() {
  return (
    <section id="contact" className="mt-0 border-t border-line bg-surface">
      <div className="container-pad grid gap-10 py-[74px] md:grid-cols-[1.1fr_1fr] md:gap-14">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            <span className="avail-pip relative h-[7px] w-[7px] flex-none rounded-full bg-brand" />
            Available now
          </span>
          <h2 className="mt-4 max-w-[17ch] font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.04] tracking-tight text-balance">
            Send me an export and I&rsquo;ll tell you what&rsquo;s in it.
          </h2>
          <p className="mt-6 max-w-[52ch] text-muted">
            Open to agency partnerships and direct clients, working US Eastern hours. No pricing page,
            no discovery funnel, no form that emails you a PDF. Write to me, tell me the business and
            the problem, and we&rsquo;ll put a call in the calendar. If I&rsquo;m not the right person
            for it I&rsquo;ll say so in the reply.
          </p>
          <div className="mt-8 flex flex-col items-start gap-5">
            <a
              href={`mailto:${site.email}?subject=Let%27s%20talk%20SEO`}
              className="inline-flex items-center gap-3 rounded-sm bg-ink px-6 py-4 font-medium text-bg transition-[transform,opacity] duration-150 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transform-none"
            >
              <Mail size={17} aria-hidden />
              {site.email}
            </a>
            <a
              href={site.linkedin}
              className="inline-flex items-center gap-2 font-mono text-[11.5px] text-muted transition-colors duration-150 hover:text-ink"
            >
              <Linkedin size={13} aria-hidden />
              {site.linkedinHandle}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">[ Put these three things in it ]</p>
          <div className="mt-4 border-t border-line">
            {ASK.map((line, i) => (
              <div key={line} className="grid grid-cols-[30px_1fr] items-baseline gap-3 border-b border-line py-3.5">
                <b className="font-mono text-[11px] font-medium tracking-[0.12em] text-muted">
                  0{i + 1}
                </b>
                <p className="text-[15px] text-muted">{line}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-[11.5px] leading-relaxed text-muted">
            I&rsquo;ll read it against your data before the call, so we&rsquo;re not spending the first
            twenty minutes on background.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
