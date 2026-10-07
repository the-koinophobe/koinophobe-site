"use client";

import { useState } from "react";
import { AlertTriangle, Check, Loader2, Mail, Minus, ScanSearch, X } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

/*
 * The AI crawler check on /saas-seo. Calls /api/ai-check, which reads the
 * site's robots.txt and raw homepage, then shows which crawlers get in. The
 * result can be emailed to me in one click, which is the whole funnel: no
 * form backend, nothing stored.
 */

type Use = "cite" | "user" | "train";
type BotRow = { token: string; owner: string; use: Use; what: string; allowed: boolean | null; rule: string | null; group: string | null };
type Result = {
  host: string;
  checkedAt: string;
  robots: { state: "found" | "none" | "unreachable"; status: number | null; url: string | null };
  bots: BotRow[];
  page: {
    status: number | null;
    finalUrl: string | null;
    title: string | null;
    textChars: number | null;
    thin: boolean;
    noindex: "meta" | "header" | null;
    edge: string | null;
    refused: boolean;
  };
};

const GROUPS: { use: Use; title: string; note: string }[] = [
  { use: "cite", title: "Crawlers that fetch pages to cite them", note: "Block these and you're out of those answers." },
  { use: "user", title: "Fetchers that open a page when someone asks", note: "OpenAI says robots.txt may not apply to its fetcher." },
  { use: "train", title: "Crawlers that collect training data", note: "Blocking these is a choice, and a common one." },
];

function Pill({ row }: { row: BotRow }) {
  if (row.allowed === null)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[13px] text-muted">
        <Minus size={13} aria-hidden /> Unknown
      </span>
    );
  if (row.allowed)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[13px] font-medium text-brand">
        <Check size={13} aria-hidden /> Allowed
      </span>
    );
  if (row.use === "train")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[13px] text-muted">
        <X size={13} aria-hidden /> Blocked
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#b42318]/10 px-2.5 py-1 text-[13px] font-medium text-[#b42318] dark:bg-[#f97066]/15 dark:text-[#f97066]">
      <X size={13} aria-hidden /> Blocked
    </span>
  );
}

function summary(r: Result) {
  const cite = r.bots.filter((b) => b.use === "cite");
  const blocked = cite.filter((b) => b.allowed === false);
  const lines: string[] = [];
  if (r.robots.state === "unreachable") lines.push("robots.txt didn't load properly, which crawlers treat as a reason to stay out.");
  if (blocked.length === 0 && r.robots.state !== "unreachable")
    lines.push(`All ${cite.length} crawlers that fetch pages for answers are allowed by robots.txt.`);
  else if (blocked.length) lines.push(`${blocked.length} of ${cite.length} crawlers that fetch pages for answers are blocked: ${blocked.map((b) => b.token).join(", ")}.`);
  if (r.page.refused) lines.push(`The homepage refused my checker (${r.page.status}${r.page.edge ? `, ${r.page.edge}` : ""}). A firewall that refuses me may refuse AI crawlers too.`);
  if (r.page.noindex) lines.push(`The homepage carries a noindex ${r.page.noindex === "header" ? "header" : "tag"}.`);
  if (r.page.thin) lines.push(`The homepage shows ${r.page.textChars} characters of text before JavaScript runs, so crawlers that don't run JavaScript see an almost empty page.`);
  return lines;
}

