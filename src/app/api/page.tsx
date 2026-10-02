import { ArrowRight, BookOpen, Coins, KeyRound, LayoutDashboard, RefreshCw, ShieldCheck } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { ApiTabs, CodeBlock } from "@/components/Interactive";
import { ENDPOINTS, NOT_YET, SNIPPETS, STATUSES, docsUrl } from "@/content/api";
import { API_BASE, DOCS_URL, SALES_EMAIL } from "@/lib/site";
import { TickList } from "@/components/Pen";

const PATH = "/api/";
export const metadata = pageMetadata(PATH);

const METHOD_STYLE: Record<string, string> = {
  GET: "bg-ok-50 text-ok",
  POST: "bg-biro-50 text-biro",
  PUT: "bg-warn-50 text-warn",
  PATCH: "bg-warn-50 text-warn",
  DELETE: "bg-pen-50 text-pen-700",
};

const FLOW = [
  { t: "Create an exam", b: "Questions, max marks, answer keys for objective questions and a rubric or model answer for long answers. Opening it fixes the questions, marks and answer keys; rubrics and model answers stay editable.", code: SNIPPETS.createExam, label: "POST /exams", doc: "/concepts/exams-and-questions" },
  { t: "Upload the answer sheets", b: "One PDF per candidate. Ask for presigned URLs (up to 100 per call), PUT each file, then read the upload back to confirm its page count.", code: SNIPPETS.upload, label: "POST /uploads", doc: "/concepts/uploads" },
  { t: "Submit each copy", b: "Name the candidate by your own id and pass the upload_id; typed tests send answers[] instead. You get 202 and a fixed-price quote straight away.", code: SNIPPETS.submitCurl, label: "POST /exams/{id}/submissions", doc: "/concepts/submissions" },
  { t: "Follow grading", b: "Poll one submission, or the feed of everything that changed since your last sync. Webhooks are on the roadmap; polling is the supported way today.", code: SNIPPETS.feed, label: "GET /submissions?updated_since=", doc: "/guides/syncing-results" },
  { t: "Read results and the checked copy", b: "Question-wise marks, criteria with reasons, feedback, the answer as read, confidence and needs_review, plus the red-pen PDF.", code: SNIPPETS.result, label: "GET /submissions/{id}/result → 200", doc: "/concepts/results" },
  { t: "Review, then finalize", b: "Override any mark (free) or approve it, in your app or in the Vacademy dashboard. Marks are drafts until you finalize.", code: SNIPPETS.finalize, label: "POST /exams/{id}/finalize", doc: "/api-reference/review/finalize-results" },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Evaluation API"
      h1="Answer sheet evaluation, as an API."
      lede={
        <>
          Grade handwritten answer copies and typed long answers from your own exam system. Send a question paper, a marking scheme and each candidate&apos;s PDF; get back question-wise marks, reasons, feedback and the checked copy in red pen. Marks stay drafts until you finalize them.
        </>
      }
      secondary={{ href: DOCS_URL, label: "Read the API docs", track: "open_docs" }}
      visual={
        <ApiTabs
          tabs={[
            { label: "cURL", code: SNIPPETS.submitCurl, file: "POST /exams/{id}/submissions" },
            { label: "Node.js", code: SNIPPETS.submitNode, file: "submit.mjs" },
            { label: "Python", code: SNIPPETS.submitPython, file: "submit.py" },
            { label: "202 Accepted", code: SNIPPETS.accepted, file: "response" },
          ]}
        />
      }
      faqs={[
        { q: "How do I get an API key?", a: `The Evaluation API is switched on per institute. Write to ${SALES_EMAIL} (or use the demo page) to get it enabled. An institute admin then creates keys in the Vacademy dashboard under Settings → Integrations → API keys, with only the scopes each system needs.` },
        { q: "Is there a sandbox?", a: "No. Every key is live and every graded copy is billed. Try things with a small exam of one or two short copies; failed and cancelled copies cost nothing." },
        { q: "Are there webhooks?", a: "Not yet; they are on the roadmap. Today you poll GET /submissions?updated_since= with a single worker, which the docs walk through step by step." },
        { q: "What can I upload?", a: "PDFs only, one per answer sheet, up to 50 MB each. Copies up to 40 pages are graded normally; 41 to 80 pages are graded and flagged for review; longer ones are refused before any charge. Phone photos must be combined into a PDF first." },
        { q: "How is it priced?", a: "1 credit per page of a handwritten PDF, blank pages included, and 1 credit per non-blank typed long answer. Objective answers are free. The price is fixed and quoted before grading; failed and cancelled copies are not charged; re-evaluating is charged again." },
        { q: "Do teachers have to use my app to review?", a: "No. Exams you create through the API also appear in the institute's Vacademy dashboard, tagged Source: API, where teachers can review and change marks. Their changes show up in your API results." },
        { q: "Which languages are supported?", a: "English answers only for now. Copies in Hindi or another regional language fail with language_not_supported and are not charged." },
      ]}
    >
      <section className="wrap grid gap-5 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-3">
        {[
          { icon: KeyRound, t: "X-API-Key, scoped", b: `Keys look like vak_eval_… and carry scopes: read, write, review, finalize. Server to server only. Base URL ${API_BASE}` },
          { icon: Coins, t: "Fixed price, quoted first", b: "1 credit per page (handwritten) or per long answer (typed). POST /credits/quote before you submit; failed and cancelled are free." },
          { icon: RefreshCw, t: "Safe retries", b: "Idempotency-Key on every POST, plus natural keys: your external_ref per exam, external_id per candidate, one live submission each." },
          { icon: ShieldCheck, t: "Drafts until you finalize", b: "The AI never publishes marks. Override, approve, then POST /exams/{id}/finalize. Unfinalizing needs a reason." },
          { icon: LayoutDashboard, t: "Dashboard review included", b: "API exams show up in the Vacademy dashboard, tagged Source: API, so teachers can review without you building a screen." },
          { icon: BookOpen, t: "Full reference and guides", b: "Every endpoint with request, response and code, guides for term exams, typed tests and daily answer writing, and an OpenAPI document." },
        ].map((x) => (
          <div key={x.t} className="card p-6">
            <x.icon className="h-6 w-6 text-pen" />
            <p className="h-card mt-4 text-lg text-ink">{x.t}</p>
            <p className="mt-2 break-words leading-relaxed text-slate-600">{x.b}</p>
          </div>
        ))}
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="h-section text-ink">The flow, in six calls</h2>
            <a href={docsUrl("/quickstart")} className="inline-flex items-center gap-1 font-semibold text-pen-700" data-track="open_docs">Ten-minute quickstart <ArrowRight className="h-4 w-4" /></a>
          </div>
          <ol className="mt-10 space-y-12">
            {FLOW.map((f, i) => (
              <li key={f.t} className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="hand text-2xl text-pen">{i + 1}.</p>
                  <h3 className="h-card mt-1 text-2xl text-ink">{f.t}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{f.b}</p>
                  <a href={docsUrl(f.doc)} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pen-700" data-track="open_docs">In the docs <ArrowRight className="h-3.5 w-3.5" /></a>
                </div>
                <CodeBlock code={f.code} label={f.label} />
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-slate-500">Example values come from the real sample copy on this site (Class IX Social Science, 7 pages, 38/80).</p>
        </div>
      </section>

      <section className="wrap py-16 md:py-20" id="endpoints">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="h-section text-ink">Key endpoints</h2>
          <a href={docsUrl("/api-reference/introduction")} className="inline-flex items-center gap-1 font-semibold text-pen-700" data-track="open_docs">Full API reference <ArrowRight className="h-4 w-4" /></a>
        </div>
        <p className="mt-3 text-slate-600">Base URL <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm">{API_BASE}</code>. These are the calls most integrations use; the reference lists all of them.</p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[44rem] text-left">
            <thead className="bg-paper-2 text-sm text-ink">
              <tr>
                <th className="px-5 py-3 font-semibold">Method</th>
                <th className="px-5 py-3 font-semibold">Path</th>
                <th className="px-5 py-3 font-semibold">What it does</th>
              </tr>
            </thead>
            <tbody>
              {ENDPOINTS.map((e) => (
                <tr key={e.method + e.path} className="border-t border-line align-top">
                  <td className="px-5 py-3.5"><span className={`rounded-md px-2 py-0.5 font-mono text-xs font-bold ${METHOD_STYLE[e.method]}`}>{e.method}</span></td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-sm"><a href={docsUrl(e.doc)} className="text-ink underline decoration-line underline-offset-4 hover:decoration-pen">{e.path}</a></td>
                  <td className="px-5 py-3.5 text-sm leading-relaxed text-slate-600">{e.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-line bg-white" id="statuses">
        <div className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="h-section text-ink">Submission statuses</h2>
            <ul className="mt-8 divide-y divide-line rounded-2xl border border-line">
              {STATUSES.map((s) => (
                <li key={s.status} className="flex gap-4 px-5 py-3.5">
                  <code className="w-32 shrink-0 font-mono text-sm font-semibold text-ink">{s.status}</code>
                  <span className="text-sm leading-relaxed text-slate-600">{s.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-section text-ink">Not in the API yet</h2>
            <p className="mt-4 leading-relaxed text-slate-600">Planned, without dates. The docs&apos; roadmap says what to do today for each.</p>
            <TickList className="mt-6" items={NOT_YET} />
            <a href={docsUrl("/platform/roadmap")} className="mt-6 inline-flex items-center gap-1 font-semibold text-pen-700" data-track="open_docs">API roadmap <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-line bg-white p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="h-card text-2xl text-ink">Ready to build?</p>
            <p className="mt-2 max-w-xl text-slate-600">Read the docs, then ask us to switch the Evaluation API on for your institute. Tell us what you are building and your expected monthly volume.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={DOCS_URL} className="btn btn-ink btn-lg" data-track="open_docs"><BookOpen className="h-4 w-4" /> API docs</a>
            <a href="/demo/#api" className="btn btn-pen btn-lg" data-track="request_api">Request API access <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
