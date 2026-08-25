"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Routes that render without the site header and footer. Paid-traffic landing
// pages get one action and no nav links to leak clicks out of.
const BARE_ROUTES = ["/google-business-profile"];

export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const bare = BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (bare) return null;
  return <>{children}</>;
}
