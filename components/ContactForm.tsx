"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

// Free service, no backend. Get a key at https://web3forms.com and paste it below
// (or set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local).
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    track("contact_submit", { type: String(data.type || "") });

    // No key configured yet: fall back to opening the user's email client.
    if (!ACCESS_KEY || ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nWebsite: ${data.website}\nType: ${data.type}\n\n${data.message}`
      );
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Free SEO teardown request"
      )}&body=${body}`;
      setStatus("ok");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: ACCESS_KEY, ...data }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-line bg-surface/60 p-8 text-center">
        <p className="font-display text-xl font-semibold text-ink">Thanks, got it.</p>
        <p className="mt-2 text-muted">
          I&apos;ll take a look and get back to you within a day or two.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={field} />
        <input name="email" type="email" required placeholder="Email" className={field} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="website" placeholder="Your website URL" className={field} />
        <select name="type" defaultValue="" required className={field}>
          <option value="" disabled>
            I&apos;m a...
          </option>
          <option value="Agency">Agency (white-label)</option>
          <option value="Business">Business owner</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <textarea
        name="message"
        rows={4}
        placeholder="What's on your plate? (or just say 'send the free teardown')"
        className={field}
      />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-bg transition-all hover:brightness-105 disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send it over"}
        </button>
        {status === "error" && (
          <span className="text-sm text-brand">
            Something went wrong. Email me at {site.email}.
          </span>
        )}
      </div>
    </form>
  );
}
