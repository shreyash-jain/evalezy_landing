import type { Comparison } from "./types";
import { ALL_CAPS, CAP_LABELS, VENDORS, formatEntryPrice, type Vendor } from "@/app/research/data/landscape";

/**
 * COMPARISONS: against approaches (checking by hand, OSM, a general chatbot).
 * VENDOR_COMPARISONS (below): against named tools, built from the sourced landscape research.
 * Every Evalezy claim must trace to docs/PRODUCT_FACTS.md; every competitor fact to landscape.json.
 */
export const COMPARISONS: Comparison[] = [
  {
    slug: "manual-checking",
    label: "Evalezy vs checking by hand",
    title: "AI Copy Checking vs Manual Checking: An Honest Comparison",
    description: "Where checking answer sheets by hand still wins, where AI copy checking with teacher review is better, and what changes for teachers, students and cost.",
    h1: "Evalezy vs checking copies by hand",
    lede: "Teachers are the best judges of an answer. They are also tired by copy 80. Here is what changes when AI does the first check and the teacher does the final one.",
    them: "Checking by hand",
    rows: [
      { aspect: "Who decides the final mark", evalezy: "The teacher. AI marks are a draft until released", them: "The teacher" },
      { aspect: "Time for 100 copies", evalezy: "About 2–3 hours of machine time, then a review", them: "About 10 hours at 6 minutes a copy" },
      { aspect: "Consistency across copies", evalezy: "One scheme per question, applied to every copy", them: "Drifts with fatigue and between checkers" },
      { aspect: "Feedback on the copy", evalezy: "A tick, cross or note on every answer, with the correct answer where it was wrong", them: "Depends on the teacher's time" },
      { aspect: "Half marks", evalezy: "0.5-mark steps against criteria", them: "Yes" },
      { aspect: "Diagrams and drawings", evalezy: "Judged by labels and written explanation only", them: "Fully judged" },
      { aspect: "Cost", evalezy: "₹1 per page checked", them: "Teacher time, or ₹/copy to outside checkers" },
      { aspect: "Unreadable handwriting", evalezy: "Flagged for review, never guessed, not charged", them: "Teacher deciphers it" },
    ],
    whenThem: [
      "The paper is mostly diagrams, maps or drawings",
      "It is a small class and the teacher has the time",
      "The answers are in a language Evalezy has not been tested on yet",
    ],
    whenEvalezy: [
      "Copies arrive in the hundreds after every test",
      "Several teachers or centres mark the same paper",
      "Students need written feedback, not just a score",
      "You want to test more often without adding checking load",
    ],
    body: [
      { heading: "It is not either-or", text: "Evalezy is designed to keep the teacher in charge. The AI does the reading and the first marking; the teacher reviews, edits any mark and decides when results go out. A teacher's edit is never overwritten by a later AI run." },
      { heading: "Where the time goes", text: "By hand, most of the time goes into reading every line of every copy. With Evalezy, the reading is done for you: the teacher sees each answer as read, the marks, the reasons and the criteria, and spends their time on the answers where judgement matters." },
      { heading: "A real test: one copy, both ways", text: "We ran a maths copy that a teacher had already checked through Evalezy. Evalezy caught two slips the teacher had ticked; the teacher read five answers correctly that Evalezy misread. Each caught what the other missed, which is why Evalezy's marks always wait for a teacher's review. Every page and every disagreement is on the AI vs teacher page." },
      { heading: "What students notice", text: "A checked copy from Evalezy looks like a teacher checked it: red ticks, crosses with the correct answer, a note where marks were lost, marks per question and the total circled on page one. Students get more written feedback than a rushed manual check usually allows." },
    ],
    faqs: [
      { q: "Will teachers trust AI marks?", a: "They do not have to. Every mark is a draft that a teacher can change, and the reasons are written next to each answer, so checking the AI's work is quick. Most teachers start by reviewing every copy, then focus on the ones flagged for review." },
      { q: "Is AI checking fair to students?", a: "It applies the same criteria to every copy, which removes the drift that comes with fatigue and multiple checkers. Fairness still needs a good marking scheme, which is why you can edit every criterion before you run the check." },
    ],
  },
  {
    slug: "on-screen-marking",
    label: "Evalezy vs on-screen marking (OSM)",
    title: "Evalezy vs On-Screen Marking (OSM) Systems",
    description: "On-screen marking digitises the checking; evaluators still read every answer. Evalezy adds an AI first evaluation and a red-pen checked copy. How they compare.",
    h1: "Evalezy vs on-screen marking (OSM)",
    lede: "On-screen marking moved checking from paper to a screen. Evaluators still read and mark every answer. Evalezy reads and marks first, so evaluators review instead.",
    them: "Typical on-screen marking",
    rows: [
      { aspect: "Who reads the answers first", evalezy: "AI, against a rubric per question", them: "A human evaluator, on screen" },
      { aspect: "Evaluator effort per script", evalezy: "Review the AI's marks and reasons; change any mark", them: "Read and mark every answer" },
      { aspect: "Consistency", evalezy: "Same criteria applied to every script", them: "Depends on each evaluator, plus moderation" },
      { aspect: "Output for students", evalezy: "The script itself, annotated in red pen", them: "Usually marks only" },
      { aspect: "Student matching", evalezy: "Names and roll numbers read from the script and matched automatically", them: "Usually barcodes or manual entry" },
      { aspect: "Pricing", evalezy: "₹1 per page", them: "Varies; often licences or per-script fees, plus evaluator time" },
    ],
    whenThem: [
      "You need a mature, fully human evaluation workflow with barcoded booklets and evaluator panels",
      "Your regulations require every mark to be entered by a human evaluator",
    ],
    whenEvalezy: [
      "You want evaluators to review rather than read everything from scratch",
      "You want students to receive an annotated copy, not just marks",
      "You run frequent internal tests where an OSM setup is too heavy",
    ],
    body: [
      { heading: "The difference in one line", text: "OSM is a better desk for a human checker. Evalezy is a first checker. They can work together: Evalezy's marks, reasons and annotated copy give a human evaluator a head start, and the human's edits are kept." },
      { heading: "Setup", text: "Evalezy does not need barcoded booklets. Students write on any paper; copies are scanned or photographed and the name and roll number are read from the top of the first page." },
    ],
    faqs: [
      { q: "Can Evalezy work with our existing evaluation process?", a: "Usually yes. Teams use Evalezy for the first evaluation and keep their own reviewers for the final mark. If your scripts already run through your own system, the Evaluation API takes each one as a PDF and returns marks per question with reasons, as drafts your reviewers finalize." },
    ],
  },
  {
    slug: "chatgpt",
    label: "Evalezy vs ChatGPT",
    title: "Can ChatGPT Check Answer Sheets? Evalezy vs a General Chatbot",
    description: "A general chatbot can read a photo of one answer. Checking a whole class needs one rubric for all, student matching, an annotated copy and teacher control. How they compare.",
    h1: "Evalezy vs pasting answer sheets into ChatGPT",
    lede: "A general-purpose chatbot can read a photo of an answer and suggest a mark. Checking a class of 40 copies is a different job. Here is what is missing, and what Evalezy adds.",
    them: "A general chatbot",
    rows: [
      { aspect: "One marking scheme for every student", evalezy: "Generated once per question, reused for every copy", them: "Depends on each conversation; easy to drift" },
      { aspect: "Bulk", evalezy: "Up to 200 copies per upload, checked in the background", them: "One upload at a time, by hand" },
      { aspect: "Matching copies to students", evalezy: "Reads name and roll number, matches to your list, never guesses", them: "Manual" },
      { aspect: "Output", evalezy: "The student's copy checked in red pen, plus marks per question", them: "Text in a chat window" },
      { aspect: "Marks add up", evalezy: "Criteria rescaled to sum exactly to the question's marks; 0.5 steps", them: "Not enforced" },
      { aspect: "Unreadable pages", evalezy: "Fails clearly, never guesses, not charged", them: "May guess what was written" },
      { aspect: "Release to students", evalezy: "Teacher review, then release by email (and WhatsApp via automations)", them: "Copy-paste" },
      { aspect: "Student data", evalezy: "Stays inside your institute's account", them: "Pasted into a personal chat" },
    ],
    whenThem: [
      "You want a quick second opinion on one answer",
      "You are drafting a model answer or a marking scheme to edit",
    ],
    whenEvalezy: [
      "You are checking a class, a batch or an exam",
      "You want students to receive their own copy checked",
      "Marks must be consistent, add up and be reviewable",
    ],
    body: [
      { heading: "Why one rubric matters", text: "If each copy is checked in a fresh conversation, the standard can move from copy to copy. Evalezy creates the marking scheme once per question and uses it for every student, so the 1st and the 140th copy are judged the same way." },
      { heading: "Why the copy matters", text: "Students learn from seeing their own page marked: which line earned the tick, where the cross is, what the correct answer was. Evalezy writes that back onto the copy in a handwriting-style red pen, with the total circled on page one." },
    ],
    faqs: [
      { q: "Which AI model does Evalezy use?", a: "Evalezy runs a pipeline rather than one prompt: handwriting reading, answer location, an equation reader for unclear maths lines, per-question grading against a rubric, checks that marks add up, and annotation. The default models are chosen for handwriting reading and cost; the pipeline matters more than the model." },
    ],
  },
];

