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

/** The visible list: native details/summary, so it works with no JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16.5px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden
              className="font-mono text-[18px] text-muted transition-transform duration-150 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** A full section: eyebrow, optional heading, the list and its schema. */
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
    <section className={`container-pad ${className}`}>
      <FaqSchema items={items} />
      <Reveal className="max-w-[68ch]">
        <p className="eyebrow">{eyebrow}</p>
        {title ? (
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.08] tracking-tight text-balance">
            {title}
          </h2>
        ) : null}
        <div className="mt-8">
          <FaqList items={items} />
        </div>
      </Reveal>
    </section>
  );
}
