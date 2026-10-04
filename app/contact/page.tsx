import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, Link2, Linkedin, MapPin, Search, Target, Video } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { XIcon } from "@/components/Availability";
import { CalInline } from "@/components/CalInline";
import { EmailCta } from "@/components/Cta";
import { site } from "@/lib/site";
import { Faq, type FaqItem } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 20-minute call or email me your website. I look at your site before we talk and tell you what I'd fix first, or that nothing needs fixing.",
  alternates: { canonical: "/contact" },
};

const STEPS = [
  {
    icon: <CalendarCheck size={22} aria-hidden />,
    title: "You book",
    body: "Pick a time and tell me your website and what you want more of. Calls, bookings, quotes, foot traffic.",
  },
  {
    icon: <Search size={22} aria-hidden />,
    title: "I look",
    body: "Before we speak. Rankings, structure, speed, tracking, and whether the pages that should exist do.",
  },
  {
    icon: <Target size={22} aria-hidden />,
    title: "We talk",
    body: "Twenty minutes. You get the two or three things I'd fix first and what they'd cost, whether you hire me or not.",
  },
];

const ASK = [
  { icon: <Link2 size={19} aria-hidden />, t: "Your website.", b: "That's enough for me to start." },
  {
    icon: <MapPin size={19} aria-hidden />,
    t: "What you sell and where.",
    b: "Local search depends on the second half.",
  },
  {
    icon: <Target size={19} aria-hidden />,
    t: "What you want more of.",
    b: "Calls, bookings, quotes or foot traffic. Rankings are only worth something if they get you one of those.",
  },
];

const videoHref = `mailto:${site.email}?subject=${encodeURIComponent("Video review")}`;

const CONTACT_FAQ: FaqItem[] = [
  {
    q: "What happens on the free call?",
    a: "It's twenty minutes. I look at your site before we talk, then tell you the two or three things I'd fix first and what they'd cost, whether you hire me or not.",
  },
  {
    q: "What should I send before the call?",
    a: "Your website, what you sell and where, and what you want more of: calls, bookings, quotes or foot traffic.",
  },
  {
    q: "Can I email instead of booking a call?",
    a: "Yes. Email me your website and I'll reply the same business day. If you'd rather not talk at all, ask for a video review and I'll record what I'd fix first.",
  },
  {
    q: "When do you work?",
    a: "9 to 5 Eastern, with replies the same business day.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 sm:pt-36">
        <div className="container-pad">
          <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 max-w-[17ch] font-display text-[clamp(2.2rem,5.4vw,4.05rem)] leading-[1.04] tracking-tight text-balance">
              Tell me the site and the goal. I&rsquo;ll do the rest.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17.5px] text-muted">
              Book a free 20-minute call, or email me if you&rsquo;d rather write. Either way
              I&rsquo;ll look at your site before we talk, and if there&rsquo;s nothing worth paying
              for, I&rsquo;ll tell you.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="mx-auto w-full max-w-[300px] lg:mr-0 lg:max-w-[340px]">
              <div className="relative aspect-square w-full rotate-[1.5deg] overflow-hidden rounded-md border border-line shadow-[0_18px_40px_-24px_rgb(0_0_0/0.45)] motion-reduce:rotate-0">
                <Image
                  src="/me/wanted.webp"
                  alt="Wanted poster of Michael Edward: for being too good at SEO, alias the search engine savant"
                  fill
                  priority
                  sizes="(max-width: 1024px) 300px, 340px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center font-mono text-[11px] tracking-wide text-muted">
                Last seen working 9 to 5 Eastern.
              </figcaption>
            </figure>
          </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-px bg-line sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className={`bg-bg py-8 sm:pr-8 ${i > 0 ? "sm:pl-8" : ""}`}>
                <span className="block text-brand">{s.icon}</span>
                <h2 className="mt-4 font-display text-[1.35rem] leading-snug tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-2.5 text-[15.5px] text-muted">{s.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="book" className="mt-16 scroll-mt-24">
        <div className="container-pad">
          <p className="eyebrow">Book a call</p>
          <div className="mt-6">
            <CalInline />
          </div>
        </div>
      </section>

      <section className="mt-20 border-t border-line bg-surface">
        <div className="container-pad grid gap-12 py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Or email me</p>
            <a
              href={`mailto:${site.email}?subject=My%20site`}
              data-track="cta_email"
              data-from="contact_address"
              className="mt-4 block font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight tracking-tight transition-colors duration-100 hover:text-brand"
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-[42ch] text-muted">
              I read everything myself. I work 9 to 5 Eastern and reply the same business day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a
                href={site.linkedin}
                className="inline-flex items-center gap-2 font-mono text-[11.5px] text-muted transition-colors duration-100 hover:text-ink"
              >
                <Linkedin size={16} aria-hidden />
                {site.linkedinHandle}
              </a>
              <a
                href={site.x}
                className="inline-flex items-center gap-2 font-mono text-[11.5px] text-muted transition-colors duration-100 hover:text-ink"
              >
                <XIcon />
                {site.xHandle}
              </a>
            </div>

            <div id="video" className="mt-12 scroll-mt-24 border-t border-line pt-8">
              <span className="text-brand">
                <Video size={22} aria-hidden />
              </span>
              <h2 className="mt-3 font-display text-[1.35rem] leading-snug tracking-tight">
                Rather not get on a call?
              </h2>
              <p className="mt-2.5 max-w-[46ch] text-[15.5px] text-muted">
                Email me your website with &ldquo;Video review&rdquo; in the subject. I&rsquo;ll
                send back a 5-minute screen recording of what I&rsquo;d fix first. Free, no call
                needed.
              </p>
              <EmailCta
                label="Ask for a video review"
                href={videoHref}
                from="contact_video"
                className="mt-5"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">If you email, include</p>
            <div className="mt-5 border-t border-line">
              {ASK.map((a) => (
                <div
                  key={a.t}
                  className="grid grid-cols-[24px_1fr] items-start gap-4 border-b border-line py-5"
                >
                  <span className="mt-0.5 text-brand">{a.icon}</span>
                  <p>
                    <span className="block text-[16.5px] font-medium">{a.t}</span>
                    <span className="mt-1 block max-w-[42ch] text-[15px] leading-relaxed text-muted">
                      {a.b}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <figure className="mt-10">
              <blockquote className="font-display text-[1.18rem] leading-[1.45] tracking-tight text-balance">
                &ldquo;Best to work with, will hire all the time. Straight forward, doesn&rsquo;t
                waste time. If he can&rsquo;t do something he&rsquo;ll tell you.&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3">
                <span className="text-[15px] font-medium">Johnny Urena</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                  Verified &middot; Upwork
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <Faq items={CONTACT_FAQ} className="pb-24 pt-20" />
    </>
  );
}
