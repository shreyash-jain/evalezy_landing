import type { Comparison } from "./types";

/**
 * Comparisons against approaches, not named vendors (no competitor facts verified yet).
 * Every Evalezy claim must trace to docs/PRODUCT_FACTS.md.
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

export const findComparison = (slug: string) => COMPARISONS.find((c) => c.slug === slug);
