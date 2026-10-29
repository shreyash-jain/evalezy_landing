import { BlogShell, postMetadata, Callout, Table, WhereEvalezyFits } from "@/components/BlogShell";
import Link from "next/link";
import { COPY, byVerdict, count } from "@/content/sideBySide";

const SLUG = "case-study-ai-vs-teacher-maths-answer-copy";
export const metadata = postMetadata(SLUG);

export default function Page() {
  const caught = byVerdict("evalezy");
  const misread = byVerdict("teacher");
  const calls = byVerdict("judgement");
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        `One real ${COPY.subject.toLowerCase()} (${COPY.marks} marks, ${COPY.questions} questions, ${COPY.pages} pages, a phone scan) was checked by a teacher and, separately, by Evalezy.`,
        `The teacher gave ${COPY.teacherTotal}/${COPY.marks} with ticks and crosses only; Evalezy gave ${COPY.evalezyTotal}/${COPY.marks} with ${COPY.evalezyNotes} written notes.`,
        `Evalezy caught ${count("evalezy")} slips in the working that the teacher had ticked. The teacher was right on ${count("teacher")} answers that Evalezy misread. ${count("judgement")} were half-mark judgement calls.`,
        "Every Evalezy misread was a reading problem (a minus sign, a crossed-out number, a 7 read as a 1), not a maths problem.",
        "The lesson: AI first check plus teacher review beats either alone. That is why Evalezy’s marks are drafts until a teacher releases them.",
      ]}
      toc={[
        { id: "background", label: "Background" },
        { id: "setup", label: "How we ran it" },
        { id: "results", label: "Results" },
        { id: "caught", label: "What Evalezy caught" },
        { id: "missed", label: "What the teacher got right" },
        { id: "calls", label: "Judgement calls" },
        { id: "lessons", label: "Lessons for schools" },
      ]}
      faqs={[
        {
          q: "Is this case study a measure of Evalezy’s accuracy?",
          a: "No. It is one copy from one student, shown in full so you can judge for yourself. It shows the kinds of mistakes each checker makes. Accuracy on your copies is something to measure in a pilot on copies your teachers have already marked.",
        },
        {
          q: "Was the AI’s copy edited before publishing?",
          a: "No. Both checked copies are shown as they were produced, including Evalezy’s mistakes: the misreads, one note printed on the wrong page and one note cut off mid-sentence.",
        },
        {
          q: "How would this copy have reached the student in normal use?",
          a: "As a draft. In Evalezy, a teacher reviews the AI marks and reasons per question, fixes the misreads (here, five of them), and then releases the result. Students see nothing before release.",
        },
      ]}
    >
      <Callout title="A real copy, not a customer story" tone="info">
        <p>
          This case study uses one real answer copy that a teacher had already checked, run through Evalezy with no
          edits. It is published in full, page by page, on <Link href="/side-by-side/">AI vs teacher: one copy</Link>.
          It is not a customer result and it is not an accuracy figure.
        </p>
      </Callout>

      <h2 id="background">Background</h2>
      <p>
        Maths is where teachers are most sceptical of AI checking, and with reason. Answers mix numbers, symbols and
        working; a single minus sign changes a right answer into a wrong one; and students cross out and rewrite. We
        wanted to see, on a real copy, what an AI checker gets right that a busy teacher misses, and the reverse.
      </p>

      <h2 id="setup">How we ran it</h2>
      <ul>
        <li><strong>The copy:</strong> a {COPY.subject.toLowerCase()}, {COPY.marks} marks, {COPY.questions} questions, {COPY.pages} pages, photographed on a phone.</li>
        <li><strong>The teacher:</strong> checked it by hand in green, the normal way: ticks, crosses and marks, no written notes.</li>
        <li><strong>Evalezy:</strong> checked the same scan in red, from a marking scheme it drafted. No question paper was supplied.</li>
        <li><strong>The review:</strong> we went through every question where the two disagreed and checked the student’s working by hand.</li>
      </ul>

      <h2 id="results">Results</h2>
      <Table
        head={["", "Teacher", "Evalezy"]}
        rows={[
          ["Total", `${COPY.teacherTotal}/${COPY.marks}`, `${COPY.evalezyTotal}/${COPY.marks}`],
          ["Written notes on the copy", String(COPY.teacherNotes), String(COPY.evalezyNotes)],
          ["Slips in the working caught", "—", `${count("evalezy")} the teacher had ticked`],
          ["Right answers marked wrong", "—", `${count("teacher")} (handwriting misreads)`],
          ["Half-mark judgement calls", `${count("judgement")}`, `${count("judgement")}`],
        ]}
      />
      <p>
        Most of the {COPY.questions} questions matched. The {caught.length + misread.length + calls.length} that did
        not are below.
      </p>

      <h2 id="caught">What Evalezy caught</h2>
      {caught.map((d) => (
        <div key={d.q}>
          <h3>Q{d.q}: {d.wrote}</h3>
          <p>{d.why}</p>
        </div>
      ))}
      <figure className="my-6 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="grid gap-px bg-line sm:grid-cols-2">
          <img src="/side-by-side/q30-teacher.jpg" alt="Teacher's copy: the wrong check 37 + 25 = 65 is ticked" width={1100} height={370} loading="lazy" className="w-full bg-white" />
          <img src="/side-by-side/q30-ai.jpg" alt="Evalezy's copy: the check is crossed with the note Check wrong: 37+25 = 62, not 65" width={1100} height={370} loading="lazy" className="w-full bg-white" />
        </div>
        <figcaption className="px-4 py-3 text-sm text-slate-500">Q30. Left: teacher, ticked. Right: Evalezy, “Check wrong: 37+25 = 62, not 65”.</figcaption>
      </figure>

      <h2 id="missed">What the teacher got right</h2>
      {misread.map((d) => (
        <div key={d.q}>
          <h3>Q{d.q}: {d.wrote}</h3>
          <p>{d.why}</p>
        </div>
      ))}

      <h2 id="calls">Judgement calls</h2>
      <p>
        On {calls.length} questions the two differed by half a mark on how strict to be. Without the question paper
        these are not verdicts:
      </p>
      <ul>
        {calls.map((d) => (
          <li key={d.q}><strong>Q{d.q}:</strong> {d.why}</li>
        ))}
      </ul>

      <h2 id="lessons">Lessons for schools</h2>
      <ol>
        <li><strong>The AI reads every line; the teacher reads handwriting better.</strong> Evalezy’s catches were in the working that a teacher skims when the final answer is right. Its misses were all misreads.</li>
        <li><strong>Review is where the time goes, and it is fast.</strong> Each AI mark comes with a reason, so a teacher sees “0/2: Correct answer: 350 km” next to a page that says 350 and changes it on the spot.</li>
        <li><strong>Written notes are the hidden win.</strong> The teacher’s copy had {COPY.teacherNotes} notes; Evalezy’s had {COPY.evalezyNotes}. Students learn more from a note than a cross.</li>
        <li><strong>Give the AI the question paper and a scheme.</strong> The judgement calls come down to how strict to be, and that is what your own marking scheme decides; you can edit every criterion before the check runs.</li>
        <li><strong>Never let AI publish marks on its own.</strong> On this copy, five right answers would have reached the student as wrong.</li>
      </ol>

      <WhereEvalezyFits>
        <p>
          In Evalezy, every mark lands as a draft. The teacher sees the student’s answer as read, the marks, the reason
          and the criteria per question, <Link href="/teacher-review/">changes any mark</Link>, then presses Release
          Result. A teacher’s edit is never overwritten by a later AI run.
        </p>
        <p>
          Read every page of this copy on <Link href="/side-by-side/">AI vs teacher</Link>, or see our other case study,
          a <Link href="/blog/case-study-class-9-social-science-copy-phone-photo/">Class IX Social Science copy photographed on a phone</Link>.
        </p>
      </WhereEvalezyFits>
    </BlogShell>
  );
}
