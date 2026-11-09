import { BlogShell, postMetadata, Callout, Table, WhereEvalezyFits } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "case-study-one-answer-page-nine-pens";
export const metadata = postMetadata(SLUG);

const PENS: { name: string; label: string; note: string }[] = [
  { name: "teacher-red", label: "1. Teacher, red (default)", note: "Joined, thin, one-weight strokes; remarks start in small letters, like a teacher writing fast." },
  { name: "natural", label: "2. Natural, red", note: "Upright, print-like letters with an uneven rhythm; easy to read." },
  { name: "scrawled", label: "3. Scrawled, red", note: "Tall, narrow, hurried letters; the most “written in a rush” look." },
  { name: "quick", label: "4. Quick, red", note: "Small, slanted and light; marks and remarks take less room." },
  { name: "cursive", label: "5. Cursive, red", note: "Looped, joined letters; elegant, but slower to read for young students." },
  { name: "classic-kalam", label: "6. Classic (Kalam), red", note: "Neat, rounded and even; the most readable, and the least hand-written looking." },
  { name: "teacher-green", label: "7. Teacher, green", note: "Same hand as the default, in green ink." },
  { name: "teacher-blue-dark", label: "8. Teacher, blue, darker", note: "Same hand in blue, with the darkness slider pushed up." },
  { name: "teacher-light", label: "9. Teacher, red, lighter", note: "Same hand in a lighter red; less red on the page." },
];

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "We drew the same sample answer page (four questions, 6/12) nine times, with nine different pen settings in Evalezy.",
        "Between pens, the letter shapes, slant, tick and cross strokes, ink colour and darkness change.",
        "The check does not change: the same marks per question, the same ticks and crosses on the same lines, the same remarks and the same circled total, 6/12.",
        "Which pen to pick is a school’s choice: a neat classic hand for younger classes, the Teacher hand for a copy that looks hand-checked, a lighter or different ink for less red on the page.",
        "The pages are drawn by Evalezy’s pen preview on a built-in sample page; this is a showcase, not a customer result.",
      ]}
      toc={[
        { id: "setup", label: "The setup" },
        { id: "nine", label: "Nine pens, one page" },
        { id: "changes", label: "What changes" },
        { id: "same", label: "What stays the same" },
        { id: "pick", label: "Which pen for which use" },
        { id: "lessons", label: "Takeaways for schools" },
      ]}
      faqs={[
        {
          q: "Is this a real student’s answer copy?",
          a: "No. It is the built-in sample page Evalezy uses to preview a pen, with demo answers and demo remarks. For a real answer copy checked by Evalezy, see the Class IX Social Science sample on evalezy.com/sample.",
        },
        {
          q: "Does the pen style affect the marks a student gets?",
          a: "No. All nine pages carry the same marks (3/3, 2/4, 1/2, 0/3) and the same total, 6/12. The pen decides how marks and remarks are drawn, not what they are.",
        },
        {
          q: "How many handwriting styles does Evalezy have?",
          a: "Eight: Teacher (the default), Natural, Scrawled, Quick, Cursive, and three classic faces: Kalam, Patrick Hand and Architects Daughter. Any of them can be drawn in red, blue, green, black or a custom ink, lighter or darker, in three sizes.",
        },
        {
          q: "Can I preview a pen on a full page before checking?",
          a: "Yes. In Settings, “See how it will look” draws a full sample page with the pen you chose, the same way a checked copy is drawn. The images in this article come from that preview.",
        },
      ]}
    >
      <Callout title="A sample page, not a customer story" tone="info">
        <p>
          Every image here is the same built-in sample page, drawn by Evalezy’s pen preview with a different pen. The
          answers and remarks are demo content. It shows what the pen options do; it is not a customer result. For a real
          checked copy, see <Link href="/sample/">the Class IX sample</Link>.
        </p>
      </Callout>

      <p>
        When schools first see an AI-checked copy, one of the first questions is: “Can it write in our colour?” or “Can
        it look less like a computer?” Evalezy lets you <Link href="/blog/choose-pen-handwriting-ai-checked-copy/">choose
        the pen before checking</Link>. To show what that choice really changes, we drew one answer page in nine pens.
      </p>

      <h2 id="setup">The setup</h2>
      <Table
        head={["", ""]}
        rows={[
          ["Page", "Evalezy’s built-in sample page: a Class 8 science answer sheet, four questions, 12 marks"],
          ["Marks on the page", "Q1 3/3 · Q2 2/4 · Q3 1/2 · Q4 0/3 · total 6/12, circled at the top right"],
          ["Remarks", "“Good”, “Long answer needs more elaboration”, “Formula missing”, “Evaporation, not condensation”"],
          ["Pens", "Six handwritings in red, plus the Teacher hand in green, in darker blue and in lighter red"],
          ["How the images were made", "Evalezy’s pen preview, which draws a page the same way as a real checked copy"],
        ]}
      />

      <h2 id="nine">Nine pens, one page</h2>
      <p>Each image shows questions 2 to 4. Open the full page to see the circled total and question 1.</p>
      <div className="my-6 grid gap-4 sm:grid-cols-2">
        {PENS.map((p) => (
          <figure key={p.name} className="space-y-2 rounded-2xl border border-line bg-white p-3">
            <a href={`/copy/pens/${p.name}-page.webp`} target="_blank" rel="noopener">
              <img
                src={`/copy/pens/${p.name}-crop.webp`}
                alt={`Sample answer page, questions 2 to 4, marked with the pen: ${p.label.replace(/^\d+\.\s*/, "")}`}
                width={827}
                height={405}
                loading="lazy"
                className="w-full rounded-lg border border-line"
              />
            </a>
            <figcaption className="px-1 text-sm text-slate-500">
              <strong className="text-ink">{p.label}.</strong> {p.note}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="text-sm text-slate-500">Sample page drawn by Evalezy’s pen preview. Tap an image for the full page.</p>

      <figure className="my-6 space-y-2 rounded-2xl border border-line bg-white p-3">
        <img src="/copy/pens/teacher-red-page.webp" alt="Full sample answer page marked in the default Teacher pen in red: ticks with +1 on question 1, 3/3, 2/4, 1/2, a cross and 0/3 on question 4, and 6/12 circled at the top right" width={827} height={1170} loading="lazy" className="mx-auto w-full max-w-md rounded-lg border border-line" />
        <figcaption className="px-1 text-sm text-slate-500">The full page in the default pen (Teacher, red). Sample page drawn by Evalezy’s pen preview.</figcaption>
      </figure>

      <h2 id="changes">What changes from pen to pen</h2>
      <ul>
        <li><strong>Letter shapes and slant.</strong> From the joined, slanted Teacher hand to upright, rounded Kalam.</li>
        <li><strong>How joined the writing is.</strong> Cursive and Teacher join letters; Natural, Quick and Kalam are closer to print.</li>
        <li><strong>The look of ticks, crosses and the circle.</strong> Strokes are drawn with a slight wobble, so no two look machine-identical.</li>
        <li><strong>Ink colour.</strong> Red, green and blue here; black or any custom colour is also possible.</li>
        <li><strong>Darkness.</strong> Compare the darker blue (8) with the lighter red (9).</li>
        <li><strong>How much room remarks take.</strong> Quick writes small; Cursive and Kalam run wider.</li>
      </ul>

      <h2 id="same">What stays the same</h2>
      <ul>
        <li><strong>The marks:</strong> 3/3, 2/4, 1/2 and 0/3 on every page.</li>
        <li><strong>The total:</strong> 6/12, circled at the top right.</li>
        <li><strong>Ticks and crosses</strong> on the same lines, and +1 beside each earned point in question 1.</li>
        <li><strong>The remarks:</strong> the same words under the same answers.</li>
      </ul>
      <p>
        In other words, the pen is presentation. The marks come from the check: one marking scheme per question,
        applied to every student, and then the teacher’s <Link href="/teacher-review/">review before release</Link>.
      </p>

      <h2 id="pick">Which pen for which use</h2>
      <p>These are suggestions, not measured results. Use the full-page preview to decide.</p>
      <Table
        head={["Situation", "A pen to try", "Why"]}
        rows={[
          ["Primary and middle-school classes", "Classic (Kalam), medium or large", "Neat, rounded letters are the easiest to read"],
          ["Board-exam practice, older classes", "Teacher (default)", "Looks like a teacher checked it by hand"],
          ["A school that checks in green or blue", "Teacher or Natural, in that ink", "Matches the copies students already get"],
          ["Copies that will be printed or photocopied", "A darker ink", "Faint ink can drop out on a copier"],
          ["Students who find a lot of red upsetting", "A lighter red, or blue", "Same feedback, softer on the page"],
          ["Long remarks in small margins", "Quick, small", "Takes the least room; or put remarks beside the copy"],
        ]}
      />
      <p>
        If students write edge to edge, there is another option: set remarks to <strong>Outside the copy</strong>. Marks
        stay on the sheet and remarks go in a Teacher comments panel beside it.
      </p>

      <h2 id="lessons">Takeaways for schools</h2>
      <ol>
        <li><strong>Pick the pen before checking a test.</strong> It is set once in Settings and used for every copy checked after you save.</li>
        <li><strong>Preview a full page, not one line.</strong> A thin style can look fine big and faint on a full page.</li>
        <li><strong>Change one copy if you need to.</strong> After review, “Update checked copy” redraws that copy with your corrections, in the same pen or another.</li>
        <li><strong>Do not judge the AI by its handwriting.</strong> Judge it by the marks and remarks, and review them before release.</li>
      </ol>

      <WhereEvalezyFits>
        <p>
          Evalezy checks scanned or phone-photographed answer copies and writes the result back onto each student’s own
          copy, in the pen you chose: <Link href="/checked-copy/">see the checked copy</Link>. <strong>AI does the first
          check, the teacher reviews and releases.</strong> Set the pen in the dashboard or in the{" "}
          <Link href="/app/">Evalezy app</Link>; pricing is on the <Link href="/pricing/">pricing page</Link>.
        </p>
        <p>
          Other case studies: <Link href="/blog/case-study-ai-vs-teacher-maths-answer-copy/">one maths copy checked by a
          teacher and by AI</Link>, and <Link href="/blog/case-study-class-9-social-science-copy-phone-photo/">a Class IX
          copy photographed on a phone</Link>.
        </p>
      </WhereEvalezyFits>
    </BlogShell>
  );
}
