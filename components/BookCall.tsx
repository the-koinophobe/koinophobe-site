"use client";

import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

type Props = {
  label?: string;
  className?: string;
  subtle?: boolean;
};

export function BookCall({ label = "Book a Call", className = "", subtle = false }: Props) {
  const subject = encodeURIComponent("Project enquiry via koinophobe.com");
  const href = `mailto:${site.email}?subject=${subject}`;

  const base =
    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all";
  const styles = subtle
    ? "border border-line bg-surface text-ink hover:border-brand"
    : "bg-brand text-bg hover:brightness-105 shadow-sm";

  return (
    <a
      href={href}
      onClick={() => track("book_a_call_click", { label })}
      className={`${base} ${styles} ${className}`}
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-bg/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight size={13} strokeWidth={2.25} />
      </span>
      {label}
    </a>
  );
}
