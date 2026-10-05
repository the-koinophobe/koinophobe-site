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
    <div className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-2xl border border-line bg-bg shadow-float sm:inset-x-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
        <p className="text-[14px] text-muted">
          Anonymous analytics only, nothing loads until you choose.{" "}
          <Link href="/cookies" className="underline hover:text-ink">
            Details
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="btn btn-sm btn-secondary"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="btn btn-sm btn-primary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
