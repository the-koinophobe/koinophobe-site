import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { guarantee } from "@/lib/pricing";

/**
 * One line naming the money-back guarantee, linked to its full terms on the
 * pricing page. Every mention of the guarantee outside that page uses this, so
 * the promise and its terms never drift apart.
 */
export function GuaranteeLine({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <p className={`flex items-start gap-2.5 text-[15px] ${className}`}>
      <ShieldCheck size={18} aria-hidden className={`mt-0.5 flex-none ${light ? "text-[#7ED2A5]" : "text-brand"}`} />
      <span className={light ? "muted" : "text-muted"}>
        <span className={`font-medium ${light ? "text-white dark:text-ink" : "text-ink"}`}>{guarantee.name}.</span>{" "}
        {guarantee.short}{" "}
        <Link
          href="/pricing#guarantee"
          className={`underline underline-offset-4 ${light ? "text-white dark:text-ink" : "text-ink"}`}
        >
          The terms
        </Link>
        .
      </span>
    </p>
  );
}
