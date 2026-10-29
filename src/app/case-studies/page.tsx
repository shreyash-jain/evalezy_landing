import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { COPY, count } from "@/content/sideBySide";

const PATH = "/case-studies/";
export const metadata = pageMetadata(PATH);

const STUDIES = [
  {
    href: "/blog/case-study-ai-vs-teacher-maths-answer-copy/",
    img: "/side-by-side/q30-ai.jpg",
    alt: "Evalezy's red-pen note on a maths copy: Check wrong: 37+25 = 62, not 65",
    w: 1100,
    h: 370,
    tag: "Maths · AI vs teacher",
    title: "One maths copy, checked by a teacher and by AI",
    body: `A ${COPY.subject.toLowerCase()} checked twice. Evalezy caught ${count("evalezy")} slips the teacher had ticked; the teacher was right on ${count("teacher")} answers Evalezy misread. Why the two belong together.`,
    stats: [
      { k: "Teacher", v: `${COPY.teacherTotal}/${COPY.marks}` },
      { k: "Evalezy", v: `${COPY.evalezyTotal}/${COPY.marks}` },
      { k: "Notes written", v: `${COPY.teacherNotes} vs ${COPY.evalezyNotes}` },
    ],
  },
  {
    href: "/blog/case-study-class-9-social-science-copy-phone-photo/",
    img: "/copy/crop-long.webp",
    alt: "A 3-mark answer marked 0.5/3 with the note: Only weather elements listed; no factors of climate explained",
    w: 1400,
    h: 434,
    tag: "Social Science · Phone photo",
    title: "A Class IX copy, photographed on a phone and checked by AI",
    body: "Seven pages of a spiral notebook, shot on a phone. 38 questions marked in half marks with reasons, written back onto the pages in red pen, and one slip left in on purpose.",
    stats: [
      { k: "Questions", v: "38" },
      { k: "AI total", v: "38/80" },
      { k: "Pages", v: "7" },
    ],
  },
];

const EXAMPLES = [
  {
    t: "A school, after half-yearly exams",
    steps: ["Upload the question paper; review the marking scheme Evalezy drafts", "Upload each section’s copies, up to 200 PDFs at a time", "Class teachers review marks and reasons, edit, and release", "Students get their checked copy by email, and results on WhatsApp via automations"],
  },
  {
    t: "A coaching institute, after every weekend test",
    steps: ["Set the test once; the same scheme is used for every batch", "Scan copies at each centre (soon from the Evalezy app)", "Copies are matched to students by name and roll number", "Faculty review and edit marks, then release results"],
  },
  {
    t: "A UPSC answer-writing programme",
    steps: ["Mentors set the scheme per question, or edit Evalezy’s", "Aspirants’ daily answers are scanned and checked", "Mentors review the AI’s marks and notes before release", "Each aspirant gets their own copy with notes on every answer"],
  },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Case studies"
      h1="Real copies, checked by Evalezy, shown in full."
      lede="We do not publish accuracy percentages. We publish checked copies: every page, every mark and every mistake, so you can judge for yourself before you try it on your own students’ copies."
    >
      <section className="wrap py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {STUDIES.map((s) => (
            <Link key={s.href} href={s.href} className="card card-hover group flex flex-col overflow-hidden">
              <div className="border-b border-line bg-paper p-4">
                <img src={s.img} alt={s.alt} width={s.w} height={s.h} loading="lazy" className="w-full rounded-lg border border-line bg-white" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="eyebrow">{s.tag}</p>
                <h2 className="h-card mt-2 text-2xl text-ink">{s.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{s.body}</p>
                <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
                  {s.stats.map((x) => (
                    <div key={x.k}>
                      <dt className="text-xs text-slate-500">{x.k}</dt>
                      <dd className="h-card mt-1 text-xl text-ink">{x.v}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-pen-700">Read the case study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Both copies are real and unedited. They are not customer results. Page-by-page views:{" "}
          <Link href="/side-by-side/" className="underline underline-offset-2 hover:text-ink">AI vs teacher</Link> ·{" "}
          <Link href="/sample/" className="underline underline-offset-2 hover:text-ink">sample checked copy</Link>.
        </p>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow">Example workflows</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">How institutes like yours would run it.</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">These are examples of the workflow, not customer stories.</p>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {EXAMPLES.map((e) => (
              <div key={e.t} className="card p-6">
                <p className="h-card text-lg text-ink">{e.t}</p>
                <ol className="mt-4 space-y-3">
                  {e.steps.map((st, i) => (
                    <li key={st} className="flex gap-3 text-slate-600">
                      <span className="hand w-5 shrink-0 text-xl leading-6 text-pen">{i + 1}</span>
                      <span className="leading-relaxed">{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-20">
        <div className="card grid gap-6 p-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <h2 className="h-card text-2xl text-ink">Run your own case study.</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Take 30–50 copies your teachers have already marked, run them through Evalezy and compare question by
              question before you decide. Book a demo and we will set it up with you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link href="/demo/" className="btn btn-pen" data-track="book_demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/compare/" className="btn btn-outline">Compare tools</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
