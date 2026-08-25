"use client";

import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/lib/gbp";

// primary   acid lime, always with the darkest green on top
// accent    the deep/emerald fill, always with the page colour on top
// onBright  a card-coloured pill sitting on one of the bright bands
type Variant = "primary" | "accent" | "onBright";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-[rgb(var(--edge))]",
  accent: "bg-accent text-bg",
  onBright: "bg-surface text-ink",
};

export function WhatsAppButton({
  label = "Send a WhatsApp message",
  location,
  variant = "primary",
  className = "",
}: {
  label?: string;
  location: string;
  variant?: Variant;
  className?: string;
}) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("gbp_whatsapp_click", { location, channel: "whatsapp" })}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-[rgb(var(--edge))] px-6 py-3 text-sm font-bold tracking-tight shadow-[4px_4px_0_0_rgb(var(--edge))] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgb(var(--edge))] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${styles[variant]} ${className}`}
    >
      <MessageCircle size={17} strokeWidth={2.6} aria-hidden />
      {label}
    </a>
  );
}
