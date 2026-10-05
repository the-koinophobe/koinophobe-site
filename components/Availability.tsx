import Link from "next/link";
import { Check, Linkedin } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { BookCta, BookNote, EmailCta } from "./Cta";

const CALL = [
  "I look at your site and your Google Business Profile before we talk.",
  "You get the two or three things I'd fix first, and what they'd cost.",
  "If nothing is worth paying for, I'll tell you that on the call.",
];

/**
 * The closing call to action on every page: one dark band, one job.
 */
export function Availability() {
  return (
    <section id="contact" className="band">
      <div className="container-pad grid gap-12 py-20 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16 md:py-24">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7ED2A5] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ED2A5]" />
            </span>
            Taking new clients
          </span>
          <h2 className="t-h2 mt-5 max-w-[18ch]">Send me your website. I&rsquo;ll tell you what I&rsquo;d fix first.</h2>
          <p className="muted mt-5 max-w-[52ch] text-[17px] leading-relaxed">
            Book a free 20-minute call, or email me if you&rsquo;d rather write. Every price is on the{" "}
            <Link href="/pricing" className="text-white underline underline-offset-4 dark:text-ink">
              pricing page
            </Link>
            , so there are no surprises when we talk.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BookCta from="availability" tone="light" />
            <EmailCta from="availability" tone="ghost-light" />
          </div>
          <BookNote light className="mt-4" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 sm:p-8">
            <p className="text-[15px] font-medium">What happens on the call</p>
            <ul className="mt-5 space-y-4">
              {CALL.map((c) => (
                <li key={c} className="flex gap-3 text-[15.5px] leading-snug">
                  <Check size={18} aria-hidden className="mt-0.5 flex-none text-[#7ED2A5]" />
                  <span className="muted">{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[14px]">
              <a href={`mailto:${site.email}`} className="muted hover:text-white">
                {site.email}
              </a>
              <a href={site.linkedin} className="muted inline-flex items-center gap-2 hover:text-white">
                <Linkedin size={15} aria-hidden />
                LinkedIn
              </a>
              <a href={site.x} className="muted inline-flex items-center gap-2 hover:text-white">
                <XIcon />X
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Lucide has no X mark, so this is the official glyph path. */
export function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="flex-none">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
