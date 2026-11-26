import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { NotesListing } from "@/components/NotesListing";
import { notesPage } from "@/lib/notes";
import { pageMeta } from "@/lib/meta";

export const revalidate = 3600;

export function generateStaticParams() {
  const { pages } = notesPage(1);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata(props: { params: Promise<{ n: string }> }): Promise<Metadata> {
  const params = await props.params;
  const n = Number(params.n);
  return pageMeta({
    title: `SEO notes, page ${n}`,
    description: `SEO notes for service businesses: local SEO, technical SEO, AI search and call tracking, page ${n}.`,
    path: `/notes/page/${n}`,
  });
}

export default async function NotesPageN(props: { params: Promise<{ n: string }> }) {
  const params = await props.params;
  const n = Number(params.n);
  if (!Number.isInteger(n) || n < 1) notFound();
  if (n === 1) redirect("/notes");
  const { items, pages } = notesPage(n);
  if (n > pages) notFound();
  return (
    <NotesListing
      heading={`SEO notes for service businesses, page ${n}`}
      intro="Older notes on local SEO, technical SEO, AI search and call tracking for service businesses."
      items={items}
      page={n}
      pages={pages}
      sort="newest"
      sortNote="Newest first."
    />
  );
}
