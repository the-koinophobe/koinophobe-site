import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { videos, watchUrl } from "@/lib/videos";
import { publishedNotes } from "@/lib/notes";

/*
 * "Case Files on YouTube" on the notes index. Hard-coded from lib/videos.ts,
 * no YouTube API. Each row goes to the paired note, which carries the embed;
 * once a video has an id, a second link goes straight to YouTube.
 */
export function CaseFiles() {
  const live = new Set(publishedNotes().map((n) => n.slug));
  const rows = videos.filter((v) => live.has(v.note));
  const lead = rows.find((v) => v.series === "Case Files");
  const rest = rows.filter((v) => v !== lead);
  if (!lead) return null;

  return (
    <section aria-labelledby="case-files" className="band">
      <div className="container-pad py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="case-files" className="t-h2 max-w-[18ch]">
            Case Files on YouTube
          </h2>
          {site.youtube ? (
            <a href={site.youtube} target="_blank" rel="noopener" className="btn btn-md btn-light">
              The channel, {site.youtubeHandle}
              <ArrowRight size={16} aria-hidden />
            </a>
          ) : (
            <p className="text-[15px] font-semibold">Coming to YouTube at {site.youtubeHandle}</p>
          )}
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Link href={`/notes/${lead.note}`} className="group block">
            <div className="relative aspect-video overflow-hidden border-[1.5px]" style={{ borderColor: "rgb(var(--band-ink))" }}>
              <Image src={lead.thumbnail} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
            </div>
            <p className="mt-4 text-[1.35rem] font-black leading-tight [font-stretch:108%] group-hover:underline">{lead.title}</p>
            <p className="mt-1 text-[14.5px] opacity-85">
              Case File 001 &middot; {lead.length} &middot; read or watch
            </p>
          </Link>
          <ul>
            {rest.map((v) => (
              <li key={v.note} className="border-t py-3" style={{ borderColor: "rgb(var(--band-ink) / 0.4)" }}>
                <Link href={`/notes/${v.note}`} className="leader text-[16px] font-semibold hover:underline">
                  <span>{v.title}</span>
                  <span className="dots" aria-hidden />
                  <span className="tnum">{v.length}</span>
                </Link>
                {v.id ? (
                  <a href={watchUrl(v)} target="_blank" rel="noopener" className="mt-1 inline-block text-[13.5px] underline">
                    Watch on YouTube
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
