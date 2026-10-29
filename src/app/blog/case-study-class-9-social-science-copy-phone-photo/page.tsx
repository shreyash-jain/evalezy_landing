import { BlogShell, postMetadata, Callout, Table, WhereEvalezyFits } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "case-study-class-9-social-science-copy-phone-photo";
export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "A real Class IX Social Science half-yearly mock copy (80 marks, 38 questions, 7 pages) was photographed on a phone in a spiral notebook and checked by Evalezy, unedited.",
        "Evalezy found every answer, marked it against a scheme per question in half-mark steps, and wrote back onto the pages: ticks, crosses with the correct answer, short notes and the total, 38/80, circled on page one.",
        "No scanner was needed: the photos were straightened, cleaned and contrast-boosted before reading.",
        "It made one visible slip: Q17 on page 2 is right but was crossed. A teacher’s review catches exactly this before release.",
        "For a school, the takeaway is practical: phone photos are enough, students get written feedback on every answer, and the teacher’s job becomes reviewing, not reading from scratch.",
      ]}
      toc={[
        { id: "background", label: "Background" },
        { id: "copy", label: "The copy" },
        { id: "process", label: "What Evalezy did" },
        { id: "result", label: "The result" },
        { id: "slip", label: "The slip" },
        { id: "lessons", label: "Lessons for schools" },
      ]}
      faqs={[
        {
          q: "Do I need a scanner to use AI copy checking?",
          a: "Not with Evalezy. This copy is a set of phone photos of a spiral notebook, with shadows and ruled lines. Pages are straightened, denoised and contrast-boosted before reading. Even, bright light and the whole page in frame help most.",
        },
        {
          q: "How long does it take to check a copy like this?",
          a: "Typically 1–8 minutes per copy, with several copies checked in parallel; first results in a batch arrive in about 10 minutes, and 100 copies take about 2–3 hours on current capacity.",
        },
        {
          q: "Can I see the full checked copy?",
          a: "Yes. All seven pages are on the sample page, and you can download the checked copy as a PDF.",
        },
      ]}
    >
      <Callout title="A real copy, not a customer story" tone="info">
        <p>
          This case study walks through one real answer copy checked by Evalezy with no edits. All seven pages are on{" "}
          <Link href="/sample/">the sample page</Link>. It is not a customer result or an accuracy figure.
        </p>
      </Callout>

      <h2 id="background">Background</h2>
      <p>
        Most schools do not have a document scanner in every staff room. If AI copy checking only worked on clean
        scanner PDFs, most copies would never reach it. So the question for this copy was simple: can a teacher take
        phone photos of a student’s notebook and get back a copy that looks checked by a teacher?
      </p>

      <h2 id="copy">The copy</h2>
      <Table
        head={["", ""]}
        rows={[
          ["Subject and class", "Social Science, Class IX, half-yearly mock test"],
          ["Paper", "80 marks, 38 questions in five sections"],
          ["Sections", "A: Q1–20 (20 marks) · B: Q21–26 (12) · C: Q27–32 (18) · D: Q33–36 (20) · E: Q37–38 (10)"],
          ["Copy", "7 pages of a spiral notebook, photographed on a phone"],
          ["Handwriting", "Mixed: crossed-out words, insertions above the line, answers running across pages"],
        ]}
      />

      <h2 id="process">What Evalezy did</h2>
      <ol>
        <li><strong>Cleaned the photos.</strong> Each page was straightened, denoised and contrast-boosted.</li>
        <li><strong>Drafted one marking scheme per question</strong>, with criteria that add up exactly to that question’s marks. The same scheme is used for every student in the class.</li>
        <li><strong>Found each answer by its content</strong>, not by the number the student wrote, so answers written out of order are still found.</li>
        <li><strong>Marked every answer</strong> in half-mark steps, with a reason and feedback per question.</li>
        <li><strong>Wrote the result back onto the copy</strong> in a handwriting-style red pen.</li>
      </ol>
      <p>
        In a class upload, Evalezy also reads each student’s name and roll number from the top of page one and matches
        the copy to your class list; a copy it is unsure about waits for a teacher to pick the student.
      </p>

      <h2 id="result">The result</h2>
      <p>The checked copy looks like a teacher marked it:</p>
      <ul>
        <li><strong>The total, circled:</strong> 38 out of 80, top right of page one.</li>
        <li><strong>Ticks</strong> on the lines that earned marks.</li>
        <li><strong>Crosses with the correct answer</strong> beside them, for example “Wrong answer. Correct: latitude (distance from the equator).”</li>
        <li><strong>Half marks with a reason:</strong> 1.5/2, 0.5/3, 3.5/5, each with a note on what was missing.</li>
        <li><strong>Marks per question</strong> in the margin.</li>
      </ul>
      <figure className="my-6 space-y-2 rounded-2xl border border-line bg-white p-3">
        <img src="/copy/crop-crosses.webp" alt="Three answers marked wrong in red pen, each with the correct answer written beside it: latitude, lowest, Indus, and 0/1 in the margin" width={1400} height={357} loading="lazy" className="w-full rounded-lg border border-line" />
        <img src="/copy/crop-long.webp" alt="A 3-mark answer listing weather elements, marked 0.5/3 with the note: Only weather elements listed; no factors of climate explained" width={1400} height={434} loading="lazy" className="w-full rounded-lg border border-line" />
        <figcaption className="px-1 text-sm text-slate-500">From the checked copy: crosses with the correct answer, and a 3-mark answer given 0.5/3 with the reason.</figcaption>
      </figure>

      <h2 id="slip">The slip</h2>
      <p>
        On page 2, Q17 is answered correctly (“Egyptian Civilisation”) but Evalezy crossed it. We left it in the
        published copy on purpose. It is the kind of mistake that makes a teacher’s review essential, and it is why, in
        Evalezy, AI marks are a draft: the teacher sees each answer as read, with the mark and the reason, changes the
        mark and only then releases results to students.
      </p>

      <h2 id="lessons">Lessons for schools</h2>
      <ol>
        <li><strong>Phone photos are enough.</strong> Ask teachers to shoot in even light with the whole page in frame; see our guide to <Link href="/blog/scan-answer-sheets-with-phone/">scanning answer sheets with a phone</Link>.</li>
        <li><strong>Students get feedback on every answer</strong>, not just a total, which is hard to give by hand across 40 copies.</li>
        <li><strong>One scheme for the whole class</strong> means copy 1 and copy 40 are judged the same way.</li>
        <li><strong>Review before release, always.</strong> One crossed right answer on 38 questions is small, but it matters to the student.</li>
        <li><strong>Diagrams and maps are judged by their labels</strong> and written explanation only, so check map work yourself.</li>
      </ol>

      <WhereEvalezyFits>
        <p>
          Teachers <Link href="/bulk-upload/">upload a whole class’s copies at once</Link>, up to 200 PDFs, or will soon
          scan them straight from the <Link href="/app/">Evalezy app</Link>. Each student gets their own copy{" "}
          <Link href="/checked-copy/">checked in red pen</Link>, emailed when you release results. ₹1 per page; failed
          and unreadable copies are free.
        </p>
        <p>
          Read the other case study: <Link href="/blog/case-study-ai-vs-teacher-maths-answer-copy/">one maths copy checked by a teacher and by AI</Link>.
        </p>
      </WhereEvalezyFits>
    </BlogShell>
  );
}
