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
      className="hx-icon-btn"
    >
      <SunMoon size={16} aria-hidden />
    </button>
  );
}
