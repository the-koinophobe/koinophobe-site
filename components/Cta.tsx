"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

const SUBJECT = encodeURIComponent("My site");

/** One href builder so every CTA on the site points at the same inbox. */
export const mailHref = `mailto:${site.email}?subject=${SUBJECT}`;

/** Solid primary button. Used in the header, the hero and every CTA band. */
export function EmailCta({
  label = "Send me your URL",
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
      href={mailHref}
      onClick={() => track("cta_email", { from })}
      className={`inline-flex items-center gap-2.5 rounded-sm bg-ink font-medium text-bg transition-[transform,opacity] duration-150 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transform-none ${
        size === "sm" ? "px-4 py-2 text-[13px]" : "px-6 py-4 text-[16px]"
      } ${className}`}
    >
      <Mail size={size === "sm" ? 15 : 19} aria-hidden />
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
      onClick={() => track("cta_link", { from, href })}
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

/**
 * Slim inline band, deliberately not the closing Availability section: one
 * line, one button, one alternative. Dropped between sections so the reader
 * never has to scroll to the bottom to act.
 */
export function CtaBand({
  line,
  label = "Send me your URL",
  from,
  secondary,
}: {
  line: string;
  label?: string;
  from: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="border-y border-line bg-surface">
      <div className="container-pad flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="max-w-[30ch] font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.15] tracking-tight text-balance">
          {line}
        </p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <EmailCta label={label} from={from} />
          {secondary && <TextCta href={secondary.href} label={secondary.label} from={from} />}
        </div>
      </div>
    </div>
  );
}
