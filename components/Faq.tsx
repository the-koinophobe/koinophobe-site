import { Reveal } from "@/components/Reveal";

export type FaqItem = { q: string; a: string };

/**
 * FAQPage structured data. One block per page: render it once, next to the
 * visible questions it describes, and never for questions the page doesn't show.
 */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
    />
  );
}

/**
 * The visible list: native details/summary, so it works with no JavaScript.
 * Each question is its own card; where the browser can animate to auto
 * height the answer slides open, elsewhere it simply appears.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((f) => (
        <details key={f.q} className="faq-item group">
          <summary className="faq-q">
            <span>{f.q}</span>
            <span aria-hidden className="faq-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="faq-a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * A full section: the heading on the left, pinned while the questions scroll
 * past on wide screens, and the list on the right. `className` is the
 * section's spacing and background, so it always runs edge to edge.
 */
export function Faq({
  items,
  title,
  eyebrow = "Questions",
  className = "",
}: {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <section className={className}>
      <FaqSchema items={items} />
      <div className="container-pad grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-[calc(var(--hx-h)+32px)] lg:self-start">
          <p className="eyebrow">{eyebrow}</p>
          {title ? <h2 className="t-h2 mt-5 max-w-[16ch]">{title}</h2> : null}
        </Reveal>
        <div data-anim="cards">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
