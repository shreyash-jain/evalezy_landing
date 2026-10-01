# Evalezy brochure (16-page A4 PDF)

The PDF is `Evalezy-Brochure.pdf`. Rebuild it from source when the product, the prices or the copy change.

    cd brochure
    npm install                 # once: puppeteer-core + lucide-static (uses the system Chrome)
    node build.mjs --only 07    # one page → out/png/preview-07-1.png + overflow/clipping report
    node build.mjs              # all pages → out/Evalezy-Brochure.pdf + out/png/NN.png

Then copy `out/Evalezy-Brochure.pdf` here and stamp the metadata (see the pypdf snippet in the git history, or just copy).

- Pages: `pages/NN-slug.html`, one `<section class="page">` each. The rules for building a page are in
  `pages/README.md`, and the design system is in `brochure.css`. The fonts are static instances, so the PDF embeds
  TrueType rather than Type 3.
- Facts: every claim traces to `../docs/PRODUCT_FACTS.md`.
- Before sending it out, two owner decisions are still open:
  - The brochure sells ₹1 per page, but the dashboard still bills per question.
  - The API pages describe the proposed public contract.
- Page 14 says openly that the sample copy has one AI slip: Q17 on page 2 was crossed although the answer is right.
  If you would rather use a different sample copy, replace `assets/img/page-*` and update pages 01, 04, 05, 13 and 14.
- The QR codes (`assets/img/qr-*.svg`) point to evalezy.com/demo and /sample, tagged `utm_source=brochure&utm_medium=pdf`.

## Two print gotchas, already handled in the build

- **An image that crosses the page's bottom edge vanishes from the PDF.** When Chrome prints, it pushes the whole
  image onto the next page, where it gets clipped. The screen PNGs still look fine, so `build.mjs` now flags it.
  The cover's rotated copies are therefore one flattened image, `assets/img/cover-stack.jpg`, which ends exactly
  at the page edge. If you move the cover art, rebuild that image: screenshot the stack at DPR 3 with the text
  hidden, crop it to the page, and place it with `right:0; bottom:0`.
- **Variable fonts embed as Type 3.** The CSS therefore uses the static `assets/fonts/*-NNN.ttf` instances.
  Check with `pdffonts Evalezy-Brochure.pdf`: only brand fonts should be listed, all of them CID TrueType.
- **No soft masks.** A blurred `box-shadow`, any `filter`, `mask-image` or `backdrop-filter` makes Chrome print a
  soft-masked layer. Some PDF viewers (the one in the owner's editor, 1 Oct 2026) ignore the mask and paint a solid
  grey box over the page. Use the crisp shadow tokens `--lift`, `--sheet` and `--lift-ink` from `brochure.css`;
  `build.mjs` flags anything else. To check a PDF, `python3 /tmp/smask_audit.py`-style: count `/SMask` in
  ExtGStates, which should be 0.
