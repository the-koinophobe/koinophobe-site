import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicePages } from "@/lib/services";

/** The other service pages, for the foot of a service page. Pass the current page's href to leave it out. */
export function MoreServices({ current, title = "More SEO services" }: { current: string; title?: string }) {
  const others = servicePages.filter((s) => s.href !== current);
  return (
    <section className="section">
      <div className="container-pad">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="t-h2 !text-[clamp(1.6rem,2.8vw,2.2rem)]">{title}</h2>
          <Link href="/pricing" className="link-arrow">
            All pricing <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <Link key={s.href} href={s.href} className="card card-hover group flex flex-col p-6">
              <span className="t-h3 !text-[1.15rem]">{s.title}</span>
              <span className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">{s.desc}</span>
              <span className="link-arrow mt-4 text-[14.5px]">
                {s.cta} <ArrowRight size={15} aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
