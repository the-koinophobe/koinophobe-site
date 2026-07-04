"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { BookCall } from "./BookCall";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-3 z-50 -mb-[90px] px-5 sm:top-4 sm:px-8">
      <div
        className={`mx-auto flex h-[90px] max-w-content items-center justify-between gap-3 rounded-lg border px-4 pl-5 transition-all sm:px-5 sm:pl-6 ${
          scrolled
            ? "border-line bg-bg/85 backdrop-blur-md"
            : "border-line/70 bg-bg/60 backdrop-blur"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
          <Image
            src="/logo.png"
            alt="Koinophobe logo"
            width={36}
            height={35}
            priority
            className="h-7 w-auto dark:invert"
          />
          <span className="font-display text-lg font-bold tracking-tight">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-brand-soft text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <BookCall />
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-content md:hidden">
          <div className="flex flex-col gap-1 rounded-lg border border-line bg-bg/95 p-3 shadow-lg backdrop-blur">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink hover:bg-brand-soft"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2 px-1">
              <ThemeToggle />
              <BookCall />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
