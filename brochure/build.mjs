// Builds the Evalezy brochure from pages/*.html (each file holds one or more <section class="page">).
//
//   node build.mjs              → out/evalezy-brochure.html, out/Evalezy-Brochure.pdf, out/png/NN.png, overflow report
//   node build.mjs --only 04    → out/preview-04.html + out/png/preview-04-*.png + overflow report (no PDF)
//
// Icons: write <i data-icon="search"></i> (any lucide name, optional class="…") and the build inlines the SVG.
// Overflow report: flags any element that pokes outside its page (add data-bleed to allow it), a .pg-body whose
// content runs past it, and any element that clips its own content (overflow hidden with hidden content).
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "out");
const PNG = join(OUT, "png");
mkdirSync(PNG, { recursive: true });

const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;
const scale = Number(process.env.PNG_SCALE || 1.5);

const files = readdirSync(join(ROOT, "pages"))
  .filter((f) => /^\d\d.*\.html$/.test(f))
  .filter((f) => !only || f.startsWith(only))
  .sort();
if (!files.length) throw new Error(`No pages match ${only}`);

const ICON_DIR = join(ROOT, "node_modules/lucide-static/icons");
function inlineIcons(html) {
  return html.replace(/<i data-icon="([a-z0-9-]+)"([^>]*)><\/i>/g, (_, name, rest) => {
    const file = join(ICON_DIR, `${name}.svg`);
    if (!existsSync(file)) throw new Error(`Unknown icon "${name}" (see node_modules/lucide-static/icons)`);
    const cls = (rest.match(/class="([^"]*)"/) || [])[1] || "";
    return readFileSync(file, "utf8")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<svg([^>]*)class="[^"]*"/, "<svg$1")
      .replace("<svg", `<svg aria-hidden="true" class="lucide ${cls}"`)
      .replace(/\s+width="24"/, "")
      .replace(/\s+height="24"/, "")
      .trim();
  });
}

const body = files.map((f) => `<!-- ${f} -->\n` + inlineIcons(readFileSync(join(ROOT, "pages", f), "utf8"))).join("\n");
const html = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8" />
<title>Evalezy: AI answer sheet checking in a teacher's red pen</title>
<meta name="author" content="Evalezy (Vidyayatan Technologies LLP)" />
<link rel="stylesheet" href="brochure.css" />
<style>.lucide { width: 1em; height: 1em; stroke-width: 2; }</style>
</head>
<body>
${body}
</body>
</html>`;
const htmlName = only ? `out/preview-${only}.html` : "out/evalezy-brochure.html";
// The HTML lives in out/ but references ../ assets, so write a copy at the root for correct relative paths.
const rootHtml = join(ROOT, only ? `.preview-${only}.html` : ".brochure.html");
writeFileSync(rootHtml, html);
writeFileSync(join(ROOT, htmlName), html.replace('href="brochure.css"', 'href="../brochure.css"').replaceAll('src="assets/', 'src="../assets/').replaceAll('url("assets/', 'url("../assets/'));

const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars", "--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: 1000, height: 1200, deviceScaleFactor: scale });
await page.goto("file://" + rootHtml, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

// Overflow / clipping report
const report = await page.evaluate(() => {
  const out = [];
  const pages = [...document.querySelectorAll("section.page")];
  pages.forEach((pg, i) => {
    const pr = pg.getBoundingClientRect();
    const label = `page ${i + 1}${pg.dataset.name ? " (" + pg.dataset.name + ")" : ""}`;
    const body = pg.querySelector(".pg-body");
    if (body && body.scrollHeight > body.clientHeight + 1) out.push(`${label}: .pg-body content is ${body.scrollHeight - body.clientHeight}px taller than the space (runs into the footer)`);
    pg.querySelectorAll("*").forEach((el) => {
      if (el.closest("[data-bleed]")) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const tol = 0.5;
      if (r.right > pr.right + tol || r.bottom > pr.bottom + tol || r.left < pr.left - tol || r.top < pr.top - tol) {
        out.push(`${label}: <${el.tagName.toLowerCase()} class="${(el.className.baseVal ?? el.className).toString().slice(0, 50)}"> sticks out of the page (${Math.round(r.left - pr.left)},${Math.round(r.top - pr.top)} ${Math.round(r.width)}x${Math.round(r.height)})`);
      }
      const cs = getComputedStyle(el);
      if ((cs.overflow === "hidden" || cs.overflowY === "hidden" || cs.overflowX === "hidden") && !el.matches("section.page, .paper-shot, img, svg") && !el.hasAttribute("data-clip-ok")) {
        if (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2) out.push(`${label}: <${el.tagName.toLowerCase()} class="${el.className.toString().slice(0, 50)}"> clips its content (${el.scrollWidth}x${el.scrollHeight} in ${el.clientWidth}x${el.clientHeight})`);
      }
    });
    // In print, an image that crosses the page's bottom edge is pushed whole onto the next page (and clipped
    // away there), even inside data-bleed. Flatten such art into an in-page image instead (see 01-cover.html).
    pg.querySelectorAll("img").forEach((im) => { const r = im.getBoundingClientRect(); if (r.bottom > pr.bottom + 0.5) out.push(`${label}: image crosses the page bottom by ${Math.round(r.bottom - pr.bottom)}px and will vanish in the PDF: ${im.getAttribute("src")}`); });
    // Images that failed to load
    pg.querySelectorAll("img").forEach((im) => { if (!im.complete || !im.naturalWidth) out.push(`${label}: image failed to load: ${im.getAttribute("src")}`); });
  });
  return { pages: pages.length, issues: out };
});

// PNG per page
const handles = await page.$$("section.page");
for (let i = 0; i < handles.length; i++) {
  const name = only ? `preview-${only}-${i + 1}.png` : `${String(i + 1).padStart(2, "0")}.png`;
  await handles[i].screenshot({ path: join(PNG, name) });
}

if (!only) {
  await page.emulateMediaType("print");
  await page.pdf({ path: join(OUT, "Evalezy-Brochure.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
}
await browser.close();

console.log(`pages: ${report.pages} (${files.join(", ")})`);
console.log(report.issues.length ? "ISSUES:\n- " + [...new Set(report.issues)].slice(0, 60).join("\n- ") : "no overflow or clipping found");
console.log(only ? `png: out/png/preview-${only}-*.png` : "pdf: out/Evalezy-Brochure.pdf, png: out/png/NN.png");
