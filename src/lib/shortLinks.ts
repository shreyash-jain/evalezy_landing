/** A short link set on the health dashboard: <site>/<code> opens the home page with this source and campaign. */
export type ShortLink = { code?: string | null; source?: string | null; campaign?: string | null };

/** Same rule as the dashboard: one path part, lowercase letters, numbers and -. */
const CODE = /^[a-z0-9][a-z0-9-]{0,29}$/;

const clean = (value: string | null | undefined) => (value ?? "").trim().toLowerCase();

/** The code a path would be ("/ig/" -> "ig"), or null when it cannot be a short link. */
export function shortLinkCode(pathname: string): string | null {
  const code = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  return CODE.test(code) ? code : null;
}

/** Where a short link opens ("/?utm_source=…&utm_campaign=…"), or null when the path is none of the links. */
export function shortLinkTarget(pathname: string, links: ShortLink[] | null | undefined): string | null {
  const code = shortLinkCode(pathname);
  if (!code) return null;
  const link = (links ?? []).find((l) => clean(l?.code) === code);
  const source = clean(link?.source);
  if (!source) return null;
  const q = new URLSearchParams({ utm_source: source });
  const campaign = clean(link?.campaign);
  if (campaign) q.set("utm_campaign", campaign);
  return `/?${q}`;
}
