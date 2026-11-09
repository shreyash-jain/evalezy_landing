import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "choose-pen-handwriting-ai-checked-copy";
export const metadata = postMetadata(SLUG);

const GALLERY: { name: string; label: string; alt: string }[] = [
  { name: "teacher-red", label: "Teacher (default), red", alt: "Sample answer page marked in the Teacher handwriting in red: joined, thin strokes, remarks such as long answer needs more elaboration" },
  { name: "natural", label: "Natural, red", alt: "Sample answer page marked in the Natural handwriting in red: upright print-style letters with an uneven, hand-written rhythm" },
  { name: "scrawled", label: "Scrawled, red", alt: "Sample answer page marked in the Scrawled handwriting in red: tall, narrow, hurried letters" },
  { name: "quick", label: "Quick, red", alt: "Sample answer page marked in the Quick handwriting in red: small, slanted, fast-looking letters" },
  { name: "cursive", label: "Cursive, red", alt: "Sample answer page marked in the Cursive handwriting in red: looped, joined letters" },
  { name: "classic-kalam", label: "Classic (Kalam), red", alt: "Sample answer page marked in the classic Kalam handwriting in red: neat, rounded, very readable letters" },
  { name: "teacher-green", label: "Teacher, green ink", alt: "Sample answer page marked in the Teacher handwriting in green ink" },
  { name: "teacher-blue-dark", label: "Teacher, blue ink, darker", alt: "Sample answer page marked in the Teacher handwriting in dark blue ink" },
  { name: "teacher-light", label: "Teacher, red, lighter", alt: "Sample answer page marked in the Teacher handwriting in a lighter red" },
];

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "Before checking, you can choose the pen Evalezy writes with on every checked copy: the handwriting, the ink colour, how dark it is and its size.",
        "There are eight handwritings: Teacher (the default), Natural, Scrawled, Quick, Cursive and three classic faces (Kalam, Patrick Hand, Architects Daughter). Ink can be red, blue, green, black or any colour you pick.",
        "“See how it will look” draws a full sample page with your pen before you save, so you are not guessing.",
        "The pen is set once in Settings (dashboard: Settings → Assessment; app: Settings) and every copy checked after you save uses it.",
        "The pen changes how the marks look, not the marks. After review, “Update checked copy” redraws one copy with your corrections, in the same pen or another.",
      ]}
      toc={[
        { id: "why", label: "Why the pen matters" },
        { id: "options", label: "What you can choose" },
        { id: "gallery", label: "The handwritings, side by side" },
        { id: "how", label: "How to set the pen" },
        { id: "remarks", label: "Remarks on the copy or beside it" },
        { id: "one-copy", label: "Changing the pen for one copy" },
        { id: "pick", label: "Which pen should you pick?" },
      ]}
      faqs={[
        {
          q: "Can AI-checked answer sheets use a green or blue pen instead of red?",
          a: "Yes. In Evalezy you choose the ink in Settings: red, blue, green, black, or any custom colour from a colour picker. You can also make the ink lighter or darker. Every copy checked after you save uses that ink.",
        },
        {
          q: "Will the checked copy look like a teacher wrote on it?",
          a: "That is the aim. Ticks, crosses, marks and short remarks are drawn on the student’s own pages in a handwriting style, with uneven strokes and words that sit on a slightly sloping line, not typed text. The default handwriting is called Teacher. Look at the sample page drawn in each style before you choose.",
        },
        {
          q: "Does changing the handwriting change the marks?",
          a: "No. The pen only changes how marks and remarks are drawn. The marks come from the check itself: the marking scheme for each question, and your review.",
        },
        {
          q: "Where do I change the pen?",
          a: "In the dashboard, go to Settings → Assessment. In the Evalezy app, open Settings. Choose the handwriting, ink, darkness and size, press “See how it will look” to preview a full page, then save. A teacher can also pick a different pen for one copy when using “Update checked copy” after review.",
        },
        {
          q: "Can the remarks go beside the copy instead of on it?",
          a: "Yes. Choose “Outside the copy”: marks stay on the answer sheet and the remarks go in a Teacher comments panel beside it. The default, “Inside the copy”, writes remarks on the sheet next to the answer.",
        },
      ]}
    >
      <p>
        <strong>Yes, you can choose how an AI-checked answer copy is written.</strong> In Evalezy, before you check a
        test, you pick the pen the AI marks with: the handwriting (eight styles, from a joined “Teacher” hand to neat
        classic print), the ink colour (red, blue, green, black or any colour), how dark it is and how big. A full-page
        preview shows the result before you save. This guide shows every handwriting on the same sample page and explains
        where to set it.
      </p>

      <h2 id="why">Why the pen on a checked copy matters</h2>
      <p>
        A checked copy is the part of checking students actually read. When it comes back as the student’s own pages with
        ticks, crosses, marks in the margin and a short note under an answer, it reads like a teacher’s copy. That is why
        Evalezy draws on the copy itself instead of sending a score table; see <Link href="/checked-copy/">what a
        red-pen checked copy looks like</Link>.
      </p>
      <p>But one red handwriting does not suit every school:</p>
      <ul>
        <li><strong>House style.</strong> Many schools check in a particular colour, and some keep red for the final check only. The copy should match what students are used to.</li>
        <li><strong>Readability.</strong> Younger students read neat, rounded letters more easily than a fast joined hand.</li>
        <li><strong>Printing and photocopying.</strong> Some inks and weights print better than others on a school printer.</li>
        <li><strong>A copy that looks hand-checked.</strong> A pen with a natural rhythm, uneven strokes and a slightly sloping line looks like it was written, not typed.</li>
      </ul>

      <h2 id="options">What you can choose</h2>
      <Table
        head={["Option", "Choices", "What it changes"]}
        rows={[
          ["Handwriting", "Teacher (default), Natural, Scrawled, Quick, Cursive; classic: Kalam, Patrick Hand, Architects Daughter", "Letter shapes, slant and how joined the writing is"],
          ["Ink colour", "Red, blue, green, black, or Custom (any colour from a picker)", "Colour of ticks, crosses, marks, remarks and the circled total"],
          ["How dark", "A slider from light to dark", "How heavy the ink looks on the page"],
          ["Size", "Small, medium, large", "How big remarks and marks are written"],
          ["Preview", "“See how it will look”", "Draws a full sample page with your pen before you save"],
        ]}
      />
      <Callout title="The pen changes the look, not the marks" tone="info">
        <p>
          Marks come from the check: one marking scheme per question, applied to every student, then your review. The pen
          only decides how those marks and remarks are drawn on the page. See it for yourself in the{" "}
          <Link href="/blog/case-study-one-answer-page-nine-pens/">same answer page drawn in nine pens</Link>.
        </p>
      </Callout>

      <h2 id="gallery">The handwritings, side by side</h2>
      <p>
        Below is the same part of one sample page (questions 2 to 4) drawn with different pens. These images come from
        Evalezy’s pen preview: the sample page is a demo page with demo remarks, not a real student’s copy.
      </p>
      <div className="my-6 grid gap-4 sm:grid-cols-2">
        {GALLERY.map((g) => (
          <figure key={g.name} className="space-y-2 rounded-2xl border border-line bg-white p-3">
            <img src={`/copy/pens/${g.name}-crop.webp`} alt={g.alt} width={827} height={405} loading="lazy" className="w-full rounded-lg border border-line" />
            <figcaption className="px-1 text-sm text-slate-500">{g.label}</figcaption>
          </figure>
        ))}
      </div>
      <p className="text-sm text-slate-500">
        Sample page drawn by Evalezy’s pen preview. The two other classic faces, Patrick Hand and Architects Daughter, are
        available too and are not shown here.
      </p>

      <h2 id="how">How to set the pen before checking</h2>
      <Steps
        items={[
          { title: "Open Settings", body: "In the Evalezy dashboard, go to Settings → Assessment. In the Evalezy app, open Settings from the menu." },
          { title: "Pick handwriting, ink, darkness and size", body: "Tap a handwriting and an ink. For a colour that is not in the list, choose Custom and pick it. Move the slider to make the ink lighter or darker." },
          { title: "Press “See how it will look”", body: "Evalezy draws a full sample page with your pen, the same way it draws a real checked copy. Change anything you do not like." },
          { title: "Save", body: "Every copy checked after you save is written with this pen. Set it before you start checking a test." },
        ]}
      />
      <p>
        On the same Settings page you can also add <strong>instructions for the AI checker</strong> (for example, “Follow
        the CBSE marking scheme. Letter writing: format 1, content 2, expression 2”) and switch on{" "}
        <strong>spelling and grammar highlighting</strong> for English answers: each error is underlined with its
        correction and listed in the feedback, with no marks deducted for it.
      </p>

      <h2 id="remarks">Remarks on the copy or beside it</h2>
      <p>The second choice that shapes the copy is where remarks go:</p>
      <ul>
        <li><strong>Inside the copy</strong> (default): remarks are written on the answer sheet, next to the answer, the way most teachers check.</li>
        <li><strong>Outside the copy</strong>: marks stay on the answer sheet, and the remarks go in a Teacher comments panel beside it. Useful when students write edge to edge and leave no room for notes.</li>
      </ul>

      <h2 id="one-copy">Changing the pen for one copy</h2>
      <p>
        AI marks in Evalezy are a draft. In <Link href="/teacher-review/">teacher review</Link> you can change any mark,
        remark or pen note before you release results. Then press <strong>Update checked copy</strong>: the copy is
        drawn again with your corrections. What you changed replaces the AI’s; everything else stays where it was.
      </p>
      <p>
        In that step you can keep the pen the copy was checked with, or pick another one for this copy only, and switch
        its remarks between on the copy and beside it.
      </p>

      <h2 id="pick">Which pen should you pick?</h2>
      <p>There is no right answer; these are starting points:</p>
      <Table
        head={["If you want…", "Try"]}
        rows={[
          ["A copy that looks hand-checked by a teacher", "Teacher, red (the default)"],
          ["Easy reading for younger classes", "Classic (Kalam), medium or large"],
          ["A relaxed, everyday hand", "Natural or Quick"],
          ["Your school’s usual colour", "Any handwriting, with green, blue, black or a custom ink"],
          ["Cleaner photocopies or printouts", "A darker ink; check with the preview"],
          ["Less red on the page", "A lighter red, or blue"],
        ]}
      />
      <p>
        Whatever you pick, press “See how it will look” first and look at the full page, not just one line: a style that
        looks good large can read faint on a whole page.
      </p>

      <WhereEvalezyFits>
        <p>
          Evalezy checks scanned or phone-photographed answer copies and returns each student’s own copy, marked in the
          pen you chose. <strong>AI does the first check, the teacher reviews and releases.</strong> Look through a{" "}
          <Link href="/sample/">real checked copy</Link>, check copies from your phone with the{" "}
          <Link href="/app/">Evalezy app</Link>, or see <Link href="/pricing/">pricing</Link>: 1 credit per page checked,
          credits included in every plan, and failed or unreadable copies are free.
        </p>
      </WhereEvalezyFits>
    </BlogShell>
  );
}
