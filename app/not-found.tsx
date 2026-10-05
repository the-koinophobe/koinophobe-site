import Link from "next/link";
import { publishedNotes } from "@/lib/notes";

export default function NotFound() {
  const latest = publishedNotes().slice(0, 3);
  return (
    <section className="hero-bg">
      <div className="container-pad flex min-h-[64vh] flex-col items-center justify-center py-20 text-center">
        <span className="eyebrow">404</span>
        <h1 className="t-h1 mt-5 max-w-[18ch]">That page isn&rsquo;t here</h1>
        <p className="t-lead mt-4 max-w-md">The link is broken or the page moved. These will get you where you were going.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-lg btn-primary">Home</Link>
          <Link href="/pricing" className="btn btn-lg btn-secondary">Pricing</Link>
          <Link href="/notes" className="btn btn-lg btn-secondary">Notes</Link>
        </div>
        {latest.length ? (
          <ul className="mt-12 space-y-2 text-[15.5px]">
            {latest.map((n) => (
              <li key={n.slug}>
                <Link href={`/notes/${n.slug}`} className="text-brand underline underline-offset-4">{n.title}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
