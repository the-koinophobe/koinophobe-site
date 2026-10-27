import { Home, MapPin, PhoneCall, Settings2, Sparkles, TrendingUp, Wrench, type LucideIcon } from "lucide-react";
import { topicLabel, type TopicKey } from "@/lib/topics";

/*
 * The cover a note gets when it has no photo: a forest-green card in the
 * site's own language, the dot grid, the topic's icon and the K mark.
 * Decorative, so the title stays the card's only text for screen readers.
 */

const ICONS: Record<TopicKey, LucideIcon> = {
  roofing: Home,
  local: MapPin,
  trades: Wrench,
  tracking: PhoneCall,
  technical: Settings2,
  ai: Sparkles,
  strategy: TrendingUp,
};

export function NoteCover({ topic }: { topic: TopicKey }) {
  const Icon = ICONS[topic] ?? TrendingUp;
  return (
    <div className="note-cover" aria-hidden>
      <span className="note-cover-icon">
        <Icon size={34} strokeWidth={1.9} />
      </span>
      <span className="note-cover-label">{topicLabel(topic)}</span>
      <span className="logo-mark note-cover-mark" />
    </div>
  );
}
