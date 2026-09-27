"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires once per visit to /booked. Skipped inside Cal's own iframe. */
export function BookedTrack() {
  useEffect(() => {
    if (window.top !== window.self) return;
    // GA may still be loading after the redirect; give it a moment.
    const t = window.setTimeout(() => track("booking_complete", { from: "redirect" }), 1200);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
