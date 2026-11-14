import { BookCta, BookNote, EmailCta } from "@/components/Cta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MissedCallCalc } from "@/components/MissedCallCalc";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Missed call calculator for service businesses",
  description:
    "Put in your calls, your missed rate and your average job. See what unanswered calls cost you a month, then check where your calls actually go.",
  path: "/missed-call-calculator",
});

const CHECKS = [
  "Call your own number from a cell phone and time how long it takes a person to pick up.",
  "Listen to what plays before it rings. Every greeting and forward adds seconds.",
  "Tap the phone number on your site and your Google Business Profile. Make sure both ring the right line.",
  "Pull last week's missed calls and call every one of them back.",
];

export default function MissedCallCalculatorPage() {
  return (
    <>
      <section className="page-hero hero-bg">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-pad relative pb-12 pt-14 text-center sm:pb-16 sm:pt-24">
          <Reveal className="mx-auto max-w-[820px]">
            <Breadcrumbs
              items={[{ name: "Missed call calculator", href: "/missed-call-calculator" }]}
              className="mb-8"
              center
            />
            <p className="eyebrow">Free tool</p>
            <h1 className="t-h1 mx-auto mt-6 max-w-[20ch]">What are missed calls costing you?</h1>
            <p className="t-lead mx-auto mt-6 max-w-[58ch]">
              Four numbers. No email needed. The answer&rsquo;s only as good as your guesses, so use your
              phone log if you have one.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-pad pt-4">
        <MissedCallCalc />
      </section>

      <section className="container-pad pt-16">
        <div className="mx-auto max-w-[760px]">
          <h2 className="t-h2">Four checks before you spend more on ads or SEO</h2>
          <ol className="mt-6 grid gap-4">
            {CHECKS.map((c, i) => (
              <li key={c} className="card grid grid-cols-[32px_1fr] gap-3 p-5 text-[16px] leading-relaxed">
                <span className="tnum font-display text-[1.2rem] font-extrabold text-brand">{i + 1}</span>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-pad pb-24 pt-16 text-center">
        <div className="mx-auto max-w-[680px]">
          <h2 className="t-h2">Want to know which page sent each call?</h2>
          <p className="t-lead mt-5">
            Send me your URL. I&rsquo;ll check where your calls and forms go and whether your tracking
            counts them, then tell you the first thing I&rsquo;d fix.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <BookCta from="missed_call_calc" />
            <EmailCta from="missed_call_calc" />
          </div>
          <BookNote className="mt-4" />
        </div>
      </section>
    </>
  );
}
