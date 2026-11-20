// After the build: add the short links set on the health dashboard (Products → Evalezy → Short links)
// to out/_redirects, so <site>/<code> answers with a server redirect that link previews follow.
// A link saved after this build still works through the 404 page (src/components/ShortLinkRedirect.tsx).
// If the API cannot be reached, no short link is added and the build goes on.
import { appendFileSync, existsSync } from "node:fs";

const OFFER = "https://backend-stage.vacademy.io/admin-core-service/public/product/v1/evalezy/offer";
const OUT = new URL("../out/", import.meta.url);
const CODE = /^[a-z0-9][a-z0-9-]{0,29}$/;
const UTM_VALUE = /^[a-z0-9][a-z0-9_.-]{0,59}$/;

let links = [];
try {
  const res = await fetch(OFFER, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${res.status} ${OFFER}`);
  const offer = await res.json();
  links = Array.isArray(offer.short_links) ? offer.short_links : [];
} catch (e) {
  console.warn(`short links: none added, the offer API failed (${e.message})`);
}

const lines = [];
const skipped = [];
for (const link of links) {
  const code = String(link?.code ?? "").trim().toLowerCase();
  const source = String(link?.source ?? "").trim().toLowerCase();
  const campaign = String(link?.campaign ?? "").trim().toLowerCase();
  if (!CODE.test(code) || !UTM_VALUE.test(source) || (campaign && !UTM_VALUE.test(campaign))) {
    skipped.push(`${code || "?"} (not a valid link)`);
    continue;
  }
  // A page of the site keeps its address: the redirect would hide it.
  if (existsSync(new URL(code, OUT)) || existsSync(new URL(`${code}.html`, OUT))) {
    skipped.push(`${code} (a page of the site)`);
    continue;
  }
  const to = `/?utm_source=${encodeURIComponent(source)}${campaign ? `&utm_campaign=${encodeURIComponent(campaign)}` : ""}`;
  lines.push(`/${code}  ${to}  302`, `/${code}/  ${to}  302`);
}

try {
  if (lines.length) {
    appendFileSync(new URL("_redirects", OUT), `\n# Short links from the health dashboard (scripts/short-links.mjs)\n${lines.join("\n")}\n`);
  }
  console.log(`short links: ${lines.length / 2} added${skipped.length ? `, skipped: ${skipped.join(", ")}` : ""}`);
} catch (e) {
  // Never stop a deploy over short links: they still work through the 404 page.
  console.warn(`short links: none added, out/_redirects could not be written (${e.message})`);
}
