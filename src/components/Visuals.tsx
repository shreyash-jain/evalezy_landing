/**
 * Product visuals. The checked-copy images are the real sample (public/copy/, from the sample PDF; no student
 * name appears on it). The UI panels are drawn from the real dashboard screens with fictional student names.
 */
import { AlertCircle, CheckCircle2, FileText, Loader2, Mail, Pencil, Sparkles, Upload, UserRound } from "lucide-react";
import { Cross, Tick } from "./Pen";

/* ------------------------------------------------------------------ */
/* Hero: a stack of checked copies with live status chips              */
/* ------------------------------------------------------------------ */

export function CheckedCopyStack() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] pb-10 pt-4 sm:pb-6">
      {/* back sheets */}
      <div className="absolute left-[9%] top-6 aspect-[3/4] w-[78%] rotate-[5deg] overflow-hidden rounded-md bg-white shadow-paper">
        <img src="/copy/page-3-sm.webp" alt="" className="h-full w-full object-cover opacity-90" loading="eager" />
      </div>
      <div className="absolute left-[5%] top-3 aspect-[3/4] w-[78%] -rotate-[3deg] overflow-hidden rounded-md bg-white shadow-paper">
        <img src="/copy/page-2-sm.webp" alt="" className="h-full w-full object-cover opacity-95" loading="eager" />
      </div>
      {/* top sheet */}
      <div className="relative ml-[7%] aspect-[3/4] w-[78%] overflow-hidden rounded-md bg-white shadow-paper">
        <img
          src="/copy/page-1.webp"
          srcSet="/copy/page-1-sm.webp 560w, /copy/page-1.webp 1200w"
          sizes="(min-width: 1024px) 420px, 78vw"
          alt="Page one of a Class IX Social Science answer copy checked by Evalezy: red ticks on correct answers, crosses with the correct answer written beside wrong ones, marks per question in the margin and the total 38/80 circled at the top"
          className="h-full w-full object-cover"
          width={1200}
          height={1600}
          fetchPriority="high"
        />
      </div>

      {/* chip: matched student */}
      <div className="absolute -left-1 top-[18%] w-[14.5rem] animate-float rounded-2xl border border-line bg-white/95 p-3 shadow-paper backdrop-blur sm:-left-8">
        <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Read from the sheet</p>
        <div className="mt-1.5 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-biro-50 text-biro"><UserRound className="h-4 w-4" /></span>
          <div className="min-w-0 text-sm">
            <p className="font-semibold text-ink">Aditi Sharma</p>
            <p className="text-xs text-slate-500">Roll 14 · Class IX-B</p>
          </div>
          <span className="ml-auto rounded-full bg-ok-50 px-2 py-0.5 text-[0.7rem] font-bold text-ok">Matched</span>
        </div>
      </div>

      {/* chip: batch progress */}
      <div className="absolute -right-1 top-[46%] w-[14.5rem] rounded-2xl border border-line bg-white/95 p-3.5 shadow-paper backdrop-blur [animation-delay:1.2s] animate-float sm:-right-6">
        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-ink">Bulk check</p>
          <span className="flex items-center gap-1 text-xs font-semibold text-pen-700"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Running</span>
        </div>
        <p className="mt-1 text-xs text-slate-500">186 of 200 copies checked</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-2">
          <div className="h-full w-[93%] rounded-full bg-pen" />
        </div>
      </div>

      {/* chip: review */}
      <div className="absolute bottom-0 left-[8%] flex w-[19rem] items-center gap-3 rounded-2xl border border-line bg-ink p-3 text-white shadow-paper [animation-delay:2.2s] animate-float sm:bottom-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10"><CheckCircle2 className="h-5 w-5 text-pen-300" /></span>
        <div className="text-sm leading-tight">
          <p className="font-semibold">Reviewed by Ms. Rao</p>
          <p className="text-xs text-slate-400">2 marks changed · ready to release</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Score table vs checked copy                                          */
/* ------------------------------------------------------------------ */

