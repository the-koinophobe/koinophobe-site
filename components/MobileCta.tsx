"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Phone-only sticky bar. Appears once the reader is past the hero so it never
 * competes with the first screen, and hides again near the footer where the
 * real contact block already is.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd =
        y + window.innerHeight > document.documentElement.scrollHeight - 900;
      setShow(y > 700 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 rounded-[20px] border border-line bg-card/90 p-1.5 shadow-[var(--shadow-lg)] backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] md:hidden ${
        show ? "translate-y-0" : "translate-y-[calc(100%+1.5rem)]"
      } motion-reduce:transition-none`}
      aria-hidden={!show}
    >
      <a
        href={site.booking}
        target="_blank"
        rel="noopener"
        tabIndex={show ? 0 : -1}
        data-track="cta_book"
        data-from="mobile_bar"
        className="btn btn-md btn-primary w-full"
      >
        Book a free call
        <span className="btn-chip" aria-hidden>
          <ArrowRight size={14} strokeWidth={2.5} />
        </span>
      </a>
    </div>
  );
}
