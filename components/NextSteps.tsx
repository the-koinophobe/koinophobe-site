import { site } from "@/lib/site";

/*
 * What happens after someone books: four steps in a row, so the call stops
 * feeling like a sales trap. Used on the home and pricing pages.
 */
const STEPS = [
  { t: "You book 20 minutes", b: "Pick a time that suits you. Free, and no pitch deck." },
  { t: "I look before we talk", b: "Your site, your Google profile and what AI tools say about you." },
  { t: "You get the short list", b: "The two or three things I'd fix first, and what they'd cost. Or that nothing needs fixing." },
  { t: "You decide", b: "Start the four-week fix, take the free audit, or walk away with the notes." },
];

export function NextSteps({ from = "steps" }: { from?: string }) {
  return (
    <section className="section !pt-0" aria-labelledby="next-steps-h">
      <div className="container-pad">
        <div className="max-w-[46rem]">
          <p className="kicker">After you book</p>
          <h2 id="next-steps-h" className="t-h2 mt-4">What happens next</h2>
        </div>
        <ol className="steps4 mt-12">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <span className="ix">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.t}</h3>
              <p>{s.b}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from={from} className="btn btn-lg btn-primary">
            Book the free call
          </a>
        </div>
      </div>
    </section>
  );
}
