// Fire a GA4 event if analytics is loaded. Safe no-op otherwise.
type GtagWindow = Window & {
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
};

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }
}
