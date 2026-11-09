import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "correct-ai-checked-copy-before-release";
export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "In Evalezy, AI marks are a draft. Students see nothing, not even their marks, until a teacher presses Release Result.",
        "For every question the teacher sees the student’s answer as the AI read it, the marks, the feedback and a criteria breakdown, and can change any of them.",
        "After you change marks, remarks or pen notes, “Update checked copy” draws the student’s PDF again with your corrections; everything you did not touch stays where it was.",
        "For that one copy you can keep the pen it was checked with or pick another, and keep the remarks as checked, put them on the copy, or beside it.",
        "A mark a teacher edits is never overwritten by a later AI run. On release, each student is emailed their checked copy.",
      ]}
      toc={[
        { id: "why", label: "Why AI marks are a draft" },
        { id: "what-you-see", label: "What you see for each answer" },
        { id: "correct", label: "How to correct a copy, step by step" },
        { id: "update-copy", label: "Update the checked copy" },
        { id: "release", label: "Release results to students" },
        { id: "habits", label: "A review routine that scales" },
      ]}
      faqs={[
        {
          q: "Can students see AI marks before the teacher checks them?",
          a: "No. Marks land as a draft and students see “Results pending” until a teacher releases the result. This is enforced on the server, not just hidden in the screen.",
        },
        {
          q: "If I re-run the AI check, will it undo my corrections?",
          a: "No. A mark a teacher edits is never overwritten by a later AI run.",
        },
        {
          q: "Does the student’s PDF change when I edit a mark?",
          a: "It changes when you press “Update checked copy”. Evalezy shows a reminder when you have changed marks, remarks or pen notes, so the student’s PDF can show them. The copy is drawn again with your corrections; everything else stays where it was.",
        },
        {
          q: "Can I change the pen colour or move the remarks for one copy?",
          a: "Yes. When you update a copy you can keep the pen it was checked with or choose another, and keep the remarks as checked, write them on the copy, or put them in a comments panel beside it. The institute’s usual pen is set in Settings.",
        },
        {
          q: "How do students get the corrected copy?",
          a: "When you release results, each student is emailed their checked copy as a PDF. Results can also go out on WhatsApp through Automations.",
        },
      ]}
    >
      <p>
        To correct an AI-checked answer copy before students see it, open the copy in review, change the marks or
        remarks that are wrong, press <strong>Update checked copy</strong> so the student’s PDF shows your corrections,
        and only then press <strong>Release Result</strong>. In Evalezy the AI never publishes a result: every mark is a
        draft until a teacher releases it.
      </p>
      <p>
        This guide walks through that review, what you see for each answer, and how to keep it quick when you have a
        whole class of copies.
      </p>

      <h2 id="why">Why AI marks are a draft</h2>
      <p>
        AI copy checking reads handwriting, and handwriting can be misread: a 7 that looks like a 1, a crossed-out
        number read instead of the final one. Our own <Link href="/blog/case-study-ai-vs-teacher-maths-answer-copy/">maths
        case study</Link> shows both sides: Evalezy caught slips the teacher ticked, and the teacher caught answers
        Evalezy misread. Together they get it right.
      </p>
      <p>
        That is why the workflow is built as <strong>AI first check, teacher review</strong>. Marks land as a draft,
        students see “Results pending” until release, and the teacher has the last word on every mark.
      </p>

      <h2 id="what-you-see">What you see for each answer</h2>
      <Table
        head={["In review", "What it tells you"]}
        rows={[
          ["The student’s answer, as read", "What the AI thinks the student wrote. If this is wrong, the mark may be wrong too."],
          ["Marks", "Awarded out of the question’s maximum, in half-mark steps."],
          ["Feedback", "The short reason for the mark, the same kind of note that is written on the copy."],
          ["Criteria breakdown", "Which points of the marking scheme were met and which were missed."],
          ["The checked copy", "The student’s own pages with ticks, crosses, remarks and the circled total."],
        ]}
      />
      <Callout title="Read the extracted answer first" tone="tip">
        <p>
          Most wrong marks come from a misread word or number, not from a wrong judgement. If the extracted answer
          matches the page, the mark usually follows the scheme. If it does not, that is the answer to correct.
        </p>
      </Callout>

      <h2 id="correct">How to correct a copy, step by step</h2>
      <Steps
        items={[
          { title: "Open the checked copy in review", body: "Marks fill in question by question as the batch runs, and you get a bell alert and an email when the batch is done." },
          { title: "Scan the low marks and the zeros", body: "Look at answers that scored zero or were marked unattempted, and at long answers with part marks. These are where a misread costs the student most." },
          { title: "Compare the extracted answer with the page", body: "Where the AI misread the handwriting, the fix is quick: set the right mark." },
          { title: "Change marks, remarks or pen notes", body: "Edit the mark in half-mark steps, rewrite a remark that is unclear, or remove a note that is wrong." },
          { title: "Update the checked copy", body: "Press “Update checked copy” so the student’s PDF shows what you changed (next section)." },
        ]}
      />

      <h2 id="update-copy">Update the checked copy</h2>
      <p>
        Editing a mark changes the result. The student’s PDF is a separate drawing, so after a correction Evalezy
        reminds you: <em>“You changed marks, remarks or pen notes. Update the checked copy so the student’s PDF shows
        them.”</em>
      </p>
      <p>
        When you update it, the copy is drawn again with your corrections. Marks, remarks and pen notes you changed
        replace the AI’s; everything else stays where it was. You also choose, for that one copy:
      </p>
      <Table
        head={["Option", "Choices"]}
        rows={[
          ["Pen", "Keep the pen this copy was checked with, or pick another ink colour, darkness, size or handwriting"],
          ["Remarks", "As checked · On the copy (next to the answer) · Beside the copy (in a Teacher comments panel, marks stay on the sheet)"],
        ]}
      />
      <p>
        The institute’s usual pen and remarks layout are set once in Settings; see{" "}
        <Link href="/blog/choose-pen-handwriting-ai-checked-copy/">how to choose the pen and handwriting</Link> for
        what each option looks like.
      </p>

      <h2 id="release">Release results to students</h2>
      <p>
        When the class is reviewed, press <strong>Release Result</strong>. Each student is then emailed their checked
        copy as a PDF, and results can also go out on WhatsApp through Automations (trigger “Assessment Result
        Released”).
      </p>
      <p>
        If you later re-check a copy with AI, any mark a teacher edited is kept: a later AI run never overwrites it.
        Note that a re-check is a new run and is charged again.
      </p>

      <h2 id="habits">A review routine that scales</h2>
      <ol>
        <li><strong>Fix the scheme before the batch.</strong> Review the <Link href="/marking-scheme/">marking scheme</Link> once; every copy is then marked to it, and you correct fewer copies.</li>
        <li><strong>Give the AI your instructions.</strong> A line like “Follow the CBSE marking scheme” in the instructions for the AI checker is used for every copy.</li>
        <li><strong>Review exceptions, not every tick.</strong> Zeros, part marks on long answers, and copies with unclear handwriting.</li>
        <li><strong>Update copies as you go</strong>, so the PDF students receive always matches the marks.</li>
        <li><strong>Check diagrams and maps yourself.</strong> They are judged by their labels and written explanation only.</li>
      </ol>

      <WhereEvalezyFits>
        <p>
          Evalezy checks scanned or phone-photographed copies and returns each student’s own copy{" "}
          <Link href="/checked-copy/">marked in a teacher-like pen</Link>. Every mark waits for{" "}
          <Link href="/teacher-review/">teacher review</Link>; edited marks are never overwritten, and results reach
          students only when you release them. 1 credit per page; failed and unreadable copies are free. See{" "}
          <Link href="/pricing/">pricing</Link>.
        </p>
      </WhereEvalezyFits>
    </BlogShell>
  );
}
