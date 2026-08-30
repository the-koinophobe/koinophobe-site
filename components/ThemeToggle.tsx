"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunMoon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Switch theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="ml-2 inline-flex items-center gap-2 rounded-sm border border-line px-2.5 py-1.5 text-muted transition-colors duration-100 hover:border-muted hover:text-ink"
    >
      <SunMoon size={14} aria-hidden />
    </button>
  );
}
