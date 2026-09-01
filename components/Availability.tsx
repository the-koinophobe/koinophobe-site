import { Linkedin, Mail, Link2, MapPin, Target } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

const ASK = [
  {
    icon: <Link2 size={19} aria-hidden />,
    text: "The URL. That's genuinely all I need to start forming an opinion.",
  },
  {
    icon: <MapPin size={19} aria-hidden />,
    text: "What you sell and where. Local search lives or dies on the second half of that.",
  },
  {
    icon: <Target size={19} aria-hidden />,
    text: "What you actually want more of. Calls, bookings, quotes, foot traffic. Not rankings.",
  },
];

export function Availability() {
  return (
    <section id="contact" className="border-t border-line bg-surface">
      <div className="container-pad grid gap-12 py-[78px] md:grid-cols-[1.1fr_1fr] md:gap-14">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-bg">
            <span className="avail-pip relative h-[7px] w-[7px] flex-none rounded-full bg-bg text-bg" />
            Available now
          </span>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[1.04] tracking-tight text-balance">
            Send me your URL. I&rsquo;ll tell you what I&rsquo;d do with it.
          </h2>
          <p className="mt-6 max-w-[50ch] text-muted">
            No pricing page, no discovery funnel, no form that emails you a PDF. Write to me, we get
            on a call, and I tell you straight whether there&rsquo;s something here worth paying for.
            If there isn&rsquo;t, you&rsquo;ll hear that too and it costs you nothing.
          </p>

          <div className="mt-8 flex flex-col items-start gap-5">
            <a
              href={`mailto:${site.email}?subject=My%20site`}
              className="inline-flex items-center gap-3 rounded-sm bg-ink px-6 py-4 font-medium text-bg transition-[transform,opacity] duration-150 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transform-none"
            >
              <Mail size={19} aria-hidden />
              {site.email}
            </a>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Three things in the first email</p>
          <div className="mt-5 border-t border-line">
            {ASK.map((a) => (
              <div
                key={a.text}
                className="grid grid-cols-[24px_1fr] items-start gap-4 border-b border-line py-5"
              >
                <span className="mt-0.5 text-brand">{a.icon}</span>
                <p className="text-[15.5px] text-muted">{a.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-[11.5px] leading-relaxed text-muted">
            I&rsquo;ll have looked at your site properly before we speak, so the call isn&rsquo;t
            twenty minutes of background.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Lucide has no X mark, so this is the official glyph path. */
export function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="flex-none"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
