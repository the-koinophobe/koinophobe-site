import type { Metadata } from "next";
import { NotesListing } from "@/components/NotesListing";
import { popularNotes } from "@/lib/notes";
import { POPULARITY_SOURCE } from "@/lib/note-popularity";

export const revalidate = 3600;

// The same notes as /notes in a different order, so it stays out of the index
// but its links are still followed.
export const metadata: Metadata = {
  title: "Most popular SEO notes",
  description: "The SEO notes Google shows most often, from local SEO to AI search, for service businesses.",
  alternates: { canonical: "/notes/popular" },
  robots: { index: false, follow: true },
};

export default function PopularNotesPage() {
  return (
    <NotesListing
      heading="Most popular SEO notes"
      intro="The notes people find most on Google, ranked by clicks and then by how often Google showed them."
      items={popularNotes()}
      sort="popular"
      sortNote={`Ranked from ${POPULARITY_SOURCE}.`}
      featureFirst
    />
  );
}
