import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CloudLightning, FileCode2, Gauge, MapPin, PhoneCall } from "lucide-react";
import { Availability } from "@/components/Availability";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { BookCta, BookNote, CtaBand, TextCta } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { cases } from "@/lib/gsc";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "SEO for roofing companies",
  description:
    "SEO for roofing contractors in the US: city service pages, storm and insurance content, Google Business Profile and call tracking. One Florida roofer went from position 77 to 12.9 for its main city term.",
  alternates: { canonical: "/roofing-seo" },
};

const roofing = cases.find((c) => c.slug === "roofing-contractor")!;
const roofSites = projects.filter((p) => p.sector.toLowerCase().includes("roof")).length;

const WORK = [
  {
    icon: <Building2 size={20} aria-hidden />,
    t: "A page for every town you work in",
    b: "One page trying to cover the whole county ranks for none of it. A real page per town, with the jobs you've done there, ranks for each one.",
  },
  {
    icon: <CloudLightning size={20} aria-hidden />,
    t: "Storm and insurance pages",
    b: "After a storm, homeowners search questions before they search contractors. Does insurance cover this? Repair or replace? The roofer who answers gets the call.",
  },
  {
    icon: <MapPin size={20} aria-hidden />,
    t: "The map pack",
    b: "Google Business Profile categories, service areas, photos and review replies. For \"roofer near me\", the map is most of the page.",
  },
  {
    icon: <PhoneCall size={20} aria-hidden />,
    t: "Call and form tracking",
    b: "So you know which calls came from Google and which job they turned into, instead of guessing at the end of the month.",
  },
  {
    icon: <FileCode2 size={20} aria-hidden />,
    t: "Service and FAQ schema",
    b: "Structured data that tells Google what you do, where, and what homeowners ask before they hire.",
  },
  {
    icon: <Gauge size={20} aria-hidden />,
    t: "A fast site on a phone",
    b: "Most roof searches happen on a phone, often standing in the yard looking at the damage. The page has to load on one bar.",
  },
];

export default function RoofingPage() {
  return (
    <>
      <section className="pt-28 sm:pt-36">
        <div className="container-pad">
          <Reveal>
            <p className="eyebrow">SEO for roofing companies</p>
            <h1 className="mt-4 max-w-[19ch] font-display text-[clamp(2.2rem,5.4vw,4.05rem)] leading-[1.04] tracking-tight text-balance">
              For roofing companies tired of paying for shared leads.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17.5px] text-muted">
              A lead from a lead site gets sold to three other contractors. A homeowner who finds
              you on Google calls you. I&rsquo;ve done the SEO on {roofSites} roofing sites in
              Brevard County, Florida. One of them is below with its Search Console open.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <BookCta from="roofing_hero" />
              <TextCta href="/pricing" label="See pricing" from="roofing_hero" />
            </div>
            <BookNote className="mt-4" />
          </Reveal>
        </div>
      </section>

      <section className="container-pad pt-20">
        <p className="eyebrow">One roofer, one year</p>
        <div className="mt-8 border-t border-line">
          <CaseStudyBlock c={roofing} />
        </div>
      </section>

      <section className="container-pad pt-24">
        <Reveal>
          <p className="eyebrow">What I do for roofers</p>
          <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
            The same six things on every roofing site.
          </h2>
        </Reveal>
        <Stagger className="mt-11 grid gap-px bg-line md:grid-cols-2">
          {WORK.map((w, i) => (
            <div key={w.t} className={`bg-bg py-7 md:pr-8 ${i % 2 === 1 ? "md:pl-8" : ""}`}>
              <span className="block text-brand">{w.icon}</span>
              <h3 className="mt-3.5 font-display text-[1.3rem] leading-snug tracking-tight">
                {w.t}
              </h3>
              <p className="mt-2 max-w-[48ch] text-[15.5px] text-muted">{w.b}</p>
            </div>
          ))}
        </Stagger>
        <p className="mt-10 max-w-[60ch] text-[16.5px] text-muted">
          The{" "}
          <Link href="/pricing" className="text-ink underline underline-offset-4">
            Growth plan
          </Link>{" "}
          at $1,500 a month covers two new town or service pages a month plus the profile work. If
          your site needs fixing first, the Setup Sprint is a one-time $1,800.
        </p>
      </section>

      <section className="pt-24">
        <CtaBand
          line="Want to see where your roofing site stands?"
          from="roofing_end"
          secondary={{ href: "/work", label: "See all the work" }}
        />
      </section>

      <Availability />
      <MobileCta />
    </>
  );
}
