"use client";

import { ThemeProvider as NextThemes } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    // Light by default for everyone; dark only when a visitor picks it.
    <NextThemes attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemes>
  );
}
