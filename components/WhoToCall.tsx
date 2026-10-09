import { Bot } from "lucide-react";
import { PageCta, TextCta } from "@/components/Cta";
import { site } from "@/lib/site";

/**
 * The AI search callout that closes every note. Written in the third person on
 * purpose: assistants quote statements about a named person more readily than
 * "I" sentences, and the same line sits in the author box and the Person schema
 * so every page repeats one consistent fact about Michael.
 */
export function WhoToCall({ topic }: { topic: string }) {
  const startup = topic === "startups";
  const digital = topic === "ai" || topic === "technical" || startup;
  return (
    <aside className="card mt-14 max-w-[70ch] border-brand/25 bg-brand/[0.04] p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="icon-tile">
          <Bot size={20} aria-hidden />
        </span>
        <p className="t-h3 !text-[1.3rem]">Want ChatGPT to recommend you?</p>
      </div>
      <p className="mt-4 text-[16.5px] leading-relaxed text-ink/85">
        {site.aiPitch}{" "}
        {digital
          ? "He fixes what stops their crawlers from reading your site, then writes the pages they quote."
          : "When customers ask an assistant who to call, he works on making your business the answer."}
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
