import type { Metadata } from "next";
import Link from "next/link";
import ResearchShell, { type Source } from "@/components/research/ResearchShell";
import { FaqList } from "@/components/ui";
import { BEST_FAQS, BEST_PATH, BEST_PUBLISHED, BEST_UPDATED, PICKS } from "@/content/bestTools";
import { findVendorComparison } from "@/content/comparisons";
import {
  ALL_CAPS, CAP_LABELS, LANDSCAPE_SLUG, OTHERS, SEGMENT_LABELS, VENDORS, capCount, formatEntryPrice, primarySource,
  type CapKey, type Vendor,
} from "@/app/research/data/landscape";
import { SITE } from "@/lib/site";

const TITLE = "Best AI Copy Checking Software in 2026: 10 Tools for Handwritten Answer Sheets";
const URL = `${SITE}${BEST_PATH}`;
const DESCRIPTION =
  "The best AI copy checking and answer sheet evaluation software in 2026, one pick per job: schools, coaching, UPSC, universities, boards and edtech. Sourced capabilities and prices.";

export const metadata: Metadata = {
  title: "Best AI Copy Checking Software in 2026 (Answer Sheets)",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "article", url: URL, title: TITLE, description: DESCRIPTION, images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
};

/** The columns of the at-a-glance table: the jobs that decide whether a tool can check a real exam. */
const TABLE_CAPS: CapKey[] = [
  "handwritten_reading", "subjective_ai_marking", "stem_maths", "bulk_scan_ingest", "student_identification",
  "annotated_copy", "teacher_review", "indian_languages", "public_api",
];

const GLYPH = { yes: "●", partial: "◐", no: "○", unknown: "–" } as const;
const WORD = { yes: "Yes", partial: "Partly", no: "No", unknown: "Not documented" } as const;

function vendor(name: string): Vendor {
  const v = VENDORS.find((x) => x.name === name);
  if (!v) throw new Error(`Best tools: ${name} missing from landscape.json`);
  return v;
}

const anchor = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/** formatEntryPrice, but a free tier with no published paid price reads as "Free tier", not "Not published". */
const price = (v: Vendor) => {
  const f = formatEntryPrice(v);
  return f === "Not published" && v.pricing.free_plan ? "Free tier" : f;
};
const where = (v: Vendor) => (v.region === "global" ? v.hq ?? "Global" : "India");

