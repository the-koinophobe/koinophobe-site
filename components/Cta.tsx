import Link from "next/link";
import { ArrowRight, CalendarCheck, Mail } from "lucide-react";
import { site } from "@/lib/site";

const SUBJECT = encodeURIComponent("My site");

/** One href builder so every email CTA on the site points at the same inbox. */
export const mailHref = `mailto:${site.email}?subject=${SUBJECT}`;

/*
 * Every call to action on the site comes from this file, so they all share
 * one shape (the pill in globals.css) and one set of analytics attributes.
 * Click tracking runs through one delegated listener in Anim.tsx reading
 * data-track and data-from, so a button costs no JavaScript of its own.
 */

type Size = "sm" | "md" | "lg";
const sizeClass: Record<Size, string> = { sm: "btn-sm", md: "btn-md", lg: "btn-lg" };

/** Primary button. Opens the Cal.com booking page in a new tab. */
export function BookCta({
  label = "Book a free call",
  from,
  size = "lg",
  tone = "primary",
  className = "",
}: {
  label?: string;
  from: string;
  size?: Size;
  tone?: "primary" | "light";
  className?: string;
}) {
  return (
    <a
      href={site.booking}
      target="_blank"
      rel="noopener"
      data-track="cta_book"
      data-from={from}
      className={`btn ${sizeClass[size]} ${tone === "light" ? "btn-light" : "btn-primary"} ${className}`}
    >
      <CalendarCheck size={size === "sm" ? 16 : 18} aria-hidden />
      {label}
    </a>
  );
}

/** Secondary button for email. */
export function EmailCta({
  label = "Email me",
  from,
  href = mailHref,
  size = "lg",
  tone = "secondary",
  className = "",
}: {
  label?: string;
  from: string;
  href?: string;
  size?: Size;
  tone?: "secondary" | "ghost-light";
  className?: string;
}) {
  return (
    <a
      href={href}
      data-track="cta_email"
      data-from={from}
      className={`btn ${sizeClass[size]} ${tone === "ghost-light" ? "btn-ghost-light" : "btn-secondary"} ${className}`}
    >
      <Mail size={size === "sm" ? 16 : 18} aria-hidden />
      {label}
    </a>
  );
}

/** Secondary button that goes to another page on the site. */
export function PageCta({
  href,
  label,
  from,
  size = "lg",
  className = "",
}: {
  href: string;
  label: string;
  from: string;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-track="cta_link"
      data-from={from}
      className={`btn ${sizeClass[size]} btn-secondary ${className}`}
    >
      {label}
      <ArrowRight size={17} aria-hidden />
    </Link>
  );
}

/** Text link with an arrow, for routes inside a section. */
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
    <Link href={href} data-track="cta_link" data-from={from} className={`link-arrow text-[15.5px] ${className}`}>
      {label}
      <ArrowRight size={16} aria-hidden />
    </Link>
  );
}

/** The small line under a booking button. */
export function BookNote({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <p className={`text-[13.5px] ${light ? "muted" : "text-muted"} ${className}`}>
      Free, 20 minutes &middot; {site.hours}
    </p>
  );
}

/**
 * A slim call-to-action card between sections: one line, the booking button
 * and one quieter alternative.
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
    <div className="container-pad">
      <div className="card flex flex-col gap-6 bg-surface px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between md:gap-10 md:py-10">
        <p className="t-h3 max-w-[30ch] !text-[clamp(1.35rem,2.4vw,1.75rem)] text-balance">{line}</p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <BookCta from={from} size="md" />
            {secondary ? (
              <PageCta href={secondary.href} label={secondary.label} from={from} size="md" />
            ) : (
              <EmailCta from={from} size="md" />
            )}
          </div>
          <BookNote />
        </div>
      </div>
    </div>
  );
}
