import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/ui";
import { SALES_EMAIL, SITE, findPage } from "@/lib/site";
import { LANDSCAPE_CSV, LANDSCAPE_SLUG, OTHERS, RESEARCH_UPDATED, VENDORS, withAll } from "./data/landscape";

export const metadata = pageMetadata("/research/");

const REPORTS = [
  {
    href: `/research/${LANDSCAPE_SLUG}/`,
    title: "AI Answer Sheet Evaluation Landscape 2026",
    summary: `${VENDORS.length} AI copy-checking, on-screen marking, scan-and-grade, AI grading and OMR tools from India and abroad, scored on 14 capabilities and mapped by marking depth and exam-workflow coverage.`,
    stat: `${withAll(["handwritten_reading", "subjective_ai_marking", "bulk_scan_ingest", "student_identification"]).length} of ${OTHERS.length}`,
    statLabel: "tools document the full scan pipeline, from reading handwriting to identifying the student",
  },
];

export default function Page() {
  const page = findPage("/research/")!;
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/research/#collection`,
    name: page.title,
    description: page.description,
    url: `${SITE}/research/`,
    publisher: { "@id": `${SITE}/#org` },
    dateModified: RESEARCH_UPDATED,
    hasPart: REPORTS.map((r) => ({ "@id": `${SITE}${r.href}#report` })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <div className="wrap max-w-4xl pb-20 pt-10 md:pt-14">
        <Breadcrumbs items={[{ label: "Research" }]} />
        <p className="eyebrow mt-8">Evalezy Research</p>
        <h1 className="h-display mt-3 text-[2.2rem] text-ink md:text-[3rem]">Research on how answer sheets get checked</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          Sourced data on the tools schools, coaching institutes, universities and exam boards use to check student answers:
          what each one documents, what it costs and where the gaps are. Every figure links to its source and the data is
          free to download under CC BY 4.0.
        </p>

        <ul className="mt-10 grid gap-4">
          {REPORTS.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group grid gap-5 rounded-2xl border border-line bg-white p-6 transition hover:border-ink/30 md:grid-cols-[1fr_200px] md:p-8">
                <div>
                  <h2 className="h-card text-2xl text-ink group-hover:text-pen-700">{r.title}</h2>
                  <p className="mt-3 leading-relaxed text-slate-600">{r.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pen-700">
                    Read the report <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
                <div className="border-t border-line pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <div className="h-display text-3xl text-ink">{r.stat}</div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{r.statLabel}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm leading-relaxed text-slate-500">
          Evalezy sells AI answer-sheet checking, so it is one of the vendors in this market; it is scored with the same rubric
          as everyone else. Dataset: <a href={LANDSCAPE_CSV} download className="underline underline-offset-2 hover:text-pen-700">CSV</a>.
          Corrections with a source are welcome at{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="underline underline-offset-2 hover:text-pen-700">{SALES_EMAIL}</a>.
        </p>
      </div>
    </main>
  );
}
