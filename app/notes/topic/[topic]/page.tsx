import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotesListing } from "@/components/NotesListing";
import { publishedNotes } from "@/lib/notes";
import { topics } from "@/lib/topics";

export const revalidate = 3600;

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.key }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const t = topics.find((x) => x.key === params.topic);
  if (!t) return {};
  return {
    title: t.title,
    description: `${t.blurb} Practical notes for home service businesses from Koinophobe.`,
    alternates: { canonical: `/notes/topic/${t.key}` },
  };
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const t = topics.find((x) => x.key === params.topic);
  if (!t) notFound();
  const items = publishedNotes().filter((n) => n.topic === t.key);
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.title,
    url: `https://koinophobe.com/notes/topic/${t.key}`,
    isPartOf: { "@id": "https://koinophobe.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://koinophobe.com/notes/${n.slug}`,
        name: n.title,
      })),
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <NotesListing heading={t.title} intro={t.blurb} items={items} activeTopic={t.key} />
    </>
  );
}
