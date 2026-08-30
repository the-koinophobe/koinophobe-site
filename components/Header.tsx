"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="container-pad flex h-[60px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
          <span className="h-2.5 w-2.5 flex-none rounded-full bg-brand" />
          <span className="font-display text-[19px] tracking-tight">{site.owner}</span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          {site.nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-sm px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.1em] transition-colors duration-100 ${
                  active
                    ? "text-ink shadow-[inset_0_-1px_0_rgb(var(--ink))]"
                    : "text-muted hover:bg-surface hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-sm border border-line text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="container-pad pb-4 md:hidden">
          <div className="flex flex-col border-t border-line">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
