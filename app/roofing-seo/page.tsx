import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CloudLightning, FileCode2, Gauge, MapPin, PhoneCall } from "lucide-react";
import { Availability } from "@/components/Availability";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import Image from "next/image";
import { BookCta, BookNote, PageCta } from "@/components/Cta";
import { RelatedNotes } from "@/components/RelatedNotes";
import { MobileCta } from "@/components/MobileCta";
import { Reveal } from "@/components/Reveal";
import { cases } from "@/lib/gsc";
import { projects } from "@/lib/content";
import { Faq, type FaqItem } from "@/components/Faq";

// Related notes appear on their publish date without a deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Roofing SEO for contractors: more calls, no shared leads",
  description:
    "SEO for roofing contractors in the US and Australia: city service pages, storm and insurance content, Google Business Profile and call tracking. One Florida roofer went from position 77 to 12.9 for its main city term.",
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

const ROOF_FAQ: FaqItem[] = [
  {
    q: "How long does roofing SEO take to work?",
    a: "Plan on a few months before judging it. On the roofing site on this page, average position went from 47.9 to 14.9, comparing October 2025 to August 2026 with the eleven months before.",
  },
  {
    q: "Does a roofing company need a page for every town?",
    a: "A page for each town you want work in, with real jobs from that town on it, does better than one county page. Near-copies with only the town name swapped can be treated as doorway pages by Google.",
  },
  {
    q: "How much does roofing SEO cost?",
    a: "The Growth plan is $1,500 a month and covers two new town or service pages a month plus Business Profile work. If the site needs fixing first, the Setup Sprint is a one-time $1,800.",
  },
  {
    q: "Should a roofer run Local Services Ads or do SEO?",
    a: "They do different jobs. Local Services Ads charge per lead and stop when the budget does; SEO builds pages and rankings you keep. If you run both, track calls from each so you can compare.",
  },
];

export default function RoofingPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-pad grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">SEO for roofing companies</p>
            <h1 className="t-h1 mt-5 max-w-[17ch]">Roofing SEO for contractors tired of paying for shared leads</h1>
            <p className="t-lead mt-6 max-w-[58ch]">
              A lead from a lead site gets sold to three other contractors. A homeowner who finds you on Google
              calls you. I&rsquo;ve done the SEO on {roofSites} roofing sites in Brevard County, Florida. One of
              them is below with its Search Console open.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="roofing_hero" />
              <PageCta href="/pricing" label="See pricing" from="roofing_hero" />
            </div>
            <BookNote className="mt-4" />
          </Reveal>
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="hero-photo aspect-[4/3]">
              <Image
                src="/site/roofing-hero.webp"
                alt="Two roofers in safety harnesses working on an asphalt shingle roof"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="float-card float-in bottom-[-6%] left-[-4%] w-[250px] p-4 sm:left-[-8%]" style={{ animationDelay: "0.4s" }}>
              <p className="font-mono text-[12px] text-muted">roofing melbourne fl</p>
              <p className="mt-2 font-display text-[1.65rem] leading-none tracking-tight">77 &rarr; 12.9</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-muted">Average position, year on year</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What I do for roofers</p>
            <h2 className="t-h2 mt-5">The same six things on every roofing site</h2>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((w) => (
              <div key={w.t} className="card p-7">
                <span className="icon-tile">{w.icon}</span>
                <h3 className="t-h3 mt-5">{w.t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{w.b}</p>
              </div>
            ))}
          </div>
          <div className="card mt-8 flex flex-col gap-5 bg-cream p-7 sm:p-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[60ch] text-[16.5px]">
              The <Link href="/pricing#growth" className="font-medium underline underline-offset-4">Growth plan</Link> at
              $1,500 a month covers two new town or service pages a month plus the profile work. If your site needs
              fixing first, the <Link href="/pricing#sprint" className="font-medium underline underline-offset-4">Setup Sprint</Link> is
              a one-time $1,800.
            </p>
            <PageCta href="/pricing" label="Compare plans" from="roofing_plans" size="md" />
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">One roofer, one year</p>
            <h2 className="t-h2 mt-5">What the work looked like in Search Console</h2>
          </Reveal>
          <div className="card mt-10 px-5 sm:px-8">
            <CaseStudyBlock c={roofing} />
          </div>
        </div>
      </section>

      <Faq items={ROOF_FAQ} title="Roofing SEO questions" className="section" />

      <RelatedNotes
        title="Roofing SEO notes"
        more={{ href: "/notes/topic/roofing", label: "All roofing notes" }}
        slugs={["roofing-service-area-pages", "storm-damage-roofing-pages", "google-business-profile-for-roofers", "roofing-keywords", "roof-replacement-service-page", "roofing-seo-cost", "google-reviews-for-roofers"]}
      />

      <Availability />
      <MobileCta />
    </>
  );
}
