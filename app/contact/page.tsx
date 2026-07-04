import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { DotMatrix } from "@/components/Decor";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free 5-minute SEO teardown. Tell me about your site and I'll show you where the leads are leaking.",
  alternates: { canonical: "/contact" },
};

const perks = [
  "A quick look at your technical SEO and tracking setup",
  "Where you're losing clicks or conversions",
  "One or two things worth fixing first",
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0 -z-10" />
        <DotMatrix className="pointer-events-none absolute -right-10 top-6 -z-10 w-[380px] text-ink/[0.05]" />
        <div className="container-pad pb-10 pt-36 sm:pt-40">
          <SectionHeading
            titleAs="h1"
            kicker="Contact"
            title="Get a free 5-minute teardown"
            intro="Send your site and a line about your goal. I'll reply with where the leads are leaking and whether I can help. No pitch if it's not a fit."
          />
        </div>
      </section>

      <section className="border-t border-line bg-surface/30 py-14">
        <div className="container-pad">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-surface/60 p-7">
                <h2 className="font-display text-lg font-semibold text-ink">
                  What you&apos;ll get
                </h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-muted">
                      <span className="text-brand">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                  Prefer email? Reach me directly at{" "}
                  <a href={`mailto:${site.email}`} className="text-brand">
                    {site.email}
                  </a>
                  .
                </p>
                <figure className="mt-auto pt-6">
                  <blockquote className="rounded-2xl border border-line bg-bg/60 p-4 text-sm italic leading-relaxed text-muted">
                    &ldquo;Best to work with, will hire all the time. Straight
                    forward, doesn&apos;t waste time. If he can&apos;t do something
                    he&apos;ll tell you.&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-xs text-muted/70">
                    Johnny Urena · via Upwork
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
