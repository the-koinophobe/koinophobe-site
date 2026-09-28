import Link from "next/link";
import { ArrowRight, Eye, MousePointerClick, Search, Trophy } from "lucide-react";
import { AboutStrip } from "@/components/AboutStrip";
import { Availability } from "@/components/Availability";
import { BookCta, BookNote, CtaBand, TextCta } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { Pipeline } from "@/components/Pipeline";
import { SiteWall } from "@/components/SiteWall";
import { CountUp } from "@/components/CountUp";
import { HeroHeadline } from "@/components/HeroHeadline";
import { MetricStrip } from "@/components/MetricStrip";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { Stagger } from "@/components/Stagger";
import { StreamGraph } from "@/components/StreamGraph";
import { Ticker } from "@/components/Ticker";
import { TrustRow } from "@/components/TrustRow";
import { aggregate, cases } from "@/lib/gsc";
import { reviews } from "@/lib/content";

const HERO_QUOTES = ["Daniel Folks", "Johnny Urena"];

export const metadata = {
  description:
    "Technical SEO for home service businesses in the US. 30+ sites over two years, five opened up here with every figure from their own Search Console. Prices on the site and a free 20-minute call.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="pt-28 sm:pt-36">
        <div className="container-pad">
          <p className="eyebrow">Technical SEO &middot; home services &middot; US hours</p>
          <HeroHeadline
            className="mt-5 max-w-[32ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-normal leading-[1.03] tracking-tight"
            segments={[
              { text: "For home service businesses" },
              { text: "tired of SEO they can’t see working.", muted: true },
            ]}
          />
          <p className="mt-7 max-w-[58ch] text-[17.5px] text-muted">
            I&rsquo;m Michael Edward, and Koinophobe is my SEO practice. I fix the technical side of
            local business websites so more of the people who find you on Google{" "}
            <strong className="font-medium text-ink">end up calling.</strong> Roofers, pool deck
            and lawn companies, clinics and shops, 30+ sites over two years. Five are below with the
            numbers from their own Search Console.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <BookCta from="hero" />
            <TextCta href="/pricing" label="See pricing" from="hero" />
          </div>
          <BookNote className="mt-4" />

          <div className="mt-10 grid gap-6 border-t border-line pt-7 md:grid-cols-2 md:gap-10">
            {reviews
              .filter((r) => HERO_QUOTES.includes(r.name))
              .map((r) => (
                <figure key={r.name}>
                  <blockquote className="font-display text-[1.12rem] leading-[1.4] tracking-tight text-balance">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 font-mono text-[11px] text-muted">
                    <span className="text-ink">{r.name}</span>
                    <span>{r.role}</span>
                    <span className={r.source === "Upwork" ? "text-brand" : ""}>
                      {r.source === "Upwork" ? "Verified · Upwork" : "Direct client"}
                    </span>
                  </figcaption>
                </figure>
              ))}
          </div>

          <div className="mt-12">
            <StreamGraph />
          </div>

          <MetricStrip
            cells={[
              {
                label: "Clicks",
                value: <CountUp value={aggregate.clicks} display={aggregate.clicks.toLocaleString("en-US")} />,
                note: "Real visitors, spam traffic stripped out",
                icon: <MousePointerClick size={15} aria-hidden />,
              },
              {
                label: "On page one",
                value: <CountUp value={aggregate.pageOne} display={aggregate.pageOne.toLocaleString("en-US")} />,
                note: "Keywords at position 10 or better",
                icon: <Trophy size={15} aria-hidden />,
              },
              {
                label: "Keywords ranked",
                value: <CountUp value={aggregate.queries} display={aggregate.queries.toLocaleString("en-US")} />,
                note: "624 of them inside the top 3",
                icon: <Search size={15} aria-hidden />,
              },
              {
                label: "Impressions",
                value: <CountUp value={aggregate.impressions} display={aggregate.impressions.toLocaleString("en-US")} />,
                note: aggregate.window,
                icon: <Eye size={15} aria-hidden />,
              },
            ]}
          />
          <TrustRow />
        </div>
        <Ticker />
      </section>

      <section className="container-pad pt-24">
        <Reveal>
          <p className="eyebrow">The work</p>
          <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
            Thirty-plus sites. Here are five with the numbers left open.
          </h2>
          <p className="mt-5 max-w-[58ch] text-muted">
            A pain clinic, a roofer, a tint shop, a game shop and a marketing agency. They&rsquo;re
            the five whose data I can show, and every number comes from their own Search Console.
          </p>
        </Reveal>

        <Stagger className="mt-11 border-t border-line">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/work#${c.slug}`}
              className="ledger-row group flex flex-col gap-4 border-b border-line py-7 lg:grid lg:grid-cols-[1.55fr_1fr_130px] lg:items-center lg:gap-8"
            >
              <div>
                <p className="font-display text-[1.28rem] leading-snug tracking-tight sm:text-[1.4rem]">
                  {c.title}
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-wide text-muted">
                  {c.client} &middot; {c.place}
                </p>
              </div>
              <div className="flex items-baseline gap-3 lg:block">
                <span className="tnum font-display text-[2rem] leading-none tracking-tight text-brand">
                  {c.headline.value}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-muted lg:mt-2 lg:block">
                  {c.headline.label}
                </span>
              </div>
              <span className="hidden items-center justify-self-end gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted transition-colors duration-100 group-hover:text-ink lg:flex">
                Read
                <ArrowRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transform-none"
                />
              </span>
            </Link>
          ))}
        </Stagger>
      </section>

      <section className="pt-14">
        <CtaBand
          line="Curious what yours looks like underneath?"
          from="after_ledger"
          secondary={{ href: "/work", label: "Read the case studies" }}
        />
      </section>

      <section className="container-pad pt-24">
        <SiteWall />
      </section>

      <section className="pt-16">
        <CtaBand
          line="Monthly plans start at $600, and every price is on the site."
          from="after_wall"
          secondary={{ href: "/pricing", label: "See pricing" }}
        />
      </section>

      <section className="container-pad pt-28">
        <Pipeline />
      </section>

      <section className="container-pad pt-24">
        <Process />
      </section>

      <section className="pt-20">
        <CtaBand
          line="Book a time, or email me if you'd rather write."
          from="after_process"
        />
      </section>

      <section className="container-pad pt-24">
        <AboutStrip />
      </section>

      <section className="container-pad pb-24 pt-24">
        <Reviews exclude={HERO_QUOTES} />
      </section>

      <Availability />
      <MobileCta />
    </>
  );
}
