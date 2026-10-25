import { Check, Minus } from "lucide-react";
import { Reveal } from "./Reveal";
import { BookCta } from "./Cta";

/*
 * Koinophobe next to the three other ways an owner usually gets SEO done.
 *
 * One real <table>, so search engines and AI answers can lift the comparison
 * as data. On phones the same table restacks into one card per row, each cell
 * carrying its column name from data-label, so nothing is duplicated.
 *
 * The other columns describe what is common, not any one company, and the
 * footnote says so. Every Koinophobe cell comes from the pricing page.
 */

const COLS = ["Koinophobe", "Typical SEO agency", "Freelancer", "Doing it yourself"] as const;

const ROWS: { label: string; cells: [string, string, string, string] }[] = [
  { label: "Price", cells: ["On the site, from $600 a month", "A quote after a sales call", "Varies by person", "Your time"] },
  { label: "Contract", cells: ["Three-month minimum, then month to month", "Often 6 to 12 months", "Varies", "None"] },
  { label: "Who owns the accounts", cells: ["You, and you keep everything if you leave", "Often the agency", "Depends who set them up", "You"] },
  { label: "Call and form tracking", cells: ["GA4 and Tag Manager, forms tested monthly", "Sometimes, often extra", "Rarely included", "If you set it up"] },
  { label: "Reporting", cells: ["One page a month: calls, forms, clicks", "Long dashboards", "Varies", "Whatever you check"] },
  { label: "Guarantee", cells: ["100% of your first payment back within 30 days", "Rare", "Rare", "None"] },
];

export function Compare() {
  return (
    <section className="section">
      <div className="container-pad">
        <Reveal className="stage-head">
          <p className="eyebrow">Compare</p>
          <h2 className="t-h2 mt-5">Koinophobe vs an SEO agency, a freelancer or doing it yourself</h2>
          <p className="t-lead mt-5 max-w-[52ch]">What you get for the money, side by side.</p>
        </Reveal>

        <div data-anim="rise" className="mt-14">
          <table className="cmp">
            <colgroup>
              <col className="w-[17%]" />
              <col className="w-[29%]" />
              <col className="w-[19%]" />
              <col className="w-[17%]" />
              <col className="w-[18%]" />
            </colgroup>
            <thead>
              <tr>
                <td />
                {COLS.map((c, i) => (
                  <th key={c} scope="col">
                    {i === 0 ? (
                      // The K mark stands in for the name; the name stays for search and screen readers.
                      <span className="sticker cmp-logo">
                        <span className="logo-mark" aria-hidden />
                        <span className="sr-only">{c}</span>
                      </span>
                    ) : (
                      <span className="cmp-head">{c}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.cells.map((v, i) => (
                    <td key={i} data-label={COLS[i]} className={i === 0 ? "cmp-us" : undefined}>
                      <span className="cmp-mark" aria-hidden>
                        {i === 0 ? <Check size={13} strokeWidth={3} /> : <Minus size={13} strokeWidth={2.5} />}
                      </span>
                      <span>{v}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-5 text-center text-[13.5px] text-muted">
            The agency and freelancer columns describe what&rsquo;s common, not any one company.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <BookCta from="home_compare" />
        </div>
      </div>
    </section>
  );
}
