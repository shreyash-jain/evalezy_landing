import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "grammar-spelling-highlight-english-answer-sheets";
export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "Evalezy can highlight spelling and grammar errors on handwritten English answer sheets: each error is underlined on the copy with its correction written beside it.",
        "Every error is also listed in that answer’s feedback, so the student sees what to fix even if the page is crowded.",
        "No marks are deducted for it. Marks still come from the marking scheme; the highlight is feedback, not a penalty.",
        "Add instructions for the AI checker, for example a CBSE letter-writing split of format, content and expression, and they are used for every copy.",
        "Both are switched on in Settings, in the dashboard (Settings → Assessment) or in the Evalezy app (Settings). The highlight is for answers written in English.",
      ]}
      toc={[
        { id: "problem", label: "Why language errors go unmarked" },
        { id: "what-it-does", label: "What the highlight does" },
        { id: "no-deduction", label: "Feedback, not a penalty" },
        { id: "instructions", label: "Instructions for the AI checker" },
        { id: "setup", label: "How to switch it on" },
        { id: "typed", label: "Typed essays and letters" },
      ]}
      faqs={[
        {
          q: "Does Evalezy deduct marks for spelling and grammar mistakes?",
          a: "Not through the highlight. Each error is underlined with its correction and listed in the answer’s feedback, but no marks are deducted for it. If language carries marks in your scheme, write that into the marking scheme or the instructions for the AI checker.",
        },
        {
          q: "Which answers get the spelling and grammar highlight?",
          a: "Answers written in English. Grading itself is built and tested on English copies; for Hindi or other Indian-language papers, send us samples first.",
        },
        {
          q: "Where do I switch it on?",
          a: "In the dashboard under Settings → Assessment, or in the Evalezy app under Settings, with the option “Highlight spelling and grammar errors”. Copies checked after you save use it.",
        },
        {
          q: "Can I tell the AI how to mark a letter or an essay?",
          a: "Yes. Write it in the instructions for the AI checker, for example “Follow the CBSE marking scheme. Letter writing: format 1, content 2, expression 2.” The instructions are used for every copy, together with the answer key and the marking scheme.",
        },
      ]}
    >
      <p>
        Yes, AI can highlight spelling and grammar errors on handwritten English answer sheets. In Evalezy, switch on{" "}
        <strong>Highlight spelling and grammar errors</strong> in Settings and every error the checker finds is
        underlined on the student’s copy with the correction written next to it, and listed in that answer’s feedback.
        No marks are deducted for it.
      </p>

      <h2 id="problem">Why language errors go unmarked</h2>
      <p>
        When an English teacher checks 40 copies of a letter or a long answer, the marks go on content and format. Each
        spelling slip or wrong tense is rarely circled, because there is no time. Students then repeat the same errors
        in the board exam.
      </p>
      <p>
        AI copy checking has the same gap if the checker only explains why marks were lost: a language error that cost
        no marks is never mentioned. The spelling and grammar highlight closes that gap.
      </p>

      <h2 id="what-it-does">What the highlight does</h2>
      <Table
        head={["Where", "What the student sees"]}
        rows={[
          ["On the copy", "The wrong word is underlined, with the correction written next to it"],
          ["In the answer’s feedback", "Each error listed with its correction, so nothing is lost on a crowded page"],
        ]}
      />
      <Callout title="Choose how the pen looks" tone="tip">
        <p>
          Marks and remarks on the copy are written in your institute’s pen: ink colour, darkness, size and handwriting, chosen before checking. See{" "}
          <Link href="/blog/choose-pen-handwriting-ai-checked-copy/">how to choose the pen and handwriting</Link>.
        </p>
      </Callout>

      <h2 id="no-deduction">Feedback, not a penalty</h2>
      <p>
        The highlight never changes a mark. Marks still come from the{" "}
        <Link href="/marking-scheme/">marking scheme</Link> for each question, generated once and used for every
        student, so copy 1 and copy 40 are judged the same way. This matters because many schemes give language its own
        share of marks (expression, accuracy) and others give none. Keeping the highlight separate means you decide.
      </p>
      <p>
        As with every AI mark in Evalezy, the result is a draft until a teacher reviews it and presses Release Result.
        See <Link href="/blog/correct-ai-checked-copy-before-release/">how to correct an AI-checked copy before
        release</Link>.
      </p>

      <h2 id="instructions">Instructions for the AI checker</h2>
      <p>
        The second setting that helps English teachers most is the <strong>instructions for the AI checker</strong>: a
        short text that is used for every copy, together with the answer key and the marking scheme. Write it the way
        you would brief a new examiner:
      </p>
      <Table
        head={["You want", "Write in the instructions"]}
        rows={[
          ["Board pattern", "Follow the CBSE marking scheme."],
          ["Letter writing split", "Letter writing: format 1, content 2, expression 2."],
          ["Clear feedback", "Quote the missing points in the feedback."],
        ]}
      />

      <h2 id="setup">How to switch it on</h2>
      <Steps
        items={[
          { title: "Open Settings", body: "In the dashboard go to Settings → Assessment. In the Evalezy app, open Settings from the menu." },
          { title: "Turn on “Highlight spelling and grammar errors”", body: "Each error will be underlined with its correction and listed in the answer’s feedback. No marks are deducted." },
          { title: "Add your instructions", body: "Write the board pattern and any split of marks you want the checker to follow." },
          { title: "Save, then check copies", body: "Copies checked after you save use the new settings." },
        ]}
      />

      <h2 id="typed">Typed essays and letters</h2>
      <p>
        If your students write in an online test instead of on paper, Evalezy also{" "}
        <Link href="/typed-answers/">grades typed long answers</Link> such as essays, letters and emails, on format,
        content, organisation and language, with word limits. A typed answer is graded in about 20 seconds.
      </p>

      <WhereEvalezyFits>
        <p>
          Upload a class’s English copies in one go with <Link href="/bulk-upload/">bulk upload</Link>, or scan them in
          the <Link href="/app/">Evalezy app</Link>. Each student gets their own copy back with marks, remarks and
          language corrections, written in a <Link href="/checked-copy/">teacher-like pen</Link>. 1 credit per page; failed and
          unreadable copies are free. See <Link href="/pricing/">pricing</Link>.
        </p>
      </WhereEvalezyFits>
    </BlogShell>
  );
}