/* ------------------------------------------------------------------ named vendors */

const WORD = { yes: "Yes", partial: "Partly", no: "No", unknown: "Not documented" } as const;

function vendor(name: string): Vendor {
  const v = VENDORS.find((x) => x.name === name);
  if (!v) throw new Error(`Comparison: ${name} missing from landscape.json`);
  return v;
}

/** Capability rows read straight from the research record, so the table can never drift from the sources. */
function rowsFor(them: Vendor): Comparison["rows"] {
  const us = vendor("Evalezy");
  const cell = (v: Vendor, k: (typeof ALL_CAPS)[number]) => {
    const c = v.capabilities[k];
    return c.evidence ? `${WORD[c.value]}. ${c.evidence}` : WORD[c.value];
  };
  return [
    { aspect: "Made for", evalezy: us.target ?? "", them: them.target ?? "Not documented" },
    { aspect: "Entry price", evalezy: `${formatEntryPrice(us)} ($0.01 outside India); failed and unreadable copies free`, them: `${formatEntryPrice(them)}${them.pricing.entry_price?.notes ? `. ${them.pricing.entry_price.notes}` : ""}` },
    ...ALL_CAPS.map((k) => ({ aspect: CAP_LABELS[k], evalezy: cell(us, k), them: cell(them, k) })),
  ];
}

