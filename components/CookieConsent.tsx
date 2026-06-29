"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "cookie-consent"; // "granted" | "denied"

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
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

  if (!mounted || !show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          I use cookies only for anonymous analytics, to understand how the site is
          used. Nothing non-essential loads until you choose. See the{" "}
          <Link href="/cookies" className="text-brand underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-line bg-bg px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-bg transition-all hover:brightness-105"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
