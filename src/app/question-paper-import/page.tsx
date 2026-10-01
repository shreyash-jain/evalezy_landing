import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { PaperImport, RubricCard } from "@/components/Visuals";
import { TickList } from "@/components/Pen";

const PATH = "/question-paper-import/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Question paper import"
      h1="Upload the question paper. Get a test ready to check."
      lede="AI checking needs to know the questions and their marks. Instead of typing 38 questions into a form, upload the question paper you already printed and Evalezy reads it into questions with their marks and sections."
      visual={<PaperImport />}
      faqs={[
        { q: "What format should the question paper be in?", a: "A PDF of the paper as you printed it. Typed papers work best; a clear scan of a printed paper also works." },
        { q: "Can I fix a question it read wrongly?", a: "Yes. Every question and mark can be edited before you check any copies." },
        { q: "We already uploaded copies to a test without questions. Can we still use AI checking?", a: "Yes. A test that only has an \"upload your answer sheet\" placeholder cannot be AI-checked, so the Submissions tab offers to read the attached question paper into questions and adopt them for that test." },
        { q: "Do I also need a marking scheme?", a: "Evalezy drafts one per question automatically the first time a copy is checked, so you can start without one. Most teachers review the draft or add model answers for the long questions first." },
      ]}
    >
      <section className="wrap space-y-20 py-16 md:py-24">
        <FeatureRow
          eyebrow="What gets read"
          title="Questions, marks, sections and numbering."
          body={
            <>
              <p>Evalezy keeps the question numbers as printed on the paper, so feedback and marks on the checked copy refer to the same &ldquo;Q21&rdquo; the student sees.</p>
              <TickList items={["Question text and maximum marks", "Sections, in paper order", "The number printed on the paper, kept for every question", "Edit anything before you check"]} />
            </>
          }
          visual={
            <div className="card p-6">
              <p className="text-sm font-semibold text-ink">Section B · Very short answer (2 marks each)</p>
              <ol className="mt-4 space-y-3 text-sm">
                {["Q21. What is social science?", "Q22. State two features of democracy.", "Q23. Distinguish between weather and climate."].map((q) => (
                  <li key={q} className="flex items-start justify-between gap-4 rounded-xl bg-paper px-4 py-3">
                    <span className="text-slate-700">{q}</span>
                    <span className="font-mono text-xs font-semibold text-ink">2</span>
                  </li>
                ))}
              </ol>
            </div>
          }
        />
        <FeatureRow
          flip
          eyebrow="Next step"
          title="Then set the marking scheme."
          body={<p>Once the questions are in, each one gets a marking scheme: criteria whose marks add up to the question&apos;s marks. Accept the AI draft, edit it, or bring your own.</p>}
          visual={<RubricCard />}
        />
      </section>
    </PageShell>
  );
}
