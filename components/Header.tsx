"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

/*
 * One fixed, opaque bar with a hairline under it, the same at every scroll
 * depth: the koinophobe wordmark on the left, the sections in
 * the middle, the one filled button on the right. Phones get a sheet.
 */

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "GTM", href: "/gtm" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
    <div className="bar">
      <Link href="/notes/chatgpt-business-profiles">
        <span className="new">NEW</span>
        <span>ChatGPT now lists businesses. Here&rsquo;s who decides if it names yours</span>
        <ArrowRight size={15} aria-hidden />
      </Link>
    </div>
    <header className="hd">
      <div className="container-pad hd-in">
        <Link href="/" className="hd-logo" aria-label={`${site.name}, home`}>
          <span className="wordmark">koinophobe</span>
        </Link>
        <nav aria-label="Main" className="hd-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <ThemeToggle className="hd-tool" />
          <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="header" className="btn btn-sm btn-primary hidden sm:inline-flex">
            Book a call
          </a>
          <button
            type="button"
            className="hd-tool hd-menu"
            aria-expanded={open}
            aria-controls="hd-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>
      <div id="hd-sheet" className="hd-sheet" hidden={!open}>
        <nav aria-label="Main, mobile" className="container-pad pb-6">
          {[{ label: "Home", href: "/" }, ...NAV].map((n) => (
            <Link key={n.href} href={n.href} className="row" aria-current={pathname === n.href ? "page" : undefined}>
              {n.label}
              <ArrowRight size={18} aria-hidden />
            </Link>
          ))}
          <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="menu" className="btn btn-lg btn-primary mt-6 w-full">
            Book a free call
          </a>
        </nav>
      </div>
    </header>
    </>
  );
}
