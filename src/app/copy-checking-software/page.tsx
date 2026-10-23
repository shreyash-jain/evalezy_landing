import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { CheckedCopyStack, ScoreTableVsCopy } from "@/components/Visuals";
import { TickList } from "@/components/Pen";
import { BEST_PATH } from "@/content/bestTools";

/*
 * Landing page for the head terms teachers type: "copy checking software", "copy checking app",
 * "online copy checking", "answer sheet checking software". Claims: docs/PRODUCT_FACTS.md.
 */
const PATH = "/copy-checking-software/";
export const metadata = pageMetadata(PATH);

const STEPS = [
  { title: "Scan or photograph the copies", body: "A scanner or a phone camera, one PDF per student. Spiral notebooks work; pages are straightened and cleaned before reading." },
  { title: "Add the question paper and marking scheme", body: "Upload the question paper and it is read into questions with marks. Accept the AI's draft scheme per question, edit it, or write your own." },
  { title: "Upload up to 200 copies at once", body: "Each student's name and roll number is read from the top of the first page and matched to your class list. Unsure matches wait for you." },
  { title: "Get every copy back checked", body: "Ticks, crosses with the correct answer, short notes where marks were lost, marks per question and the total circled on page one." },
  { title: "Review, then release", body: "Marks are drafts. Change any mark, then release; each student is emailed their checked copy as a PDF." },
];

const VS = [
  { aspect: "Time for 100 copies", manual: "About 10 hours at 6 minutes a copy", software: "About 2–3 hours of machine time, then a teacher's review" },
  { aspect: "Same standard for every copy", manual: "Drifts with fatigue and between teachers", software: "One marking scheme per question, applied to every copy" },
  { aspect: "Feedback on the copy", manual: "Depends on the teacher's time", software: "A tick, cross or note on every answer" },
  { aspect: "Who decides the final mark", manual: "The teacher", software: "The teacher. AI marks wait for release" },
  { aspect: "Diagrams and drawings", manual: "Fully judged", software: "Judged by labels and written explanation only" },
  { aspect: "Cost", manual: "Teacher time, or a fee per copy to outside checkers", software: "₹1 per page checked" },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Copy checking software"
      h1="Copy checking software that checks answer sheets like a teacher."
      lede="Evalezy is AI copy checking software for schools, coaching institutes and colleges. Upload a class's scanned or phone-photographed answer copies and get each one back checked in red pen, matched to the right student, ready for you to review. ₹1 per page."
      visual={<CheckedCopyStack />}
      faqs={[
        { q: "What is copy checking software?", a: "Software that marks students' handwritten answer copies. Evalezy reads each copy, finds every answer, marks it against the marking scheme for that question and writes the result back onto the student's pages in red pen, with the total circled. A teacher reviews and releases the marks." },
        { q: "Is there an app to check copies?", a: "Evalezy works in a web browser, inside the Vacademy dashboard. Copies photographed on a phone work: combine one student's photos into a PDF and upload it. Students can also upload their own answer sheet from an online test." },
        { q: "Can I check copies online without a scanner?", a: "Yes. Phone photos combined into a PDF work. The sample copy on this site is a phone photo of a spiral notebook. Mostly unreadable copies fail with a clear reason and are not charged." },
        { q: "Which classes and subjects does it work for?", a: "Any class whose answers are written in English, from school tests to college exams and UPSC answer writing. You set the marking scheme per question, so it follows your board's or institute's style. Maths working is read, with unclear lines sent to an equation reader. Diagrams are judged by their labels and written explanation, so keep a teacher on diagram-heavy questions." },
        { q: "Does it check Hindi-medium copies?", a: "Not yet. Evalezy is built and tested on English answer sheets. Students' names written in other scripts are still read for matching. Send us sample Hindi copies and we will tell you honestly how it does." },
        { q: "Is it a plagiarism checker?", a: "No. Copy checking here means marking students' answer copies. Evalezy does not check for plagiarism or AI-written text." },
        { q: "How accurate is AI copy checking?", a: "We do not publish an accuracy percentage, because it depends on handwriting, scan quality and the marking scheme. Every mark comes with the answer as read and the reason, low-confidence questions are flagged, and nothing reaches students until a teacher releases it. When we checked one maths copy both ways, Evalezy caught 2 slips the teacher had ticked and the teacher caught 5 answers Evalezy misread." },
      ]}
    >
      <section className="wrap py-16 md:py-24">
        <h2 className="h-section max-w-3xl text-ink">How copy checking with Evalezy works</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card p-6">
              <span className="hand text-2xl text-pen">{String(i + 1).padStart(2, "0")}</span>
              <p className="h-card mt-2 text-lg text-ink">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/how-it-works/" className="mt-8 inline-flex items-center gap-1 font-semibold text-pen-700">Every step in detail <ArrowRight className="h-4 w-4" /></Link>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-24">
          <FeatureRow
            eyebrow="Not a score table"
            title="Students get their own copy back, checked."
            body={
              <>
                <p>Most grading tools return a number per question. Evalezy writes on the student&apos;s own pages, the way a teacher would, so students see which line earned the tick and where the marks went.</p>
                <TickList items={["Half marks against criteria that add up to the question's marks", "The correct answer next to every cross", "Marks per question and the total circled on page one"]} />
                <Link href="/sample/" className="inline-flex items-center gap-1 font-semibold text-pen-700" data-track="view_sample">See a real 7-page checked copy <ArrowRight className="h-4 w-4" /></Link>
              </>
            }
            visual={<ScoreTableVsCopy />}
          />
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <h2 className="h-section max-w-3xl text-ink">Checking copies by hand vs copy checking software</h2>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[36rem] text-left">
            <thead className="bg-paper-2 text-sm text-ink">
              <tr><th className="px-5 py-3 font-semibold"> </th><th className="px-5 py-3 font-semibold">By hand</th><th className="px-5 py-3 font-semibold text-pen-700">With Evalezy</th></tr>
            </thead>
            <tbody>
              {VS.map((r) => (
                <tr key={r.aspect} className="border-t border-line align-top">
                  <th scope="row" className="px-5 py-3.5 text-sm font-semibold text-ink">{r.aspect}</th>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{r.manual}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-700">{r.software}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          More in <Link href="/compare/manual-checking/" className="underline underline-offset-2">Evalezy vs checking by hand</Link> and{" "}
          <Link href="/blog/how-to-check-answer-sheets-faster/" className="underline underline-offset-2">how to check 200 answer sheets faster</Link>.
        </p>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="h-section text-ink">What it costs</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              ₹1 per page checked in India, $0.01 elsewhere. No subscription, no setup fee, no per-teacher seats. A class of 40
              copies of 8 pages each costs ₹320. Failed, stopped and unreadable copies are free, and reading names is free.
            </p>
            <Link href="/pricing/" className="mt-6 inline-flex items-center gap-1 font-semibold text-pen-700">Full pricing <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div>
            <h2 className="h-section text-ink">Choosing copy checking software?</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We compared ten tools, one pick per job, with sourced capabilities and prices, including where another tool is the
              better choice (for example, Hindi-medium answers).
            </p>
            <Link href={BEST_PATH} className="mt-6 inline-flex items-center gap-1 font-semibold text-pen-700">Best AI copy checking software in 2026 <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