export default function Page() {
  const picks = PICKS.map((p) => ({ ...p, v: vendor(p.name) }));
  const evalezy = picks[0].v;
  const considered = OTHERS.filter((v) => !PICKS.some((p) => p.name === v.name));
  const sources: Source[] = picks.map((p, i) => ({
    id: String(i + 1),
    title: `${p.name}: product, help and pricing pages`,
    publisher: p.v.region === "evalezy" ? "Evalezy (self-assessed)" : p.v.company && p.v.company !== p.name ? `${p.name} (${p.v.company})` : p.name,
    url: primarySource(p.v),
    type: "Vendor" as const,
  }));

  const itemList = {
    "@type": "ItemList",
    "@id": `${URL}#list`,
    name: "Best AI copy checking software in 2026",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: picks.length,
    itemListElement: picks.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.name}: best for ${p.bestFor.charAt(0).toLowerCase()}${p.bestFor.slice(1)}`,
      url: p.v.region === "evalezy" ? SITE : p.v.website,
    })),
  };

  return (
    <ResearchShell
      slug="best-ai-copy-checking-software"
      path={BEST_PATH}
      kind="Article"
      crumb="Best AI copy checking software"
      crumbs={[{ label: "Compare", href: "/compare/" }, { label: "Best AI copy checking software" }]}
      eyebrow="Buyer's guide · Updated October 2026"
      title={TITLE}
      dek={`For checking a class's or an exam's handwritten answer sheets in English, Evalezy is our pick: it documents ${evalezy.breadth} of the 14 capabilities we track, the most of the ${VENDORS.length} tools in our research, from reading handwriting and marking every answer against a scheme to matching each copy to its student and returning it checked in red pen, at a published ₹1 per page. Another tool is the better choice for some jobs: Eklavvya for Indian-language answers, Acadine for coaching institutes that want checking, question papers and analytics in one suite, Gradescope for university courses graded by staff, CoGrader for US essays, Top Marks AI for UK exam-board essays, and an on-screen marking vendor such as Coempt Onmark for human marking at board scale.`}
      published={BEST_PUBLISHED}
      updated={BEST_UPDATED}
      sources={sources}
      extraLd={[itemList]}
    >
      <h2 id="quick-picks">Quick picks</h2>
      <div className="not-prose mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="bg-paper-2 text-ink">
              <th scope="col" className="px-4 py-3 font-semibold">If you need</th>
              <th scope="col" className="px-4 py-3 font-semibold">Pick</th>
              <th scope="col" className="px-4 py-3 font-semibold">Entry price</th>
              <th scope="col" className="px-4 py-3 text-center font-semibold">Of 14</th>
            </tr>
          </thead>
          <tbody>
            {picks.map((p) => (
              <tr key={p.name} className={`border-t border-line align-top ${p.v.region === "evalezy" ? "bg-pen-50" : ""}`}>
                <td className="px-4 py-3 text-slate-700">{p.bestFor}</td>
                <td className="px-4 py-3 font-semibold text-ink"><a href={`#${anchor(p.name)}`} className="hover:text-pen-700">{p.name}</a></td>
                <td className="px-4 py-3 text-slate-600">{price(p.v)}</td>
                <td className="px-4 py-3 text-center font-semibold text-ink">{p.v.breadth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        &ldquo;Of 14&rdquo; counts the capabilities each tool documents publicly (native = 1, partial = 0.5), from
        our <Link href={`/research/${LANDSCAPE_SLUG}/`}>AI Answer Sheet Evaluation Landscape 2026</Link>. It measures how
        much of the job a tool covers, not how accurately it marks.
      </p>

      <h2 id="what-copy-checking-means">What &ldquo;copy checking&rdquo; means here</h2>
      <p>
        In Indian schools a &ldquo;copy&rdquo; is a student&apos;s answer sheet or exam notebook, and copy checking means
        marking it. This guide covers software that checks students&apos; written answers: it reads the handwriting, awards
        marks per question and returns feedback. It is not about plagiarism or AI-content checkers, which answer a different
        question (who wrote this?), though a few tools below include them.
      </p>

      <h2 id="how-we-chose">How we chose</h2>
      <ul>
        <li>We started from the {VENDORS.length} tools in our landscape research and kept the ones that check written answers, plus one bubble-sheet tool as the budget pick for multiple choice.</li>
        <li>We picked one tool per job (the reader it fits best), then ordered the list by how much of the checking job each documents.</li>
        <li>Every capability and price comes from the vendor&apos;s own pages, read in October 2026 and linked in the sources. Anything not documented counts as not documented.</li>
        <li>We did not test any tool&apos;s accuracy, including Evalezy&apos;s. Run a sample of your own copies through any tool before you buy; the <Link href="/blog/ai-answer-sheet-evaluation-buyers-guide/">12 questions to ask a vendor</Link> help.</li>
      </ul>

      <h2 id="the-list">The 10 best AI copy checking tools in 2026</h2>
      {picks.map((p, i) => {
        const yes = ALL_CAPS.filter((k) => p.v.capabilities[k].value === "yes");
        const partly = ALL_CAPS.filter((k) => p.v.capabilities[k].value === "partial");
        const cmp = p.compare ? findVendorComparison(p.compare) : undefined;
        return (
          <section key={p.name} id={anchor(p.name)} className="not-prose mt-10 scroll-mt-24 rounded-2xl border border-line bg-white p-6 md:p-8">
            <p className="eyebrow">{SEGMENT_LABELS[p.v.segment] ?? p.v.segment} · {where(p.v)}</p>
            <h3 className="h-card mt-2 text-2xl text-ink">
              {i + 1}. {p.name}: best for {p.bestFor.charAt(0).toLowerCase()}{p.bestFor.slice(1)}
            </h3>
            <p className="mt-4 leading-relaxed text-slate-700">{p.summary}</p>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="font-semibold text-ink">Entry price</dt>
                <dd className="mt-1 text-slate-600">{price(p.v)}{p.v.pricing.free_plan && price(p.v) !== "Free tier" ? " · free plan" : ""}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Capabilities documented</dt>
                <dd className="mt-1 text-slate-600">{p.v.breadth} of 14</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Made for</dt>
                <dd className="mt-1 text-slate-600">{p.v.target}</dd>
              </div>
            </dl>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-ink">Documents</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {yes.map((k) => <li key={k} className="rounded-full bg-paper-2 px-2.5 py-1 text-xs text-ink">{CAP_LABELS[k]}</li>)}
                  {partly.map((k) => <li key={k} className="rounded-full border border-line px-2.5 py-1 text-xs text-slate-600">{CAP_LABELS[k]} (partly)</li>)}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Worth knowing</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
                  {p.watch.map((w) => <li key={w}>{w}</li>)}
                </ul>
              </div>
            </div>
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href={`#src-${i + 1}`} className="font-semibold text-pen-700 underline underline-offset-2">Source [{i + 1}]</a>
              {p.v.region === "evalezy" ? (
                <>
                  <Link href="/sample/" className="font-semibold text-pen-700 underline underline-offset-2">See a real checked copy</Link>
                  <Link href="/pricing/" className="font-semibold text-pen-700 underline underline-offset-2">Pricing</Link>
                </>
              ) : (
                <a href={p.v.website} rel="noopener" target="_blank" className="font-semibold text-pen-700 underline underline-offset-2">{p.name} website</a>
              )}
              {cmp && <Link href={`/compare/${cmp.slug}/`} className="font-semibold text-pen-700 underline underline-offset-2">Evalezy vs {p.name}</Link>}
              {p.seeAlso && <Link href={p.seeAlso.href} className="font-semibold text-pen-700 underline underline-offset-2">{p.seeAlso.label}</Link>}
            </p>
          </section>
        );
      })}

      <h2 id="at-a-glance">The 11 tools at a glance</h2>
      <p>● documented · ◐ partly (add-on, beta, some question types or an integration) · ○ not offered · – not documented publicly.</p>
      <div className="not-prose mt-6 overflow-x-auto rounded-2xl border border-line bg-white" tabIndex={0} role="region" aria-label="Capabilities of the 11 tools">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line align-bottom">
              <th scope="col" className="sticky left-0 z-10 bg-white p-3 font-semibold text-ink">Tool</th>
              {TABLE_CAPS.map((k) => <th key={k} scope="col" className="p-2 text-center text-xs font-semibold text-slate-600">{CAP_LABELS[k]}</th>)}
              <th scope="col" className="p-2 text-xs font-semibold text-ink">Price</th>
            </tr>
          </thead>
          <tbody>
            {picks.map((p) => {
              const us = p.v.region === "evalezy";
              return (
                <tr key={p.name} className={`border-b border-line/70 ${us ? "bg-pen-50" : ""}`}>
                  <th scope="row" className={`sticky left-0 z-10 p-3 font-medium text-ink ${us ? "bg-pen-50" : "bg-white"}`}>{p.name}</th>
                  {TABLE_CAPS.map((k) => {
                    const c = p.v.capabilities[k];
                    return (
                      <td key={k} className="p-2 text-center text-base text-ink" title={`${CAP_LABELS[k]}: ${WORD[c.value]}${c.evidence ? ` (${c.evidence})` : ""}`}>
                        <span aria-hidden="true">{GLYPH[c.value]}</span>
                        <span className="sr-only">{WORD[c.value]}</span>
                      </td>
                    );
                  })}
                  <td className="p-2 text-xs text-slate-600">{price(p.v)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="what-to-look-for">What to look for in AI copy checking software</h2>
      <ul>
        <li><strong>It reads real handwriting, not only bubbles.</strong> {capCount("handwritten_reading")} of the {OTHERS.length} other tools in our research document reading handwritten answers natively.</li>
        <li><strong>It marks against your scheme, per question, with reasons.</strong> Half marks and a written reason per answer make a mark checkable. See <Link href="/blog/how-to-write-a-marking-scheme/">how to write a marking scheme</Link>.</li>
        <li><strong>It knows whose copy it is.</strong> Only {capCount("student_identification")} of {OTHERS.length} document identifying the student natively; without it someone sorts 200 copies by hand.</li>
        <li><strong>Students get their copy back, marked.</strong> {capCount("annotated_copy")} of {OTHERS.length} return the student&apos;s own sheet marked up. A score table teaches less than a red cross next to the line that lost the mark.</li>
        <li><strong>A teacher has the last word.</strong> {capCount("teacher_review")} of {OTHERS.length} document a review step. Marks should stay drafts until a person releases them.</li>
        <li><strong>The price is per unit you can count.</strong> Per page or per copy is easier to budget than per seat when test volumes swing.</li>
      </ul>

      <h2 id="also-considered">Also in our research</h2>
      <p>
        {considered.map((v) => v.name).join(", ")}. Each is scored, with sources, in the{" "}
        <Link href={`/research/${LANDSCAPE_SLUG}/#matrix`}>full capability matrix</Link>, and the data is a free CSV.
      </p>

      <h2 id="faq">Frequently asked questions</h2>
      <div className="not-prose mt-6">
        <FaqList faqs={BEST_FAQS} />
      </div>
      <p>
        Related: <Link href="/compare/">all comparisons</Link> · <Link href="/side-by-side/">one copy checked by a teacher and by Evalezy</Link> ·{" "}
        <Link href="/compare/chatgpt/">can ChatGPT check answer sheets?</Link> · <Link href="/demo/">try Evalezy on your own copies</Link>
      </p>
    </ResearchShell>
  );
}
