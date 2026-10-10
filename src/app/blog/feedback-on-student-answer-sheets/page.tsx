import Link from "next/link";
import { BlogShell, postMetadata, Callout, Table, WhereEvalezyFits, Sources } from "@/components/BlogShell";

const SLUG = "feedback-on-student-answer-sheets";
export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "A useful comment identifies evidence in the answer and gives the student a specific next action.",
        "Match feedback to the assessed criterion rather than the length or neatness of the response.",
        "Plan time for students to correct or retry something after receiving a checked copy.",
        "Review AI-generated comments against the original answer and the final awarded marks.",
      ]}
      toc={[
        { id: "useful-feedback", label: "What useful feedback contains" },
        { id: "comment-examples", label: "Subject-specific examples" },
        { id: "marks-and-comments", label: "Make comments match marks" },
        { id: "student-response", label: "A student response routine" },
        { id: "whole-class-feedback", label: "Whole-class feedback" },
        { id: "ai-comments", label: "Reviewing AI comments" },
      ]}
      faqs={[
        { q: "What should I write as feedback on an answer sheet?", a: "Identify a specific part of the answer, explain what is missing or successful against the criterion, and give one manageable next action. For example: You named the cause; now add a sentence explaining how it produced the outcome." },
        { q: "Does every answer need a long written comment?", a: "No. Choose the format and detail that suit the learning need. A short correction prompt may be enough for a calculation slip; a misconception may need a worked example, conversation or additional teaching." },
        { q: "How can students use feedback after an exam?", a: "Ask them to locate the relevant criterion, correct one answer and try a similar question. Check that the new response shows the intended improvement rather than only a copied model answer." },
        { q: "Can teachers use AI-generated marking comments?", a: "They can use them as draft feedback to review. Check that each comment accurately describes the student's work, matches the final marks and suggests a suitable next step before sharing it." },
      ]}
    >
      <p>
        “Explain more” is a familiar comment on a student answer sheet. It identifies a concern, but the student may
        not know whether to add a definition, a cause, an example or another paragraph. A more useful comment names
        the missing part and tells the student what to do with it.
      </p>
      <p>
        This guide offers original classroom examples and a routine for using them after a test. The aim is to make
        marking comments easier to act on, without turning every checked copy into a page of teacher-written advice.
      </p>

      <h2 id="useful-feedback">What does useful answer sheet feedback contain?</h2>
      <p>
        The Education Endowment Foundation’s feedback guidance emphasises principles over the choice of written or
        verbal delivery. It recommends planning how pupils will receive and use feedback. A comment is therefore
        only part of the process: the lesson needs space for the learner’s response too.
      </p>
      <p>
        A practical comment pattern is <strong>evidence → gap → next action</strong>. Point to something the student
        actually wrote, connect it to the criterion, and ask for a manageable revision. This is a suggested writing
        aid, not a requirement to force every comment into three clauses.
      </p>
      <ul>
        <li><strong>Evidence:</strong> “You named deforestation as a cause.”</li>
        <li><strong>Gap:</strong> “The answer does not explain the link to soil erosion.”</li>
        <li><strong>Next action:</strong> “Add a sentence about what roots do to hold soil in place.”</li>
      </ul>
      <p>
        Keep praise specific as well. “Your comparison uses evidence from both passages” tells the student what to
        repeat. A judgement about being clever or careless provides less guidance for the next answer. Comments
        should describe the submitted work without making assumptions about effort or ability.
      </p>

      <h2 id="comment-examples">Feedback examples for different subjects</h2>
      <p>
        The examples below assume the stated gap is present in the answer and relevant to the scheme. Adapt the
        language to the student’s age and what has been taught. Do not paste a comment simply because a response
        received a low mark.
      </p>
      <Table
        head={["What you notice", "A comment the student can use", "Suggested response"]}
        rows={[
          ["Maths: an arithmetic slip after a correct setup", "Your equation is correct. Recheck 24 ÷ 4, then use your revised value to find the length.", "Correct the calculation and check the dimensions against the perimeter."],
          ["Science: a factor named without its mechanism", "You identified temperature. Explain how faster particle movement changes the rate of collisions.", "Add the missing causal link in two sentences."],
          ["History: a claim without supporting evidence", "You state that the policy caused opposition. Add one relevant event or example and explain how it supports that claim.", "Revise the paragraph using evidence taught in class."],
          ["Geography: a list where explanation was requested", "Your two factors are relevant. For each one, explain how it affects the location of the industry.", "Turn each listed factor into a cause-and-effect sentence."],
          ["English: a quotation without analysis", "The quotation is relevant. Choose one word from it and explain its effect on the reader.", "Add analysis after the quotation rather than another quotation."],
          ["A typed email: the requested action is unclear", "The purpose is clear, but the recipient does not know what to do next. End with a specific request and a suitable closing.", "Rewrite the final two sentences."],
        ]}
        caption="Original illustrative comments, not feedback from an actual student assessment."
      />
      <p>
        Notice that the next action changes with the error. Recalculating is appropriate for a slip. A missing
        concept may need teaching before revision is possible. If the student cannot explain the idea orally either,
        simply asking for a longer written answer is unlikely to address the immediate problem.
      </p>

      <h2 id="marks-and-comments">Make feedback agree with the marking scheme</h2>
      <p>
        If a question awards separate marks for identifying a cause and explaining it, the comment should preserve
        that distinction. “Cause identified; explanation missing” supports the partial-credit decision. “Wrong”
        erases the successful part and gives the student little basis for understanding the score.
      </p>
      <p>
        Avoid asking for material the question did not require while implying it cost marks. You can suggest a
        further challenge, but label it as extension work. An accurate short answer should not receive “write more”
        merely because another student filled a page. Use the <Link href="/marking-scheme/">marking criteria</Link>
        as the reference for both the score and the comment.
      </p>
      <Callout title="Explain changes after review">
        <p>
          If moderation changes a mark, reread the feedback beside it. A corrected score paired with the original
          criticism can leave the student unsure what was accepted. The final score and explanation should describe
          the same decision.
        </p>
      </Callout>

      <h2 id="student-response">A simple routine when returning checked copies</h2>
      <p>
        Reserve part of the next lesson for a response task. The sequence below is a suggested classroom routine;
        choose its length and difficulty to suit the assessment. Start with one important improvement rather than
        asking every student to rewrite every answer at once.
      </p>
      <ol>
        <li><strong>Locate:</strong> the student finds the answer and the criterion mentioned in the feedback.</li>
        <li><strong>Explain:</strong> they state what needs to change in their own words.</li>
        <li><strong>Revise:</strong> they correct the calculation, add the explanation or rewrite the relevant paragraph.</li>
        <li><strong>Transfer:</strong> they attempt a similar question with different numbers or a new example.</li>
        <li><strong>Check:</strong> the teacher inspects whether the new response demonstrates the intended skill.</li>
      </ol>
      <p>
        Keep the original answer visible beside the revision. That makes the change easier to discuss and avoids
        confusing a copied model answer with independent understanding. If several students still struggle on the
        transfer question, use that evidence to plan the next explanation or practice task.
      </p>

      <h2 id="whole-class-feedback">When to use whole-class feedback</h2>
      <p>
        If many answers omit the same reasoning step, prepare one shared explanation with an anonymous or invented
        example. Ask students to compare it with their own response and revise the matching section. Keep individual
        comments for differences that the shared explanation does not address.
      </p>
      <p>
        A useful preparation sheet has three entries: what the class did well, the misconception to revisit, and a
        question that will show whether the correction has been understood. You can compile it while marking without
        producing a separate report for every student. For batch organisation and comment codes, see our guide to
        <Link href="/blog/how-to-check-answer-sheets-faster/"> checking answer sheets faster</Link>.
      </p>

      <h2 id="ai-comments">How to review AI-generated feedback</h2>
      <p>
        Read the comment against the original response, not just the extracted text. A confident explanation can
        still refer to a symbol that was misread or a point the student actually included. Before sharing, check
        whether the comment is accurate, relevant to the scheme, consistent with the final mark and understandable
        without further interpretation.
      </p>
      <p>
        Check that it gives the right amount of help for the response task. A full model solution may be appropriate
        for discussion; a hint may be more useful when the student is about to retry. The teacher should choose how
        to use the feedback in the lesson. Our <Link href="/blog/answer-sheet-moderation-checklist/">moderation
        checklist</Link> includes this final consistency check before release.
      </p>
      <WhereEvalezyFits>
        <p>
          Evalezy returns a <Link href="/checked-copy/">checked copy PDF</Link> with red-pen annotations, short notes
          and question marks. Teachers can inspect per-question feedback and the criteria breakdown during
          <Link href="/teacher-review/"> review</Link> and edit marks before releasing results. Use the reviewed
          copy as the starting point for correction and discussion; the student response activity is something you
          plan in your teaching.
        </p>
      </WhereEvalezyFits>
      <Sources items={[{ label: "Education Endowment Foundation: Teacher Feedback to Improve Pupil Learning", url: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback", checked: "2026-10-10" }]} />
    </BlogShell>
  );
}
