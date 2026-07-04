import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { BookCall } from "@/components/BookCall";
import { notes, getNote } from "@/lib/notes";
import { WaveLines } from "@/components/Decor";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = getNote(params.slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.excerpt,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: { title: note.title, description: note.excerpt, type: "article" },
  };
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = getNote(params.slug);
  if (!note) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.excerpt,
    datePublished: note.date,
    author: { "@type": "Person", name: "Michael Edward", url: "https://koinophobe.com/about" },
    mainEntityOfPage: `https://koinophobe.com/notes/${note.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://koinophobe.com" },
      { "@type": "ListItem", position: 2, name: "Notes", item: "https://koinophobe.com/notes" },
      {
        "@type": "ListItem",
        position: 3,
        name: note.title,
        item: `https://koinophobe.com/notes/${note.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0 -z-10" />
        <WaveLines className="pointer-events-none absolute bottom-0 left-0 -z-10 w-full text-ink/[0.05]" />
        <div className="container-pad pb-8 pt-36 sm:pt-40">
          <Reveal>
            <Link href="/notes" className="text-sm font-semibold text-brand">
              ← All notes
            </Link>
            <span className="mt-4 block font-mono text-xs text-muted">{fmt(note.date)}</span>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {note.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="container-pad py-6">
        <Reveal className="mx-auto max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          {note.body.map((p, i) =>
            p.startsWith("## ") ? (
              <h2
                key={i}
                className="!mt-10 font-display text-2xl font-semibold tracking-tight text-ink"
              >
                {p.slice(3)}
              </h2>
            ) : (
              <p key={i}>{p}</p>
            )
          )}
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-line bg-surface/60 p-7 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            Want this done on your site?
          </p>
          <div className="mt-4 flex justify-center">
            <BookCall label="Get a free teardown" />
          </div>
        </div>
      </section>
    </>
  );
}
