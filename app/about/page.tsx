import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BookCall } from "@/components/BookCall";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Koinophobe and how I work.",
  alternates: { canonical: "/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Michael Edward",
  url: "https://koinophobe.com/about",
  jobTitle: "SEO & Conversion Tracking Specialist",
  worksFor: { "@type": "Organization", name: "Koinophobe", url: "https://koinophobe.com" },
  sameAs: [site.github],
  knowsAbout: [
    "Technical SEO",
    "Conversion tracking",
    "Google Analytics 4",
    "Google Tag Manager",
    "Web development",
  ],
};

const principles = [
  { title: "Fast and low-drama", body: "Send me the work and access, and I slot in. No long onboarding, no chasing." },
  { title: "Measured, not vague", body: "I track form fills and calls, so you see the line from work to revenue." },
  { title: "Detail under pressure", body: "I carry several live sites at once without dropping the small things." },
  { title: "Honest about fit", body: "If I am not the right person for the job, I will tell you straight." },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0 -z-10" />
        <div className="container-pad pb-12 pt-16 sm:pt-20">
          <SectionHeading
            titleAs="h1"
            kicker="About"
            title="I have been into computers since I was 12."
            intro="Koinophobe is the fear of being ordinary. It is also the standard I hold every result to."
          />
        </div>
      </section>

      <section className="container-pad py-10">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I started tinkering with computers as a kid, learned design and PC
              repair as a teen, and went on to study Computer Science, building a
              machine-learning phishing detector with around 98% accuracy along
              the way.
            </p>
            <p>
              After front-end and back-end engineering work, I found my lane:
              technical SEO and web. The engineering background means the parts
              most people avoid, tag setup, migrations, Core Web Vitals, feel like
              home turf rather than a hurdle.
            </p>
            <p>
              Today I run a freelance practice powering both agencies and service
              businesses. For agencies I am the white-label set of hands behind the
              brand. For business owners I am the calm operator who makes the
              website actually generate calls. Either way, the goal is the same:
              nothing mediocre.
            </p>
            <p className="text-sm text-ink/70">
              Based in Port Harcourt, working on US hours with full Eastern and
              Central overlap. Stack: React, TypeScript, Django, PostgreSQL,
              Docker, plus WordPress, GA4, GTM and Search Console.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4">
              {principles.map((p) => (
                <div key={p.title} className="rounded-3xl border border-line bg-surface/60 p-6">
                  <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-pad py-16">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-line bg-surface/50 p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Let&apos;s talk about your sites.
            </h2>
            <BookCall label="Book a call" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
