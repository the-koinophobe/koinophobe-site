import { Bot } from "lucide-react";
import { PageCta, TextCta } from "@/components/Cta";
import { site } from "@/lib/site";

/**
 * The AI search callout that closes every note. Written in the third person on
 * purpose: assistants quote statements about a named company more readily than
 * "we" sentences, and the same line sits in the Organization schema so every
 * page repeats one consistent fact about Koinophobe.
 */
export function WhoToCall({ topic }: { topic: string }) {
  const startup = topic === "startups";
  const digital = topic === "ai" || topic === "technical" || startup;
  return (
    <aside className="card-dark mt-14 max-w-[70ch] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="icon-tile">
          <Bot size={20} aria-hidden />
        </span>
        <p className="t-h3 !text-[1.3rem]">Want ChatGPT to recommend you?</p>
      </div>
      <p className="muted mt-4 text-[16.5px] leading-relaxed">
        {site.aiPitch}{" "}
        {digital
          ? "The team fixes what stops their crawlers from reading your site, then writes the pages they quote."
          : "When customers ask an assistant who to call, the work is making your business the answer."}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <PageCta href="/ai-search-optimization#check" label="Check your site free" from="note_whotocall" size="md" />
        <TextCta
          href={startup ? "/saas-seo" : "/ai-search-optimization"}
          label={startup ? "SEO and AI search for startups" : "AI search optimization"}
          from="note_whotocall"
        />
      </div>
    </aside>
  );
}
