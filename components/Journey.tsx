import { BarChart3, MousePointerClick, PhoneCall, Search } from "lucide-react";

/*
 * The path a lead takes, from the search to the line in your report. On wide
 * screens the line fills as you scroll through the section (the section
 * carries the `journey-scope` view timeline); elsewhere it draws once when it
 * comes into view. Without either, all four stops simply show lit.
 */

const STOPS = [
  { icon: Search, label: "They search Google" },
  { icon: MousePointerClick, label: "They land on your site" },
  { icon: PhoneCall, label: "Your phone rings" },
  { icon: BarChart3, label: "It shows in your report" },
];

export function Journey({ className = "" }: { className?: string }) {
  return (
    <div data-anim="journey" className={`journey ${className}`}>
      <span className="journey-track" aria-hidden>
        <span className="journey-fill" />
      </span>
      <ol className="journey-stops">
        {STOPS.map(({ icon: Icon, label }, i) => (
          <li key={label} className="journey-stop" style={{ ["--i" as string]: i }}>
            <span className="journey-dot" aria-hidden>
              <Icon size={17} strokeWidth={2.2} />
            </span>
            <span className="journey-label">{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
