"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";

/*
 * The "start with one sentence" form on /saas-seo. Three blanks inside one
 * sentence, and the button opens the reader's email app with the sentence
 * already written. No form backend, nothing stored: it is a mailto link whose
 * href is rebuilt as they type. The click is tracked by the delegated listener
 * in Anim.tsx through data-track / data-from, like every other CTA.
 */

const PLACEHOLDER = {
  ask: "a CRM for small agencies",
  name: "YourApp",
  url: "yourapp.com",
};

function Blank({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
  type?: string;
}) {
  // An invisible copy of the text sits in the same grid cell as the input, so
  // the input is exactly as wide as what's typed (or the placeholder) in the
  // display font, and the sentence keeps reading as a sentence.
  return (
    <span className="ml-[0.3em] inline-grid max-w-full grid-cols-[minmax(0,auto)] align-baseline">
      <span aria-hidden className="invisible col-start-1 row-start-1 overflow-hidden whitespace-pre px-0.5 pb-0.5 font-medium">
        {value || placeholder}
      </span>
      <input
        type={type}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        size={1}
        spellCheck={false}
        autoComplete="off"
        className="col-start-1 row-start-1 w-full min-w-0 border-0 border-b-2 border-brand/50 bg-transparent px-0.5 pb-0.5 font-medium text-brand outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-brand"
      />
    </span>
  );
}

export function StartSentence() {
  const [ask, setAsk] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const a = ask.trim() || PLACEHOLDER.ask;
  const n = name.trim() || PLACEHOLDER.name;
  const u = url.trim() || PLACEHOLDER.url;

  const subject = `Search + AI: ${url.trim() || name.trim() || "my site"}`;
  const body = [
    `When a buyer asks ChatGPT for ${a}, the answer should name ${n}.`,
    `Our site is ${u}.`,
    "",
    "(Sent from koinophobe.com/saas-seo)",
  ].join("\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div>
      <p className="font-display text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.5] tracking-tight text-ink">
        When a buyer asks ChatGPT for
        <Blank value={ask} onChange={setAsk} placeholder={PLACEHOLDER.ask} label="What your buyer asks for" />, the
        answer should name
        <Blank value={name} onChange={setName} placeholder={PLACEHOLDER.name} label="Your product's name" />. Our site
        is
        <Blank value={url} onChange={setUrl} placeholder={PLACEHOLDER.url} label="Your website" type="url" />.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a href={href} data-track="cta_email" data-from="saas_start" className="btn btn-lg btn-primary">
          <Mail size={18} aria-hidden />
          Send it to me
        </a>
        <p className="text-[14px] text-muted">
          Opens your email app. Or write to{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
