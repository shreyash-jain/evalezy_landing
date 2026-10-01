import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "on-screen-marking-vs-ai-evaluation";

export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "On-screen marking moves the answer book to a screen: evaluators still read and mark every answer, while the software handles totalling, routing and records.",
        "CBSE used OSM for Class 12 answer books in 2026, and its post-result process showed that OSM brings its own failure points: blurred scans, missing pages and wrong answer books.",
        "OSM does not remove evaluator variance; an AI first evaluation applies one rubric to every script so evaluators review proposed marks instead of reading from scratch.",
        "The safe combination is an AI first pass plus human evaluator review, with the human mark final and the re-evaluation route unchanged.",
        "Before any rollout, pilot on past scripts with known marks, test scan quality and data security, and write down who owns the final mark.",
      ]}
      toc={[
        { id: "what-is-osm", label: "What on-screen marking is" },
        { id: "osm-in-india", label: "How OSM is used in India" },
        { id: "what-osm-solves", label: "What OSM solves" },
        { id: "what-osm-does-not", label: "What OSM does not solve" },
        { id: "what-ai-adds", label: "What AI first evaluation adds" },
        { id: "combining", label: "How the two combine" },
        { id: "governance", label: "Risks and governance" },
        { id: "decision-table", label: "A decision table" },
      ]}
      faqs={[
        {
          q: "What is on-screen marking (OSM)?",
          a: "On-screen marking is a digital evaluation system. Students write on paper, the answer books are scanned, and evaluators log in to read each answer on a computer and enter marks question by question. The software totals the marks, records who marked what and lets senior examiners check samples.",
        },
        {
          q: "Is on-screen marking the same as AI evaluation?",
          a: "No. In on-screen marking a human evaluator reads and marks every answer; only the medium changes from paper to screen. In AI evaluation, software reads the handwriting and proposes marks against a marking scheme, and a human reviews them. The two can be combined.",
        },
        {
          q: "Does CBSE use AI to check answer sheets?",
          a: "Not in its on-screen marking system, according to CBSE’s own FAQ from May 2026. Asked whether computers check the answers, CBSE said no: examiners evaluate the scanned copies on a computer instead of the physical answer books.",
        },
        {
          q: "Can AI replace evaluators in board or university exams?",
          a: "It should not. The responsible use is an AI first evaluation that a human evaluator reviews, with the human mark final and nothing published without human release. Diagram-heavy answers and languages the system has not been tested on need human evaluators.",
        },
        {
          q: "How should an exam body pilot AI evaluation?",
          a: "Run it on past scripts that already have final marks, in parallel with your current process. Compare marks question by question, study the largest disagreements, check each question type separately, and set rules for human review before using it on a live exam.",
        },
        {
          q: "What happens to re-evaluation when AI is used?",
          a: "Students should keep exactly the same rights to see their copy and ask for re-evaluation. The re-evaluator should see the scanned answer, the AI’s proposed mark and reasons, and every change the human evaluator made.",
        },
      ]}
    >
      <p>
        Ask two exam controllers what “digital evaluation” means and you may get two different answers. One is on-screen
        marking (OSM): answer books are scanned and evaluators mark them on a computer. The other is AI evaluation: software
        reads the handwriting and proposes marks. They are often mentioned together, but they solve different problems.
      </p>
      <p>
        This article explains both, what India’s experience with OSM has shown, and how an AI first pass can sit inside an
        OSM-style process without taking the final mark away from a human evaluator.
      </p>

      <h2 id="what-is-osm">What on-screen marking is</h2>
      <p>
        In on-screen marking, students write on paper as usual. After the exam, answer books are scanned and the images are
        sent to evaluators, who log in, read each answer on screen and enter marks question by question. The software adds
        up the total, records which evaluator marked which script, and lets senior examiners review a sample.
      </p>
      <p>
        CBSE’s FAQ on OSM puts it plainly: the method changes, not the criteria. The answer book is on a monitor instead of
        a table, and a mouse is used to award marks. Asked whether computers are checking the answers, CBSE’s answer is no:
        examiners evaluate the scanned copies.
      </p>
      <Callout title="The one-line difference">
        <p>On-screen marking changes where a human reads. AI evaluation changes who reads first.</p>
      </Callout>

      <h2 id="osm-in-india">How OSM is used in India</h2>
      <h3>CBSE Class 12, 2026</h3>
      <p>
        In a circular dated 9 February 2026, CBSE told its schools that Class 12 answer books would be evaluated by
        on-screen marking from the 2026 examinations, while Class 10 would stay in physical mode. Its later FAQ says the
        board first tried OSM in 2014 but stopped, because answer books could not then be scanned without cutting them,
        which risked mixing pages. In 2026 the books were scanned with book scanners that did not need the spine cut,
        marking schemes for 116 subjects were uploaded to the portal, and Head Examiners could randomly check evaluated
        answer books.
      </p>
      <p>
        The scale was large. The Ministry of Education said about 98 lakh Class 12 answer sheets were scanned, as reported
        by PTI. CBSE declared results on 13 May 2026 for about 17.69 lakh candidates. After the results, students and
        parents raised concerns that a drop in the pass percentage was due to OSM. The Ministry dismissed those concerns and
        announced a cut in the fee for a scanned copy of an evaluated answer book, from ₹700 to ₹100.
      </p>
      <h3>State boards and universities</h3>
      <p>
        In February 2026, PTI reported that the Punjab School Education Board would use OSM for one subject of its
        matriculation exam that year, on answer sheets with a QR code on every page, after evaluating 23,000 answer sheets on
        screen in its September 2025 supplementary exams.
      </p>
      <p>
        Universities moved earlier. Deccan Herald reported in April 2012 that Visvesvaraya Technological University’s
        examination paper evaluation was going digital. The University of Mumbai’s switch in 2017 is the cautionary tale:
        Newslaundry reported that the rollout was rushed without the agency finalised or teachers trained, results were
        badly delayed, and over 73,430 results were initially held back because answer scripts were misplaced or not
        scanned or uploaded properly.
      </p>
      <p>
        Outside India, OSM is well established in England. Ofqual, the exams regulator there, notes that all four exam
        boards in its marking study (AQA, OCR, Pearson and WJEC) use on-screen marking and monitoring for some components.
      </p>

      <h2 id="what-osm-solves">What OSM solves</h2>
      <ul>
        <li>
          <strong>Logistics.</strong> Answer books stay at the scanning centre. CBSE listed teachers staying in their own
          schools and savings in transport time and cost among the expected benefits.
        </li>
        <li>
          <strong>Totalling and posting errors.</strong> The system adds the marks. CBSE’s FAQ says OSM eliminates
          totalling, posting and uploading errors and ensures every answer is evaluated.
        </li>
        <li>
          <strong>Live supervision.</strong> Senior examiners can check samples while marking is under way. In England,
          boards slip pre-marked “seed” responses into an examiner’s allocation (Ofqual says sampling rates of about 5% are
          typical) to compare the examiner’s marks with an agreed standard.
        </li>
        <li>
          <strong>Records for post-result services.</strong> Every mark is entered per question against a known evaluator.
          CBSE gave Class 12 students scanned copies of their evaluated answer books, then a window to ask for verification
          or re-evaluation.
        </li>
      </ul>

      <h2 id="what-osm-does-not">What OSM does not solve</h2>
      <p>
        <strong>Evaluators still read every answer.</strong> OSM saves the trip to the evaluation centre, not the reading.
        Ninety-eight lakh answer sheets still need enough evaluators to read every page of every one.
      </p>
      <p>
        <strong>Evaluator variance stays.</strong> Two careful evaluators can give the same answer different marks,
        especially in long answers. Ofqual’s 2018 analysis of on-screen marking data found that the probability of a
        candidate receiving the “definitive” grade (the one senior examiners would give) ranged from 0.96 for a mathematics
        qualification to 0.52 for an English language and literature qualification, though the probability of getting the
        definitive grade or the one next to it was above 0.95 for all of them. OSM measures variance well. It does not
        remove it.
      </p>
      <p>
        <strong>New failure points appear.</strong> Scanning adds steps that can go wrong. CBSE’s June 2026 window for
        post-result verification listed the issues students could report: missing pages, missing supplementary sheets,
        missing maps or graphs, blurred pages, an incorrect answer book, and evaluation against a different set. The
        Ministry said more than 13,000 answer sheets written in very light ink were identified and checked manually.
        CBSE’s February circular had expected that post-result verification of marks would no longer be required. In
        practice a verification route was still needed, for a different kind of error.
      </p>
      <p>
        <strong>Security becomes a bigger topic.</strong> Scanned answer books put a whole cohort’s personal data in one
        system. On 1 June 2026, The Week reported CBSE’s statement that it had been monitoring vulnerabilities flagged in
        public in its service provider’s portal, had brought in cybersecurity experts from government and the IITs, and
        that the identified vulnerabilities had been contained.
      </p>

      <h2 id="what-ai-adds">What AI first evaluation adds</h2>
      <p>
        AI evaluation of answer sheets does what OSM does not: it reads first. A typical system reads the handwriting, finds
        each answer, compares it with a marking scheme and proposes a mark with reasons. The evaluator’s job changes from
        reading every answer from scratch to checking a proposed mark and changing it where they disagree.
      </p>
      <ul>
        <li>
          <strong>One rubric for every script.</strong> The same criteria are applied to the first script and the
          ten-thousandth, without end-of-day fatigue.
        </li>
        <li>
          <strong>Reasons you can audit.</strong> Per question: what was read, which criteria were met, what mark was
          proposed and why.
        </li>
        <li>
          <strong>Triage.</strong> Low-confidence reads and unreadable pages are flagged for a human instead of being marked
          by guesswork.
        </li>
        <li>
          <strong>An annotated copy.</strong> Some systems write ticks, crosses and notes onto the script itself, so the
          student or a re-evaluator can see where marks were won and lost.
        </li>
      </ul>
      <p>The limits matter just as much:</p>
      <ul>
        <li>It should not make the final decision. Marks stay a draft until a human releases them.</li>
        <li>It reads text. Diagrams, maps and graphs need a human eye; a text-based system can judge only their labels and written explanation.</li>
        <li>It must be tested on your subjects, languages and handwriting. Ask for results on your own past scripts, not general claims.</li>
        <li>It can be wrong in ways that look confident, so human review and sampling must continue.</li>
      </ul>

      <h2 id="combining">How the two combine</h2>
      <p>Think of OSM as the desk and AI as a first reader sitting at it. Three patterns work:</p>
      <Steps
        items={[
          {
            title: "AI first pass, human reviews every script",
            body: "The AI proposes marks and reasons per question. The evaluator sees the scan beside them, confirms or changes each mark, and the human mark is final. Suits university semester exams, internal exams and mock tests.",
          },
          {
            title: "Human marks first, AI as a check",
            body: "Evaluators mark as they do in OSM today. An AI mark is computed in the background, and large disagreements go to a senior examiner, like a seed check that covers every script. Suits bodies whose rules require a human to enter every mark.",
          },
          {
            title: "Split by question type",
            body: "AI first pass on text answers with clear marking schemes; human-only evaluation for diagram-heavy questions and for languages the system has not been tested on.",
          },
        ]}
      />
      <p>
        Whichever pattern you choose, protect the human edit: once an evaluator changes a mark, no later AI run should
        overwrite it.
      </p>

      <h2 id="governance">Risks and governance</h2>
      <ul>
        <li>
          <strong>Write down who owns the final mark.</strong> Your rules should say that a named human role decides every
          mark and that nothing is published without human release.
        </li>
        <li>
          <strong>Keep re-evaluation unchanged.</strong> Students keep the same rights to see their copy and ask for
          re-evaluation. The re-evaluator should see the AI’s proposed mark and reasons, and every human change.
        </li>
        <li>
          <strong>Keep an audit trail.</strong> Per question: the scan, what the system read, the proposed mark and reason,
          the evaluator’s mark, and who changed what, and when.
        </li>
        <li>
          <strong>Gate scan quality.</strong> Borrow CBSE’s layered checks: at scanning, by a quality control team, and by
          the evaluator, who can reject an unreadable copy for rescanning.
        </li>
        <li>
          <strong>Pilot before go-live.</strong> Run the new process on past scripts with known marks, in parallel with the
          old one, and compare. Mumbai’s 2017 experience shows the cost of skipping this step.
        </li>
        <li>
          <strong>Protect the data.</strong> Answer books carry students’ names, roll numbers and handwriting. India’s
          Digital Personal Data Protection Rules, 2025 were notified on 14 November 2025 with an eighteen-month phased
          compliance period, and include duties on security safeguards and telling affected people about a breach without
          delay. Check where scans are stored, who can open them, how long they are kept and how vendors are audited, and
          take legal advice on your obligations.
        </li>
        <li>
          <strong>Be open about AI use.</strong> Tell evaluators and students where AI is used and how a human checks it.
          UNESCO’s 2023 guidance on generative AI in education calls for protecting data privacy and a human-centred
          approach to validating such tools.
        </li>
      </ul>

      <h2 id="decision-table">A decision table</h2>
      <Table
        head={["Your situation", "OSM alone", "AI first pass + human review", "What to watch"]}
        rows={[
          ["Board exam where rules require a human to enter every mark", "Fits today", "Use AI as a background check until the rules allow more", "Write the AI’s role into your rules first"],
          ["University semester exams, many evaluators, tight result dates", "Removes logistics; reading load unchanged", "Cuts reading load; evaluators review proposed marks", "Pilot on past scripts; keep re-evaluation"],
          ["Internal tests, mock exams, practice answer writing", "Often too heavy to set up", "Good fit: fast feedback, teacher releases results", "Review before release"],
          ["Diagram-heavy papers such as engineering drawing or map work", "Fits", "Limited: text is judged, drawings need humans", "Route those questions to human evaluators"],
          ["Papers in languages the system has not been tested on", "Fits", "Test on your own samples first", "Ask for results on your scripts"],
          ["Students should see why they lost marks", "Scanned copy with marks", "Annotated copy with reasons", "Check annotations during review"],
        ]}
      />
      <p>
        For a side-by-side view of the two approaches, see <Link href="/compare/on-screen-marking/">Evalezy vs on-screen
        marking</Link>.
      </p>

      <WhereEvalezyFits>
        <p>
          Evalezy is an AI first evaluator for handwritten answer sheets. It uses one{" "}
          <Link href="/marking-scheme/">marking scheme</Link> per question (yours, or a generated one you can edit),
          reads each scanned script, finds answers by content even when they are out of order, and marks in half-mark steps
          against the criteria. Unreadable scripts fail with a clear error and are never graded by guesswork.
        </p>
        <p>
          Every mark lands as a draft. Evaluators see the extracted answer, the marks, the reasons and a criteria breakdown,
          change what they disagree with, and their edits are never overwritten by a later AI run. Nothing reaches students
          until someone presses Release Result. See <Link href="/teacher-review/">teacher review</Link> and the{" "}
          <Link href="/checked-copy/">red-pen checked copy</Link>.
        </p>
        <p>
          Be clear on the limits: diagrams are judged by their labels and written explanation only, and grading is built and
          tested on English scripts, so for other languages send us samples. Current capacity is about 100 copies in 2 to 3
          hours. Read more for <Link href="/for/exam-boards/">exam bodies</Link> and{" "}
          <Link href="/for/colleges-universities/">colleges and universities</Link>.
        </p>
      </WhereEvalezyFits>

      <Sources
        items={[
          { label: "CBSE circular, 9 February 2026: Introduction of On-Screen Marking (OSM) for Class XII Examinations", url: "https://www.cbse.gov.in/cbsenew/documents/OSM_Class%20XII_09022026.pdf", checked: "2026-10-01" },
          { label: "CBSE: Know about On Screen Marking (OSM), FAQ dated 18 May 2026", url: "https://www.cbse.gov.in/cbsenew/documents/FAQ-OSM_18052026.pdf", checked: "2026-10-01" },
          { label: "CBSE press release, 2 June 2026: Verification of issues in scanned copies and re-evaluation", url: "https://www.cbse.gov.in/cbsenew/documents/Press_Release_Verification_02062026.pdf", checked: "2026-10-01" },
          { label: "CBSE press release, 21 June 2026: Release of Class XII verification and re-evaluation outcomes", url: "https://www.cbse.gov.in/cbsenew/documents/Press_Release_revl_21062026.pdf", checked: "2026-10-01" },
          { label: "ThePrint (PTI), 17 May 2026: On-Screen Marking not new, enables transparent evaluation: Ministry of Education", url: "https://theprint.in/india/on-screen-marking-not-new-enables-transparent-evaluation-ministry-of-education/2933783/", checked: "2026-10-01" },
          { label: "ThePrint (PTI), 17 May 2026: ‘Not new for CBSE’: Education Ministry dismisses concerns about On-Screen Marking system", url: "https://theprint.in/india/not-new-for-cbse-education-ministry-dismisses-concerns-about-on-screen-marking-system/2933845/", checked: "2026-10-01" },
          { label: "The Week, 1 June 2026: OSM row: Can CBSE blacklist vendor over portal lapses?", url: "https://www.theweek.in/news/india/2026/06/01/osm-row-can-cbse-blacklist-vendor-over-portal-lapses.html", checked: "2026-10-01" },
          { label: "Devdiscourse (PTI), 13 February 2026: Punjab to introduce ‘on-screen’ marking system for 2026 board exam evaluations", url: "https://www.devdiscourse.com/article/education/3804111-punjab-to-introduce-on-screen-marking-system-for-2026-board-exam-evaluations", checked: "2026-10-01" },
          { label: "Deccan Herald, 4 April 2012: VTU examination paper evaluation goes digital", url: "https://www.deccanherald.com/content/239681/vtu-examination-paper-evaluation-goes.html", checked: "2026-10-01" },
          { label: "Newslaundry, 29 September 2017: Mumbai University: A consistent tale of inefficiency and woe", url: "https://www.newslaundry.com/2017/09/29/mumbai-university-examination-results-failure", checked: "2026-10-01" },
          { label: "Ofqual, November 2018: Marking consistency metrics, an update", url: "https://assets.publishing.service.gov.uk/media/5bfbfd70e5274a0fb775cca3/Marking_consistency_metrics_-_an_update_-_FINAL64492.pdf", checked: "2026-10-01" },
          { label: "PIB, 17 November 2025: DPDP Rules, 2025 Notified", url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf", checked: "2026-10-01" },
          { label: "UNESCO, 7 September 2023: Guidance for generative AI in education and research", url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research", checked: "2026-10-01" },
        ]}
      />
    </BlogShell>
  );
}
