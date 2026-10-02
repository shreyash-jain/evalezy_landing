import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, FileStack, ScanLine, Search, ShieldCheck, Sigma, Timer, UserRoundCheck } from "lucide-react";
import { SITE, bookHref } from "@/lib/site";
import { AUDIENCES } from "@/content/audiences";
import { HOME_FAQS } from "@/content/faqs";
import { SNIPPETS } from "@/content/api";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, FaqList, Icon, SectionHeading } from "@/components/ui";
import { PenCircle, PenUnderline, TickList } from "@/components/Pen";
import { BulkCheckPanel, CheckedCopyStack, ReviewPanel, RubricCard, ScoreTableVsCopy, UploadDialog } from "@/components/Visuals";
import { ApiTabs, CopyAnatomy, PriceCalculator } from "@/components/Interactive";
import { DemoForm } from "@/components/DemoForm";
import { COPY, count } from "@/content/sideBySide";
import { ClientMarquee } from "@/components/ClientLogos";

export const metadata: Metadata = {
  alternates: { canonical: SITE },
};

const STEPS = [
  { n: "01", title: "Upload the question paper", body: "It is read into questions with their marks. Fix anything in a minute, no retyping." },
  { n: "02", title: "Set the marking scheme", body: "Accept the AI's draft for each question, edit it, or write your own with model answers." },
  { n: "03", title: "Upload every copy at once", body: "Up to 200 PDFs. Names and roll numbers are read from each sheet and matched to your students." },
  { n: "04", title: "Review, then release", body: "Marks fill in live. Change any mark, then release. Students get their checked copy by email." },
];

const TRUST = [
  { icon: Search, title: "Answers found by content", body: "Students answer out of order. Evalezy matches each answer to its question by what it says, not by the number written beside it." },
  { icon: Sigma, title: "Maths gets a second read", body: "Equations and working are read from the page; lines it is unsure of go to a dedicated equation reader." },
  { icon: ScanLine, title: "Never guesses an unreadable page", body: "If most of a copy cannot be read, the check stops with a clear reason. No invented marks, and no charge." },
  { icon: BadgeCheck, title: "Marks that add up", body: "Criteria always sum to the question's marks, marks come in half steps, and every deduction gets one clear note." },
  { icon: UserRoundCheck, title: "Never guesses a student", body: "No name, a weak match or two close names? The copy waits for you to pick. It is never filed under the wrong student." },
  { icon: ShieldCheck, title: "Teachers have the last word", body: "Marks are a draft until released. A teacher's edit is never overwritten, even if the copy is checked again." },
];

