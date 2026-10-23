import type { Metadata } from "next";
import Link from "next/link";
import ResearchShell, { KeyStat, type Source } from "@/components/research/ResearchShell";
import { BarChart, DataTable, Figure, LandscapeMap, Legend } from "@/components/research/charts";
import {
  ALL_CAPS, CAP_LABELS, EVALEZY, LANDSCAPE_CSV, LANDSCAPE_SLUG, MARKING_CAPS, OTHERS, RESEARCH_PUBLISHED, RESEARCH_UPDATED,
  SEGMENT_LABELS, VENDORS, WORKFLOW_CAPS, averageBreadth, capCount, formatEntryPrice, landscapeMapPoints, primarySource, withAll,
  type CapKey, type CapValue,
} from "../data/landscape";
import { SITE } from "@/lib/site";

const TITLE = "AI Answer Sheet Evaluation Landscape 2026: 37 Copy-Checking, OSM and AI Grading Tools Compared";
const URL = `${SITE}/research/${LANDSCAPE_SLUG}/`;
const DESCRIPTION =
  "37 AI copy-checking, on-screen marking, scan-and-grade and AI grading tools from India and abroad, scored on 14 capabilities with sources. Map, matrix, CSV.";

export const metadata: Metadata = {
  title: "AI Answer Sheet Evaluation Landscape 2026",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    url: URL,
    title: "AI Answer Sheet Evaluation Landscape 2026 | Evalezy",
    description: "37 tools that check student answers, from India and abroad, mapped on marking depth and exam workflow. Every score sourced.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI Answer Sheet Evaluation Landscape 2026" }],
  },
  twitter: { card: "summary_large_image", title: "AI Answer Sheet Evaluation Landscape 2026", description: DESCRIPTION, images: ["/og.png"] },
};

/** Map labels, placed by hand after looking at the chart so none collide. Every point keeps its tooltip. */
const LABELS: Record<string, "right" | "left" | "above" | "below" | "below-left"> = {
  Eklavvya: "right",
  Gradescope: "above",
  CoGrader: "right",
  "Grade Direct": "left",
  Turnitin: "above",
  Crowdmark: "left",
  "RM Assessor": "left",
  "Coempt Onmark": "above",
  MeritTrac: "right",
  "TCS iON": "right",
  "Smart Paper": "above",
  TimelyGrader: "right",
  CrazyGoldFish: "right",
  Writable: "right",
  "No More Marking": "left",
  ZipGrade: "right",
  GradeCam: "right",
};

/* Curated from the research notes; each item links to its own source. */
const CHANGES: [string, string, string][] = [
  ["Coempt Onmark", "Won CBSE's on-screen marking contract (December 2025) for the 2026 Class 12 evaluation; the rollout drew complaints about scan quality, which Coempt attributed to the scanning stage.", "https://www.theweek.in/news/india/2026/06/18/cbse-osm-controversy-coempt-defense.amp.html"],
  ["TCS iON", "Was the other technically qualified bidder for CBSE's on-screen marking contract; CBSE chose Coempt on price, as reported.", "https://www.sakshipost.com/news/telangana/who-coempt-edu-teck-hyderabad-company-linked-cbse-osm-controversy-480098"],
  ["Excelsoft Saras", "Signed a multi-year deal with the UK exam board AQA (May 2026) to build its next e-marking platform, after a joint AI taskforce on AI-supported marking of handwritten scripts.", "https://cxotoday.com/media-coverage/excelsoft-technologies-and-aqa-partner-to-build-the-future-of-high-stakes-e-marking/"],
  ["Inspera", "Acquired Graide, an AI marking and feedback platform, now sold as Inspera Graide.", "https://inspera.com/press-releases/graide-acquisition/"],
  ["DEXIT Global", "CL Educate closed its acquisition of NSEIT's digital exam business, renamed DEXIT Global, in January 2025.", "https://www.avendus.com/india/newsroom/avendus-capital-advises-nseit-the-digital-examination-dex-business-of-the-national-stock-exchange-of-india-on-its-acquisition-by-cl-educate"],
  ["Extramarks", "Began rolling out its Extra Intelligence suite, including AI evaluation of pen-and-paper tests, to partner schools on 31 July 2025.", "https://www.theweek.in/wire-updates/business/2025/07/31/dcm153-biz-extramarks.html"],
  ["stylus", "Won about £250,000 from the UK Department for Education to develop AI marking of scanned handwritten work with human moderation (reported 28 November 2025).", "https://www.ajbell.co.uk/news/articles/mindflair-portfolio-company-wins-ps250000-ai-government-contract"],
  ["Brisk", "Raised a $15M Series A led by Bessemer Venture Partners (26 March 2025).", "https://vcnewsdaily.com/brisk-teaching/venture-capital-funding/hysyrcbbmj"],
  ["Turnitin", "Launched Turnitin Clarity (4 March 2025), a drafting space with writing playback and optional AI feedback, as a paid Feedback Studio add-on.", "https://www.turnitin.co.uk/press/turnitin-launches-turnitin-clarity-bringing-transparency-and-integrity-insights-to-education"],
  ["Evalezy", "Opened its Evaluation API (v1) to developers on 2 October 2026.", "https://docs.evalezy.com/platform/changelog"],
];