type VendorInput = Omit<Comparison, "rows" | "them" | "sources" | "label"> & { vendor: string };

function vendorComparison(c: VendorInput): Comparison {
  const v = vendor(c.vendor);
  const { vendor: _name, ...rest } = c;
  const sources = Object.entries(v.sources)
    .filter(([, url], i, all) => all.findIndex(([, u]) => u === url) === i)
    .slice(0, 5)
    .map(([key, url]) => ({ label: `${v.name}: ${key.replace("capabilities.", "").replace(/_/g, " ")}`, url }));
  return {
    ...rest,
    label: `Evalezy vs ${v.name}`,
    them: v.name,
    rows: rowsFor(v),
    sources,
    note: `${v.name}'s side is read from its public pages in October 2026 (${v.asOf}) for our evaluation landscape research; "not documented" means we could not find it described, not that it is impossible. Evalezy's side is scored the same way from its own pages. Spot something out of date? Send us a source and we will correct it.`,
  };
}

export const VENDOR_COMPARISONS: Comparison[] = [
  vendorComparison({
    vendor: "Eklavvya",
    slug: "eklavvya",
    title: "Evalezy vs Eklavvya: AI Answer Sheet Checking Compared (2026)",
    description: "Evalezy vs Eklavvya, capability by capability: handwriting, AI marking, Indian languages, student matching, the checked copy, pricing and APIs. Sourced, October 2026.",
    h1: "Evalezy vs Eklavvya",
    lede: "Eklavvya brings AI evaluation into an on-screen marking platform built for universities and blind evaluation. Evalezy is AI copy checking built around the student's own copy, checked in red pen, at ₹1 a page. Here is what each documents publicly.",
    whenThem: [
      "Answers are written in Hindi, Marathi, Tamil, Telugu, Bengali, Kannada, Gujarati or Malayalam (Eklavvya lists all eight; Evalezy grades English only for now)",
      "You run blind university evaluation with QR-masked identities, moderators and re-evaluators",
      "You want AI scores inside a full on-screen marking workflow with scanner, examiner and moderator roles",
    ],
    whenEvalezy: [
      "You want students to get their own copy back, checked in red pen with notes and the total circled",
      "Students write their name and roll number on ordinary paper and you want copies matched to the class list automatically",
      "You want a published price (₹1 per page) without an Enterprise plan",
      "You want to upload the question paper and have it read into questions with marks",
      "You are building your own exam product and need a public, documented grading API",
    ],
    body: [
      { heading: "The difference in one line", text: "Eklavvya is an on-screen marking system that added AI scoring for examiners to accept or override. Evalezy is a first checker: it reads, marks and annotates every copy, and a teacher reviews and releases." },
      { heading: "Languages", text: "This is the clearest reason to choose Eklavvya today. It lists eight Indian languages for AI evaluation, with the model answer in the same language as the response. Evalezy is built and tested on English answer sheets and refuses Hindi and regional-language copies without charging for them." },
      { heading: "What students receive", text: "Evalezy returns each student's own pages with ticks, crosses, the correct answer where it was wrong, a short note where marks were lost, marks per question and the total circled. Eklavvya lets students view their scanned evaluated scripts; AI annotation on the page is not described." },
    ],
    faqs: [
      { q: "Which is cheaper, Evalezy or Eklavvya?", a: "Evalezy publishes its price: ₹1 per page checked, with failed and unreadable copies free. Eklavvya does not publish prices, and its AI evaluation is an Enterprise feature enabled per organisation plan, so you need a quote to compare." },
      { q: "Can Evalezy check Hindi answer sheets like Eklavvya?", a: "Not yet. Evalezy grades English answers only; Hindi and regional-language copies are refused and not charged. Students' names written in other scripts are still read and transliterated for matching. If most of your answers are in an Indian language, Eklavvya documents that today." },
    ],
  }),
  vendorComparison({
    vendor: "Acadine",
    slug: "acadine",
    title: "Evalezy vs Acadine: AI Copy Checking Compared (2026)",
    description: "Evalezy vs Acadine AI: handwritten copy checking, teacher review, the red-pen checked copy, student matching, languages, pricing and API. Sourced, Oct 2026.",
    h1: "Evalezy vs Acadine",
    lede: "Acadine is an all-in-one platform for coaching institutes: AI answer-sheet evaluation, AI question papers, OMR, online tests, analytics and a white-label app. Evalezy does one job, checking handwritten copies, and goes deeper on it: the student's own copy back in red pen, names read and matched, a teacher review before anything is released, and a published ₹1 a page.",
    whenThem: [
      "Answers are written in Hindi or Sanskrit (Acadine lists English, Hindi and Sanskrit; Evalezy grades English only for now)",
      "You want one vendor for AI question papers, OMR sheets, online CBT tests, timetables and announcements as well as checking",
      "You want multi-branch analytics down to chapter and topic, and a white-label student app",
      "You want scorecards sent to parents on WhatsApp straight after evaluation",
    ],
    whenEvalezy: [
      "Teachers must see and edit every AI mark before students do (Acadine's teacher guide says results publish automatically)",
      "Students should get their own copy back with ticks, crosses, notes and the total circled, not just a scorecard",
      "You upload a pile of copies and want each matched to the right student by the name and roll number on page one",
      "You want to know the price before a sales call: ₹1 per page, failed and unreadable copies free",
      "You already have an LMS or exam system and want a public grading API (docs.evalezy.com)",
    ],
    body: [
      { heading: "The difference in one line", text: "Acadine is an institute operating system with AI checking inside it. Evalezy is a copy-checking engine: it does not schedule your lectures, but it documents 12 of the 14 checking capabilities in our research to Acadine's 8, and it plugs into the Vacademy platform or your own system through the API." },
      { heading: "Who releases the marks", text: "In Acadine's teacher guide, admins upload the sheets, AI evaluates them within 24 hours and results are published to students automatically; students can then challenge a grade. In Evalezy every AI mark lands as a draft, the teacher reviews the reasons per question, edits what they disagree with and presses Release Result. A teacher's edit is never overwritten by a later AI run." },
      { heading: "Accuracy claims", text: "Acadine's homepage claims 98%+ accuracy, benchmarked against faculty. Evalezy publishes no accuracy percentage. Instead we published one maths copy checked by a teacher and by Evalezy, page by page: Evalezy caught 2 slips the teacher ticked and misread 5 answers the teacher got right. That is why our marks wait for a teacher. Ask any vendor, us included, to check a batch your teachers have already marked." },
      { heading: "Price", text: "Acadine does not publish prices; you book a demo. Evalezy charges ₹1 per page checked in India and $0.01 elsewhere, with no subscription or setup fee, and nothing for failed, stopped or unreadable copies." },
    ],
    faqs: [
      { q: "Is Evalezy an Acadine alternative?", a: "For checking handwritten answer sheets in English, yes: Evalezy marks every answer against a scheme per question, returns the student's own copy checked in red pen, matches copies to students by name and roll number and keeps the teacher in charge of release, at ₹1 a page. If you want one suite for question papers, OMR, online tests, analytics and a branded app, or need Hindi answers checked, Acadine covers more of that today." },
      { q: "Does Evalezy have a mobile app like Acadine?", a: "They are different apps. Acadine's app is a white-label app for students, teachers and admins. The Evalezy app, launching soon, is a checking tool: a teacher scans each copy with the phone camera or picks PDFs, runs the AI check for the whole batch and downloads the checked copies. Students still get their checked copy by email when you release results." },
      { q: "Can I use both?", a: "Yes. Some institutes keep their institute platform for timetables, tests and analytics and send handwritten copies to a specialist checker. Evalezy's Evaluation API takes each copy as a PDF and returns marks per question, reasons and the checked copy PDF, as drafts your teachers finalize." },
    ],
  }),
  vendorComparison({
    vendor: "Gradescope",
    slug: "gradescope",
    title: "Evalezy vs Gradescope: AI Marking vs AI-Assisted Grading",
    description: "Gradescope groups similar answers so staff grade faster; Evalezy marks every answer with AI and returns a red-pen copy. Capabilities, pricing and fit, compared from sources.",
    h1: "Evalezy vs Gradescope",
    lede: "Gradescope, from Turnitin, is the standard for university courses: staff grade scanned work on screen and AI groups similar answers. Evalezy marks every answer itself, writes the reason, and leaves the final word to the teacher. A Gradescope alternative for schools and coaching institutes, compared fairly.",
    whenThem: [
      "You teach university courses, especially STEM, with many short answers graded by TAs",
      "You want humans to apply every mark, with AI only grouping similar answers",
      "You grade programming assignments and want code similarity checks",
      "You need LMS integration through LTI 1.3",
    ],
    whenEvalezy: [
      "You want AI to award the marks, per question, with a written reason, for a teacher to review",
      "Students write on ordinary paper or notebooks rather than a fixed template",
      "You check school, coaching or UPSC copies in the hundreds after every test",
      "You want a published per-page price and a public grading API",
    ],
    body: [
      { heading: "The difference in one line", text: "Gradescope makes human grading faster; Evalezy does the first grading. In Gradescope, AI forms groups of similar short answers and staff apply the marks. In Evalezy, every answer is marked against the question's scheme, in half marks with a reason, and the teacher edits what they disagree with." },
      { heading: "Paper", text: "Gradescope's handwriting grouping works on fixed-template answer sheets. Evalezy reads free-form copies, including phone photos of spiral notebooks, finds each answer by its content even when students answer out of order, and reads the name and roll number from the top of page one." },
    ],
    faqs: [
      { q: "Is Evalezy a Gradescope alternative?", a: "For schools, coaching institutes and test-series programmes checking handwritten copies, yes: Evalezy does the marking itself and returns a red-pen checked copy, priced at ₹1 per page. For university courses where staff grade every question, with code similarity and LMS integration, Gradescope remains the more established choice." },
    ],
  }),
  vendorComparison({
    vendor: "CoGrader",
    slug: "cograder",
    title: "Evalezy vs CoGrader: Handwritten Answer Sheets vs Essays",
    description: "CoGrader drafts rubric feedback on US K-12 essays; Evalezy checks whole handwritten answer sheets question by question. Capabilities, pricing and fit, sourced.",
    h1: "Evalezy vs CoGrader",
    lede: "CoGrader is a US AI grading assistant for essays, including handwritten ones, priced per teacher. Evalezy checks whole multi-question answer sheets, maths included, and returns each copy checked in red pen, priced per page.",
    whenThem: [
      "You teach US K-12 writing and want state-aligned rubrics (CCSS, TEKS, STAAR, Regents, AP/IB)",
      "Your work lives in Google Classroom, Canvas or Schoology",
      "You want AI-writing and plagiarism flags on typed essays",
      "You are one teacher who wants a free or $15-a-month plan",
    ],
    whenEvalezy: [
      "You check exam papers with many questions and marks per question, not one essay",
      "Maths working needs marking (CoGrader does not document maths)",
      "You want each copy matched to the student by name and roll number and returned marked up in red pen",
      "You want to upload the question paper and pay per page, not per seat",
    ],
    body: [
      { heading: "The difference in one line", text: "CoGrader grades an essay against a rubric and sends feedback to the LMS. Evalezy checks an answer sheet: it finds every answer, marks each against its own scheme, and writes the result back onto the student's pages." },
      { heading: "Pricing", text: "CoGrader charges per teacher: a free Starter plan, then $15 a month billed annually, with schools and districts quoted. Evalezy charges per page checked, ₹1 in India or $0.01 elsewhere, with no seats, which suits institutes whose volumes swing between test weeks." },
    ],
    faqs: [
      { q: "Can CoGrader or Evalezy grade handwritten work?", a: "Both read handwriting from scans or photos. CoGrader is built for essays and written assignments against a rubric. Evalezy is built for full answer sheets: many questions, maths working, half marks per question, and the checked copy returned to the student." },
    ],
  }),
  vendorComparison({
    vendor: "CrazyGoldFish",
    slug: "crazygoldfish",
    title: "Evalezy vs CrazyGoldFish: AI Evaluation Compared (2026)",
    description: "CrazyGoldFish sells AI evaluation infrastructure and reports results on Hindi answers; Evalezy is a ready copy-checking product with a public API. Sourced comparison.",
    h1: "Evalezy vs CrazyGoldFish",
    lede: "Both are Indian and both score handwritten subjective answers against rubrics. CrazyGoldFish sells evaluation infrastructure and APIs to platforms and programmes; Evalezy is a ready product for teachers, from bulk upload to the red-pen checked copy, with a public API too.",
    whenThem: [
      "Answers are handwritten in Hindi (CrazyGoldFish reports an alpha of 0.808 on Hindi handwritten answers)",
      "You want per-answer learning analytics: concept, error type, mastery and a suggested action",
      "You run a government or NGO programme (it is listed on the IndiaAI and AIKosh portals)",
    ],
    whenEvalezy: [
      "Teachers need to upload 200 copies, have them matched to students and review the marks themselves",
      "Students should receive their own copy checked in red pen",
      "You want a published price (₹1 per page) and public API documentation at docs.evalezy.com",
    ],
    body: [
      { heading: "The difference in one line", text: "CrazyGoldFish is an evaluation engine that platforms build on. Evalezy is both: a dashboard teachers use end to end, and an Evaluation API with public docs for platforms." },
      { heading: "What is documented", text: "CrazyGoldFish documents rubric-based scoring, Hindi results and teacher-final review. Bulk upload, student identification, annotated copies and question paper import are not described on its pages. Evalezy documents all four." },
    ],
    faqs: [
      { q: "Which should an edtech platform choose?", a: "If you need Hindi handwritten answers today, CrazyGoldFish documents results on them. If your answers are in English and you want to integrate without a sales cycle first, Evalezy's Evaluation API is documented publicly at docs.evalezy.com, priced per page, and returns question-wise marks, reasons and the checked copy PDF." },
    ],
  }),
  vendorComparison({
    vendor: "Smart Paper",
    slug: "smart-paper",
    title: "Evalezy vs Smart Paper: Checking Answer Sheets with AI",
    description: "Smart Paper grades worksheets printed from its app; Evalezy checks existing answer copies on any paper and returns them checked in red pen. Sourced comparison.",
    h1: "Evalezy vs Smart Paper",
    lede: "Smart Paper digitises paper worksheets that teachers print from its app, and is used at state scale in Rajasthan. Evalezy checks the answer copies schools already have, on any paper, and returns them checked in red pen.",
    whenThem: [
      "You run a state or district programme of printed worksheets and assessments made in the app",
      "You want quick suggested scores on worksheets, including maths notation and misconceptions",
    ],
    whenEvalezy: [
      "Students write exams on ordinary answer sheets or notebooks, not a printed template",
      "You want copies matched to students by the name and roll number they wrote",
      "Teachers must review and release marks, and students get their own copy back marked up",
      "You want a published per-page price",
    ],
    body: [
      { heading: "The difference in one line", text: "Smart Paper starts from a worksheet printed in its app. Evalezy starts from whatever the student wrote on: you upload the question paper and the scanned copies, and it does the rest." },
    ],
    faqs: [
      { q: "Do I need special answer sheets for Evalezy?", a: "No. Students write on any paper, including spiral notebooks; copies are scanned or photographed and combined into a PDF per student. The name and roll number are read from the top of the first page." },
    ],
  }),
  vendorComparison({
    vendor: "AnswerWriting",
    slug: "answerwriting",
    title: "Evalezy vs AnswerWriting.com for UPSC Answer Evaluation",
    description: "AnswerWriting gives individual UPSC aspirants free AI feedback; Evalezy checks a whole test-series batch for an institute, with mentor review and red-pen copies.",
    h1: "Evalezy vs AnswerWriting.com",
    lede: "AnswerWriting.com gives individual UPSC and State PSC aspirants AI feedback on their own answers, with a free tier. Evalezy is for the institute running the answer-writing programme: a whole batch checked against your own scheme, reviewed by your mentors and returned in red pen.",
    whenThem: [
      "You are an aspirant practising on your own",
      "You want free AI section scores with a model answer for each attempt",
    ],
    whenEvalezy: [
      "You run a test series or daily answer-writing programme for a batch",
      "Your mentors set the marking scheme per question and review marks before release",
      "Aspirants should receive their own copy checked in red pen, matched to their roll number",
      "You want to pay ₹1 per page, not per aspirant",
    ],
    body: [
      { heading: "The difference in one line", text: "AnswerWriting is a self-practice app for one aspirant at a time. Evalezy is a checking tool for the institute: batches, class lists, your rubric, your mentors and a release step." },
      { heading: "Where mentors fit", text: "In Evalezy the AI does the first evaluation and the mentor has the last word: every mark is a draft, edits are never overwritten, and nothing reaches aspirants until release. See our guide to UPSC Mains answer writing evaluation at scale." },
    ],
    faqs: [
      { q: "Can Evalezy evaluate UPSC Mains answers?", a: "Yes, in English: GS and essay answers are marked against the scheme you set per question (or one Evalezy drafts), with half marks, a reason and feedback per answer, and the aspirant's own copy checked in red pen. Hindi-medium answers are not supported yet." },
    ],
  }),
];

export const findVendorComparison = (slug: string) => VENDOR_COMPARISONS.find((c) => c.slug === slug);
export const findComparison = (slug: string) => COMPARISONS.find((c) => c.slug === slug) ?? findVendorComparison(slug);
