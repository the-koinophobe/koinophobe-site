import { site } from "@/lib/site";

// The contact form is gone: every call to action on the site is a mailto, so
// there is no server-side submission path to keep. This route stays only to
// answer anything still pointing at it.
export const dynamic = "force-static";

export function POST() {
  return Response.json({ ok: false, error: "Email " + site.email + " instead." }, { status: 410 });
}
