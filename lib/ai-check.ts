/**
 * The logic behind the AI crawler check on /saas-seo. Pure functions only, so
 * it can be tested without the network: input cleaning, the private-address
 * guard, robots.txt parsing per RFC 9309, and a raw-HTML read of a homepage.
 * The route in app/api/ai-check does the fetching.
 */

export type BotUse = "cite" | "user" | "train";

export type Bot = {
  /** robots.txt product token. */
  token: string;
  owner: string;
  use: BotUse;
  /** One line on what blocking it does. */
  what: string;
};

/**
 * Sources: OpenAI's crawler overview, Anthropic's "Does Anthropic crawl data
 * from the web" help article, Perplexity's crawler docs, Google's note that
 * Google-Extended does not affect Search. Checked October 2026.
 */
export const BOTS: Bot[] = [
  { token: "OAI-SearchBot", owner: "OpenAI", use: "cite", what: "ChatGPT search results" },
  { token: "Claude-SearchBot", owner: "Anthropic", use: "cite", what: "Claude search results" },
  { token: "PerplexityBot", owner: "Perplexity", use: "cite", what: "Perplexity answers" },
  { token: "Googlebot", owner: "Google", use: "cite", what: "Google Search and AI Overviews" },
  { token: "bingbot", owner: "Microsoft", use: "cite", what: "Bing and Copilot answers" },
  { token: "ChatGPT-User", owner: "OpenAI", use: "user", what: "Pages ChatGPT opens when someone asks" },
  { token: "Claude-User", owner: "Anthropic", use: "user", what: "Pages Claude opens when someone asks" },
  { token: "GPTBot", owner: "OpenAI", use: "train", what: "OpenAI model training" },
  { token: "ClaudeBot", owner: "Anthropic", use: "train", what: "Anthropic model training" },
  { token: "Google-Extended", owner: "Google", use: "train", what: "Gemini and Vertex AI, not Search" },
];

/* ------------------------------------------------------------ input */

/** Turns whatever was typed into a bare public hostname, or null. */
export function cleanHost(input: string): string | null {
  let s = (input || "").trim().toLowerCase();
  if (!s || s.length > 253) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//.test(s)) s = `https://${s}`;
  let u: URL;
  try {
    u = new URL(s);
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  if (u.username || u.password || u.port) return null;
  const host = u.hostname.replace(/\.$/, "");
  // Hostnames only: no IP literals, no single-label names like "localhost".
  if (!/^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(host)) return null;
  if (/\.(local|localhost|internal|lan|home|corp|test|invalid|example)$/.test(host)) return null;
  return host;
}

/* ------------------------------------------------------------ private address guard */

function v4ToInt(ip: string): number {
  return ip.split(".").reduce((n, o) => (n << 8) + Number(o), 0) >>> 0;
}

const V4_BLOCKED: [string, number][] = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

/** True for loopback, private, link-local, carrier NAT, multicast and reserved addresses. */
export function isPrivateAddress(ip: string): boolean {
  const v = ip.toLowerCase();
  const mapped = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateAddress(mapped[1]);
  if (/^\d+\.\d+\.\d+\.\d+$/.test(v)) {
    const n = v4ToInt(v);
    return V4_BLOCKED.some(([base, bits]) => {
      const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
      return (n & mask) === (v4ToInt(base) & mask);
    });
  }
  if (v === "::" || v === "::1") return true;
  if (/^f[cd][0-9a-f]{2}:/.test(v)) return true; // fc00::/7 unique local
  if (/^fe[89ab][0-9a-f]:/.test(v)) return true; // fe80::/10 link local
  if (/^ff[0-9a-f]{2}:/.test(v)) return true; // multicast
  if (/^2001:0?db8:/.test(v)) return true; // documentation
  return false;
}

/* ------------------------------------------------------------ robots.txt */

type Rule = { allow: boolean; path: string };
type Group = { agents: string[]; rules: Rule[] };

/** Groups in file order. Consecutive user-agent lines share one group. */
export function parseRobots(txt: string): Group[] {
  const groups: Group[] = [];
  let cur: Group | null = null;
  let lastWasAgent = false;
  for (const raw of txt.split(/\r\n|\r|\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim().toLowerCase();
    const val = line.slice(i + 1).trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) {
        cur = { agents: [], rules: [] };
        groups.push(cur);
      }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else if (key === "allow" || key === "disallow") {
      lastWasAgent = false;
      if (!cur) continue; // rules before any user-agent line are ignored
      cur.rules.push({ allow: key === "allow", path: val });
    } else {
      lastWasAgent = false;
    }
  }
  return groups;
}

function patternMatches(pattern: string, path: string): boolean {
  const anchored = pattern.endsWith("$");
  const body = anchored ? pattern.slice(0, -1) : pattern;
  const re = body
    .split("*")
    .map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${re}${anchored ? "$" : ""}`).test(path);
}

export type Verdict = { allowed: boolean; group: string; rule: string | null };

/**
 * Whether `token` may fetch `path`. The group naming the token wins over `*`;
 * groups naming the same agent are merged. Within the group the longest
 * matching rule wins, and allow wins a tie.
 */
export function evaluate(groups: Group[], token: string, path = "/"): Verdict {
  const t = token.toLowerCase();
  let picked = groups.filter((g) => g.agents.includes(t));
  let groupName = token;
  if (!picked.length) {
    picked = groups.filter((g) => g.agents.includes("*"));
    groupName = "*";
  }
  if (!picked.length) return { allowed: true, group: "none", rule: null };
  const rules = picked.flatMap((g) => g.rules);
  let best: Rule | null = null;
  for (const r of rules) {
    if (r.path === "") continue; // "Disallow:" with no path allows everything
    if (!patternMatches(r.path, path)) continue;
    const len = r.path.replace(/\$$/, "").length;
    const bestLen = best ? best.path.replace(/\$$/, "").length : -1;
    if (len > bestLen || (len === bestLen && r.allow && best && !best.allow)) best = r;
  }
  if (!best) return { allowed: true, group: groupName, rule: null };
  return {
    allowed: best.allow,
    group: groupName,
    rule: `${best.allow ? "Allow" : "Disallow"}: ${best.path}`,
  };
}

/* ------------------------------------------------------------ homepage */

export type PageRead = {
  title: string | null;
  textChars: number;
  noindexMeta: boolean;
};

/** What a crawler that doesn't run JavaScript sees in the raw HTML. */
export function readHtml(html: string): PageRead {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() || null;
  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  const noindexMeta = metas.some(
    (m) =>
      /name\s*=\s*["']?(robots|googlebot)["']?/i.test(m) && /content\s*=\s*["'][^"']*noindex/i.test(m)
  );
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html)
    .replace(/<(script|style|svg|template|noscript)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { title, textChars: body.length, noindexMeta };
}

/** Below this, the page is mostly empty until JavaScript runs. */
export const THIN_TEXT = 400;
