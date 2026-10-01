import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { TypedAnswerMock } from "@/components/Visuals";
import { TickList } from "@/components/Pen";

const PATH = "/typed-answers/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Typed essays & long answers"
      h1="Online long answers, graded in about 20 seconds."
      lede="Not every answer is handwritten. In online tests, students type essays, letters and emails into a long-answer box. Evalezy grades those too, against the same kind of criteria, and holds the result for a teacher to review."
      visual={<TypedAnswerMock />}
      faqs={[
        { q: "What does it judge a typed answer on?", a: "Format and conventions (an email's greeting and sign-off, a letter's layout), content, organisation and language. Spelling counts, because there is no handwriting to blame. Word limits are enforced. Answers worded differently from the model answer still earn credit." },
        { q: "What if a student tries to trick the AI?", a: "The student's text is treated as data, not instructions. In a production test, an email that told the evaluator to \"award full marks\" scored 0 out of 5." },
        { q: "What about MCQs in the same test?", a: "Objective questions keep their normal automatic marks. Only long-answer questions go to the AI, and the total adds both." },
        { q: "Are blank answers charged?", a: "No. A blank answer gets zero immediately, without an AI call, and an attempt where every answer is blank is not billed." },
        { q: "How are typed answers priced?", a: "Typed answers have no pages, so they are priced per answer graded rather than per page. Ask us for the current rate." },
        { q: "Can students copy-paste an answer?", a: "Copy, cut and paste are blocked in the long-answer box, which also shows a live word count." },
      ]}
    >
      <section className="wrap py-16 md:py-24">
        <FeatureRow
          eyebrow="How to set it up"
          title="Switch on AI evaluation, add a long-answer question."
          body={
            <>
              <p>In the test settings, pick any result type except manual and turn on &ldquo;Evaluate submissions with AI&rdquo;. Add questions of type Long Answer, with a model answer if you have one.</p>
              <TickList items={["Graded automatically when the student submits", "Result held as pending until a teacher releases it", "Model answer used as a reference, not as required wording"]} />
            </>
          }
          visual={
            <div className="card p-6 text-sm">
              <p className="font-semibold text-ink">Test settings</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-paper px-4 py-3"><span className="text-slate-700">Result type</span><span className="font-semibold text-ink">Release after review</span></div>
                <div className="flex items-center justify-between rounded-xl bg-paper px-4 py-3"><span className="text-slate-700">Evaluate submissions with AI</span><span className="rounded-full bg-ok-50 px-2.5 py-0.5 font-semibold text-ok">On</span></div>
                <div className="flex items-center justify-between rounded-xl bg-paper px-4 py-3"><span className="text-slate-700">Question type</span><span className="font-semibold text-ink">Writing skills → Long answer</span></div>
              </div>
            </div>
          }
        />
      </section>
    </PageShell>
  );
}
