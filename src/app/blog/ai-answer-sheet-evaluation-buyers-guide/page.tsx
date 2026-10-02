import { BlogShell, postMetadata, Callout, Steps, WhereEvalezyFits, Sources } from "@/components/BlogShell";
import Link from "next/link";
import { DOCS_URL } from "@/lib/site";

const SLUG = "ai-answer-sheet-evaluation-buyers-guide";
export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "AI answer sheet evaluation reads the handwriting, finds each answer, marks it against a scheme and hands the result to a teacher; reading handwriting is a harder job than reading printed text.",
        "Consistency comes from one fixed marking scheme per question used for every copy, not from the AI model alone.",
        "No vendor’s demo tells you how it will do on your copies, so run a pilot on copies your teachers have already marked.",
        "The most revealing questions are about failure: unreadable copies, uncertain student matches, diagrams, other languages and who releases the marks.",
      ]}
      toc={[
        { id: "what-it-is", label: "What it is, and what it is not" },
        { id: "how-it-works", label: "How it works, step by step" },
        { id: "twelve-questions", label: "12 questions to ask before you buy" },
        { id: "pilot", label: "How to run a fair pilot" },
      ]}
      faqs={[
        {
          q: "How accurate is AI answer sheet checking?",
          a: "There is no single accuracy figure that transfers to your copies. Results vary with subject, question type, handwriting, scan quality and language. That is why a pilot on copies your teachers have already marked tells you more than any number in a brochure.",
        },
        {
          q: "Is AI copy checking the same as on-screen marking?",
          a: "No. On-screen marking scans answer books so that human examiners can mark them on a screen. AI checking reads the handwriting and proposes marks, which a teacher then reviews and releases.",
        },
        {
          q: "Can we just use ChatGPT to check answer sheets?",
          a: "A general chatbot can comment on a photo of one answer, but checking a class needs one fixed scheme for every copy, matching copies to students, an annotated copy and a teacher release step. Our comparison page covers the differences.",
        },
        {
          q: "Should AI marks ever go to students without a teacher’s review?",
          a: "No. Treat AI marks as a draft that a teacher reviews, edits and releases. In England, the exams regulator Ofqual has said AI may not be used as the sole marker in assessments that are part of regulated qualifications.",
        },
        {
          q: "What should a pilot include?",
          a: "Thirty to fifty copies your teachers have already marked, across at least two subjects if you can, including messy handwriting, out-of-order answers, a phone photo and a near-blank copy. Give the vendor your marking scheme and compare marks question by question.",
        },
      ]}
    >
      <p>
        AI answer sheet evaluation means software that reads a student’s handwritten answer copy, finds each answer and
        proposes marks against a marking scheme. It is now offered to schools, coaching institutes and universities, and
        the demos tend to look alike. The differences show up later, on your copies, in exam week.
      </p>
      <p>
        This guide explains how these systems work in plain words, then gives twelve questions to put to any vendor,
        including us. It is written for principals, exam heads and coaching owners who will sign off the purchase and
        answer for the marks.
      </p>

      <h2 id="what-it-is">What it is, and what it is not</h2>
      <p>Three different things often get lumped together:</p>
      <ul>
        <li>
          <strong>OMR</strong> reads filled bubbles on a printed sheet. It works only for objective questions.
        </li>
        <li>
          <strong>On-screen marking</strong> scans answer books so that human examiners mark them on a screen. People
          still read every answer; the software handles distribution and adds up the marks. CBSE introduced on-screen
          marking for Class XII answer books from the 2026 examinations and listed the elimination of totalling errors
          among its benefits.
        </li>
        <li>
          <strong>AI answer sheet evaluation</strong> reads the handwriting itself and proposes the marks. A teacher then
          reviews them.
        </li>
      </ul>
      <p>
        Our pages comparing AI checking with <Link href="/compare/on-screen-marking/">on-screen marking</Link> and{" "}
        <Link href="/compare/manual-checking/">manual checking</Link> go into these differences in more detail.
      </p>

      <h2 id="how-it-works">How it works, step by step</h2>
      <p>Most systems follow the same six steps. The buying questions later in this guide map onto them.</p>
      <Steps
        items={[
          {
            title: "Clean up the scans",
            body: "Copies arrive as scanned PDFs or phone photos. Pages are straightened, cleaned up and given more contrast so that faint pencil and light ink are easier to read.",
          },
          {
            title: "Read the handwriting",
            body: "This is the hard part, and it is not the same as ordinary OCR. Printed-text OCR expects regular letters on straight lines. Student handwriting slopes, runs together, has crossings-out, arrows and insertions, and mixes words with symbols. Newer systems use AI models that read the whole page as an image, in context, rather than letter by letter. They can still misread a word.",
          },
          {
            title: "Find each answer",
            body: "Students answer out of order, skip numbers, write the wrong number and continue an answer three pages later. The system has to work out which text answers which question before it can mark anything.",
          },
          {
            title: "Mark against a scheme",
            body: "Each answer is compared with a marking scheme for that question: the points that earn marks and what each is worth. If the scheme is fixed once and used for every copy, every copy is judged the same way. If the AI decides afresh for each copy, they may not be.",
          },
          {
            title: "Annotate",
            body: "The output is marks per question, usually with short reasons. Some tools return a spreadsheet. Some write the marks and comments back onto the student’s own copy.",
          },
          {
            title: "Human review and release",
            body: "A teacher reviews the proposed marks, changes what needs changing and releases the result. In England, the exams regulator Ofqual has made clear that AI may not be used as the sole marker in any assessment that is part of a regulated qualification, and expects appropriate expert human involvement and oversight.",
          },
        ]}
      />
      <Callout tone="info" title="Ask for evidence on your own copies">
        <p>
          Ofqual’s researchers wrote in January 2026 that AI marking performance varies significantly across contexts,
          that marking a maths exam is substantially different from marking an English exam, and that the case for any
          use needs context-specific evidence. A demo on the vendor’s sample proves little. A pilot on your own copies
          proves a lot.
        </p>
      </Callout>

      <h2 id="twelve-questions">12 questions to ask before you buy</h2>
      <p>For each question: why it matters, and what a good answer sounds like.</p>

      <h3>1. What happens to a copy the system cannot read?</h3>
      <p>
        Blurred photos, faint pencil, missing or shuffled pages. A system that always produces a mark will sometimes
        produce one from text it never really read. <strong>A good answer:</strong> the copy fails with a clear reason,
        it is not graded by guesswork, a teacher is told, and you are not charged for it. Ask to see what the teacher
        sees when this happens.
      </p>

      <h3>2. Who releases the marks to students?</h3>
      <p>
        If AI marks can reach students or parents before a teacher has looked at them, every misread becomes a
        complaint. <strong>A good answer:</strong> marks land as a draft, only a teacher can release them, and students
        see nothing until then. Ask whether that is enforced on the server or only hidden in the app.
      </p>

      <h3>3. Does it ever guess which student a copy belongs to?</h3>
      <p>
        With a bulk upload, the system has to match each copy to a student, usually by reading the handwritten name and
        roll number on the first page. Handwritten names are hard, and two students can have similar names. A wrong
        match means one student receives another student’s marks. <strong>A good answer:</strong> when the match is not
        certain, a person picks the student.
      </p>

      <h3>4. How exactly is it priced?</h3>
      <p>
        Per page, per copy, per question, per student or a subscription can all look cheap on a slide.{" "}
        <strong>Ask for:</strong> a worked cost for one real paper (copies × pages), whether failed and unreadable copies
        are charged, whether a re-check costs again, what is included in the price, and whether the price includes GST.
      </p>

      <h3>5. What happens to student data?</h3>
      <p>
        Answer sheets carry names, roll numbers and children’s handwriting. In India, the Digital Personal Data
        Protection Act, 2023 treats anyone under 18 as a child and has a separate section on children’s data. Its Rules
        were notified on 14 November 2025 with an eighteen-month period for phased compliance, and the government’s
        summary says verifiable parental consent is required for a child’s data unless the processing relates to
        essential services such as education. How that applies to your institution is a question for your own adviser.
      </p>
      <p>
        <strong>Ask any vendor:</strong> where copies are stored, who can see them, which outside AI providers receive
        page images, how long data is kept, how you delete it, and what the contract says. If a vendor claims a security
        certification, ask for the certificate.
      </p>

      <h3>6. Can teachers override marks, and does the override stick?</h3>
      <p>
        Overrides are the whole point of review. <strong>A good answer:</strong> a teacher can change any mark, and a mark
        a teacher has changed is never overwritten by a later AI run. Ask what happens if a copy is re-checked after a
        teacher has edited it.
      </p>

      <h3>7. How does it keep marking consistent across copies?</h3>
      <p>
        Consistency is one of the main reasons to use AI at all. <strong>A good answer:</strong> one marking scheme per
        question, fixed before marking and used for every copy, which teachers can read and edit, plus a breakdown for
        each answer showing which criteria earned marks. Seeing why a mark was given also matters when a student asks
        for a re-check. <strong>Test it:</strong> submit the same copy twice and compare the marks.
      </p>

      <h3>8. How are diagrams, maps and graphs marked?</h3>
      <p>
        Many answers in science, geography and maths include drawings. Ask precisely what is judged: the drawing
        itself, or only the labels and the written explanation around it. <strong>A good answer is a specific one</strong>,
        with examples from your subjects. Be wary of a general “yes, diagrams are supported”.
      </p>

      <h3>9. Which languages has it actually been tested on?</h3>
      <p>
        “Supported” and “tested” are not the same thing. Hindi, regional languages, and answers that mix English with
        another language or script are much harder than they sound. <strong>Ask for:</strong> the languages it has been
        tested on, and a trial on your own copies in each language you need.
      </p>

      <h3>10. How does it handle maths?</h3>
      <p>
        Maths copies are dense with fractions, powers, symbols and working spread over many lines, and one misread minus
        sign changes the answer. <strong>Ask:</strong> how symbols and working are read, how unclear lines are handled,
        and whether method marks are given when the final answer is wrong.
      </p>

      <h3>11. How long does a batch really take?</h3>
      <p>
        “Instant” is a warning sign: reading and marking handwriting takes time. <strong>Ask for:</strong> typical
        minutes per copy, how long until the first results appear, how long a batch of 100 or 500 copies takes on
        current capacity, and whether that changes in exam season when every customer uploads at once. Also ask how you
        are told a batch is done.
      </p>

      <h3>12. Is there an API?</h3>
      <p>
        This matters if you run your own LMS, test platform or app. <strong>Ask:</strong> whether the API is available to
        you now or only on a roadmap, how authentication works, how you send a copy (a file or a URL) and get results
        back, and whether API pricing matches the dashboard.
      </p>

      <h2 id="pilot">How to run a fair pilot</h2>
      <ol>
        <li>
          <strong>Use copies you have already marked.</strong> Thirty to fifty copies from a recent test, across at least
          two subjects if you can.
        </li>
        <li>
          <strong>Include the hard cases.</strong> Messy handwriting, answers out of order, a phone photo, a near-blank
          copy, a long answer and a numerical.
        </li>
        <li>
          <strong>Give the vendor your marking scheme.</strong> You are testing whether it applies your standard, not
          whether it can invent a good one. If you need to tidy your scheme first, see{" "}
          <Link href="/blog/how-to-write-a-marking-scheme/">how to write a marking scheme</Link>.
        </li>
        <li>
          <strong>Compare question by question, not just totals.</strong> Totals can match while individual answers are
          off in both directions. Look at where the AI and your teachers differ, and read why.
        </li>
        <li>
          <strong>Time the review.</strong> The real saving is how long a teacher takes to review and release a batch,
          compared with checking it by hand.
        </li>
      </ol>

      <WhereEvalezyFits>
        <p>
          Evalezy is our AI checking product for handwritten answer sheets. It returns each student’s own copy checked
          in red pen, with marks per question and the total circled; you can see a{" "}
          <Link href="/sample/">real checked copy</Link>. Here is how it answers the twelve questions.
        </p>
        <p>
          <strong>Unreadable copies:</strong> a mostly unreadable copy fails with a clear error, is not graded by
          guesswork and is not charged. <strong>Release:</strong> marks land as a draft, and students see “Results
          pending” until a teacher presses Release Result, enforced on the server. <strong>Student matching:</strong> it
          reads the name, roll number and class from the first page and never guesses; uncertain matches wait for a
          teacher to pick the student.
        </p>
        <p>
          <strong>Price:</strong> <Link href="/pricing/">₹1 per page checked</Link> ($0.01 outside India), plus GST in
          India. Failed, cancelled and unreadable checks are free; a re-check is charged again.{" "}
          <strong>Data:</strong> see <Link href="/security/">how we handle answer sheets</Link>; Evalezy does not hold
          SOC 2 or ISO certification today. <strong>Overrides:</strong> a mark a teacher edits is never overwritten by a
          later AI run.
        </p>
        <p>
          <strong>Consistency:</strong> one <Link href="/marking-scheme/">marking scheme per question</Link>, generated
          once and used for every copy, which you can edit or replace; <Link href="/teacher-review/">teacher review</Link>{" "}
          shows the criteria breakdown for every answer. <strong>Diagrams:</strong> judged by their labels and written
          explanation only, not as drawings. <strong>Languages:</strong> built and tested on English copies; for anything
          else, send us samples first.
        </p>
        <p>
          <strong>Maths:</strong> unclear maths lines get a second read by an equation reader, up to four per copy.{" "}
          <strong>Time:</strong> 1–8 minutes per copy, first results in about 10 minutes, and about 2–3 hours for 100
          copies on current capacity, with a bell alert and an email when a batch is done. <strong>API:</strong> the{" "}
          <Link href="/api/">Evaluation API</Link> is live now and is switched on per institute. It takes each copy as an
          uploaded PDF, not a link, and you poll for results, since webhooks are not available yet. The price per page is
          the same as the dashboard; the <a href={DOCS_URL} data-track="open_docs">API docs</a> have the details.
        </p>
      </WhereEvalezyFits>

      <p>
        If you are evaluating tools for a specific setting, our pages for{" "}
        <Link href="/for/schools/">schools</Link>, <Link href="/for/coaching-institutes/">coaching institutes</Link>{" "}
        and <Link href="/for/colleges-universities/">colleges and universities</Link> show how the workflow fits, and
        our comparison with a <Link href="/compare/chatgpt/">general chatbot</Link> covers the question we hear most.
      </p>

      <Sources
        items={[
          {
            label: "CBSE circular dated 9 February 2026: Introduction of On-Screen Marking (OSM) for Class XII Examinations",
            url: "https://www.cbse.gov.in/cbsenew/documents/OSM_Class%20XII_09022026.pdf",
            checked: "2026-10-01",
          },
          {
            label: "Ofqual, Ofqual’s approach to regulating the use of artificial intelligence in the qualifications sector (policy paper, updated 16 July 2026)",
            url: "https://www.gov.uk/government/publications/ofquals-approach-to-regulating-the-use-of-artificial-intelligence-in-the-qualifications-sector/ofquals-approach-to-regulating-the-use-of-artificial-intelligence-in-the-qualifications-sector--2",
            checked: "2026-10-01",
          },
          {
            label: "Handford and Williamson, Using AI in marking: why technical capability, fairness, and transparency all matter, The Ofqual blog, 14 January 2026",
            url: "https://ofqual.blog.gov.uk/2026/01/14/using-ai-in-marking-why-technical-capability-fairness-and-transparency-all-matter/",
            checked: "2026-10-01",
          },
          {
            label: "The Digital Personal Data Protection Act, 2023 (No. 22 of 2023), Gazette of India, via MeitY: section 2(f) and section 9",
            url: "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf",
            checked: "2026-10-01",
          },
          {
            label: "Press Information Bureau, DPDP Rules, 2025 Notified (17 November 2025)",
            url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf",
            checked: "2026-10-01",
          },
        ]}
      />
    </BlogShell>
  );
}
