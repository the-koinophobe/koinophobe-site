import { getSiteVisits } from "@/lib/ga4";

// Live page views pulled from the site's own GA4 property (server-rendered,
// cached hourly). Renders nothing until the GA4 Data API env vars are set,
// so it is always safe to keep in the layout.
export async function SiteVisits() {
  const visits = await getSiteVisits();
  if (visits === null || visits < 1) return null;

  const formatted = new Intl.NumberFormat("en-US").format(visits);

  return (
    <p className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
      </span>
      {formatted} page views, measured by this site&apos;s own GA4
    </p>
  );
}