const MARK: Record<CapValue, { glyph: string; text: string; className: string }> = {
  yes: { glyph: "●", text: "Yes", className: "text-ink" },
  partial: { glyph: "◐", text: "Partial", className: "text-slate-600" },
  no: { glyph: "○", text: "No", className: "text-slate-400" },
  unknown: { glyph: "–", text: "Not documented", className: "text-slate-400" },
};

const pct = (n: number, d: number) => `${Math.round((n / d) * 100)}%`;
const names = (list: { name: string }[]) => list.map((v) => v.name).join(", ");

export default function Page() {
  const n = OTHERS.length;
  const sorted = [...VENDORS].sort((a, b) => b.breadth - a.breadth || a.name.localeCompare(b.name));
  const india = OTHERS.filter((v) => v.region === "india");
  const global = OTHERS.filter((v) => v.region === "global");
  const runnerUp = sorted.find((v) => v.region !== "evalezy")!;
  const fullPipeline: CapKey[] = ["handwritten_reading", "subjective_ai_marking", "bulk_scan_ingest", "student_identification"];
  const pipelineVendors = withAll(fullPipeline);
  const annotated = OTHERS.filter((v) => v.capabilities.annotated_copy.value === "yes");
  const indianLang = OTHERS.filter((v) => v.capabilities.indian_languages.value === "yes");
  const publicPricing = OTHERS.filter((v) => v.pricing.public_pricing);
  const osm = OTHERS.filter((v) => v.segment === "osm");
  const osmIndia = osm.filter((v) => v.region === "india");
  const endToEnd = OTHERS.filter((v) => v.marking >= 50 && v.workflow >= 50);

  const segments: [string, (v: (typeof OTHERS)[number]) => boolean, "india" | "global"][] = [
    ["AI copy checking (India)", (v) => v.region === "india" && ["ai-copy-checking", "lms-ai"].includes(v.segment), "india"],
    ["UPSC answer-writing apps", (v) => v.segment === "upsc-answer-writing", "india"],
    ["On-screen marking (India)", (v) => v.region === "india" && v.segment === "osm", "india"],
    ["AI copy checking (global)", (v) => v.region === "global" && v.segment === "ai-copy-checking", "global"],
    ["Scan-and-grade + OSM (global)", (v) => v.region === "global" && ["handwritten-grading", "osm"].includes(v.segment), "global"],
    ["AI grading assistants", (v) => ["ai-grading-assistant", "lms-ai"].includes(v.segment) && v.region === "global", "global"],
    ["OMR / bubble sheets", (v) => v.segment === "omr", "global"],
  ];

  const sources: Source[] = VENDORS.map((v, i) => ({
    id: String(i + 1),
    title: `${v.name}: product, help and pricing pages`,
    publisher: v.region === "evalezy" ? "Evalezy (self-assessed)" : v.company && v.company !== v.name ? `${v.name} (${v.company})` : v.name,
    url: primarySource(v),
    type: "Vendor" as const,
  }));
  const srcId = (name: string) => String(VENDORS.findIndex((v) => v.name === name) + 1);

  return (
    <ResearchShell
      slug={LANDSCAPE_SLUG}
      crumb="Answer sheet evaluation landscape 2026"
      eyebrow="Evalezy Research · Evaluation landscape"
      title={TITLE}
      dek={`We compared ${VENDORS.length} tools that check student answers, from Indian AI copy checkers and on-screen marking vendors to global scan-and-grade platforms and AI grading assistants, on 14 jobs from reading handwriting to returning results. AI marking is now common: ${capCount("subjective_ai_marking")} of the ${n} other tools document it. The rest of the job is not. Only ${pipelineVendors.length} document the full scan pipeline (handwriting, AI marking, bulk upload and student identification), none of them Indian; ${annotated.length} return the student's own sheet marked up, all of them with a person doing the marking; and none documents a public grading API.`}
      published={RESEARCH_PUBLISHED}
      updated={RESEARCH_UPDATED}
      sources={sources}
      dataset={{
        name: "AI Answer Sheet Evaluation Landscape 2026",
        description: `Capability coverage (14 capabilities), pricing model and published entry prices for ${VENDORS.length} answer-sheet evaluation, on-screen marking and AI grading tools in India and abroad, with a source per vendor.`,
        csv: LANDSCAPE_CSV,
        keywords: ["AI answer sheet evaluation", "AI copy checking", "on-screen marking", "OSM", "AI grading", "handwritten answer evaluation", "Gradescope alternatives", "UPSC answer evaluation"],
      }}
    >
      <h2 id="key-findings">Key findings</h2>
      <div className="not-prose mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KeyStat value={`${capCount("subjective_ai_marking")} of ${n}`} label="tools document AI marking of written answers. It is no longer rare; what surrounds it is." />
        <KeyStat value={`${pipelineVendors.length} of ${n}`} label={`document the whole scan pipeline natively: reading handwriting, AI marking, bulk upload and identifying the student (${names(pipelineVendors)}). None is Indian.`} />
        <KeyStat value={`${annotated.length} of ${n}`} label="return the student's own sheet marked up. In all of them a person makes the marks on screen." />
        <KeyStat value={`0 of ${n}`} label={`document a public grading API natively (${capCount("public_api", "partial")} more mention one only on enterprise plans or via integrations).`} />
        <KeyStat value={`${indianLang.length} of ${n}`} label={`document grading answers written in Hindi or another Indian language (${names(indianLang)}). Evalezy does not, yet.`} />
        <KeyStat value={`${publicPricing.length} of ${n}`} label={`publish prices. None of the ${osmIndia.length} Indian on-screen marking vendors does; their contracts are quoted per exam.`} />
      </div>

      <h2 id="map">The Evalezy Evaluation Map</h2>
      <p>
        Each tool is placed by how much of the marking job it can do (left to right) and how much of the exam workflow around
        the marking it covers (bottom to top). Scores come only from what each vendor documents publicly; the method is
        below. Evalezy is on the map with the same rubric, scored from its own pages, including the two things it does not
        do: Indian-language answers and plagiarism or AI-writing checks.
      </p>
      <Figure
        id="evaluation-map"
        title="Marking depth vs. exam-workflow coverage, 2026"
        subtitle={`${VENDORS.length} tools. Marking: handwriting, AI marking, maths, rubric, partial marks with reasons, typed answers, Indian languages. Workflow: bulk scans, student identification, annotated copy, teacher review, paper import, public API, integrity checks.`}
        source={<>Source: Evalezy Research, vendor websites, help centres and pricing pages read in October 2026. Yes = 1, partial = 0.5, not documented = 0. Hover a point for its scores; the full table is below.</>}
        table={
          <DataTable
            head={["Tool", "Region", "Type", "Marking %", "Workflow %", "Of 14"]}
            rows={sorted.map((v) => [v.name, v.region === "global" ? v.hq ?? "Global" : "India", SEGMENT_LABELS[v.segment] ?? v.segment, v.marking, v.workflow, v.breadth])}
          />
        }
      >
        <Legend keys={["evalezy", "india", "global"]} />
        <LandscapeMap
          ariaLabel={`Map of ${VENDORS.length} answer-sheet evaluation tools by marking depth and exam-workflow coverage. Evalezy scores ${EVALEZY.marking}% and ${EVALEZY.workflow}%; the next widest is ${runnerUp.name} at ${runnerUp.breadth} of 14 capabilities.`}
          xLabel="Marking depth"
          yLabel="Exam-workflow coverage"
          zones={["Workflow-first", "End to end", "Point tools", "Marking-first"]}
          points={landscapeMapPoints(LABELS)}
        />
      </Figure>
      <p>
        {endToEnd.length} of the {n} other tools reach at least half of both axes ({names(endToEnd)}). The Indian on-screen
        marking vendors sit high on workflow and low on marking: they move scanned scripts to human examiners very well, and
        the examiners still read every answer. The UPSC answer-writing apps sit the other way: instant AI marks for one
        aspirant at a time, with no batch, no class list and no teacher in the loop. The global AI assistants mark typed
        essays well and are newer to paper.
      </p>

      <h2 id="capability-gaps">Which capabilities are rare</h2>
      <Figure
        id="capability-adoption"
        title={`Share of ${n} tools that document each capability natively`}
        subtitle="Evalezy excluded. Partial support (an add-on, a beta, some question types only, or an integration) is in the table."
        source={<>Source: Evalezy Research, vendor documentation, October 2026.</>}
        table={
          <DataTable
            head={["Capability", "Native (yes)", "Partial", "Share native", "Evalezy"]}
            rows={ALL_CAPS.map((k) => [CAP_LABELS[k], capCount(k), capCount(k, "partial"), pct(capCount(k), n), MARK[EVALEZY.capabilities[k].value].text])}
          />
        }
      >
        <BarChart
          ariaLabel="Share of tools documenting each capability natively"
          max={100}
          rows={[...ALL_CAPS]
            .sort((a, b) => capCount(b) - capCount(a))
            .map((k) => ({ label: CAP_LABELS[k], value: (capCount(k) / n) * 100, series: "india" as const, display: `${pct(capCount(k), n)} (${capCount(k)} of ${n})` }))}
        />
      </Figure>
      <p>
        A teacher review step is the norm ({capCount("teacher_review")} of {n}): almost nobody lets AI marks reach students
        unchecked. Reading handwriting ({capCount("handwritten_reading")}) and AI marking ({capCount("subjective_ai_marking")})
        are now common. The rare jobs are the ones that save the most time on a real exam: identifying which student a
        scanned copy belongs to ({capCount("student_identification")}), returning the copy marked up ({capCount("annotated_copy")}),
        marking maths working ({capCount("stem_maths")}), Indian-language answers ({capCount("indian_languages")}), importing the
        question paper ({capCount("question_paper_import")}) and a public API ({capCount("public_api")}).
      </p>

      <h2 id="by-type">Coverage by type of tool</h2>
      <Figure
        id="coverage-by-type"
        title="Average capabilities covered, out of 14, by type of tool"
        source={<>Source: Evalezy Research, October 2026. Averages of the scores in the matrix below.</>}
        table={
          <DataTable
            head={["Type", "Tools", "Average of 14"]}
            rows={[...segments.map(([label, f]) => { const a = averageBreadth(f); return [label, a.n, a.avg.toFixed(1)]; }), ["Evalezy", 1, EVALEZY.breadth.toFixed(1)]]}
          />
        }
      >
        <BarChart
          ariaLabel="Average capabilities covered by type of tool"
          max={14}
          rows={[
            ...segments.map(([label, f, s]) => { const a = averageBreadth(f); return { label, value: a.avg, series: s, display: `${a.avg.toFixed(1)} of 14 (${a.n})` }; }),
            { label: "Evalezy", value: EVALEZY.breadth, series: "evalezy" as const, display: `${EVALEZY.breadth} of 14` },
          ]}
        />
      </Figure>

      <h2 id="matrix">Full capability matrix</h2>
      <p>
        ● native · ◐ partial (add-on, beta, limited or via integration) · ○ not offered · – not documented publicly. Sorted
        by capabilities covered. Hover a symbol for the evidence; the CSV has every value.
      </p>
      <div className="not-prose relative mt-6 overflow-x-auto rounded-2xl border border-line bg-white" tabIndex={0} role="region" aria-label="Capability matrix">
        <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line align-bottom">
              <th scope="col" className="sticky left-0 z-10 bg-white p-3 font-semibold text-ink">Tool</th>
              {ALL_CAPS.map((k) => (
                <th key={k} scope="col" className="p-2 text-center text-xs font-semibold text-slate-600">{CAP_LABELS[k]}</th>
              ))}
              <th scope="col" className="p-2 text-center text-xs font-semibold text-ink">Of 14</th>
              <th scope="col" className="p-2 text-xs font-semibold text-ink">Price</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((v) => {
              const us = v.region === "evalezy";
              return (
                <tr key={v.name} className={`border-b border-line/70 ${us ? "bg-pen-50" : ""}`}>
                  <th scope="row" className={`sticky left-0 z-10 p-3 font-medium text-ink ${us ? "bg-pen-50" : "bg-white"}`}>
                    <a href={`#src-${srcId(v.name)}`} className="hover:text-pen-700">{v.name}</a>
                    <span className="block text-xs font-normal text-slate-500">{SEGMENT_LABELS[v.segment] ?? v.segment} · {v.region === "global" ? v.hq ?? "Global" : "India"}</span>
                  </th>
                  {ALL_CAPS.map((k) => {
                    const c = v.capabilities[k];
                    const m = MARK[c.value] ?? MARK.unknown;
                    return (
                      <td key={k} className={`p-2 text-center text-base ${m.className}`} title={`${CAP_LABELS[k]}: ${m.text}${c.evidence ? ` (${c.evidence})` : ""}`}>
                        <span aria-hidden="true">{m.glyph}</span>
                        <span className="sr-only">{m.text}</span>
                      </td>
                    );
                  })}
                  <td className="p-2 text-center font-semibold text-ink">{v.breadth}</td>
                  <td className="p-2 text-xs text-slate-600">{formatEntryPrice(v)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        Of the {india.length} Indian and {global.length} global tools, {publicPricing.length} publish a price. Pricing models vary
        widely: per teacher per month for the AI assistants, per aspirant per month or year for UPSC apps, per student for
        scan-and-grade and OMR tools, and quoted per exam for on-screen marking. Evalezy charges per page checked.
      </p>

      <h2 id="changes">What changed in 2025-26</h2>
      <ul>
        {CHANGES.map(([who, what, url]) => (
          <li key={who}>
            <strong>{who}:</strong> {what}{" "}
            <a href={url} target="_blank" rel="noopener" className="text-sm text-pen-700 underline underline-offset-2">source</a>
          </li>
        ))}
      </ul>

      <h2 id="fit">When another tool is the better fit</h2>
      <p>Breadth is not the only thing that matters. Based on this research, these needs are better served elsewhere today:</p>
      <ul>
        <li><strong>Answers in Hindi or another Indian language:</strong> Eklavvya documents eight Indian languages and CrazyGoldFish publishes results on Hindi handwritten answers. Evalezy grades English answers only for now.</li>
        <li><strong>A board or university running human marking at very large scale</strong>, with double marking, seed scripts and examiner panels: the on-screen marking vendors (Coempt Onmark, DEXIT Global, MeritTrac, TCS iON, RM Assessor) are built for that.</li>
        <li><strong>Plagiarism and AI-writing checks on typed essays:</strong> Turnitin, CoGrader, EssayGrader, Top Marks AI and Edexia document them. Evalezy does not.</li>
        <li><strong>University STEM courses with many short answers and code:</strong> Gradescope groups similar answers for fast human grading and checks code similarity.</li>
        <li><strong>Multiple-choice only:</strong> OMR tools such as ZipGrade cost a few dollars a year.</li>
        <li><strong>Comparative judgement of writing</strong> rather than rubric marks: No More Marking.</li>
      </ul>

      <h2 id="method">Method</h2>
      <ul>
        <li><strong>Tools:</strong> {VENDORS.length} products that check or grade student answers, in seven groups: Indian AI copy checkers, UPSC and state PSC answer-writing apps, Indian on-screen marking providers, global AI copy checkers, global scan-and-grade and on-screen marking platforms, global AI grading assistants, and OMR tools. Tools we could not document at all were left out, and the reasons are kept with the research notes.</li>
        <li><strong>Evidence:</strong> each vendor&apos;s own product, help and pricing pages, read in October 2026; where a vendor site blocked reading, a university guide or a news report, marked as third-party in the evidence. Every value has its evidence in the CSV.</li>
        <li><strong>Scoring:</strong> native = 1, partial = 0.5, not offered or not documented = 0. Marking covers {MARKING_CAPS.length} capabilities and workflow {WORKFLOW_CAPS.length}; each axis is shown as a percentage. Human on-screen marking counts as partial for reading handwriting (the scans are shown to people, not read by software).</li>
        <li><strong>Evalezy</strong> is scored with the same rubric from its own public pages and API docs. It publishes this report, so treat its position as a vendor claim that you can check.</li>
      </ul>
      <h3>Limits</h3>
      <ul>
        <li>The map measures breadth, not accuracy or quality. We did not test any tool&apos;s marks; a tool with fewer capabilities can mark better.</li>
        <li>&ldquo;Not documented&rdquo; scores zero. A vendor may do something it does not describe publicly; send us a source and we will update the record.</li>
        <li>Prices are shown as published, in their own currency and unit, without conversion. Customer counts are the vendors&apos; own claims.</li>
      </ul>
      <p>
        Related: <Link href="/best-ai-copy-checking-software/">Best AI copy checking software in 2026, one pick per job</Link> ·{" "}
        <Link href="/side-by-side/">One copy checked by a teacher and by Evalezy</Link> ·{" "}
        <Link href="/compare/on-screen-marking/">Evalezy vs on-screen marking</Link> ·{" "}
        <Link href="/compare/chatgpt/">Evalezy vs a general chatbot</Link> · <Link href="/pricing/">Evalezy pricing</Link>
      </p>
    </ResearchShell>
  );
}