export function AiCheck() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || state === "loading") return;
    setState("loading");
    setError("");
    try {
      const res = await fetch(`/api/ai-check?url=${encodeURIComponent(value.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
      setState("done");
      const blocked = (data as Result).bots.filter((b) => b.use === "cite" && b.allowed === false).length;
      track("ai_check", { from: "saas_check", blocked });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  const lines = result ? summary(result) : [];
  const anyIssue = result
    ? result.bots.some((b) => b.use === "cite" && b.allowed === false) || result.page.thin || !!result.page.noindex || result.page.refused || result.robots.state === "unreachable"
    : false;

  const mail = result
    ? `mailto:${site.email}?subject=${encodeURIComponent(`AI crawler check: ${result.host}`)}&body=${encodeURIComponent(
        [
          `I ran the AI crawler check on ${result.host}.`,
          "",
          ...lines,
          "",
          ...result.bots.map((b) => `${b.token}: ${b.allowed === null ? "unknown" : b.allowed ? "allowed" : "blocked"}${b.rule ? ` (${b.rule})` : ""}`),
          "",
          "What would you fix first?",
        ].join("\n")
      )}`
    : "";

  return (
    <div>
      <form onSubmit={run} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="ai-check-url" className="sr-only">
          Your website
        </label>
        <input
          id="ai-check-url"
          type="text"
          inputMode="url"
          autoComplete="url"
          spellCheck={false}
          placeholder="yourapp.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-[52px] w-full min-w-0 rounded-full border border-line bg-bg px-5 text-[16px] text-ink outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-brand sm:max-w-[420px]"
        />
        <button
          type="submit"
          data-track="cta_link"
          data-from="saas_check"
          disabled={state === "loading"}
          className="btn btn-lg btn-primary justify-center disabled:opacity-70"
        >
          {state === "loading" ? <Loader2 size={18} aria-hidden className="animate-spin" /> : <ScanSearch size={18} aria-hidden />}
          {state === "loading" ? "Checking" : "Check my site"}
        </button>
      </form>

      <div aria-live="polite">
        {state === "error" ? (
          <p className="mt-4 flex items-center gap-2 text-[15px] text-[#b42318] dark:text-[#f97066]">
            <AlertTriangle size={16} aria-hidden /> {error}
          </p>
        ) : null}

        {state === "done" && result ? (
          <div className="mt-8">
            <div className={`rounded-2xl p-5 sm:p-6 ${anyIssue ? "bg-cream text-ink" : "bg-brand-soft text-ink"}`}>
              <p className="font-mono text-[12.5px] text-muted">{result.host}</p>
              <ul className="mt-2 space-y-1.5">
                {lines.map((l) => (
                  <li key={l} className="text-[16px] leading-relaxed">
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {GROUPS.map((g) => (
                <div key={g.use} className="rounded-2xl border border-line p-5">
                  <p className="text-[15px] font-medium">{g.title}</p>
                  <p className="mt-1 text-[13.5px] text-muted">{g.note}</p>
                  <ul className="mt-4 divide-y divide-line">
                    {result.bots
                      .filter((b) => b.use === g.use)
                      .map((b) => (
                        <li key={b.token} className="flex items-start justify-between gap-3 py-3">
                          <div className="min-w-0">
                            <p className="font-mono text-[13.5px]">{b.token}</p>
                            <p className="mt-0.5 text-[13px] text-muted">{b.what}</p>
                            {b.rule ? (
                              <p className="mt-0.5 truncate font-mono text-[12px] text-muted/80">
                                {b.group && b.group !== b.token ? `User-agent: ${b.group} · ` : ""}
                                {b.rule}
                              </p>
                            ) : null}
                          </div>
                          <Pill row={b} />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 text-[14.5px] sm:grid-cols-3">
              <p className="rounded-2xl border border-line p-4">
                <span className="block text-muted">robots.txt</span>
                <span className="mt-1 block font-medium">
                  {result.robots.state === "found" ? "Found and read" : result.robots.state === "none" ? "None, so no rules" : `Unreachable${result.robots.status ? ` (${result.robots.status})` : ""}`}
                </span>
              </p>
              <p className="rounded-2xl border border-line p-4">
                <span className="block text-muted">Text before JavaScript</span>
                <span className="mt-1 block font-medium">
                  {result.page.textChars === null ? "Couldn't read the page" : `${result.page.textChars.toLocaleString("en-US")} characters${result.page.thin ? ", almost empty" : ""}`}
                </span>
              </p>
              <p className="rounded-2xl border border-line p-4">
                <span className="block text-muted">noindex</span>
                <span className="mt-1 block font-medium">
                  {result.page.noindex ? `Found in the ${result.page.noindex === "header" ? "X-Robots-Tag header" : "meta tag"}` : result.page.textChars === null ? "Not checked" : "None"}
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[56ch] text-[13.5px] leading-relaxed text-muted">
                This reads robots.txt and the homepage&rsquo;s raw HTML. A firewall or CDN setting can still turn crawlers
                away with a clean robots.txt, and it can&rsquo;t see that from here.
              </p>
              <a href={mail} data-track="cta_email" data-from="saas_check_result" className="btn btn-md btn-primary flex-none">
                <Mail size={17} aria-hidden />
                Send me this result
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
