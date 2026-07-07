// Fire an analytics event. Works with both setups:
// - GTM (NEXT_PUBLIC_GTM_ID): pushes { event, ...params } to the dataLayer,
//   so events like book_a_call_click become Custom Event triggers in GTM.
// - GA4 direct (NEXT_PUBLIC_GA_ID): uses gtag().
// Safe no-op when neither is loaded (e.g. before consent).
type AnalyticsWindow = Window & {
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
  dataLayer?: Record<string, unknown>[];
};

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
    return;
  }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...params });
  }
}
