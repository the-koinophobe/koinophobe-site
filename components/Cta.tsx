import Link from "next/link";
import { ArrowRight, CalendarCheck, Mail } from "lucide-react";
import { site } from "@/lib/site";

const SUBJECT = encodeURIComponent("My site");

/** One href builder so every email CTA on the site points at the same inbox. */
export const mailHref = `mailto:${site.email}?subject=${SUBJECT}`;

/*
 * These are server components. Click tracking happens through one delegated
 * listener in Anim.tsx reading the data-track attributes below, so a call to
 * action costs no JavaScript of its own.
 *
 * Booking is the main action. Email stays as the quieter second option, and
 * keeps the "How can I help?" label.
 */

const solid =
  "inline-flex items-center gap-2.5 rounded-sm bg-ink font-medium text-bg transition-[transform,opacity] duration-150 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transform-none";

/** Solid primary button. Opens the Cal.com booking page in a new tab. */
export function BookCta({
  label = "Book a free call",
  from,
  size = "md",
  className = "",
}: {
  label?: string;
  from: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <a
      href={site.booking}
      target="_blank"
      rel="noopener"
      data-track="cta_book"
      data-from={from}
      className={`${solid} ${size === "sm" ? "px-4 py-2 text-[13px]" : "px-6 py-4 text-[16px]"} ${className}`}
    >
      <CalendarCheck size={size === "sm" ? 15 : 19} aria-hidden />
      {label}
    </a>
  );
}

/** Quiet email link, same visual weight as TextCta. */
export function EmailCta({
  label = "How can I help?",
  from,
  href = mailHref,
  className = "",
}: {
  label?: string;
  from: string;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      data-track="cta_email"
      data-from={from}
      className={`group inline-flex items-center gap-2.5 border-b border-line pb-1 font-mono text-[11.5px] uppercase tracking-[0.11em] transition-colors duration-100 hover:text-brand ${className}`}
    >
      <Mail size={15} aria-hidden />
      {label}
    </a>
  );
}

/** Quiet secondary link with a nudging arrow. */
export function TextCta({
  href,
  label,
  from,
  className = "",
}: {
  href: string;
  label: string;
  from: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-track="cta_link"
      data-from={from}
      className={`group inline-flex items-center gap-2.5 border-b border-line pb-1 font-mono text-[11.5px] uppercase tracking-[0.11em] transition-colors duration-100 hover:text-brand ${className}`}
    >
      {label}
      <ArrowRight
        size={15}
        aria-hidden
        className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transform-none"
      />
    </Link>
  );
}

/** The small line under a booking button. */
export function BookNote({ className = "" }: { className?: string }) {
  return (
    <p className={`font-mono text-[11px] tracking-wide text-muted ${className}`}>
      Free, 20 minutes &middot; {site.hours}
    </p>
  );
}

/**
 * Slim inline band, deliberately not the closing Availability section: one
 * line, the booking button, and one quieter alternative (email by default).
 */
export function CtaBand({
  line,
  from,
  secondary,
}: {
  line: string;
  from: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="border-y border-line bg-surface">
      <div className="container-pad flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="max-w-[30ch] font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.15] tracking-tight text-balance">
          {line}
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <BookCta from={from} />
            {secondary ? (
              <TextCta href={secondary.href} label={secondary.label} from={from} />
            ) : (
              <EmailCta from={from} />
            )}
          </div>
          <BookNote />
        </div>
      </div>
    </div>
  );
}
