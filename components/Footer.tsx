import Link from "next/link";
import { site } from "@/lib/site";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { SiteVisits } from "./SiteVisits";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-pad py-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
          <span>
            &copy; {year} {site.owner} &middot; {site.name}
          </span>
          <nav className="flex flex-wrap gap-4">
            {site.nav.slice(1).map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-ink">
                {n.label}
              </Link>
            ))}
            <a href={site.linkedin} className="hover:text-ink">
              LinkedIn
            </a>
            <a href={site.x} className="hover:text-ink">
              X
            </a>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-ink">
              Cookies
            </Link>
            <CookieSettingsButton className="uppercase hover:text-ink" />
          </nav>
        </div>
        <SiteVisits />
      </div>
    </footer>
  );
}
