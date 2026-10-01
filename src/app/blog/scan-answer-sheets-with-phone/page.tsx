import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "scan-answer-sheets-with-phone";

export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "Use a scanner app that builds one multi-page PDF, not loose camera photos: Google Drive (Android and iPhone) and Notes or Preview (iPhone) all do this.",
        "Make exactly one PDF per student, with pages in order and nobody else’s pages in the file.",
        "Ask students to write name, roll number and class at the top of page 1 in clear capitals; that line is what automatic matching reads.",
        "Most unreadable pages come from shadow, blur, cut-off edges and very light ink, and all four are easy to catch before upload.",
        "Run a short checklist on every PDF before upload: page count, order, the name line, all four corners and one zoomed-in page.",
      ]}
      toc={[
        { id: "why-it-matters", label: "Why scan quality decides the result" },
        { id: "app-or-camera", label: "Scanner app or camera photos?" },
        { id: "name-line", label: "Before the exam: the name line" },
        { id: "light-and-frame", label: "Light, shadows and framing" },
        { id: "notebooks", label: "Spiral notebooks and two-page spreads" },
        { id: "one-pdf", label: "One PDF per student, in order" },
        { id: "names-and-sizes", label: "File names and file sizes" },
        { id: "unreadable", label: "What makes a page unreadable" },
        { id: "checklist", label: "Pre-upload checklist" },
      ]}
      faqs={[
        {
          q: "Can I scan answer sheets with a phone instead of a scanner?",
          a: "Yes. A phone with a scanner app produces copies that a teacher or an AI can read line by line, as long as the light is even, the whole page is in frame and the phone is held still. Evalezy’s own sample copy is a phone photo of a spiral notebook.",
        },
        {
          q: "Which app should I use to scan answer sheets?",
          a: "Any app that saves several pages into one PDF. Google Drive does this on Android and iPhone (choose PDF when saving on Android). On iPhone, Notes saves scans as a PDF in the note, and Preview can scan a document to create a PDF. Microsoft Lens was retired in early 2026, so do not plan around it.",
        },
        {
          q: "Should I scan answer sheets in colour or black and white?",
          a: "Colour or greyscale is the safer choice. Strong black-and-white filters make dark ink look crisp but can wipe out faint pencil or light blue ink. Check the first page after applying a filter before you scan the rest of the class.",
        },
        {
          q: "What happens if a student forgot to write their name?",
          a: "Evalezy reads the name, roll number and class from the top of page 1, and from page 2’s header if page 1 has none. If there is no name, or two students look like close matches, it does not guess: the teacher picks the right student or skips the copy. Reading names is free.",
        },
        {
          q: "How many answer sheets can I upload at once?",
          a: "Evalezy’s bulk upload takes up to 200 PDFs at a time, up to 60 MB each, one file per student. Copies of up to 40 pages are read in full.",
        },
        {
          q: "Do the pages need to be in question order?",
          a: "Not for the checking itself: Evalezy finds answers by their content, not by the number the student wrote, so an answer to Question 5 written before Question 2 is still found. Keep pages in the order they were written so the checked copy is easy for the student and teacher to follow.",
        },
      ]}
    >
      <p>
        Most schools do not have a document scanner in every staffroom, and they do not need one. A phone with the right
        app makes answer sheet scans that are good enough for a teacher, or an AI, to read every line. What goes wrong is
        rarely the phone. It is a shadow across the bottom third of a page, a margin cut off, two students’ pages in one
        file, or page 4 scanned twice and page 5 not at all.
      </p>
      <p>
        This guide is for the teacher or office staff member with a stack of answer copies and a phone. It covers which app
        to use, how to light and frame a page, how to handle spiral notebooks, how to build one clean PDF per student, and a
        checklist to run before you upload anything for evaluation.
      </p>

      <h2 id="why-it-matters">Why scan quality decides the result</h2>
      <p>
        Whoever evaluates a scanned copy, a teacher on a screen or an AI, can only mark what they can read. If a line is
        lost in a shadow, the answer looks incomplete. If a page is missing, the answer is missing.
      </p>
      <p>
        Large exam bodies treat this as a real risk. When CBSE moved Class 12 evaluation to on-screen marking in 2026, its
        published FAQ described three levels of scan quality checks: at scanning, by a quality control team, and by the
        evaluator, who could reject a copy that was not scanned properly so it could be scanned again. The Ministry of
        Education also said that more than 13,000 answer sheets with legibility problems, because students had used very
        light ink, were identified and checked manually.
      </p>
      <p>
        Your school is unlikely to have a quality control team. A short routine per class does the same job, and most of it
        happens before you press the shutter.
      </p>

      <h2 id="app-or-camera">Scanner app or camera photos?</h2>
      <p>
        Use a scanner app. It does four things the camera app does not: it finds the edges of the page and crops to them,
        straightens the page, evens out the background, and collects many pages into one PDF. Loose camera photos arrive as
        separate images per student, sorted however the gallery sorts them, and someone has to rebuild each copy by hand.
      </p>
      <p>Apps most phones already have will do the job:</p>
      <ul>
        <li>
          <strong>Google Drive (Android and iPhone).</strong> Tap the camera or Scan option and point the phone at the
          page. A blue line shows where the page will be cropped. Tap Add to scan the next page. On Android you choose PDF
          or JPG when saving: choose PDF. Google’s help page says scans on iPhone are saved as searchable PDFs. Drive also
          has Crop &amp; Rotate, Filter and a Clean tool that erases stains and fingers.
        </li>
        <li>
          <strong>Notes (iPhone).</strong> In a note, tap the attachment button, then Scan Documents. The iPhone captures
          the page automatically when it detects the page boundaries, or you can capture manually and adjust the corners.
          Apple’s guide says the document is saved as a PDF in the note. The Files app has the same Scan Documents option
          and asks where to save.
        </li>
        <li>
          <strong>Preview (iPhone, recent iOS versions).</strong> Apple’s guide says you can scan a document in Preview to
          create a PDF, adding pages one after another and cropping, rotating or adjusting each one.
        </li>
      </ul>
      <Callout title="If your staff used Microsoft Lens" tone="warn">
        <p>
          Microsoft retired Lens from iOS and Android starting 9 January 2026 and recommends the scanner in the OneDrive
          app instead. Check its limits before you rely on it for exam copies: Microsoft’s help page for OneDrive on
          Android caps a multi-page scan at 10 pages, fewer than many answer booklets.
        </p>
      </Callout>
      <p>
        Camera photos are a fallback, not a plan. If you must use them, shoot each page straight on and combine the photos
        into one PDF, in page order, before upload. Evalezy takes one PDF per student, so photos have to become a PDF at
        some point, and that step is where pages get shuffled.
      </p>

      <h2 id="name-line">Before the exam: the name line</h2>
      <p>
        The easiest scanning fix happens before anyone picks up a phone. Ask every student to write three things at the top
        of page 1, in clear capital letters:
      </p>
      <ul>
        <li>Name</li>
        <li>Roll number</li>
        <li>Class and section</li>
      </ul>
      <p>
        This is not only for tidiness. Evalezy reads the name, roll number and class or section from the top of page 1 (and
        from page 2’s header if page 1 has none), then matches each copy to a registered student. It never guesses: if the
        name is missing, unclear, or two students are close matches, the teacher picks the right student. A clear name line
        means fewer copies to sort by hand. See how this works on the <Link href="/bulk-upload/">bulk upload page</Link>.
      </p>
      <p>
        Two more requests help. Keep the name line a little away from the very top edge, where a tight crop can cut it. And
        if you can, ask for dark blue or black pen. Faint pencil and light ink stay hard to read even in a perfect scan.
      </p>

      <h2 id="light-and-frame">Light, shadows and framing</h2>
      <ul>
        <li>
          <strong>Use soft daylight.</strong> A table near a window gives even light. A ceiling light directly overhead
          puts the shadow of your phone and hand on the page.
        </li>
        <li>
          <strong>Avoid glare.</strong> Flash on glossy or laminated paper leaves a bright patch over the writing. Use it
          only when the room is too dark, and check the result.
        </li>
        <li>
          <strong>Hold the phone flat and parallel to the page.</strong> A tilted shot makes the far lines smaller. Apps
          straighten the shape of the page, but they cannot add detail the camera never caught.
        </li>
        <li>
          <strong>Use a plain, darker surface.</strong> White paper on a white table makes the page edges hard for the app
          to find. A dark desk or a dark sheet underneath works better, and also reduces writing from the back of thin
          paper showing through.
        </li>
        <li>
          <strong>Keep the whole page in frame.</strong> Leave a thin border of table visible on all four sides. The name
          line at the top and the last line at the bottom are the easiest things to cut.
        </li>
        <li>
          <strong>Keep still until the app captures.</strong> Blur from a moving hand cannot be fixed later, by any
          app.
        </li>
        <li>
          <strong>Go easy on filters.</strong> Colour or greyscale is safest. Look at the first page after any filter
          before scanning the rest.
        </li>
      </ul>

      <h2 id="notebooks">Spiral notebooks and two-page spreads</h2>
      <p>
        Many schools and coaching institutes run tests in notebooks rather than loose sheets. These scan well with a little
        care. Evalezy’s own <Link href="/sample/">sample copy</Link> is a phone photo of a spiral notebook, and each page is
        straightened, cleaned up and contrast-boosted before it is read.
      </p>
      <ul>
        <li>
          <strong>One page per shot.</strong> Do not photograph the open notebook as a spread. Two pages in one image means
          two half-size pages with a curved binding in the middle.
        </li>
        <li>
          <strong>Press the page flat.</strong> Fold a spiral notebook back on itself. For a bound notebook, hold the page
          down at the outer edges with your fingers clear of the writing, and check no fingertip covers a word.
        </li>
        <li>
          <strong>Watch the binding side.</strong> Words close to the spiral or the spine are the easiest to lose to the
          curve of the page. Make sure the inner margin is visible.
        </li>
        <li>
          <strong>Answers across a spread.</strong> If a student wrote one answer across a left and a right page, scan the
          left page first, then the right, as two pages in order.
        </li>
      </ul>

      <h2 id="one-pdf">One PDF per student, in order</h2>
      <p>
        Every student gets exactly one PDF, containing all of their pages and nobody else’s. This is how Evalezy’s bulk
        upload works (up to 200 PDFs at a time, one file per student), and it is how any evaluator, human or AI, expects a
        copy to arrive.
      </p>
      <ul>
        <li>Start with the page that carries the name line.</li>
        <li>Scan in page order, and add supplementary sheets at the end in the order they were attached.</li>
        <li>Leave out completely blank pages and accidental duplicate shots. They add review time and nothing else.</li>
        <li>Never put two students in one file because it is quicker. Splitting a PDF later is slower than scanning separately now.</li>
      </ul>
      <p>
        Students often answer Question 5 before Question 2. That is fine for checking: Evalezy finds answers by their
        content, not by the number the student wrote. Page order still matters for the student and teacher who read the{" "}
        <Link href="/checked-copy/">checked copy</Link> later, so keep the pages in the order they were written.
      </p>

      <h2 id="names-and-sizes">File names and file sizes</h2>
      <p>
        Pick one naming pattern for the whole school and stick to it. A good pattern sorts correctly in any folder and shows
        a missing roll number at a glance. For example: <strong>10B_07_StudentName.pdf</strong> for class 10, section B,
        roll number 7. Write roll numbers with a leading zero (07, not 7) so that 10 does not sort before 2. If one folder
        holds several tests, put the subject and test first, such as <strong>Science-UT2_10B_07.pdf</strong>.
      </p>
      <p>
        Evalezy reads the student’s name from the page, not from the file name. The file name is for your team, so anyone
        can find a copy quickly.
      </p>
      <p>
        Check sizes before upload. Evalezy accepts PDFs up to 60 MB each and reads copies of up to 40 pages in full. Size
        problems usually come from PDFs built out of full-resolution camera photos. If a file is too large, rescan at the
        app’s default quality instead of its highest, or use a compress option, then zoom in on the smallest handwriting to
        make sure it is still sharp.
      </p>

      <h2 id="unreadable">What makes a page unreadable</h2>
      <Table
        head={["Problem", "What it looks like", "Fix"]}
        rows={[
          ["Shadow", "A dark band or corner across the writing", "Move to window light; hold the phone so your shadow falls off the page"],
          ["Motion blur", "Smeared or doubled letters", "Hold still; let the app auto-capture; add light"],
          ["Cut-off edges", "Name line, margin or last lines missing", "Leave a border on all four sides; check the corners"],
          ["Glare", "A white patch over the text", "Turn the flash off; move away from the direct light"],
          ["Very light ink or pencil", "Faint, broken strokes", "Use colour or greyscale, not harsh black and white; ask for dark pen next time"],
          ["Show-through", "Writing from the back of the page visible", "Put a dark sheet behind the page"],
          ["Curved or tilted page", "Lines that slope or bend near the binding", "Flatten the page; hold the phone parallel"],
          ["Missing or repeated pages", "Page 4 twice, page 5 absent", "Count pages against the copy before saving"],
        ]}
      />
      <p>
        Evalezy straightens, cleans and boosts the contrast of each page before reading it, which rescues many imperfect
        phone photos. It cannot recover writing the photo never captured. When a copy is mostly unreadable, Evalezy fails it
        with a clear error instead of marking it by guesswork, and that check is not charged. You rescan and upload again.
      </p>

      <h2 id="checklist">Pre-upload checklist</h2>
      <p>
        For a full class, it helps if one person scans and another checks. Run these steps on every PDF before upload:
      </p>
      <Steps
        items={[
          { title: "One file per student", body: "Each PDF holds one student’s copy and nothing else." },
          { title: "Page count matches", body: "The number of pages equals the pages in the copy, including supplementary sheets." },
          { title: "Name line readable", body: "Page 1 shows name, roll number and class clearly, with nothing cropped." },
          { title: "Order and duplicates", body: "Pages are in written order, with no repeats and no blank pages." },
          { title: "Zoom test", body: "Open one middle page and zoom in on the smallest handwriting. Every word should be clear." },
          { title: "Corners", body: "Check all four corners of the first and last page for cut-off text." },
          { title: "Name and size", body: "The file follows your naming pattern and is under 60 MB." },
          { title: "Count against attendance", body: "The number of files matches the students who sat the test." },
        ]}
      />

      <WhereEvalezyFits>
        <p>
          Once the PDFs are ready, upload up to 200 at a time on the <Link href="/bulk-upload/">bulk upload</Link> page.
          Evalezy reads each name line, matches copies to your student list, and asks you to pick whenever it cannot be
          sure. It then checks each copy against one <Link href="/marking-scheme/">marking scheme</Link> per question and
          returns the student’s own copy checked in red pen, with marks per question and the total circled on page 1.
        </p>
        <p>
          Marks stay a draft until a teacher <Link href="/teacher-review/">reviews them</Link> and presses Release Result.
          See a real <Link href="/sample/">checked sample copy</Link>, or read how it works for{" "}
          <Link href="/for/schools/">schools</Link>.
        </p>
      </WhereEvalezyFits>

      <Sources
        items={[
          { label: "Google Drive Help: Scan documents with Google Drive (Android)", url: "https://support.google.com/drive/answer/3145835", checked: "2026-10-01" },
          { label: "Google Drive Help: Scan documents with Google Drive (iPhone & iPad)", url: "https://support.google.com/drive/answer/3145835?hl=en&co=GENIE.Platform%3DiOS", checked: "2026-10-01" },
          { label: "Apple iPhone User Guide: Scan text and documents in Notes", url: "https://support.apple.com/guide/iphone/scan-text-and-documents-iph653f28965/ios", checked: "2026-10-01" },
          { label: "Apple iPhone User Guide: Scan text and documents in Preview", url: "https://support.apple.com/guide/iphone/scan-text-and-documents-iphd81075862/ios", checked: "2026-10-01" },
          { label: "Apple Support: How to scan documents on your iPhone or iPad", url: "https://support.apple.com/en-us/108963", checked: "2026-10-01" },
          { label: "Microsoft Support: Retirement of Microsoft Lens", url: "https://support.microsoft.com/en-us/lens/retirement-of-microsoft-lens", checked: "2026-10-01" },
          { label: "Microsoft Support: Scan a whiteboard, document, business card, or photo in OneDrive for Android", url: "https://support.microsoft.com/en-us/office/scan-a-whiteboard-document-business-card-or-photo-in-onedrive-for-android-d74d52bc-dd44-4a20-babb-b75621c32da0", checked: "2026-10-01" },
          { label: "CBSE: Know about On Screen Marking (OSM), FAQ dated 18 May 2026", url: "https://www.cbse.gov.in/cbsenew/documents/FAQ-OSM_18052026.pdf", checked: "2026-10-01" },
          { label: "ThePrint (PTI), 17 May 2026: On-Screen Marking not new, enables transparent evaluation: Ministry of Education", url: "https://theprint.in/india/on-screen-marking-not-new-enables-transparent-evaluation-ministry-of-education/2933783/", checked: "2026-10-01" },
        ]}
      />
    </BlogShell>
  );
}
