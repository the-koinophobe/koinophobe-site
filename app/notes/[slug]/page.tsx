import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Availability } from "@/components/Availability";
import { BookCta, PageCta } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { FaqList, FaqSchema } from "@/components/Faq";
import { NoteCard, fmtDate } from "@/components/NoteCard";
import { adjacentNotes, getNote, publishedNotes, relatedNotes } from "@/lib/notes";
import { topicLabel, topics } from "@/lib/topics";

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
  const images = note.cover ? [{ url: note.cover, width: 1600, height: 900, alt: note.coverAlt }] : undefined;
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
      section: topicLabel(note.topic),
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title, description: note.excerpt, ...(images ? { images: [note.cover] } : {}) },
  };
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = getNote(params.slug);
  if (!note) notFound();

  const topic = topics.find((t) => t.key === note.topic)!;
  const related = relatedNotes(note, 3);
  const { newer, older } = adjacentNotes(note);
  const url = `https://koinophobe.com/notes/${note.slug}`;
  const words = note.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.excerpt,
    datePublished: note.date,
    dateModified: note.date,
    inLanguage: "en-US",
    articleSection: topic.label,
    wordCount: words,
    image: note.cover ? `https://koinophobe.com${note.cover}` : "https://koinophobe.com/opengraph-image",
    author: {
      "@type": "Person",
      "@id": "https://koinophobe.com/#michael",
      name: "Michael Edward",
      url: "https://koinophobe.com/about",
    },
    publisher: { "@id": "https://koinophobe.com/#organization" },
    isPartOf: { "@id": "https://koinophobe.com/#website" },
    mainEntityOfPage: url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://koinophobe.com" },
      { "@type": "ListItem", position: 2, name: "Notes", item: "https://koinophobe.com/notes" },
      { "@type": "ListItem", position: 3, name: topic.label, item: `https://koinophobe.com/notes/topic/${topic.key}` },
      { "@type": "ListItem", position: 4, name: note.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <FaqSchema items={note.faq} />

      <article>
        <header className="hero-bg">
          <div className="container-pad pb-10 pt-10 sm:pt-14">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[14px] text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} aria-hidden />
              <Link href="/notes" className="hover:text-ink">Notes</Link>
              <ChevronRight size={14} aria-hidden />
              <Link href={`/notes/topic/${topic.key}`} className="hover:text-ink">{topic.label}</Link>
            </nav>
            <Reveal className="mt-8 max-w-4xl">
              <Link href={`/notes/topic/${topic.key}`} className="eyebrow">{topic.label}</Link>
              <h1 className="t-h1 mt-5 !text-[clamp(2.1rem,4.4vw,3.6rem)]">{note.title}</h1>
              <p className="t-lead mt-5 max-w-[62ch]">{note.excerpt}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px] text-muted">
                <Link href="/about" className="flex items-center gap-2.5 font-medium text-ink">
                  <Image src="/me/michael-edward.webp" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                  Michael Edward
                </Link>
                <span aria-hidden>&middot;</span>
                <time dateTime={note.date}>{fmtDate(note.date, "long")}</time>
                <span aria-hidden>&middot;</span>
                <span>{note.minutes} min read</span>
              </div>
            </Reveal>
          </div>
        </header>

        {note.cover ? (
          <div className="container-pad">
            <figure>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-surface">
                <Image
                  src={note.cover}
                  alt={note.coverAlt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  className="object-cover"
                />
              </div>
              {note.coverCredit ? (
                <figcaption className="mt-3 text-right text-[13px] text-muted">{note.coverCredit}</figcaption>
              ) : null}
            </figure>
          </div>
        ) : null}

        <div className="container-pad grid gap-14 pb-20 pt-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="min-w-0">
            <div className="prose max-w-[70ch] text-[17.5px] leading-[1.75] text-ink/85">
              <div dangerouslySetInnerHTML={{ __html: note.html }} />
            </div>

            {note.faq.length ? (
              <section className="mt-16 max-w-[70ch]">
                <h2 className="t-h3 !text-[1.75rem]">Questions</h2>
                <div className="mt-6">
                  <FaqList items={note.faq} />
                </div>
              </section>
            ) : null}

            <aside className="card mt-14 flex max-w-[70ch] items-start gap-5 bg-surface p-6">
              <Image
                src="/me/michael-edward.webp"
                alt="Michael Edward"
                width={64}
                height={64}
                className="h-16 w-16 flex-none rounded-full object-cover"
              />
              <div>
                <p className="font-medium">Written by Michael Edward</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                  I run{" "}
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
              </div>
            </aside>

            <nav aria-label="More notes" className="mt-10 grid max-w-[70ch] gap-3 sm:grid-cols-2">
              {older ? (
                <Link href={`/notes/${older.slug}`} className="card card-hover p-5">
                  <span className="flex items-center gap-1.5 text-[13px] text-muted">
                    <ArrowLeft size={14} aria-hidden /> Previous
                  </span>
                  <span className="mt-1.5 block font-medium leading-snug">{older.title}</span>
                </Link>
              ) : <span />}
              {newer ? (
                <Link href={`/notes/${newer.slug}`} className="card card-hover p-5 text-right">
                  <span className="flex items-center justify-end gap-1.5 text-[13px] text-muted">
                    Next <ArrowRight size={14} aria-hidden />
                  </span>
                  <span className="mt-1.5 block font-medium leading-snug">{newer.title}</span>
                </Link>
              ) : null}
            </nav>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {note.toc.length > 1 ? (
                <nav aria-label="On this page" className="toc">
                  <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.06em] text-muted">On this page</p>
                  {note.toc.map((h) => (
                    <a key={h.id} href={`#${h.id}`}>{h.text}</a>
                  ))}
                </nav>
              ) : null}
              <div className="card bg-surface p-6">
                <p className="t-h3 !text-[1.2rem]">Want this done on your site?</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  Book a free 20-minute call. I&rsquo;ll look at your site first and tell you what I&rsquo;d fix.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <BookCta from="note_sidebar" size="md" className="w-full" />
                  <PageCta href="/pricing" label="See pricing" from="note_sidebar" size="md" className="w-full" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section className="section-tint py-20">
          <div className="container-pad">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="t-h2 !text-[clamp(1.6rem,2.8vw,2.2rem)]">Keep reading</h2>
              <Link href={`/notes/topic/${topic.key}`} className="link-arrow">
                More on {topic.label.toLowerCase()} <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <NoteCard key={r.slug} note={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Availability />
      <MobileCta />
    </>
  );
}
