import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Availability } from "@/components/Availability";
import { CtaBand } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { FaqList, FaqSchema } from "@/components/Faq";
import { ArrowLeft } from "lucide-react";
import { publishedNotes, getNote } from "@/lib/notes";

// Hourly revalidation plus on-demand rendering, so a note scheduled for next
// Tuesday goes live on Tuesday without a deploy.
export const revalidate = 3600;

export function generateStaticParams() {
  return publishedNotes().map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = getNote(params.slug);
  if (!note) return {};
  const title = note.seoTitle || note.title;
  const images = note.cover ? [{ url: note.cover, width: 1600, height: 900, alt: note.title }] : undefined;
  return {
    title,
    description: note.excerpt,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      title,
      description: note.excerpt,
      type: "article",
      publishedTime: note.date,
      authors: ["Michael Edward"],
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title, description: note.excerpt, ...(images ? { images: [note.cover] } : {}) },
  };
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
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
    "@type": "BlogPosting",
    headline: note.title,
    description: note.excerpt,
    datePublished: note.date,
    dateModified: note.date,
    wordCount: note.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
    inLanguage: "en-US",
    image: note.cover ? `https://koinophobe.com${note.cover}` : "https://koinophobe.com/opengraph-image",
    author: {
      "@type": "Person",
      "@id": "https://koinophobe.com/#michael",
      name: "Michael Edward",
      url: "https://koinophobe.com/about",
    },
    publisher: { "@id": "https://koinophobe.com/#organization" },
    isPartOf: { "@id": "https://koinophobe.com/#website" },
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
      <FaqSchema items={note.faq} />
      <section className="pt-28 sm:pt-36">
        <div className="container-pad">
          <Reveal>
            <Link
              href="/notes"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-100 hover:text-ink"
            >
              <ArrowLeft
                size={15}
                aria-hidden
                className="transition-transform duration-150 group-hover:-translate-x-1 motion-reduce:transform-none"
              />
              All notes
            </Link>
            <span className="mt-8 block font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              {fmt(note.date)}
            </span>
            <h1 className="mt-3 max-w-[20ch] font-display text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              {note.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17.5px] text-muted">{note.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-pad pb-24 pt-14">
        <Reveal className="prose max-w-[68ch] text-[17.5px] leading-[1.7] text-muted">
          <div dangerouslySetInnerHTML={{ __html: note.html }} />
        </Reveal>
        {note.faq.length ? (
          <Reveal className="mt-14 max-w-[68ch]">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-[1.1] tracking-tight">
              Questions
            </h2>
            <div className="mt-6">
              <FaqList items={note.faq} />
            </div>
          </Reveal>
        ) : null}
        <aside className="mt-14 flex max-w-[68ch] items-start gap-5 border-t border-line pt-7 text-[15.5px] text-muted">
          <Image
            src="/me/michael-edward.webp"
            alt="Michael Edward"
            width={56}
            height={56}
            className="h-14 w-14 flex-none rounded-full border border-line object-cover"
          />
          <p>
            <span className="font-medium text-ink">Michael Edward</span> runs{" "}
            <Link href="/notes/what-is-a-koinophobe" className="text-ink underline underline-offset-4">
              Koinophobe
            </Link>
            , a technical SEO practice for home service businesses in the US. 30+ sites over two
            years, with the numbers on the{" "}
            <Link href="/work" className="text-ink underline underline-offset-4">
              work page
            </Link>
            .
          </p>
        </aside>
      </section>

      <CtaBand
        line="Want this done on your site instead of read about?"
        from="after_note"
        secondary={{ href: "/work", label: "See it working" }}
      />

      <Availability />
      <MobileCta />
    </>
  );
}
