import type { Metadata } from "next";
import { BookedTrack } from "@/components/BookedTrack";
import { TextCta } from "@/components/Cta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "You're booked",
  description: "Your call is booked.",
  robots: { index: false, follow: false },
};

/**
 * Cal.com redirects here after a booking (set under the event's
 * Advanced > Redirect on booking). Loading it records the conversion.
 */
export default function BookedPage() {
  return (
    <section className="container-pad pb-28 pt-14 sm:pt-20">
      <BookedTrack />
      <p className="eyebrow">Booked</p>
      <h1 className="t-h1 mt-5 max-w-[18ch]">
        You&rsquo;re on my calendar.
      </h1>
      <div className="mt-6 max-w-[56ch] space-y-4 text-[17.5px] text-muted">
        <p>
          The invite and the video link are in your email. I&rsquo;ll look at your site before we
          talk, so we can spend the 20 minutes on what to fix.
        </p>
        <p>
          Need to move it? Use the link in the invite, or email{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline">
            {site.email}
          </a>
          .
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
        <TextCta href="/work" label="See the numbers" from="booked" />
        <TextCta href="/pricing" label="Pricing" from="booked" />
      </div>
    </section>
  );
}
