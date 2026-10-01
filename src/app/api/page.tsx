import Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck, Webhook } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { ApiTabs, CodeBlock } from "@/components/Interactive";
import { ENDPOINTS, SNIPPETS, STATUSES } from "@/content/api";
import { API_BASE } from "@/lib/site";
import { TickList } from "@/components/Pen";

const PATH = "/api/";
export const metadata = pageMetadata(PATH);

const METHOD_STYLE: Record<string, string> = {
  GET: "bg-ok-50 text-ok",
  POST: "bg-biro-50 text-biro",
  PUT: "bg-warn-50 text-warn",
  DELETE: "bg-pen-50 text-pen-700",
};

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Evaluation API"
      h1="Answer sheet evaluation, as an API."
      lede={<>Send a handwritten answer sheet by file or URL. Get back per-question marks, feedback, the student&apos;s answer as read and a red-pen checked PDF. Same engine and same price as the Evalezy dashboard: ₹1 / $0.01 per page.</>}
      secondary={{ href: "/demo/#api", label: "Request API access", track: "request_api" }}
      visual={
        <ApiTabs
          tabs={[
            { label: "cURL", code: SNIPPETS.evaluateCurl, file: "POST /evaluations" },
            { label: "Node.js", code: SNIPPETS.evaluateNode, file: "evaluate.mjs" },
            { label: "Python", code: SNIPPETS.evaluatePython, file: "evaluate.py" },
          ]}
        />
      }
      faqs={[
        { q: "How do I get an API key?", a: "API access is enabled per account. Request it on the demo page with your use case and expected monthly volume." },
        { q: "Is the API synchronous?", a: "No. Checking takes minutes, so evaluations are asynchronous: create one, get an id back immediately, then poll the status endpoint or receive a webhook." },
        { q: "What file formats are accepted?", a: "PDF answer sheets, one file per student, uploaded directly or fetched from a URL you provide. Phone photos combined into a PDF work." },
        { q: "How is the API billed?", a: "Per page checked: ₹1 in India, $0.01 elsewhere. Failed, cancelled and unreadable sheets are not billed." },
        { q: "Can I get the checked PDF?", a: "Yes. A completed evaluation includes a URL to the checked copy with ticks, crosses, notes, marks and the circled total." },
        { q: "Do teachers still review API results?", a: "That is up to your product. The API returns the AI's marks with reasons and confidence signals; most platforms show them to a teacher or reviewer before learners see them." },
      ]}
    >
      <section className="wrap grid gap-6 py-16 md:grid-cols-3 md:py-20">
        {[
          { icon: KeyRound, t: "Bearer API keys", b: `Every request carries Authorization: Bearer <key>. Base URL: ${API_BASE}` },
          { icon: Webhook, t: "Webhooks or polling", b: "Pass a webhook_url per evaluation, or poll GET /evaluations/{id} for status and progress." },
          { icon: ShieldCheck, t: "Billed on success", b: "Charged per page only when an evaluation completes. Failed, cancelled and unreadable: free." },
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
          <h2 className="h-section text-ink">The flow</h2>
          <ol className="mt-10 space-y-12">
            <li className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="hand text-2xl text-pen">1.</p>
                <h3 className="h-card mt-1 text-2xl text-ink">Create an assessment</h3>
                <p className="mt-3 leading-relaxed text-slate-600">Send your questions with marks, or a question paper URL to be read into questions. You get back an assessment id and the question list.</p>
              </div>
              <CodeBlock code={SNIPPETS.createAssessment} label="POST /assessments" />
            </li>
            <li className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="hand text-2xl text-pen">2.</p>
                <h3 className="h-card mt-1 text-2xl text-ink">Set evaluation criteria</h3>
                <p className="mt-3 leading-relaxed text-slate-600">Send criteria and an optional model answer per question. Criteria marks are rescaled to sum to the question&apos;s marks. Or call <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm">/criteria/generate</code> for a draft to edit.</p>
              </div>
              <CodeBlock code={SNIPPETS.setCriteria} label="PUT /assessments/{id}/criteria" />
            </li>
            <li className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="hand text-2xl text-pen">3.</p>
                <h3 className="h-card mt-1 text-2xl text-ink">Send an answer sheet</h3>
                <p className="mt-3 leading-relaxed text-slate-600">Pass a URL to the PDF, or upload it to <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm">/files</code> first and send the file id. Include your own student id so results map back to your users.</p>
              </div>
              <div className="space-y-3">
                <CodeBlock code={SNIPPETS.evaluateCurl} label="POST /evaluations" />
                <CodeBlock code={SNIPPETS.accepted} label="202 Accepted" />
              </div>
            </li>
            <li className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]" id="result">
              <div>
                <p className="hand text-2xl text-pen">4.</p>
                <h3 className="h-card mt-1 text-2xl text-ink">Get the result</h3>
                <p className="mt-3 leading-relaxed text-slate-600">Poll the evaluation or wait for the webhook. A completed evaluation carries the total, every question&apos;s marks, the student&apos;s answer as read, feedback, the criteria breakdown and the checked PDF.</p>
                <p className="mt-3 text-sm text-slate-500">Example values are from the real sample copy (38/80).</p>
              </div>
              <CodeBlock code={SNIPPETS.result} label="GET /evaluations/ev_3kP9xW → 200" />
            </li>
          </ol>
        </div>
      </section>

      <section className="wrap py-16 md:py-20" id="endpoints">
        <h2 className="h-section text-ink">Endpoints</h2>
        <p className="mt-3 text-slate-600">Base URL <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm">{API_BASE}</code></p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[40rem] text-left">
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
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-sm text-ink">{e.path}</td>
                  <td className="px-5 py-3.5 text-sm leading-relaxed text-slate-600">{e.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-line bg-white" id="webhooks">
        <div className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="h-section text-ink">Statuses</h2>
            <ul className="mt-8 divide-y divide-line rounded-2xl border border-line">
              {STATUSES.map((s) => (
                <li key={s.status} className="flex gap-4 px-5 py-3.5">
                  <code className="w-24 shrink-0 font-mono text-sm font-semibold text-ink">{s.status}</code>
                  <span className="text-sm leading-relaxed text-slate-600">{s.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-section text-ink">Webhooks</h2>
            <p className="mt-4 leading-relaxed text-slate-600">Pass <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm">webhook_url</code> when you create an evaluation and Evalezy posts to it when the evaluation completes or fails. Fetch the full result with the id.</p>
            <CodeBlock className="mt-6" code={SNIPPETS.webhook} label="evaluation.completed" />
            <TickList className="mt-6" items={["Answer sheets that cannot be read fail with a reason and are not billed", "Cancel any running evaluation; cancelled evaluations are not billed", "Each evaluation is billed once, even if it is retried internally"]} />
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-line bg-white p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="h-card text-2xl text-ink">Ready to build?</p>
            <p className="mt-2 max-w-xl text-slate-600">Tell us what you are building and your expected volume. We will enable API access on your account.</p>
          </div>
          <Link href="/demo/#api" className="btn btn-pen btn-lg" data-track="request_api">Request API access <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </PageShell>
  );
}
