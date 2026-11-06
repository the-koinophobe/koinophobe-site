import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; href: string };

/**
 * The visible trail and its BreadcrumbList schema from one list, so they can't
 * drift apart. Home is added here; pass the rest, ending with the current page,
 * which renders as plain text.
 */
export function Breadcrumbs({ items, className = "", center = false }: { items: Crumb[]; className?: string; center?: boolean }) {
  const trail = [{ name: "Home", href: "/" }, ...items];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `https://koinophobe.com${c.href === "/" ? "" : c.href}`,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-1.5 text-[14px] text-muted ${center ? "justify-center" : ""} ${className}`}
      >
        {trail.map((c, i) =>
          i < trail.length - 1 ? (
            <span key={c.href} className="contents">
              <Link href={c.href} className="hover:text-ink">{c.name}</Link>
              <ChevronRight size={14} aria-hidden />
            </span>
          ) : (
            <span key={c.href} aria-current="page">{c.name}</span>
          ),
        )}
      </nav>
    </>
  );
}
