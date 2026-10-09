import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { NotesListing } from "@/components/NotesListing";
import { notesPage } from "@/lib/notes";

export const revalidate = 3600;

export function generateStaticParams() {
  const { pages } = notesPage(1);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export function generateMetadata({ params }: { params: { n: string } }): Metadata {
  const n = Number(params.n);
  return {
    title: `Notes, page ${n}`,
    description: `SEO notes for local businesses and startups: local SEO, technical SEO, AI search and call tracking, page ${n}.`,
    alternates: { canonical: `/notes/page/${n}` },
  };
}

export default function NotesPageN({ params }: { params: { n: string } }) {
  const n = Number(params.n);
  if (!Number.isInteger(n) || n < 1) notFound();
  if (n === 1) redirect("/notes");
  const { items, pages } = notesPage(n);
  if (n > pages) notFound();
  return (
    <NotesListing
      heading={`Notes, page ${n}`}
      intro="Older notes on local SEO, technical SEO, AI search and call tracking for local businesses and startups."
      items={items}
      page={n}
      pages={pages}
    />
  );
}
