import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What cookies this site uses and how to control them.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

const updated = "June 2026";

export default function CookiesPage() {
  return (
    <section className="container-pad py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
          Cookie Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>

        <div className="mt-10 space-y-8 text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_a]:text-brand [&_a]:underline">
          <p>
            Cookies are small files stored on your device. This site keeps them to a
            minimum and sets no analytics cookies until you accept them.
          </p>

          <div>
            <h2>Categories I use</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>Strictly necessary:</strong> a single local setting that
                remembers your cookie choice and your light/dark theme preference.
                These do not track you and are always on.
              </li>
              <li>
                <strong>Analytics (optional):</strong> Google Analytics (cookies such
                as <code>_ga</code>) to measure anonymous, aggregated usage. Loaded
                only if you click Accept.
              </li>
            </ul>
          </div>

          <div>
            <h2>Changing your choice</h2>
            <p className="mt-2">
              You can change or withdraw consent at any time:
            </p>
            <div className="mt-3">
              <CookieSettingsButton className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand" />
            </div>
            <p className="mt-3">
              You can also block or delete cookies in your browser settings. If you
              reject, no analytics cookies are set.
            </p>
          </div>

          <div>
            <h2>More</h2>
            <p className="mt-2">
              For how your data is handled overall, see the{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
