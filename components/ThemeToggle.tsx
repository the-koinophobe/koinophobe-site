"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/** Shows the mode you'd switch to: a moon in light mode, a sun in dark. */
export function ThemeToggle({ className = "hx-icon-btn", label = false }: { className?: string; label?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
    >
      {label ? <span>{isDark ? "Light mode" : "Dark mode"}</span> : null}
      {isDark ? <Sun size={label ? 18 : 16} aria-hidden /> : <Moon size={label ? 18 : 16} aria-hidden />}
    </button>
  );
}
