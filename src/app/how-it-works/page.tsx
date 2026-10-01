import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const PATH = "/how-it-works/";
export const metadata = pageMetadata(PATH);

const SETUP = [
  { t: "Create the assessment and upload the question paper", b: "The paper is read into questions with their marks, sections and printed numbers. Edit anything that needs it.", link: "/question-paper-import/" },
  { t: "Check the marking scheme", b: "Each question gets criteria that add up to its marks. Accept the AI draft, edit it, or write your own and add model answers.", link: "/marking-scheme/" },
  { t: "Upload the copies", b: "Drop in up to 200 PDFs, one per student; or let students upload their own in an online test. Names and roll numbers are read and matched; anything uncertain waits for you.", link: "/bulk-upload/" },
];

const PIPELINE = [
  { t: "Read the page layout", b: "Each page is straightened, cleaned and contrast-boosted, and the position of every written line is found. Printed-text OCR alone cannot read handwriting, so it is only used for where lines are, never for what they say." },
  { t: "Read the handwriting", b: "A vision model reads every line as written, three pages at a time, row by row. It is told never to invent text; anything it cannot read is marked as unreliable." },
  { t: "Check the copy is readable", b: "If most pages are too blurred or blank to read, the check stops here with a clear reason. No marks are guessed and nothing is charged." },
  { t: "Second read for maths", b: "Up to four maths lines the reader was unsure of are sent to a dedicated equation reader and replaced with its reading." },
  { t: "Find each answer", b: "On copies of four pages or more, Evalezy works out which pages hold which answer, by content, so answers written out of order are still found. If a question then looks unattempted, the whole copy is searched again before it gets zero." },
  { t: "Mark each question", b: "Each answer is marked against its criteria, in half-mark steps, with the student's own words quoted. Low-confidence marks are re-asked. Marks appear on your screen question by question." },
  { t: "Make the marks add up", b: "Marks are capped at the maximum, criteria scaled to match, and each question gets exactly one score and one clear note." },
  { t: "Write on the copy", b: "Ticks, crosses, corrections, notes and marks are drawn onto the student's pages in a handwriting-style red pen, with the total circled on page one." },
];

const AFTER = [
  { t: "You are notified", b: "A bell alert and an email when the batch is done." },
  { t: "You review", b: "Answer as read, marks, feedback and criteria per question. Change any mark; your edit is kept." },
  { t: "You release", b: "Students get their checked copy by email. Until then they see \"Results pending\"." },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="How it works"
      h1="How Evalezy checks a handwritten answer sheet."
      lede="Three steps for you, eight for the machine, and a review before anything reaches students. Here is every step, including the ones that keep it from guessing."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to check handwritten answer sheets with Evalezy",
          description: "Upload a question paper, set the marking scheme, upload students' answer sheets, review the AI's marks and release checked copies.",
          url: `${SITE}${PATH}`,
          step: [...SETUP, ...AFTER].map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.t, text: s.b })),
        }}
      />
      <section className="wrap py-16 md:py-24">
        <p className="eyebrow">Your part</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Set up once per paper</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {SETUP.map((s, i) => (
            <li key={s.t} className="margin-line relative rounded-2xl border border-line p-6 pl-[4.25rem]">
              <span className="hand absolute left-4 top-5 text-2xl text-pen">{i + 1}.</span>
              <p className="h-card text-lg text-ink">{s.t}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{s.b}</p>
              <Link href={s.link} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pen-700">More <ArrowRight className="h-4 w-4" /></Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="dots-dark pointer-events-none absolute inset-0" />
        <div className="wrap relative py-16 md:py-24">
          <p className="eyebrow eyebrow-dark">Evalezy&apos;s part · 1–8 minutes a copy</p>
          <h2 className="h-section mt-3 max-w-3xl text-white">What happens to each copy</h2>
          <ol className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {PIPELINE.map((s, i) => (
              <li key={s.t} className="flex gap-5">
                <span className="hand w-10 shrink-0 text-3xl text-pen-300">{i + 1}</span>
                <div className="border-l border-white/10 pl-5">
                  <p className="h-card text-lg text-white">{s.t}</p>
                  <p className="mt-2 leading-relaxed text-slate-300">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-3xl text-sm text-slate-400">
            Several copies are checked at once. The first results usually appear within about 10 minutes of uploading, and 100 copies take roughly 2 to 3 hours. Copies up to 40 pages are read in full.
          </p>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <p className="eyebrow">Your part again · as long as you like</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Review and release</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {AFTER.map((s, i) => (
            <li key={s.t} className="card p-6">
              <span className="hand text-2xl text-pen">{i + 4}.</span>
              <p className="h-card mt-2 text-lg text-ink">{s.t}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{s.b}</p>
            </li>
          ))}
        </ol>
        <Link href="/teacher-review/" className="mt-8 inline-flex items-center gap-1 font-semibold text-pen-700">Teacher review in detail <ArrowRight className="h-4 w-4" /></Link>
      </section>
    </PageShell>
  );
}
