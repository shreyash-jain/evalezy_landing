import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { CopyCompareViewer } from "@/components/SideBySide";
import { DisagreementCard, Scoreboard, VERDICT_LABEL } from "@/components/SideBySideBlocks";
import { TickList } from "@/components/Pen";
import { COPY, DISAGREEMENTS, byVerdict, count } from "@/content/sideBySide";

const PATH = "/side-by-side/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  const caught = byVerdict("evalezy");
  const misread = byVerdict("teacher");
  const calls = byVerdict("judgement");
  return (
    <PageShell
      path={PATH}
      eyebrow="AI vs teacher"
      h1={<>One answer copy. <span className="marker">Checked twice.</span></>}
      lede={
        <>
          A {COPY.subject.toLowerCase()}: {COPY.marks} marks, {COPY.questions} questions, {COPY.pages} pages. A teacher checked it in green pen. Evalezy checked the same scan in red. Each caught mistakes the other missed, and that is exactly why Evalezy never releases marks without a teacher.
        </>
      }
      visual={<Scoreboard evalezyRight={count("evalezy")} teacherRight={count("teacher")} calls={count("judgement")} />}
      faqs={[
        { q: "Is this a real teacher’s copy?", a: "Yes. A teacher checked this copy by hand. We ran the same scan through Evalezy and put the two side by side, unedited. We have left Evalezy’s mistakes in." },
        { q: "Why does Evalezy give 8 marks fewer?", a: "Two deductions are fair (Q30 and Q28: slips the teacher ticked). Five are Evalezy misreading handwriting (Q6, Q18, Q25, Q26, Q29): a 7 read as a 1, a small minus sign, a crossed-out number. The rest are half-mark judgement calls. A teacher reviewing Evalezy’s marks fixes those five in a few clicks." },
        { q: "So is AI checking better than a teacher?", a: "Not on its own, and we don’t claim it is. On this copy Evalezy was more thorough about working and wrote a reason for every lost mark; the teacher read handwriting better. Together they get it right, which is how Evalezy is built: AI first check, teacher review, then release." },
        { q: "Where does the teacher review happen?", a: "On the review screen: every answer as Evalezy read it, the marks, the reason and the criteria. A teacher changes any mark, and that edit is never overwritten. Students see nothing until the teacher releases." },
      ]}
    >
      <section className="wrap py-16 md:py-20">
        <p className="eyebrow">Page by page</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Drag across the page to compare.</h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">Both copies are the same scan, so every difference you see is a difference in checking.</p>
        <div className="mt-8">
          <CopyCompareViewer />
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-20">
          <p className="eyebrow">What Evalezy caught</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">Two slips the teacher ticked.</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Right final answers with wrong working: easy to tick past at copy 40. Evalezy checks every line against the scheme and says what went wrong.</p>
          <div className="mt-10 space-y-6">
            {caught.map((d) => <DisagreementCard key={d.q} d={d} large />)}
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-20">
        <p className="eyebrow">What the teacher caught</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Five answers Evalezy misread.</h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">A 7 read as a 1, a minus sign too small to see, a number the student had crossed out. The teacher read the handwriting correctly every time. These are the marks a teacher fixes in review before anything is released.</p>
        <div className="mt-10 grid items-start gap-6 xl:grid-cols-2">
          {misread.map((d) => <DisagreementCard key={d.q} d={d} />)}
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-20">
          <p className="eyebrow">Judgement calls</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">Three half-mark differences.</h2>
          <div className="mt-10 grid items-start gap-6 xl:grid-cols-2">
            {calls.map((d) => <DisagreementCard key={d.q} d={d} />)}
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-20">
        <h2 className="h-section max-w-3xl text-ink">Every disagreement, in one table</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="bg-paper-2 text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Q</th>
                <th className="px-4 py-3 font-semibold">Student wrote</th>
                <th className="px-4 py-3 font-semibold text-[#1f7a35]">Teacher</th>
                <th className="px-4 py-3 font-semibold text-pen-700">Evalezy</th>
                <th className="px-4 py-3 font-semibold">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {[...DISAGREEMENTS].sort((a, b) => a.q - b.q).map((d) => (
                <tr key={d.q} className="border-t border-line align-top">
                  <td className="px-4 py-3 font-mono font-semibold text-ink">Q{d.q}</td>
                  <td className="px-4 py-3 text-slate-700">{d.wrote}</td>
                  <td className="px-4 py-3 text-slate-700">{d.teacher}</td>
                  <td className="px-4 py-3 text-slate-700">{d.evalezy}</td>
                  <td className="px-4 py-3"><span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${VERDICT_LABEL[d.verdict].cls}`}>{VERDICT_LABEL[d.verdict].text}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Totals: teacher {COPY.teacherTotal}/{COPY.marks}, Evalezy {COPY.evalezyTotal}/{COPY.marks}. Every other question was marked the same by both. Checked by hand against the student’s working on 2 October 2026; there was no question paper, so items that depend on it are judgement calls.
        </p>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="dots-dark pointer-events-none absolute inset-0" />
        <div className="wrap relative grid gap-10 py-16 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow eyebrow-dark">The point</p>
            <h2 className="h-section mt-3 text-white">Neither checker got everything right. Together, they did.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Evalezy is more thorough about working, and writes a reason beside every lost mark. A teacher reads handwriting better. So Evalezy does the first check, a teacher reviews it, and nothing reaches students until the teacher releases.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/teacher-review/" className="btn btn-pen btn-lg">How teacher review works <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/demo/" className="btn btn-ghost-dark btn-lg" data-track="book_demo">Try it on your copies</Link>
            </div>
          </div>
          <TickList
            dark
            items={[
              "Both slips Evalezy caught stay caught: the teacher just confirms them",
              "All five misreads are visible on the review screen, with the answer as Evalezy read it, so they are quick to fix",
              "A teacher’s edit is never overwritten, even if the copy is checked again",
              "Students see nothing until the teacher presses Release",
            ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
