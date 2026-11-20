/**
 * Analytics glue. Everything goes through GTM's dataLayer so triggers are
 * configured there, not here. A visit's source (utm tags, or the site that sent it)
 * is remembered for KEEP_MS and attached to every event, to the lead that reaches
 * the CRM, and to the app's sign-up and demo links.
 */
import { DEMO_URL, SIGNUP_URL } from "./site";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"] as const;
const STORE = "evalezy.utm";
/** People often read a post today and sign up days later. */
const KEEP_MS = 30 * 24 * 60 * 60 * 1000;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>> & { landing?: string };
type Stored = Utm & { at?: number };

/**
 * The name part of a host: "l.instagram.com" -> "instagram", "www.google.co.in" -> "google",
 * "evalezy.vacademy.io" -> "vacademy". Works for any site, so no list of sites is kept.
 */
export function siteName(host: string): string {
  const parts = host.toLowerCase().replace(/\.$/, "").split(".").filter(Boolean);
  if (parts.length < 2) return parts[0] || "";
  const last = parts[parts.length - 1];
  const second = parts[parts.length - 2];
  // A two-part ending such as co.in or com.au: the name is one label further left.
  const twoPartEnding = parts.length > 2 && last.length === 2 && second.length <= 3;
  return parts[parts.length - (twoPartEnding ? 3 : 2)];
}

function save(u: Utm) {
  localStorage.setItem(STORE, JSON.stringify({ ...u, at: Date.now() }));
}

/** A visit without utm tags is credited to the site that linked to it, unless that is this site or the app. */
function fromReferrer(): Utm | null {
  let host: string;
  try {
    host = new URL(document.referrer).hostname;
  } catch {
    return null;
  }
  const name = siteName(host);
  const own = [window.location.hostname, new URL(SIGNUP_URL).hostname, new URL(DEMO_URL).hostname].map(siteName);
  if (!name || own.includes(name)) return null;
  return { utm_source: name, utm_medium: "referral" };
}

/**
 * Runs once per page load. Tags in the URL win and replace an older source; the URL keeps
 * them. A visit without tags keeps the remembered source, else is credited to its referrer.
 */
export function captureUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const url = new URL(window.location.href);
    const found: Utm = {};
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v) found[k] = v.slice(0, 120);
    }
    if (Object.keys(found).length) {
      save({ ...found, landing: url.pathname });
      return getUtm();
    }
    const known = getUtm();
    if (known.utm_source || known.ref) return known;
    const ref = fromReferrer();
    if (ref) save({ ...ref, landing: url.pathname });
    return getUtm();
  } catch {
    return {};
  }
}

export function getUtm(): Utm {
  try {
    const { at, ...u }: Stored = JSON.parse(localStorage.getItem(STORE) || "{}");
    if (!at || Date.now() - at > KEEP_MS) return {};
    return u;
  } catch {
    return {};
  }
}

/** One-line attribution for the CRM note field: "src: <source>/<medium>/<campaign>/<content>". */
export function utmNote(): string {
  const u = getUtm();
  const bits = [u.utm_source || u.ref, u.utm_medium, u.utm_campaign, u.utm_content].filter(Boolean);
  return bits.length ? `src: ${bits.join("/")}` : "";
}

/** The utm tags an app link carries. */
const LINK_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type LinkUtm = Partial<Record<(typeof LINK_UTM)[number], string>>;

/** The visit's utm tags for app links; a ?ref= visit counts as its utm_source. Empty for a direct visit. */
export function appLinkUtm(): LinkUtm {
  const u = getUtm();
  const out: LinkUtm = {};
  for (const k of LINK_UTM) {
    const v = k === "utm_source" ? u.utm_source || u.ref : u[k];
    if (v) out[k] = v;
  }
  return out;
}

/**
 * Adds the visit's utm tags (utm_source, utm_campaign, …) to an app sign-up or demo link.
 * source= stays as the button set it (website, hero, nav): the sign-up keeps both, and the
 * lead shows the tags in its UTM columns. Safe to call again on the same link.
 */
export function tagAppLink(a: HTMLAnchorElement) {
  const href = a.getAttribute("href");
  if (!href || !(href.startsWith(SIGNUP_URL) || href.startsWith(DEMO_URL))) return;
  const utm = appLinkUtm();
  if (!Object.keys(utm).length) return;
  try {
    const url = new URL(href);
    for (const k of LINK_UTM) {
      const v = utm[k];
      if (v) url.searchParams.set(k, v);
      else url.searchParams.delete(k);
    }
    a.setAttribute("href", url.toString());
  } catch {
    /* leave the link as it is */
  }
}

export function tagAppLinks(root: ParentNode = document) {
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(tagAppLink);
}

export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ||= []).push({ event, ...getUtm(), ...props });
}
