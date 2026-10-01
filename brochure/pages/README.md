# Brochure page spec (read fully before building a page)

The Evalezy brochure is 16 A4 pages, built from `pages/NN-slug.html` fragments, rendered by Chrome into one PDF.
Audience: principals, school owners, coaching-institute owners, exam heads, university faculty and edtech product
teams deciding whether to try Evalezy. It must look like a premium, designed product brochure, not a web page.

## Look and feel (copy the two reference pages)
- **`01-cover.html`** (ink cover) and **`04-checked-copy.html`** (paper interior page) set the visual language.
  Render them (`node build.mjs --only 01`, `--only 04`) and look at `out/png/preview-01-1.png`, `preview-04-1.png` before you start.
- Brand: paper `#FBF9F4`, blue-black ink `#0F1A3A`, red pen `#D61C28` (the exact ink Evalezy's annotator draws with),
  ballpoint blue `#2A44A8` for "student writing", highlighter yellow for `.marker`. Fonts: Bricolage (display),
  Inter (body), Kalam (handwritten red-pen accents: `.hand`), JBMono (code).
- Motifs: red-pen underline (`.u` + svg, see 01), red loop/circle (`.circ`), ruled notebook paper (`.ruled-bg`,
  `.ruled-faint`, `.margin-rule`), red ticks (`ul.ticks`), Kalam annotations with hand-drawn arrows. Use them with
  restraint: one strong motif per page.
- Rhythm: vary page backgrounds across the brochure (paper / white / ink). Ink pages: `<section class="page ink">`.
- Every interior page has the header + footer below; page number in the footer = its NN. The cover (01) and
  back cover (16) have none.
- Visual density: each page has ONE clear headline (`.h1` 30–34pt or `.h2`), a short lede, and a strong visual
  (real copy image, UI capture, diagram, big numbers, table). Body text 8.5–10pt; never below 6.8pt.
  Generous whitespace. Align to the 16 mm side margins.

## Page frame
```html
<section class="page" data-name="short name">            <!-- add "white" or "ink" for other backgrounds -->
  <header class="pg-head">
    <span class="mark"><img src="assets/img/logo-mark.svg" alt="" /> Evalezy</span>
    <span class="sec">Section label</span>                 <!-- Kalam, red: e.g. "How it works" -->
  </header>
  <div class="pg-body"> … </div>                         <!-- everything must fit inside this -->
  <footer class="pg-foot"><span>Evalezy · AI answer sheet checking</span><span class="num">NN</span></footer>
</section>
```
Page-specific CSS: put a `<style>` block inside your fragment and prefix every selector with `.p-NN` (add class `p-NN`
to your section). Never edit `brochure.css` or another page's file.

## Classes (brochure.css)
Type: `.eyebrow .display .h1 .h2 .h3 .h4 .lede .muted .small .tiny .hand .hand-ink .mono .marker`.
Layout: `.row .col .grow .grid2 .grid3 .grid4 .center .end .mt1…mt6 .auto`.
Components: `.card` (`.tight`, `.ink`, `.pen`), `.shadow`, `.paper-shot` (photo of paper with shadow), `.chip`
(`.ok .warn .pen .ghost`), `.icon-badge`, `.num-badge` (`.pen`), `ul.ticks`, `ul.crosses`, `.stat` (`.v` + `.k`),
`table.t` inside `.table-wrap` (`td.num` for numbers), `.code` + `.code-label` (spans `.k .s .c .n` for colour),
`.method` (`.get .post .put`), `.pin` (numbered dot over an image, position with left/top %), `.divider`, `.figcap`.
Icons: `<i data-icon="scan-line" class="…"></i>` → inlined lucide SVG (names: node_modules/lucide-static/icons/*.svg);
size it with font-size, e.g. inside `.icon-badge`.

## Assets (paths relative to brochure/)
Real checked copy (the product's actual output, a Class IX Social Science half-yearly mock, 38/80, phone photo,
no student name anywhere on it):
- `assets/img/page-1-print.jpg` … `page-7-print.jpg` (2000×2667, 3:4) and small `page-N-sm.webp` (560×747)
- crops: `crop-crosses.webp` 1400×357 (three crosses with correct answers, 0/1s), `crop-long.webp` 1400×434 (0.5/3 +
  note), `crop-partial.webp` 1400×739 (1.5/2 + note, 2/2 "Good."), `crop-score.webp` 1280×296 (title + circled 38/80),
  `crop-steps.webp` 1400×188 (3.5/5 + note)
- Page notes: p1 Section A one-mark answers, crosses with corrections, total 38/80 circled; p2 rest of Section A then
  Section B: 1.5/2 with note, 2/2 "Good."; p3 weather vs climate table 2/2, one feature of two (1/2), muddled example
  1.5/2; p4 why study social science 1.5/3 + note, atmosphere answer begins; p5 atmosphere 3/3, factors of climate
  0.5/3 + note; p6 economic problems 3.5/5 + note, case-based 2.5/5 with missing part flagged; p7 last answer 5/5.
UI captures of the real product screens (3× PNG, transparent corners, fictional student names):
- `assets/ui/bulk-panel.png` 1764×1752 (Bulk AI check: 200 copies, 186 checked, matched/no match/ambiguous rows)
- `assets/ui/upload-dialog.png` 1710×1497 (upload 200 PDFs, 3 copies · 21 pages · ₹21)
- `assets/ui/rubric.png` 1710×1188 (Q30 marking scheme: 3 criteria adding to 3, AI draft / your scheme)
- `assets/ui/review.png` 1710×1503 (teacher review: Q30 0.5/3 answer as read + feedback; Q21 edited 1.5/2; Release result)
- `assets/ui/paper-import.png` 1710×1155 (question paper → 38 questions found, 80 marks)
- `assets/ui/typed.png` 1710×1317 (typed email graded on format/content/organisation/language, 4/5)
- `assets/ui/score-vs-copy.png` 3648×1368 (left: score table "what most AI graders return"; right: crops)
Brand: `assets/img/logo.svg` (dark), `logo-white.svg`, `logo-mark.svg`. QR codes: `assets/img/qr-demo.svg`
(→ evalezy.com/demo), `assets/img/qr-sample.svg` (→ evalezy.com/sample).
Client logos: `assets/clients/*` (25 files; names and pixel sizes in ../src/content/clients.ts, but paths here are
`assets/clients/<file>`; elevate is `elevate-wordmark.jpg`). Many are JPGs with white backgrounds: place them only on
white tiles. FRAMING RULE: these are **Vacademy's** customers (the platform Evalezy is part of), NOT confirmed Evalezy
users. Always say so, e.g. "Evalezy is built by the team behind Vacademy, the learning platform used by schools,
online academies and training institutes across 5 countries." Never "our customers", never next to results.

## Facts (non-negotiable)
- Every claim about Evalezy must come from `../docs/PRODUCT_FACTS.md`. Reuse wording from the website copy in
  `../src/content/*.ts` and `../src/app/**/page.tsx` (it was audited against the same file).
- Obey the "Never claim" list: no accuracy %, no diagram grading, no tested Hindi grading, no certifications, no
  Evalezy customers/testimonials, no free trial, no throughput beyond the stated figures.
- Price: ₹1 per page checked in India (excl. GST), $0.01 elsewhere; failed, stopped and unreadable copies free; reading
  names free; re-check billed again; API same price; Volume = custom (talk to us).
- The API is "enabled per account; request access". Endpoints only from `../src/content/api.ts`.
- Any outside fact (e.g. a CBSE rule) must be verified today against the primary source and cited in a footnote
  (`.tiny .muted` at the bottom of the page: "Source: …, read 1 Oct 2026").
- Contact: hello@evalezy.com · WhatsApp +91 99933 36616 · evalezy.com · demo at evalezy.com/demo.

## Build and self-check (mandatory)
- `cd /Volumes/shreyash_ex/Vacademy/evalezy_landing/brochure && node build.mjs --only NN` → prints overflow/clipping
  issues and writes `out/png/preview-NN-1.png` (one PNG per <section>). Fix every issue it prints.
- LOOK at your PNG with the Read tool after every change. Check: nothing overlaps, nothing is cut off, text is not too
  small, images not stretched (keep aspect ratios), the page is balanced (no big accidental empty areas, no cramming),
  and it looks consistent with 01 and 04.
- Do not run `node build.mjs` without `--only` (that builds the whole PDF; the coordinator does that).
