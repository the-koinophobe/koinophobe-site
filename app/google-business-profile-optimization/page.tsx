import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedNotes } from "@/components/RelatedNotes";
import { faqJsonLd } from "@/components/Faq";
import { monthly, sprint } from "@/lib/pricing";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

export const revalidate = 3600;

/*
 * Built from search demand seen in a client's Search Console (Nov 2026):
 * owners search "google business profile optimization", "...management" and
 * "...near me" far more than "local SEO". This page answers that search for
 * trades anywhere in the US. It deliberately does not target Melbourne or
 * Brevard County terms, which belong to that client.
 */

export const metadata = pageMeta({
  title: { absolute: "Google Business Profile optimization for local trades" },
  description:
    "Google Business Profile optimization and management for roofers, remodelers, HVAC and home service businesses: categories, services, photos, reviews and the map pack.",
  path: "/google-business-profile-optimization",
});

const WORK = [
  { t: "Categories that match the job", b: "The primary category decides most of which searches you show for. I pick it from what your top competitors use and what you want more of, then add the secondaries that fit.", href: "/notes/gbp-categories-by-trade" },
  { t: "Services, towns and hours filled in", b: "Every service you sell, with a plain description, and the towns you actually drive to. Empty fields are searches you can't show up for.", href: "/notes/gbp-services-vs-categories" },
  { t: "Photos of real jobs", b: "Your crew, your trucks, finished work with the town in the caption. Stock photos do nothing for you on the map.", href: "/notes/google-business-profile-for-roofers" },
  { t: "A review routine", b: "A text and QR code your crew sends after each job, and a reply to every review, good or bad. Steady new reviews beat a pile from three years ago.", href: "/notes/how-to-ask-for-google-reviews" },
  { t: "Listings that agree", b: "The same name, phone and towns on Bing, Apple Maps, BBB, Yelp and the data suppliers AI tools read. Mismatches cost you trust in the map pack.", href: "/notes/nap-citations-contractors" },
  { t: "Calls you can count", b: "Call tracking on the profile and a UTM on the website link, so you know which calls came from the map and which from your site.", href: "/notes/call-tracking-for-contractors" },
];

const FAQ = [
  { q: "What is Google Business Profile optimization?", a: "Filling in and tuning your free Google listing so it shows in the map pack for the searches that bring jobs: the right categories, every service and town, real photos, steady reviews, and links that agree with it across the web." },
  { q: "How much does Google Business Profile optimization cost?", a: `It's part of the Google fix, ${sprint.price} for a ${sprint.weeks}-week sprint that also covers Local Services Ads, your key pages, tracking and local link building. Ongoing profile management is in the ${monthly.price}-a-month plan.` },
  { q: "Do you manage the profile every month?", a: "On the monthly plan, yes: weekly posts and photos, review replies, new local links and a check on your map position across your service area." },
  { q: "I don't have a storefront. Can I still show in the map?", a: "Yes. Service-area businesses hide their address and list the towns they serve. Most roofers, plumbers and HVAC companies run their profile that way." },
  { q: "How long until I see more calls?", a: "Changes to categories and services often show within a few weeks. Reviews and links build over months. You'll see the numbers from your own profile and call tracking, not from a report I made up." },
  { q: "Will you need my login?", a: "No. You add me as a manager on your profile, and you stay the owner. Remove me any time." },
];

export default function GbpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Google Business Profile optimization",
            serviceType: "Google Business Profile optimization and management",
            provider: { "@id": "https://koinophobe.com/#organization" },
            areaServed: site.areaServed,
            url: "https://koinophobe.com/google-business-profile-optimization",
            offers: { "@type": "Offer", price: sprint.amount, priceCurrency: "USD", url: "https://koinophobe.com/pricing#fix" },
          }),
        }}
      />

      <section className="container-pad pb-16 pt-10 sm:pt-14">
        <Breadcrumbs items={[{ name: "Google Business Profile optimization", href: "/google-business-profile-optimization" }]} className="mb-8" />
        <div className="head-c">
          <p className="kicker">Google Business Profile</p>
          <h1 className="t-h1 mt-5">Google Business Profile optimization for local trades</h1>
          <p className="t-lead mt-6 max-w-[54ch]">
            Most calls from Google start in the map, not the blue links. I set up and manage the profile that decides whether you&rsquo;re in
            the top three, for roofers, remodelers, HVAC, plumbing and home service businesses across the US.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="gbp_hero" className="btn btn-lg btn-primary">Book a call</a>
            <Link href="/pricing#fix" className="btn btn-lg btn-secondary">See the price</Link>
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-pad">
          <div className="max-w-[46rem]">
            <p className="kicker">What I do on the profile</p>
            <h2 className="t-h2 mt-4">Six things that move you up the map</h2>
          </div>
          <div className="trust6 mt-12">
            {WORK.map((w) => (
              <div key={w.t}>
                <h3>{w.t}</h3>
                <p>{w.b}</p>
                <Link href={w.href} className="ix link-u !text-[13px]">Read the guide</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-pad">
          <div className="pair6">
            <div className="!items-start !text-left">
              <p className="kicker">One time</p>
              <h2 className="t-h2 mt-4 !text-[clamp(1.8rem,2.6vw,2.3rem)]">{sprint.name}, {sprint.price}</h2>
              <p className="t-lead mt-4 max-w-[46ch]">The profile rebuilt in week one, then listings, Local Services Ads, pages, tracking and local link building over {sprint.weeks} weeks.</p>
              <Link href="/pricing#fix" className="link-u mt-auto inline-flex items-center gap-1.5 pt-10">See the four weeks <ArrowRight size={15} aria-hidden /></Link>
            </div>
            <div className="!items-start !text-left">
              <p className="kicker">Every month</p>
              <h2 className="t-h2 mt-4 !text-[clamp(1.8rem,2.6vw,2.3rem)]">{monthly.name}, {monthly.price}</h2>
              <p className="t-lead mt-4 max-w-[46ch]">Profile management: weekly posts, review replies, new local links, a new page and your map position tracked.</p>
              <Link href="/pricing#monthly" className="link-u mt-auto inline-flex items-center gap-1.5 pt-10">See the monthly plan <ArrowRight size={15} aria-hidden /></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="section !pt-0 scroll-mt-20">
        <div className="container-pad faq6">
          <div>
            <p className="kicker">FAQ</p>
            <h2 className="t-h2 mt-4">Questions about your Google profile</h2>
            <div className="ask mt-8">
              <p className="text-[22px] font-semibold tracking-[-0.01em]">Want a second opinion?</p>
              <p className="mt-2 text-muted">I&rsquo;ll look at your profile before the call and tell you the two or three things I&rsquo;d change first.</p>
              <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="gbp_faq" className="btn btn-lg btn-primary mt-6">Book a call</a>
            </div>
          </div>
          <div className="qrows">
            {FAQ.map((f) => (
              <details key={f.q} name="gbp-faq">
                <summary><span className="box" aria-hidden />{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedNotes
        title="Google Business Profile guides"
        slugs={["google-map-pack-ranking", "service-area-business-google-business-profile", "gbp-secondary-categories", "google-reviews-for-roofers", "google-business-profile-suspended"]}
      />
    </>
  );
}