export default function Home() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Evalezy: AI Answer Sheet Checking for Handwritten Copies",
          url: SITE,
          isPartOf: { "@id": `${SITE}/#website` },
          about: { "@id": `${SITE}/#app` },
          primaryImageOfPage: `${SITE}/copy/page-1.webp`,
        }}
      />

      {/* ------------------------------------------------------------ HERO */}
      <section className="relative overflow-hidden">
        <div className="ruled-faint pointer-events-none absolute inset-0" />
        <div className="wrap relative grid gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-8 lg:pb-24">
          <div>
            <p className="eyebrow animate-rise">AI answer sheet checking</p>
            <h1 className="h-display mt-4 animate-rise text-[2.7rem] text-ink [animation-delay:80ms] sm:text-6xl lg:text-[4.3rem]">
              Handwritten copies, checked by AI in a <PenUnderline>teacher&apos;s red pen.</PenUnderline>
            </h1>
            <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-slate-600 [animation-delay:160ms] md:text-xl">
              Upload a whole class&apos;s scanned answer sheets at once. Evalezy reads every student&apos;s name, marks each answer against
              one marking scheme, and hands back the student&apos;s own copy with ticks, crosses, notes and the total circled. You review and release.
            </p>
            <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
              <Link href={bookHref()} className="btn btn-pen btn-lg" data-track="book_demo">
                Book a demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sample/" className="btn btn-outline btn-lg" data-track="view_sample">
                See a real checked copy
              </Link>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="text-sm text-slate-500">Price</dt>
                <dd className="h-card mt-1 text-2xl text-ink">₹1 <span className="text-base font-semibold text-slate-500">/ page</span></dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">One upload</dt>
                <dd className="h-card mt-1 text-2xl text-ink">200 <span className="text-base font-semibold text-slate-500">copies</span></dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Failed checks</dt>
                <dd className="h-card mt-1 text-2xl text-ink">Free</dd>
              </div>
            </dl>
          </div>
          <CheckedCopyStack />
        </div>
      </section>

      {/* ------------------------------------------------------------ CLIENTS (Vacademy's) */}
      <section className="border-t border-line bg-white py-12 md:py-14">
        <ClientMarquee />
      </section>

      {/* ------------------------------------------------------------ PROBLEM STRIP */}
      <section className="border-y border-line bg-white">
        <div className="wrap grid gap-8 py-12 md:grid-cols-3 md:py-14">
          {[
            { k: "The pile", v: "After every exam, a teacher carries home a stack of copies and gives up evenings and weekends to check them." },
            { k: "The drift", v: "Copy 5 and copy 95 are not marked the same way. Neither are two teachers checking the same paper." },
            { k: "The number", v: "Under time pressure, students get a score and a few ticks, rarely the reason they lost marks." },
          ].map((x) => (
            <div key={x.k}>
              <p className="hand text-2xl text-pen">{x.k}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{x.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ THE COPY ITSELF */}
      <section className="wrap py-20 md:py-28">
        <SectionHeading
          eyebrow="What makes Evalezy different"
          title={<>Not a score table. <span className="marker">The copy itself,</span> checked.</>}
          lede="Most AI graders give you a number per question. Evalezy writes back onto the student's own pages, the way a teacher would, so students can see exactly where marks were won and lost."
        />
        <div className="mt-12">
          <ScoreTableVsCopy />
        </div>
        <div className="mt-20">
          <CopyAnatomy />
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          This is a real Class IX Social Science copy checked by Evalezy, photographed on a phone.{" "}
          <Link href="/sample/" className="font-semibold text-pen-700 underline underline-offset-4">Read all 7 pages</Link>
        </p>
      </section>

      {/* ------------------------------------------------------------ HOW IT WORKS */}
      <section className="border-y border-line bg-white" id="how">
        <div className="wrap py-20 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="How it works" title="From question paper to released results in four steps." />
            <Link href="/how-it-works/" className="inline-flex items-center gap-1 font-semibold text-pen-700">Every step in detail <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="margin-line relative rounded-2xl border border-line p-6 pl-[4.25rem]">
                <span className="hand absolute left-4 top-5 text-2xl text-pen">{s.n}</span>
                <p className="h-card text-lg text-ink">{s.title}</p>
                <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------ BULK */}
      <section className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">Bulk upload & student matching</p>
          <h2 className="h-section mt-3 text-ink">Drop in 200 copies. Each one finds its student.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Scan the whole section into one folder and upload it. Evalezy reads the name, roll number and class written at the top
            of each copy and matches it to your students. When it is not sure, it asks you instead of guessing.
          </p>
          <TickList
            className="mt-6"
            items={[
              "Phone photos or scanner PDFs, one file per student, up to 60 MB each",
              "Reading names is free; you pay only for pages checked",
              "Copies with no name or two close matches wait for you to pick",
              "Or check the copies students uploaded themselves in one click",
              "A bell alert and an email when the batch is done",
            ]}
          />
          <Link href="/bulk-upload/" className="mt-8 inline-flex items-center gap-1 font-semibold text-pen-700">How matching works <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="space-y-5">
          <BulkCheckPanel />
          <div className="hidden sm:block lg:hidden xl:block">
            <div className="ml-auto max-w-sm">
              <UploadDialog />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ RUBRIC + REVIEW (dark) */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="dots-dark pointer-events-none absolute inset-0" />
        <div className="wrap relative py-20 md:py-28">
          <SectionHeading
            dark
            eyebrow="Consistent marking, teacher control"
            title="One marking scheme for every student. The final word for every teacher."
            lede="Each question gets a scheme once, used for copy 1 and copy 200 alike. Then the marks land as a draft for you to review, change and release."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300"><span className="hand text-xl text-pen-300">1.</span> The AI drafts the scheme; you can change every line</p>
              <RubricCard />
            </div>
            <div>
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300"><span className="hand text-xl text-pen-300">2.</span> You review every answer, change any mark, then release</p>
              <ReviewPanel />
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
            <Link href="/marking-scheme/" className="inline-flex items-center gap-1 font-semibold text-white hover:text-pen-200">AI marking scheme <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/teacher-review/" className="inline-flex items-center gap-1 font-semibold text-white hover:text-pen-200">Teacher review & release <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/question-paper-import/" className="inline-flex items-center gap-1 font-semibold text-white hover:text-pen-200">Question paper import <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ TRUST */}
      <section className="wrap py-20 md:py-28">
        <SectionHeading
          eyebrow="Built to be trusted with marks"
          title="Careful where it matters."
          lede="We do not publish an accuracy percentage; it depends on handwriting, scans and your scheme. Here is what Evalezy does instead to keep marks right."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST.map((t) => (
            <div key={t.title} className="card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-pen-50 text-pen-700"><t.icon className="h-5 w-5" /></span>
              <p className="h-card mt-4 text-lg text-ink">{t.title}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-white p-6 md:grid-cols-3">
          <p className="flex items-start gap-3 text-slate-600"><Timer className="mt-0.5 h-5 w-5 shrink-0 text-pen" /> <span><strong className="text-ink">1–8 minutes a copy</strong>, several at once. First results in about 10 minutes.</span></p>
          <p className="flex items-start gap-3 text-slate-600"><FileStack className="mt-0.5 h-5 w-5 shrink-0 text-pen" /> <span><strong className="text-ink">100 copies in about 2–3 hours.</strong> Upload in the evening, review in the morning.</span></p>
          <p className="flex items-start gap-3 text-slate-600"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-pen" /> <span><strong className="text-ink">Diagrams</strong> are judged by labels and explanation only; keep a teacher on those.</span></p>
        </div>
      </section>

      {/* ------------------------------------------------------------ AI VS TEACHER */}
      <section className="border-t border-line bg-white">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">One copy, checked twice</p>
            <h2 className="h-section mt-3 text-ink">We gave Evalezy a copy a teacher had already checked.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Same {COPY.subject.toLowerCase()}, same scan. Evalezy caught {count("evalezy")} slips the teacher had ticked.
              The teacher read {count("teacher")} answers correctly that Evalezy misread. Each caught what the other missed,
              which is why Evalezy&apos;s marks always wait for a teacher.
            </p>
            <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#eef7f0] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1f7a35]">Teacher</p>
                <p className="h-card mt-1 text-3xl text-ink">{COPY.teacherTotal}<span className="text-lg text-slate-400">/{COPY.marks}</span></p>
                <p className="text-sm text-slate-600">{COPY.teacherNotes} written notes</p>
              </div>
              <div className="rounded-2xl bg-pen-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-pen-700">Evalezy</p>
                <p className="h-card mt-1 text-3xl text-ink">{COPY.evalezyTotal}<span className="text-lg text-slate-400">/{COPY.marks}</span></p>
                <p className="text-sm text-slate-600">{COPY.evalezyNotes} written notes</p>
              </div>
            </div>
            <Link href="/side-by-side/" className="btn btn-ink mt-8">Compare every page <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line bg-paper">
            <figcaption className="flex items-center justify-between border-b border-line px-5 py-3 text-sm">
              <span className="font-semibold text-ink">Q30 · the student&apos;s check: 37 + 25 = 65</span>
              <span className="rounded-full bg-pen px-2.5 py-0.5 text-xs font-bold text-white">Evalezy caught it</span>
            </figcaption>
            <div className="grid gap-px bg-line sm:grid-cols-2">
              <div className="bg-white p-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#1f7a35]">Teacher: ticked</p>
                <img src="/side-by-side/q30-teacher.jpg" alt="The teacher's copy: the wrong check 37 + 25 = 65 is ticked" width={1100} height={370} loading="lazy" className="w-full rounded-md border border-line" />
              </div>
              <div className="bg-white p-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-pen-700">Evalezy: “= 62, not 65”</p>
                <img src="/side-by-side/q30-ai.jpg" alt="Evalezy's copy: the check is crossed with the note Check wrong: 37+25 = 62, not 65" width={1100} height={370} loading="lazy" className="w-full rounded-md border border-line" />
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* ------------------------------------------------------------ AUDIENCES */}
      <section className="border-y border-line bg-white">
        <div className="wrap py-20 md:py-28">
          <SectionHeading eyebrow="Who it's for" title="Anyone who checks handwritten answers at scale." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((a) => (
              <Link key={a.slug} href={`/for/${a.slug}/`} className="card card-hover group flex flex-col p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper-2 text-ink"><Icon name={a.icon} className="h-5 w-5" /></span>
                <p className="h-card mt-4 text-lg text-ink">{a.label}</p>
                <p className="mt-2 flex-1 leading-relaxed text-slate-600">{a.h1}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pen-700">See how <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ API */}
      <section className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="eyebrow">Evaluation API</p>
          <h2 className="h-section mt-3 text-ink">Building an edtech product? Put a red pen in it.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Create an assessment, set criteria, send an answer sheet by file or URL, and get marks, feedback and the checked PDF back
            by status call or webhook. Same price as the dashboard.
          </p>
          <ul className="mt-6 space-y-2 font-mono text-sm">
            {[["POST", "/assessments"], ["PUT", "/assessments/{id}/criteria"], ["POST", "/evaluations"], ["GET", "/evaluations/{id}"]].map(([m, p]) => (
              <li key={p} className="flex items-center gap-3">
                <span className={`w-12 rounded-md px-1.5 py-0.5 text-center text-xs font-bold ${m === "GET" ? "bg-ok-50 text-ok" : m === "PUT" ? "bg-warn-50 text-warn" : "bg-biro-50 text-biro"}`}>{m}</span>
                <span className="text-ink">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/api/" className="btn btn-ink">Read the API docs <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/demo/#api" className="btn btn-outline" data-track="request_api">Request API access</Link>
          </div>
        </div>
        <ApiTabs
          tabs={[
            { label: "cURL", code: SNIPPETS.evaluateCurl, file: "POST /evaluations" },
            { label: "Node.js", code: SNIPPETS.evaluateNode, file: "evaluate.mjs" },
            { label: "Python", code: SNIPPETS.evaluatePython, file: "evaluate.py" },
            { label: "Result", code: SNIPPETS.result, file: "GET /evaluations/ev_3kP9xW → 200" },
          ]}
        />
      </section>

      {/* ------------------------------------------------------------ PRICING */}
      <section className="border-y border-line bg-white" id="pricing">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 className="h-section mt-3 text-ink">
              <PenCircle>₹1</PenCircle> a page. That&apos;s it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              $0.01 a page outside India. No subscription, no setup fee, no per-teacher seats. The same price on the API.
            </p>
            <TickList
              className="mt-6"
              items={[
                "Question paper import, marking schemes, name matching and teacher review included",
                "Failed, stopped and unreadable copies are not charged",
                "A 7-page copy costs ₹7",
                "Volume plans for exam bodies and platforms",
              ]}
            />
            <Link href="/pricing/" className="mt-8 inline-flex items-center gap-1 font-semibold text-pen-700">Full pricing <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <PriceCalculator />
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="h-section text-ink">Questions teachers ask us</h2>
            <p className="mt-4 text-slate-600">
              More in the <Link href="/faq/" className="font-semibold text-pen-700 underline underline-offset-4">full FAQ</Link>.
            </p>
          </div>
          <FaqList faqs={HOME_FAQS} />
        </div>
      </section>

      {/* ------------------------------------------------------------ DEMO */}
      <section className="relative overflow-hidden border-t border-line" id="demo">
        <div className="ruled-faint pointer-events-none absolute inset-0" />
        <div className="wrap relative grid gap-12 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Book a demo</p>
            <h2 className="h-section mt-3 text-ink">Bring your own copies. Watch them get checked.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              In 20 minutes we upload a question paper and a few of your scanned answer sheets, and you see them checked in red pen, matched to students and ready to review.
            </p>
            <TickList
              className="mt-6"
              items={["See the checked copy on your own handwriting", "Set up your marking scheme together", "Get a cost estimate for your volume"]}
            />
          </div>
          <DemoForm origin="home" />
        </div>
      </section>

      <CtaBand title="Give your teachers their evenings back." body="Upload tonight's pile, review it tomorrow. ₹1 a page, and nothing reaches students until a teacher says so." />
    </main>
  );
}