export function ScoreTableVsCopy() {
  const rows = [
    ["Q4", "0 / 1", "Incorrect"],
    ["Q5", "0 / 1", "Incorrect"],
    ["Q6", "0 / 1", "Incorrect"],
    ["Q21", "1.5 / 2", "Partially correct"],
    ["Q30", "0.5 / 3", "Partially correct"],
  ];
  return (
    <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
      <figure className="flex flex-col rounded-2xl border border-line bg-white p-5">
        <figcaption className="text-xs font-bold uppercase tracking-wider text-slate-400">What most AI graders return</figcaption>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-slate-500">
              <th className="py-2 font-semibold">Q</th>
              <th className="py-2 font-semibold">Score</th>
              <th className="py-2 font-semibold">Remark</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-line/70 last:border-0">
                <td className="py-2 font-mono text-xs">{r[0]}</td>
                <td className="py-2 font-mono text-xs">{r[1]}</td>
                <td className="py-2">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-auto pt-4 text-sm text-slate-500">A number per question. The student never sees where on the page they went wrong.</p>
      </figure>
      <figure className="flex flex-col overflow-hidden rounded-2xl border-2 border-pen/30 bg-white">
        <figcaption className="flex items-center justify-between px-5 pt-5 text-xs font-bold uppercase tracking-wider text-pen-700">
          What Evalezy returns <span className="hand text-base normal-case tracking-normal text-pen">the copy itself</span>
        </figcaption>
        <div className="mt-3 space-y-2 px-3 pb-3">
          <img src="/copy/crop-crosses.webp" alt="Three answers marked wrong in red pen, each with the correct answer written beside it: latitude, lowest, Indus, and 0/1 in the margin" className="w-full rounded-lg border border-line" loading="lazy" width={1400} height={357} />
          <img src="/copy/crop-long.webp" alt="A 3-mark answer listing weather elements, marked 0.5/3 with the note: Only weather elements listed; no factors of climate explained" className="w-full rounded-lg border border-line" loading="lazy" width={1400} height={434} />
        </div>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bulk check panel (recreated from the dashboard, fictional names)    */
/* ------------------------------------------------------------------ */

type RowState = "checked" | "grading" | "nomatch" | "ambiguous";
const BULK_ROWS: { file: string; pages: number; read: string; student: string; state: RowState; detail: string }[] = [
  { file: "IX-B_scan_014.pdf", pages: 7, read: "Aditi Sharma · Roll 14", student: "Aditi Sharma", state: "checked", detail: "38 / 80" },
  { file: "IX-B_scan_015.pdf", pages: 8, read: "Kabir Singh · Roll 15", student: "Kabir Singh", state: "grading", detail: "21 of 38 questions" },
  { file: "IMG_2041.pdf", pages: 6, read: "No name found on the sheet", student: "—", state: "nomatch", detail: "" },
  { file: "IX-B_scan_017.pdf", pages: 7, read: "R. Verma · Roll 17?", student: "Riya Verma or Rohan Verma", state: "ambiguous", detail: "" },
];

export function BulkCheckPanel({ compact = false }: { compact?: boolean }) {
  const stats = [
    { k: "Copies", v: "200", c: "text-ink" },
    { k: "Checked", v: "186", c: "text-ok" },
    { k: "In progress", v: "3", c: "text-ink" },
    { k: "Need review", v: "2", c: "text-warn" },
    { k: "Failed", v: "1", c: "text-pen" },
  ];
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-paper">
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <p className="h-card text-lg text-ink">Bulk AI check</p>
          <p className="text-sm text-slate-500">Each uploaded copy, who it was matched to, and where its check is.</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-semibold text-slate-600"><Loader2 className="h-3.5 w-3.5 animate-spin text-pen" /> Running</span>
      </div>
      <div className="grid grid-cols-5 gap-2 px-5 pt-4">
        {stats.map((s) => (
          <div key={s.k} className="rounded-xl border border-line bg-paper px-2.5 py-2">
            <p className="truncate text-[0.68rem] text-slate-500">{s.k}</p>
            <p className={`h-card text-lg ${s.c}`}>{s.v}</p>
          </div>
        ))}
      </div>
      <div className="mx-5 mt-3 flex items-center gap-2 rounded-xl border border-warn/30 bg-warn-50 px-3 py-2 text-[0.8rem] text-warn">
        <AlertCircle className="h-4 w-4 shrink-0" /> 2 copies could not be matched to a student. Pick the student to check them.
      </div>
      <div className="mt-2 overflow-x-auto px-5 pb-5">
        <table className="w-full min-w-[34rem] text-left text-[0.8rem]">
          <thead>
            <tr className="border-b border-line text-[0.68rem] uppercase tracking-wider text-slate-400">
              <th className="py-2.5 font-bold">File</th>
              <th className="py-2.5 font-bold">Read from the sheet</th>
              <th className="py-2.5 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {(compact ? BULK_ROWS.slice(0, 3) : BULK_ROWS).map((r) => (
              <tr key={r.file} className={`border-b border-line/70 last:border-0 ${r.state === "nomatch" || r.state === "ambiguous" ? "bg-warn-50/50" : ""}`}>
                <td className="py-2.5 pr-3">
                  <p className="flex items-center gap-1.5 font-semibold text-ink"><FileText className="h-3.5 w-3.5 text-slate-400" /> {r.file}</p>
                  <p className="text-slate-400">{r.pages} pages</p>
                </td>
                <td className={`py-2.5 pr-3 ${r.state === "nomatch" ? "text-slate-400" : "text-slate-600"}`}>
                  {r.read}
                  {r.state === "ambiguous" && <p className="text-warn">Two students match</p>}
                </td>
                <td className="py-2.5">
                  {r.state === "checked" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-50 px-2.5 py-1 font-semibold text-ok"><CheckCircle2 className="h-3.5 w-3.5" /> Checked · {r.detail}</span>
                  )}
                  {r.state === "grading" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-2.5 py-1 font-semibold text-slate-600"><Loader2 className="h-3.5 w-3.5 animate-spin" /> {r.detail}</span>
                  )}
                  {(r.state === "nomatch" || r.state === "ambiguous") && (
                    <span className="inline-flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full border border-warn/30 bg-warn-50 px-2.5 py-1 font-semibold text-warn">{r.state === "nomatch" ? "No match" : "Ambiguous"}</span>
                      <span className="rounded-full bg-pen px-2.5 py-1 font-semibold text-white">Pick student</span>
                      <span className="rounded-full border border-line px-2.5 py-1 font-semibold text-slate-600">Skip</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Upload dialog                                                        */
/* ------------------------------------------------------------------ */

export function UploadDialog() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-paper">
      <div className="border-b border-line px-5 py-4 text-center">
        <p className="h-card text-lg text-ink">Upload & check copies</p>
      </div>
      <div className="space-y-3 p-5">
        <div className="grid place-items-center rounded-xl border-2 border-dashed border-paper-3 bg-paper px-4 py-6 text-center">
          <Upload className="h-6 w-6 text-pen" />
          <p className="mt-2 text-sm font-semibold text-ink">Drop PDF copies here or click to choose</p>
          <p className="text-xs text-slate-500">One file per student · up to 200 files · 60 MB each</p>
        </div>
        <ul className="divide-y divide-line rounded-xl border border-line text-sm">
          {[["IX-B_scan_014.pdf", 7], ["IX-B_scan_015.pdf", 8], ["IMG_2041.pdf", 6]].map(([f, p]) => (
            <li key={f as string} className="flex items-center justify-between px-3 py-2">
              <span className="flex items-center gap-2 text-ink"><FileText className="h-4 w-4 text-pen" /> {f}</span>
              <span className="text-xs text-slate-500">{p} pages</span>
            </li>
          ))}
        </ul>
        <div className="rounded-xl border border-line bg-paper px-3 py-2.5 text-sm">
          <p className="font-semibold text-ink">3 copies · 21 pages · ₹21</p>
          <p className="text-xs text-slate-500">₹1 per page · names are read for free</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span className="grid h-4 w-4 place-items-center rounded bg-pen text-white"><Tick className="h-3 w-3" color="#fff" /></span>
          Email me when the check is done
        </label>
        <div className="flex justify-end gap-2">
          <span className="btn btn-outline !py-2 text-sm">Cancel</span>
          <span className="btn btn-pen !py-2 text-sm">Check 3 copies</span>
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Marking scheme (rubric) card                                         */
/* ------------------------------------------------------------------ */

export function RubricCard() {
  const criteria = [
    { name: "Names valid factors of climate (latitude, altitude, distance from the sea, ocean currents, relief, winds)", marks: "1.5" },
    { name: "Explains how each factor affects climate", marks: "1" },
    { name: "Uses a correct example", marks: "0.5" },
  ];
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-paper">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="text-sm">
          <p className="font-semibold text-ink">Q30 · Explain the factors affecting climate.</p>
          <p className="text-slate-500">3 marks · Section C</p>
        </div>
        <div className="flex rounded-full border border-line p-0.5 text-xs font-semibold">
          <span className="flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-white"><Sparkles className="h-3 w-3" /> AI draft</span>
          <span className="px-2.5 py-1 text-slate-500">Your scheme</span>
        </div>
      </div>
      <ul className="divide-y divide-line">
        {criteria.map((c) => (
          <li key={c.name} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
            <span className="text-slate-700">{c.name}</span>
            <span className="shrink-0 rounded-md bg-paper-2 px-2 py-0.5 font-mono text-xs font-semibold text-ink">{c.marks}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-line bg-paper px-5 py-3 text-sm">
        <span className="text-slate-500">Criteria add up to</span>
        <span className="font-mono font-semibold text-ink">3 / 3</span>
      </div>
      <div className="border-t border-line px-5 py-3 text-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Model answer (optional)</p>
        <p className="mt-1 text-slate-600">Latitude, altitude, pressure and wind system, distance from the sea, ocean currents and relief features…</p>
      </div>
      <div className="flex items-center gap-2 border-t border-line px-5 py-3 text-xs text-slate-500">
        <Pencil className="h-3.5 w-3.5" /> Used for every student in this assessment
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Teacher review panel                                                 */
/* ------------------------------------------------------------------ */

export function ReviewPanel() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-paper">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="text-sm">
          <p className="font-semibold text-ink">Aditi Sharma · IX-B · Roll 14</p>
          <p className="text-slate-500">Social Science · Half-Yearly Mock 4</p>
        </div>
        <div className="text-right">
          <p className="h-card text-2xl text-ink">38<span className="text-base text-slate-400">/80</span></p>
          <p className="text-xs text-slate-500">38 of 38 questions</p>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="rounded-xl border border-line p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Q30 · Factors affecting climate</p>
            <span className="rounded-full bg-paper-2 px-2.5 py-0.5 font-mono text-xs font-semibold text-ink">0.5 / 3</span>
          </div>
          <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">Student&apos;s answer, as read</p>
          <p className="mt-1 hand text-[1.02rem] font-normal leading-snug text-biro">1. Temperature 2. Humidity 3. Precipitation 4. Atmospheric Pressure 5. Wind</p>
          <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">Feedback</p>
          <p className="mt-1 text-sm text-slate-700">Only weather elements listed; no factors of climate explained.</p>
          <div className="mt-3 flex gap-2">
            <span className="btn btn-outline !px-3 !py-1.5 text-xs"><Pencil className="h-3 w-3" /> Edit marks</span>
            <span className="btn btn-outline !px-3 !py-1.5 text-xs">Criteria breakdown</span>
          </div>
        </div>
        <div className="rounded-xl border border-warn/40 bg-warn-50/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Q21 · Define social science</p>
            <span className="flex items-center gap-2">
              <span className="rounded-full bg-warn-50 px-2 py-0.5 text-[0.7rem] font-bold text-warn ring-1 ring-warn/30">Edited</span>
              <span className="rounded-full bg-paper-2 px-2.5 py-0.5 font-mono text-xs font-semibold text-ink">1.5 / 2</span>
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">Teacher changed 1 → 1.5. Kept even if the copy is checked again.</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line bg-paper px-5 py-3">
        <span className="flex items-center gap-1.5 text-xs text-slate-500"><Mail className="h-3.5 w-3.5" /> Students see nothing until you release</span>
        <span className="btn btn-pen !py-2 text-sm">Release result</span>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Question paper → questions                                           */
/* ------------------------------------------------------------------ */

export function PaperImport() {
  const qs = [
    { n: "1–20", t: "Write the correct answer (1 mark each)", m: "20" },
    { n: "21–26", t: "Very short answer questions", m: "12" },
    { n: "27–31", t: "Short answer questions", m: "15" },
    { n: "32–35", t: "Long answer questions", m: "20" },
    { n: "36–37", t: "Case-based questions", m: "10" },
    { n: "38", t: "Map work", m: "3" },
  ];
  return (
    <div className="grid items-center gap-4 sm:grid-cols-[0.8fr_auto_1.2fr]">
      <figure className="ruled relative aspect-[3/4] overflow-hidden rounded-lg border border-line p-5 pl-16 shadow-paper">
        <p className="text-center font-display text-sm font-bold text-ink">Social Science</p>
        <p className="text-center text-[0.65rem] text-slate-500">Half-Yearly Mock Test 4 · Class IX · 80 marks</p>
        <div className="mt-4 space-y-2.5">
          {[90, 75, 82, 60, 88, 70, 78, 55, 84].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-slate-300/70" style={{ width: `${w}%` }} />
          ))}
        </div>
        <p className="mt-4 text-[0.6rem] font-bold uppercase tracking-wider text-slate-400">question-paper.pdf</p>
      </figure>
      <div className="flex justify-center text-pen sm:block">
        <svg viewBox="0 0 60 24" className="h-6 w-14 rotate-90 sm:rotate-0" aria-hidden>
          <path d="M2 12 C 18 6, 36 18, 54 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M46 5 L55 12 L46 19" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-paper">
        <div className="flex items-center justify-between border-b border-line px-4 py-3 text-sm">
          <p className="font-semibold text-ink">38 questions found</p>
          <span className="font-mono text-xs text-slate-500">80 marks</span>
        </div>
        <ul className="divide-y divide-line text-sm">
          {qs.map((q) => (
            <li key={q.n} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <span className="flex items-center gap-3">
                <span className="w-12 shrink-0 font-mono text-xs text-slate-400">Q{q.n}</span>
                <span className="text-slate-700">{q.t}</span>
              </span>
              <span className="shrink-0 font-mono text-xs font-semibold text-ink">{q.m}</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-line bg-paper px-4 py-2.5 text-xs text-slate-500">Edit any question or mark before you check copies.</p>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Typed answer grading                                                 */
/* ------------------------------------------------------------------ */

export function TypedAnswerMock() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-paper">
      <div className="border-b border-line px-5 py-3.5 text-sm">
        <p className="font-semibold text-ink">Q2 · Write an email to your principal requesting a science club. (5 marks, 120–150 words)</p>
      </div>
      <div className="p-5">
        <div className="rounded-xl border border-line bg-paper p-4 text-sm leading-relaxed text-slate-700">
          <p>Respected Ma&apos;am,</p>
          <p className="mt-2">I am writing to request permission to start a science club in our school. Many students in Class IX are interested in experiments beyond the syllabus…</p>
          <p className="mt-2 text-xs text-slate-400">138 words</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[["Format", "1 / 1"], ["Content", "1.5 / 2"], ["Organisation", "1 / 1"], ["Language", "0.5 / 1"]].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-line px-3 py-2">
              <p className="text-xs text-slate-500">{k}</p>
              <p className="font-mono text-sm font-semibold text-ink">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm text-slate-700">
          <Cross className="mt-0.5 h-4 w-4 shrink-0" /> Purpose is clear, but no proposed timing or teacher in charge; two spelling errors.
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-line bg-paper px-5 py-3 text-sm">
        <span className="text-slate-500">Graded in about 20 seconds</span>
        <span className="font-mono font-semibold text-ink">4 / 5</span>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Small annotation legend used beside crops                            */
/* ------------------------------------------------------------------ */

export function MarkLegend() {
  const items = [
    { icon: <Tick className="h-5 w-5" />, label: "Tick on what earned marks" },
    { icon: <Cross className="h-5 w-5" />, label: "Cross, with the correct answer beside it" },
    { icon: <span className="hand text-base text-pen">1.5/2</span>, label: "Marks per question, in half-mark steps" },
    { icon: <span className="hand text-sm text-pen">note</span>, label: "A short note where marks were lost" },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm text-slate-700">
          <span className="grid h-8 w-12 shrink-0 place-items-center">{i.icon}</span>
          {i.label}
        </li>
      ))}
    </ul>
  );
}
