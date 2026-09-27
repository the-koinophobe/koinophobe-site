import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Koinophobe collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const updated = "September 2026";

export default function PrivacyPage() {
  return (
    <section className="container-pad pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>

        <div className="mt-10 space-y-8 text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_a]:text-brand [&_a]:underline">
          <p>
            This policy explains how this site (&ldquo;Koinophobe&rdquo;, &ldquo;I&rdquo;)
            handles your personal data, in line with the EU/UK General Data Protection
            Regulation (GDPR). I keep data collection to the minimum needed to run the
            site and respond to you.
          </p>

          <div>
            <h2>Who is responsible</h2>
            <p className="mt-2">
              The data controller is Michael Edward (Koinophobe). For any privacy
              question or request, contact{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>

          <div>
            <h2>What I collect and why</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>Email and bookings:</strong> your name, email, website and
                anything you write, used to reply to you and to run the call you
                booked. Bookings are handled by Cal.com. Legal basis: steps taken at
                your request.
              </li>
              <li>
                <strong>Analytics:</strong> anonymous usage data (pages viewed, rough
                location, device) via Google Analytics, only if you accept cookies.
                Legal basis: your consent. IP addresses are anonymised.
              </li>
              <li>
                <strong>Server logs:</strong> standard technical logs kept by the host
                for security and reliability. Legal basis: legitimate interest.
              </li>
            </ul>
          </div>

          <div>
            <h2>Who I share it with</h2>
            <p className="mt-2">
              Only the processors needed to run the site: the hosting provider
              (Vercel), the booking service (Cal.com, if you book a call), and Google
              Analytics (if you consent). I never sell your data.
            </p>
          </div>

          <div>
            <h2>International transfers</h2>
            <p className="mt-2">
              Some processors are based outside your country. Where data leaves the
              EU/UK, it is covered by appropriate safeguards such as Standard
              Contractual Clauses.
            </p>
          </div>

          <div>
            <h2>How long I keep it</h2>
            <p className="mt-2">
              Inquiry emails are kept only as long as needed to handle our
              correspondence and any resulting work. Analytics data follows Google&apos;s
              retention settings. You can ask me to delete your data at any time.
            </p>
          </div>

          <div>
            <h2>Your rights</h2>
            <p className="mt-2">
              Under the GDPR you can request access to, correction of, or deletion of
              your data; restrict or object to processing; request portability; and
              withdraw consent at any time. You also have the right to complain to your
              local data protection authority. To exercise any right, email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>

          <div>
            <h2>If you are in the US</h2>
            <p className="mt-2">
              I don&apos;t sell or share your personal information, and I don&apos;t use it
              for targeted advertising. Residents of California and other states with
              privacy laws can ask what I hold about them, ask me to correct or delete
              it, and won&apos;t be treated differently for asking. Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> and I&apos;ll respond
              within 45 days.
            </p>
          </div>

          <div>
            <h2>Cookies</h2>
            <p className="mt-2">
              See the <Link href="/cookies">Cookie Policy</Link> for what is set and how
              to change your choice. No non-essential cookies are placed before you
              consent.
            </p>
          </div>

          <p className="text-sm">
            This is a good-faith, plain-language policy. For a high-stakes or regulated
            business, have it reviewed by a qualified professional.
          </p>
        </div>
      </div>
    </section>
  );
}
