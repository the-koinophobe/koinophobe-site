"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
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
  const ref = useRef<HTMLAnchorElement | null>(null);

  // Subtle magnetic pull toward the cursor (desktop pointers only).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const clamp = gsap.utils.clamp(-7, 7);
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: globalThis.PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo(clamp((e.clientX - (r.left + r.width / 2)) * 0.18));
      yTo(clamp((e.clientY - (r.top + r.height / 2)) * 0.18));
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, []);

  const base =
    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all";
  const styles = subtle
    ? "border border-line bg-surface text-ink hover:border-brand"
    : "bg-brand text-bg hover:brightness-105 shadow-sm";

  return (
    <a
      ref={ref}
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
