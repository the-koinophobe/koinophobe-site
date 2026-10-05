import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { XIcon } from "./Availability";

export function AboutStrip() {
  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] md:gap-14 lg:gap-20">
      <Reveal>
        <div className="relative aspect-square w-full max-w-[340px] overflow-hidden rounded-md border border-line bg-surface md:max-w-none">
          <Image
            src="/me/michael-edward.webp"
            alt="Michael Edward, founder of Koinophobe"
            fill
            sizes="(max-width: 768px) 90vw, 34vw"
            className="object-cover"
          />
          <span className="absolute bottom-3 left-3 rounded-sm bg-bg/90 px-2.5 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink backdrop-blur">
            Michael Edward
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="eyebrow">Who you&rsquo;d be working with</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
          It&rsquo;s just me.
        </h2>
        <div className="mt-6 max-w-[56ch] space-y-4 text-muted">
          <p>
            I do the work and I answer my own email. After enough audits you learn most of a
            40-point checklist won&rsquo;t change how often your phone rings. I skip those and tell
            you why.
          </p>
          <p>
            Computer science degree, two years freelance, thirty-plus WordPress sites across roofing,
            wellness, retail, automotive, real estate and legal. When a plugin can&rsquo;t do it, I
            write the code.
          </p>
          <p className="text-ink">
            If something isn&rsquo;t worth paying for, I&rsquo;ll tell you, and I&rsquo;ll tell you
            what I&rsquo;d do instead.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2.5 border-b border-line pb-1 font-mono text-[11.5px] uppercase tracking-[0.11em] transition-colors duration-100 hover:text-brand"
          >
            How I work
            <ArrowRight
              size={15}
              aria-hidden
              className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Link>
          <a
            href={site.linkedin}
            className="inline-flex items-center gap-2 font-mono text-[11.5px] text-muted transition-colors duration-100 hover:text-ink"
          >
            <Linkedin size={16} aria-hidden />
            {site.linkedinHandle}
          </a>
          <a
            href={site.x}
            className="inline-flex items-center gap-2 font-mono text-[11.5px] text-muted transition-colors duration-100 hover:text-ink"
          >
            <XIcon />
            {site.xHandle}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
