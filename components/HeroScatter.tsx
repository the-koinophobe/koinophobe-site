import Image from "next/image";
import { BarChart3, TrendingUp } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { monthly as gscMonthly } from "@/lib/gsc";

/*
 * The cards around the home hero: client sites as tilted polaroids, plus the
 * two Search Console figures that used to float over the hero photo.
 *
 * Two layouts from one list. From xl up the cards hang off both sides of the
 * centred headline and drift outward as the page scrolls. Below that there's
 * no room at the sides, so they gather into a fan under the buttons and the
 * two stat cards sit side by side beneath it.
 *
 * Captions follow the same rule as the wall: a client we can't name shows its
 * trade, never its name.
 */

const PICKS = ["Over The Table Top", "HH Roofing & Repairs", "Tint Lordz Auto Spa", "Brevard Pool Deck Repair"];
const shown = PICKS.map((n) => projects.find((p) => p.name === n)).filter(Boolean) as Project[];
const caption = (p: Project) => (p.named ? p.name : p.sector);

/* Desktop positions: [left/right, top, rotation, drift x, drift y]. */
const SPOTS: { side: "left" | "right"; x: string; top: string; rot: number; dx: number; dy: number }[] = [
  { side: "left", x: "3%", top: "12%", rot: -9, dx: -60, dy: -30 },
  { side: "right", x: "4%", top: "13%", rot: 8, dx: 60, dy: -40 },
  { side: "left", x: "6%", top: "52%", rot: 6, dx: -70, dy: 30 },
  { side: "right", x: "2%", top: "50%", rot: -7, dx: 70, dy: 20 },
];

function Polaroid({ p, sizes, priority = false }: { p: Project; sizes: string; priority?: boolean }) {
  return (
    <figure className="polaroid">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-surface">
        <Image src={p.image} alt={`${p.sector} website`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
      <figcaption className="mt-2.5 truncate px-1 text-[12.5px] font-semibold tracking-tight">{caption(p)}</figcaption>
    </figure>
  );
}

function RoofingStat() {
  return (
    <div className="stat-card">
      <p className="flex items-center gap-2 text-[12.5px] font-medium text-muted">
        <TrendingUp size={15} aria-hidden className="text-brand" />
        Roofing contractor
      </p>
      <p className="mt-2 font-display text-[clamp(1.3rem,4.4vw,1.65rem)] leading-none tracking-tight">47.9 &rarr; 14.9</p>
      <p className="mt-1.5 text-[12.5px] leading-snug text-muted">Average Google position, year on year</p>
    </div>
  );
}

function ClinicStat() {
  const clinic = gscMonthly.myofascial;
  const max = Math.max(...clinic.map(([, v]) => v));
  return (
    <div className="stat-card">
      <p className="flex items-center gap-2 text-[12.5px] font-medium text-muted">
        <BarChart3 size={15} aria-hidden className="flex-none text-brand" />
        Pain clinic, clicks per month
      </p>
      <div className="mt-3 flex h-[46px] items-end gap-[3px]" aria-hidden>
        {clinic.map(([m, v], i) => (
          <span
            key={i}
            className="flex-1 rounded-t-[2px] bg-brand"
            style={{ height: `${Math.max(4, (v / max) * 100)}%`, opacity: i === clinic.length - 1 ? 0.35 : 0.35 + (v / max) * 0.65 }}
            title={`${m}: ${v}`}
          />
        ))}
      </div>
      <p className="mt-2 text-[12.5px] text-muted">
        <span className="font-medium text-ink">4 to 104</span> a month, from its own Search Console
      </p>
    </div>
  );
}

/** xl and up: cards hung around the headline. Only one of the two layouts is ever displayed. */
export function HeroScatter() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block">
      {shown.map((p, i) => {
        const s = SPOTS[i];
        return (
          <div
            key={p.name}
            className="scatter-drift pointer-events-auto absolute w-[228px]"
            style={{ [s.side]: s.x, top: s.top, ["--dx" as string]: `${s.dx}px`, ["--dy" as string]: `${s.dy}px` }}
          >
            <div className="scatter-in" style={{ ["--rot" as string]: `${s.rot}deg`, animationDelay: `${0.25 + i * 0.09}s` }}>
              <Polaroid p={p} sizes="228px" priority={i < 2} />
            </div>
          </div>
        );
      })}
      <div className="scatter-drift pointer-events-auto absolute bottom-[4%] left-[17%] w-[236px]" style={{ ["--dx" as string]: "-30px", ["--dy" as string]: "40px" }}>
        <div className="scatter-in" style={{ ["--rot" as string]: "-3deg", animationDelay: "0.7s" }}>
          <RoofingStat />
        </div>
      </div>
      <div className="scatter-drift pointer-events-auto absolute bottom-[3%] right-[16%] w-[256px]" style={{ ["--dx" as string]: "30px", ["--dy" as string]: "40px" }}>
        <div className="scatter-in" style={{ ["--rot" as string]: "3deg", animationDelay: "0.8s" }}>
          <ClinicStat />
        </div>
      </div>
    </div>
  );
}

/** Below xl: the same cards gathered into a fan under the buttons. */
export function HeroFan() {
  const fan = shown.slice(0, 3);
  const rots = [-8, 2, 9];
  return (
    <div className="mt-14 xl:hidden">
      <div className="relative mx-auto flex h-[clamp(150px,40vw,250px)] max-w-[640px] items-center justify-center">
        {fan.map((p, i) => (
          <div
            key={p.name}
            className="absolute w-[min(46vw,280px)]"
            style={{ left: `${[0, 50, 100][i]}%`, transform: `translateX(${[-2, -50, -98][i]}%)`, zIndex: i === 1 ? 2 : 1 }}
          >
            <div className="scatter-in" style={{ ["--rot" as string]: `${rots[i]}deg`, animationDelay: `${0.35 + i * 0.1}s` }}>
              <Polaroid p={p} sizes="(min-width: 640px) 280px, 46vw" />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 grid max-w-[640px] gap-3 text-left sm:grid-cols-2">
        <div className="scatter-in" style={{ ["--rot" as string]: "-1.5deg", animationDelay: "0.6s" }}>
          <RoofingStat />
        </div>
        <div className="scatter-in" style={{ ["--rot" as string]: "1.5deg", animationDelay: "0.7s" }}>
          <ClinicStat />
        </div>
      </div>
    </div>
  );
}
