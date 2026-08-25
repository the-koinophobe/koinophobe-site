"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// This page renders without the site header, so it carries its own toggle.
// Dark is the default. It flips a `gbp-light` class on <html>, which only the
// .gbp-theme scope reads, so it never touches the rest of the site's theme.
export function GbpThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("gbp-light"));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("gbp-light", next);
    try {
      localStorage.setItem("gbp-theme", next ? "light" : "dark");
    } catch {
      // private mode, or storage blocked. The toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark" : "Switch to light"}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-[rgb(var(--edge))] bg-bg text-ink shadow-[3px_3px_0_0_rgb(var(--edge))] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgb(var(--edge))]"
    >
      {light ? <Moon size={15} strokeWidth={2.6} /> : <Sun size={15} strokeWidth={2.6} />}
    </button>
  );
}
