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
        <div className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-md border border-line bg-surface md:max-w-none">
          <Image
            src="/michael-edward.webp"
            alt="Michael Edward"
            fill
            sizes="(max-width: 768px) 90vw, 34vw"
            className="object-cover"
          />
          <span className="absolute bottom-3 left-3 rounded-sm bg-bg/90 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink backdrop-blur">
            Michael Edward
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="eyebrow">[ Who you&rsquo;d be working with ]</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
          One person, and you get all of him.
        </h2>
        <div className="mt-6 max-w-[56ch] space-y-4 text-muted">
          <p>
            No account manager, no junior doing the actual work, no ticket queue. You get me, and I
            have been doing this long enough to know which of the forty things in a standard audit
            are worth your money and which thirty-five are not.
          </p>
          <p>
            Computer science degree, two years freelance, thirty-plus WordPress sites across roofing,
            wellness, retail, automotive, real estate and legal. I write the code when a plugin
            won&rsquo;t do it, which is more often than most SEOs would like to admit.
          </p>
          <p className="text-ink">
            And I&rsquo;ll tell you when something isn&rsquo;t worth doing. That habit has cost me
            work and kept me every client I&rsquo;ve had.
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
