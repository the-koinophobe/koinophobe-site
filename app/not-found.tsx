import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden">
      <div className="hero-wash absolute inset-0 -z-10" />
      <div className="container-pad flex min-h-[60vh] flex-col items-center justify-center text-center">
        <span className="font-mono text-sm font-medium text-brand">404</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          This page is{" "}
          <span className="accent">nowhere</span> to be found.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The link is broken or the page moved. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-bg transition-all hover:brightness-105"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
