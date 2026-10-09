import type { Metadata } from "next";
import { NotesListing } from "@/components/NotesListing";
import { notesPage, publishedNotes } from "@/lib/notes";

// Re-render hourly so a scheduled note publishes itself.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SEO notes for local businesses and startups",
  description:
    "SEO notes for local businesses and startup founders in the US, Australia and Europe: local SEO, technical SEO, AI search and call tracking.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  const { items, pages } = notesPage(1);
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://koinophobe.com/notes#blog",
    name: "Koinophobe notes",
    url: "https://koinophobe.com/notes",
    publisher: { "@id": "https://koinophobe.com/#organization" },
    blogPost: publishedNotes()
      .slice(0, 12)
      .map((n) => ({
        "@type": "BlogPosting",
        headline: n.title,
        url: `https://koinophobe.com/notes/${n.slug}`,
        datePublished: n.date,
      })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />
      <NotesListing
        heading="SEO notes for local businesses and startups"
        intro="What I'd tell you on the call anyway: how to get found on Google and in AI answers, how to count the leads it sends, and what's worth paying for. Written for owners and founders, with real numbers where I have them."
        items={items}
        page={1}
        pages={pages}
        featureFirst
      />
    </>
  );
}
