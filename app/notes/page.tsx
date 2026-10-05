import type { Metadata } from "next";
import { NotesListing } from "@/components/NotesListing";
import { notesPage, publishedNotes } from "@/lib/notes";

// Re-render hourly so a scheduled note publishes itself.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Notes on local SEO for home service businesses",
  description:
    "Practical notes on local SEO, call tracking and technical SEO for roofers, plumbers, HVAC, lawn and other home service businesses. New notes twice a week.",
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
        heading="Local SEO notes for home service businesses"
        intro="What I'd tell you on the call anyway: how to get found on Google, how to count the calls it sends, and what's worth paying for. Written for owners, with real numbers where I have them."
        items={items}
        page={1}
        pages={pages}
        featureFirst
      />
    </>
  );
}
