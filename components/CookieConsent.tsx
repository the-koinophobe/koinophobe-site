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
    <div role="region" aria-label="Analytics choice" className="cookie-chip">
      <p>
        Anonymous analytics?{" "}
        <Link href="/cookies" className="underline hover:text-ink">
          Details
        </Link>
      </p>
      <div className="flex shrink-0 gap-1.5">
        <button type="button" onClick={() => choose("denied")} className="cookie-btn">
          No
        </button>
        <button type="button" onClick={() => choose("granted")} className="cookie-btn cookie-yes">
          OK
        </button>
      </div>
    </div>
  );
}
