import { COPY, type Disagreement, type Verdict } from "@/content/sideBySide";

export const VERDICT_LABEL: Record<Verdict, { text: string; cls: string }> = {
  evalezy: { text: "Evalezy caught it", cls: "bg-pen text-white" },
  teacher: { text: "Teacher was right", cls: "bg-[#1f7a35] text-white" },
  judgement: { text: "Judgement call", cls: "bg-paper-2 text-ink ring-1 ring-line" },
};

/** The two totals, side by side, with the honest headline numbers. */
export function Scoreboard({ evalezyRight, teacherRight, calls }: { evalezyRight: number; teacherRight: number; calls: number }) {
  return (
    <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-paper md:p-7">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#eef7f0] p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#1f7a35]">Teacher · green pen</p>
          <p className="h-display mt-2 text-5xl text-ink">{COPY.teacherTotal}<span className="text-2xl text-slate-400">/{COPY.marks}</span></p>
          <p className="mt-2 text-sm text-slate-600">{COPY.teacherNotes} written notes</p>
        </div>
        <div className="rounded-2xl bg-pen-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-pen-700">Evalezy · red pen</p>
          <p className="h-display mt-2 text-5xl text-ink">{COPY.evalezyTotal}<span className="text-2xl text-slate-400">/{COPY.marks}</span></p>
          <p className="mt-2 text-sm text-slate-600">{COPY.evalezyNotes} written notes</p>
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold text-ink">They disagreed on {evalezyRight + teacherRight + calls} of {COPY.questions} questions:</p>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2"><span className="text-slate-700">Slips Evalezy caught that the teacher ticked</span><span className="h-card text-lg text-pen">{evalezyRight}</span></li>
        <li className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2"><span className="text-slate-700">Answers Evalezy misread that the teacher got right</span><span className="h-card text-lg text-[#1f7a35]">{teacherRight}</span></li>
        <li className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2"><span className="text-slate-700">Half-mark judgement calls</span><span className="h-card text-lg text-ink">{calls}</span></li>
      </ul>
    </div>
  );
}

/** One disputed question: teacher crop and Evalezy crop of the same lines, with the verdict. */
export function DisagreementCard({ d, large = false }: { d: Disagreement; large?: boolean }) {
  const v = VERDICT_LABEL[d.verdict];
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <p className="h-card text-lg text-ink">
          Q{d.q} <span className="text-sm font-medium text-slate-500">· page {d.page} · student wrote {d.wrote}</span>
        </p>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${v.cls}`}>{v.text}</span>
      </header>
      {/* Crops are wide and short, so they sit side by side only in full-width cards; otherwise they stack. */}
      <div className={`grid gap-px bg-line ${large ? "lg:grid-cols-2" : ""}`}>
        {(["teacher", "ai"] as const).map((who) => (
          <figure key={who} className="bg-white p-3">
            <figcaption className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm">
              <span className={`text-xs font-bold uppercase tracking-wider ${who === "teacher" ? "text-[#1f7a35]" : "text-pen-700"}`}>{who === "teacher" ? "Teacher" : "Evalezy"}</span>
              <span className="text-slate-600">{who === "teacher" ? d.teacher : d.evalezy}</span>
            </figcaption>
            <img
              src={`/side-by-side/q${d.q}-${who}.jpg`}
              alt={`Q${d.q} as checked by ${who === "teacher" ? "the teacher" : "Evalezy"}: ${who === "teacher" ? d.teacher : d.evalezy}`}
              width={d.w}
              height={d.h}
              loading="lazy"
              className="w-full rounded-md border border-line"
            />
          </figure>
        ))}
      </div>
      <p className="border-t border-line px-5 py-4 leading-relaxed text-slate-700">{d.why}</p>
    </article>
  );
}
