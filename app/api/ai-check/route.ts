import { lookup } from "node:dns/promises";
import { BOTS, THIN_TEXT, cleanHost, evaluate, isPrivateAddress, parseRobots, readHtml } from "@/lib/ai-check";

/*
 * GET /api/ai-check?url=example.com
 *
 * Reads a site's robots.txt and raw homepage the way a crawler that doesn't
 * run JavaScript would, and reports which AI and search crawlers it lets in.
 * Two requests per check, both to the host that was typed, nothing stored.
 *
 * Safety: hostnames only, every address the name resolves to must be public,
 * redirects are followed by hand (three at most) and re-checked at every hop,
 * bodies are capped, and each fetch times out.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UA = "Mozilla/5.0 (compatible; KoinophobeAICheck/1.0; +https://koinophobe.com/saas-seo)";
const TIMEOUT_MS = 7000;
const MAX_BYTES = 600_000;
const MAX_HOPS = 3;

/* Per-instance limit, enough to stop a script hammering one function. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 15;
}

class CheckError extends Error {}

async function assertPublic(host: string) {
  let addrs: { address: string }[];
  try {
    addrs = await lookup(host, { all: true });
  } catch {
    throw new CheckError(`${host} doesn't resolve. Check the spelling.`);
  }
  if (!addrs.length || addrs.some((a) => isPrivateAddress(a.address))) {
    throw new CheckError("That address isn't a public website.");
  }
}

type Got = { status: number; url: string; headers: Headers; body: string };

async function readCapped(res: Response): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (size < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done || !value) break;
    chunks.push(value);
    size += value.byteLength;
  }
  reader.cancel().catch(() => {});
  const buf = new Uint8Array(Math.min(size, MAX_BYTES));
  let off = 0;
  for (const c of chunks) {
    const take = Math.min(c.byteLength, buf.length - off);
    buf.set(c.subarray(0, take), off);
    off += take;
    if (off >= buf.length) break;
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(buf);
}

async function get(start: string): Promise<Got> {
  let url = start;
  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    const u = new URL(url);
    if (u.protocol !== "https:" && u.protocol !== "http:") throw new CheckError("Redirected somewhere odd.");
    if (u.port || u.username) throw new CheckError("Redirected somewhere odd.");
    await assertPublic(u.hostname);
    const res = await fetch(url, {
      redirect: "manual",
      headers: { "user-agent": UA, accept: "text/html,text/plain;q=0.9,*/*;q=0.5" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    const loc = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && loc) {
      res.body?.cancel().catch(() => {});
      url = new URL(loc, url).toString();
      continue;
    }
    return { status: res.status, url, headers: res.headers, body: await readCapped(res) };
  }
  throw new CheckError("Too many redirects.");
}

function edgeName(h: Headers): string | null {
  const server = (h.get("server") ?? "").toLowerCase();
  if (h.get("cf-mitigated") || server.includes("cloudflare")) return "Cloudflare";
  if (server.includes("akamai")) return "Akamai";
  if (h.get("x-vercel-mitigated")) return "Vercel";
  if (server.includes("sucuri")) return "Sucuri";
  return null;
}

export async function GET(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ error: "That's a lot of checks. Try again in a few minutes." }, { status: 429 });
  }
  const host = cleanHost(new URL(req.url).searchParams.get("url") ?? "");
  if (!host) return Response.json({ error: "Type a website address, like yourapp.com." }, { status: 400 });

  try {
    const origin = `https://${host}`;
    const [robotsRes, pageRes] = await Promise.allSettled([get(`${origin}/robots.txt`), get(`${origin}/`)]);

    // robots.txt: 2xx is read, other 4xx means no rules (RFC 9309), 5xx or no
    // answer means unreachable, which crawlers treat as "keep out".
    let robots: { state: "found" | "none" | "unreachable"; status: number | null; url: string | null };
    let groups = parseRobots("");
    if (robotsRes.status === "fulfilled") {
      const r = robotsRes.value;
      const looksHtml = /^\s*</.test(r.body);
      if (r.status >= 200 && r.status < 300 && !looksHtml) {
        robots = { state: "found", status: r.status, url: r.url };
        groups = parseRobots(r.body);
      } else if (r.status >= 400 && r.status < 500 && r.status !== 429) {
        robots = { state: "none", status: r.status, url: r.url };
      } else if (r.status >= 200 && r.status < 300) {
        robots = { state: "none", status: r.status, url: r.url }; // an HTML page served at /robots.txt
      } else {
        robots = { state: "unreachable", status: r.status, url: r.url };
      }
    } else {
      if (robotsRes.reason instanceof CheckError) throw robotsRes.reason;
      robots = { state: "unreachable", status: null, url: null };
    }

    const bots = BOTS.map((b) => {
      if (robots.state === "unreachable") {
        // A 5xx or 429 on robots.txt tells crawlers to stay out. No answer at
        // all may be my side, so that's reported as unknown, not blocked.
        return robots.status
          ? { ...b, allowed: false, group: null, rule: `robots.txt answered ${robots.status}` }
          : { ...b, allowed: null, group: null, rule: "robots.txt didn't answer" };
      }
      const v = evaluate(groups, b.token, "/");
      return { ...b, allowed: v.allowed, group: v.group === "none" ? null : v.group, rule: v.rule };
    });

    let page: {
      status: number | null;
      finalUrl: string | null;
      title: string | null;
      textChars: number | null;
      thin: boolean;
      noindex: "meta" | "header" | null;
      edge: string | null;
      refused: boolean;
    } = { status: null, finalUrl: null, title: null, textChars: null, thin: false, noindex: null, edge: null, refused: false };

    if (pageRes.status === "fulfilled") {
      const p = pageRes.value;
      const refused = [401, 403, 406, 429, 503].includes(p.status);
      const read = refused ? null : readHtml(p.body);
      const headerNoindex = /noindex/i.test(p.headers.get("x-robots-tag") ?? "");
      page = {
        status: p.status,
        finalUrl: p.url,
        title: read?.title ?? null,
        textChars: read?.textChars ?? null,
        thin: read ? read.textChars < THIN_TEXT : false,
        noindex: headerNoindex ? "header" : read?.noindexMeta ? "meta" : null,
        edge: edgeName(p.headers),
        refused,
      };
    }

    return Response.json(
      { host, checkedAt: new Date().toISOString(), robots, bots, page },
      { headers: { "cache-control": "public, s-maxage=600, stale-while-revalidate=60" } }
    );
  } catch (e) {
    const msg = e instanceof CheckError ? e.message : "Couldn't reach that site. It may be down or blocking checks.";
    return Response.json({ error: msg }, { status: 422 });
  }
}
