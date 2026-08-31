"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-5 py-3 backdrop-blur transition-transform duration-200 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      } motion-reduce:transition-none`}
      aria-hidden={!show}
    >
      <a
        href={`mailto:${site.email}?subject=My%20site`}
        tabIndex={show ? 0 : -1}
        onClick={() => track("cta_email", { from: "mobile_bar" })}
        className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-ink px-5 py-3.5 font-medium text-bg"
      >
        <Mail size={17} aria-hidden />
        Send me your URL
      </a>
    </div>
  );
}
