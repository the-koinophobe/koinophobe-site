"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "cookie-consent"; // "granted" | "denied"

/**
 * One compact line. It mounts after the page has painted, so it can never
 * become the largest contentful element or push the first paint back.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const idle =
      (window as typeof window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    idle(() => {
      try {
        if (!localStorage.getItem(KEY)) setShow(true);
      } catch {}
    });
    const open = () => setShow(true);
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  const choose = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-surface">
      <div className="container-pad flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3.5">
        <p className="font-mono text-[11.5px] text-muted">
          Anonymous analytics only, nothing loads until you choose.{" "}
          <Link href="/cookies" className="underline hover:text-ink">
            Details
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-sm border border-line px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.11em] text-muted transition-colors hover:text-ink"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-sm bg-ink px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.11em] text-bg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
