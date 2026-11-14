import type { Metadata } from "next";
import { site } from "@/lib/site";

const BASE = "https://koinophobe.com";
const DEFAULT_IMAGE = "/opengraph-image";

type PageMetaInput = Omit<Metadata, "title" | "description" | "alternates" | "openGraph" | "twitter"> & {
  title: string | { absolute: string };
  description: string;
  /** Path from the site root, e.g. "/pricing". Becomes the canonical and og:url. */
  path: string;
};

/**
 * Metadata for one page, with the canonical, Open Graph and Twitter tags all
 * naming that page. A page without its own openGraph inherits the root
 * layout's, so a shared link previews as the homepage. Setting openGraph also
 * drops the inherited opengraph-image file, so the default card is set here.
 */
export function pageMeta({ title, description, path, ...rest }: PageMetaInput): Metadata {
  const shareTitle = typeof title === "string" ? title : title.absolute;
  const url = path === "/" ? BASE : `${BASE}${path}`;
  return {
    ...rest,
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: shareTitle,
      description,
      images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: shareTitle }],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [DEFAULT_IMAGE] },
  };
}
