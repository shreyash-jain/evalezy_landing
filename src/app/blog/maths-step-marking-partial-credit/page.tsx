import Link from "next/link";
import { BlogShell, postMetadata, Callout, Table, WhereEvalezyFits, Sources } from "@/components/BlogShell";

const SLUG = "maths-step-marking-partial-credit";
export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "Allocate marks to visible mathematical reasoning before checking the first answer sheet.",
        "Define when a later correct step can earn credit after an earlier numerical error.",
        "Credit equivalent methods against the same learning objective, using the applicable scheme.",
        "Check the original scan when an AI reading changes a minus sign, fraction or crossed-out value.",
      ]}
      toc={[
        { id: "what-step-marking-means", label: "What step marking means" },
        { id: "worked-example", label: "A worked 4-mark example" },
        { id: "follow-through", label: "Follow-through after an error" },
        { id: "alternative-methods", label: "Alternative methods and missing work" },
        { id: "handwriting-review", label: "Reviewing handwritten maths" },
        { id: "before-release", label: "Before releasing marks" },
      ]}
      faqs={[
        { q: "Can a wrong final answer earn marks in maths?", a: "Yes, where the applicable marking scheme awards credit for correct method or intermediate reasoning. Award the criteria the student actually meets; a wrong final answer does not automatically erase all earlier working." },
        { q: "Should I deduct marks twice for the same calculation error?", a: "Follow the scheme. For a classroom test, decide in advance whether a later correct operation on an incorrect intermediate value earns follow-through credit. Do not invent the rule midway through the stack." },
        { q: "Does a correct answer without working get full marks?", a: "It depends on what the question and scheme assess. If the task explicitly requires a method or explanation, a final number alone does not demonstrate those criteria. An answer-only question may use a different rule." },
        { q: "Can AI check handwritten maths accurately every time?", a: "No. Handwritten symbols and crossed-out working can be misread. Review the original answer alongside the extracted text and proposed marks, especially where a small symbol changes the mathematical meaning." },
      ]}
    >
      <p>
        A student chooses the right equation, substitutes the right values and makes one arithmetic slip. Another
        writes the correct final number with no working. Maths step marking gives the teacher a way to assess the
        evidence in each answer instead of judging both from the last line alone.
      </p>
      <p>
        This guide proposes a classroom marking routine, with an original worked example. For an external examination,
        use the marking scheme and examiner instructions for that paper. The allocations below are illustrative,
        not a CBSE or other board marking policy.
      </p>

      <h2 id="what-step-marking-means">What does step marking mean in maths?</h2>
      <p>
        Step marking assigns parts of the available score to specific evidence: selecting a method, making a valid
        transformation, calculating a value or interpreting the result. Partial credit is the score earned when
        the answer demonstrates some of those requirements but not all of them.
      </p>
      <p>
        Start with the skill the question is intended to assess. In a question about forming equations, setting up
        the equation deserves explicit attention. In a question about interpreting a graph, a correct calculation
        alone may leave the main task unanswered. Write down the evidence required for each mark and ensure the
        allocations add up to the question total. Our <Link href="/blog/how-to-write-a-marking-scheme/">marking
        scheme guide</Link> covers that setup in more detail.
      </p>
      <p>
        Carnegie Mellon University’s rubric guidance describes criteria, performance descriptions and levels of
        achievement as the building blocks of a rubric. For a maths question, translate those into decisions another
        teacher can apply to the actual working on the page.
      </p>

      <h2 id="worked-example">A worked 4-mark example</h2>
      <p>
        <strong>Question:</strong> A rectangle has a perimeter of 30 cm. Its length is 3 cm more than its width.
        Form an equation and find both dimensions, showing your working.
      </p>
      <p>
        One solution is to let the width be w and the length be w + 3. Then 2(w + w + 3) = 30,
        so 4w + 6 = 30, w = 6, and the dimensions are 6 cm by 9 cm.
      </p>
      <Table
        head={["Criterion", "Evidence that earns credit", "Marks"]}
        rows={[
          ["Model the dimensions", "Defines width w and length w + 3, or an equivalent pair of variables and relation.", "1"],
          ["Use the perimeter", "Forms 2(w + w + 3) = 30 or an equivalent correct equation.", "1"],
          ["Solve the equation", "Uses valid algebra to obtain w = 6.", "1"],
          ["State the dimensions", "Gives width 6 cm and length 9 cm, with the roles clear.", "1"],
        ]}
        caption="An illustrative classroom scheme; decide any half-mark and follow-through rules before use."
      />
      <p>
        For this example, suppose the third criterion requires the correct solution, while the fourth permits
        follow-through: one mark for correctly interpreting the student’s calculated positive width and adding 3 cm
        for the length, with units. Record that exception next to the fourth criterion before marking.
      </p>

      <h2 id="follow-through">How to handle an error carried into later steps</h2>
      <p>
        Consider a student who reaches 4w = 24, then writes w = 8 and dimensions 8 cm by 11 cm. Under the example
        policy, the first two criteria earn 2 marks, the solving criterion earns 0, and the final criterion earns
        1 follow-through mark. The total is 3/4. The final dimensions are wrong, but the later relationship and
        interpretation are consistent with the student’s value.
      </p>
      <p>
        A different scheme might reserve the final mark for the correct dimensions and award 2/4. The important
        decision is which rule the assessment uses. It must be written down and applied to all equivalent answers.
        Do not describe either allocation as a universal rule for maths examinations.
      </p>
      <Callout title="Follow-through needs boundaries">
        <p>
          State which criteria allow follow-through and what makes it invalid. A negative rectangle width, a changed
          problem or an error that removes the mathematical challenge needs a separate decision. Credit should still
          represent a skill demonstrated in the answer.
        </p>
      </Callout>

      <h2 id="alternative-methods">Alternative methods, skipped steps and answer-only responses</h2>
      <p>
        A student might start with length + width = 15 and combine it with length − width = 3. That is a valid route
        to the same dimensions. Map it to the criteria rather than requiring the exact sequence in the model answer.
        Add accepted alternatives to the scheme when they reveal a gap in its wording.
      </p>
      <ul>
        <li><strong>Skipped algebra:</strong> decide whether the written transition still shows enough evidence for the criterion.</li>
        <li><strong>Answer only:</strong> in this example, correct dimensions with units earn the final mark; the missing equation and working do not demonstrate the other three criteria.</li>
        <li><strong>Two conflicting answers:</strong> apply a recorded rule about the final selected answer and crossed-out work.</li>
        <li><strong>Missing units:</strong> place any deduction in the relevant criterion so it is applied consistently.</li>
      </ul>
      <p>
        Try the scheme on a few varied responses with a colleague. If you disagree, identify the exact criterion
        causing the difference. Revise its wording and revisit previously checked responses affected by that change.
      </p>

      <h2 id="handwriting-review">What to inspect when AI reads handwritten maths</h2>
      <p>
        Separate a reading problem from a marking judgement. If the scan says −19/7 but the extracted answer loses
        the minus sign, debating partial credit will not fix the underlying mistake. Compare the original line with
        the extracted text first, then assess the actual working.
      </p>
      <p>
        Check fractions, exponents, decimal points, overwritten digits and boxed answers in particular. Evalezy’s
        <Link href="/side-by-side/"> teacher and AI comparison</Link> shows one maths copy on which each caught
        mistakes the other missed, including AI handwriting misreads. It is a useful review example, not an accuracy
        benchmark. Diagrams also need care: Evalezy evaluates their labels and written explanation, not drawing quality.
      </p>

      <h2 id="before-release">A final check before releasing maths marks</h2>
      <ol>
        <li>Confirm that the criterion allocations sum to the question maximum.</li>
        <li>Compare answers with the same error to check that follow-through was applied consistently.</li>
        <li>Resolve unclear handwriting against the original copy.</li>
        <li>Recheck any score affected by an accepted alternative method or a scheme change.</li>
        <li>Give feedback that identifies the first incorrect step and a useful next action.</li>
      </ol>
      <WhereEvalezyFits>
        <p>
          Evalezy uses one editable <Link href="/marking-scheme/">marking scheme per question</Link> across the
          assessment and proposes marks in half-mark steps. In <Link href="/teacher-review/">teacher review</Link>,
          you can inspect the extracted answer, feedback and criteria breakdown, then edit draft marks before release.
          Use that review to resolve both handwriting errors and partial-credit decisions.
        </p>
      </WhereEvalezyFits>
      <Sources items={[{ label: "Carnegie Mellon University, Eberly Center: Rubrics", url: "https://www.cmu.edu/teaching/designteach/teach/rubrics.html", checked: "2026-10-10" }]} />
    </BlogShell>
  );
}
