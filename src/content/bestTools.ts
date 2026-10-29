/**
 * "Best AI copy checking software" guide: /best-ai-copy-checking-software/.
 * One pick per job. Capabilities, prices and sources are read from the landscape research
 * (src/app/research/data/landscape.json); the text here must agree with that record's evidence.
 * Evalezy claims trace to docs/PRODUCT_FACTS.md.
 */
import type { Faq } from "./types";

export const BEST_PATH = "/best-ai-copy-checking-software/";
export const BEST_PUBLISHED = "2026-10-23";
export const BEST_UPDATED = "2026-10-29";

export interface Pick {
  /** Must match a vendor name in landscape.json. */
  name: string;
  /** Short "best for" label, used in the quick-picks table. */
  bestFor: string;
  summary: string;
  /** Limits worth knowing, from the vendor's own record. */
  watch: string[];
  /** Slug of a /compare/<slug>/ page, if there is one. */
  compare?: string;
  /** An Evalezy page that serves the same reader better, if any. */
  seeAlso?: { href: string; label: string };
}

export const PICKS: Pick[] = [
  {
    name: "Evalezy",
    bestFor: "Checking a class's or an exam's handwritten answer sheets end to end",
    summary:
      "Upload up to 200 scanned or phone-photographed copies at once. Evalezy reads each student's name and roll number and matches the copy to the class list, marks every answer against one marking scheme per question in half marks with a written reason, and returns the student's own copy checked in a handwriting-style red pen with the total circled. A teacher reviews, edits and releases. It documents 12 of the 14 capabilities in our research, the most of any tool, publishes its price (₹1 per page in India, $0.01 elsewhere; failed and unreadable copies free) and has a public Evaluation API with docs.",
    watch: [
      "Grades English answers only for now; Hindi and regional-language copies are refused and not charged",
      "No plagiarism or AI-writing checks",
      "Diagrams are judged by their labels and written explanation, not as drawings",
      "No published accuracy figure: marks are drafts until a teacher releases them",
    ],
  },
  {
    name: "Eklavvya",
    bestFor: "Universities that want AI inside blind on-screen marking, and Indian-language answers",
    summary:
      "An Indian on-screen marking platform with AI evaluation on its Enterprise plan: scanned booklets are read with OCR, an LLM drafts a score per question against the model answer in one of four strictness modes, and examiners accept, override or comment with an audit trail. It lists eight Indian languages, including Hindi, Marathi, Tamil and Telugu, and shows clients such as NMIMS and Sharda University.",
    watch: [
      "Prices are not published; AI evaluation is an Enterprise feature",
      "Students are identified by QR or bar-code masking; reading names and roll numbers from the sheet is not described",
      "On-page AI annotation of the student's copy is not described",
      "No public grading API documentation found",
    ],
    compare: "eklavvya",
  },
  {
    name: "Acadine",
    bestFor: "Coaching institutes that want one suite: AI checking, question papers, tests, analytics and an app",
    summary:
      "An Indian institute platform for coaching centres and schools: admins scan and upload a test's answer sheets and AI marks them step by step within 24 hours, alongside AI question-paper generation, OMR scanning, online CBT tests, batch and branch analytics, WhatsApp scorecards and a white-label student app. It claims 200+ institutes and lists Indian languages (22 on the homepage; English, Hindi and Sanskrit in the evaluation section).",
    watch: [
      "Prices are not published; you book a demo",
      "The teacher guide says results are published to students automatically; a teacher review step before release is not described",
      "Returning the student's own sheet marked up page by page, and how sheets are matched to students, are not described",
      "No public grading API documentation found",
    ],
    compare: "acadine",
  },
  {
    name: "Gradescope",
    bestFor: "University courses, especially STEM, where staff grade every question",
    summary:
      "Turnitin's Gradescope lets instructors bulk-scan paper exams, match them to the roster and grade on screen with rubrics that update retroactively. AI groups similar short answers so one mark can be applied to a whole group. The Basic plan is free; the Institutional plan, which carries the AI grouping and roster matching, is quoted.",
    watch: [
      "AI does not award marks: it suggests answer groups and staff apply the marks",
      "Handwriting grouping needs fixed-template answer sheets",
      "No public grading API; Indian languages not documented",
    ],
    compare: "gradescope",
  },
  {
    name: "CoGrader",
    bestFor: "US K-12 teachers grading essays, including handwritten ones",
    summary:
      "Reads photographed or copier-scanned paper essays and typed work from Google Classroom, Canvas or Schoology, drafts a score with Glow and Grow feedback per rubric criterion (500+ state-aligned rubrics, or upload your own), and the teacher approves every grade. School plans add AI-writing and plagiarism flags. Free Starter plan; Individual from $15 a month billed annually.",
    watch: [
      "Built for essays and written assignments; maths marking is not documented",
      "Feedback goes back through the LMS; on-page markup of the student's sheet is not documented",
      "API only on custom Higher Ed and Enterprise plans",
    ],
    compare: "cograder",
  },
  {
    name: "Top Marks AI",
    bestFor: "UK secondary schools marking to GCSE, A level and IB mark schemes",
    summary:
      "More than 400 subject tools tuned to exam-board mark schemes, for typed or handwritten essays, with batch marking of whole sets from one PDF and per-student barcodes that route scanned answers to the right student. Includes AI-writing detection. Pricing on request.",
    watch: [
      "Mainly English, humanities and RE; maths marking not documented",
      "A teacher review step and annotated copies are not described on its pages",
    ],
  },
  {
    name: "CrazyGoldFish",
    bestFor: "Edtech platforms and programmes evaluating Hindi handwritten answers",
    summary:
      "Indian evaluation infrastructure and APIs for schools, coaching networks, edtech platforms and NGOs. It scores handwritten subjective answers against rubrics and returns the concept, error type and mastery per answer, with teachers as the final authority. It reports a reliability (alpha) of 0.808 on Hindi handwritten answers across two states and seven subjects, and is listed on the government's IndiaAI and AIKosh portals.",
    watch: [
      "Prices are not published",
      "Bulk upload, student identification and annotated copies are not described",
      "A sample API endpoint is shown, but no public API documentation was found",
    ],
    compare: "crazygoldfish",
  },
  {
    name: "Coempt Onmark",
    bestFor: "Boards and universities running human on-screen marking at very large scale",
    summary:
      "Scans uncut answer books, hides student details from examiners, and gives them on-screen annotation tools with seed scripts, double marking and discrepancy reports. It won CBSE's on-screen marking contract for the 2026 Class 12 evaluation and says it handles close to 2 crore answer booklets a year.",
    watch: [
      "Human examiners mark every answer; no AI marking is documented",
      "Quoted per contract, with no published prices",
      "Its 2026 CBSE rollout drew complaints about scan quality, which Coempt attributed to the scanning stage",
    ],
    seeAlso: { href: "/compare/on-screen-marking/", label: "Evalezy vs on-screen marking" },
  },
  {
    name: "Smart Paper",
    bestFor: "State school systems running printed worksheets and assessments",
    summary:
      "Teachers print worksheets from the Smart Paper app, photograph the completed sheets, and the AI turns the handwriting into text and suggests scores against the teacher's rubric, including maths notation and common misconceptions. MIT Solve lists it at state scale in Rajasthan (about 235,000 teachers and 4.6 million students).",
    watch: [
      "Worksheets are made in the app, not imported from an existing paper",
      "A teacher review step, student matching and annotated copies are not described",
      "Prices are not published",
    ],
    compare: "smart-paper",
  },
  {
    name: "AnswerWriting",
    bestFor: "Individual UPSC and State PSC aspirants practising on their own (free)",
    summary:
      "Upload a photo or PDF of a handwritten answer and get AI section scores (introduction, content and analysis, conclusion, structure and flow) with a model answer and tips, for 13 exams. There is a free tier; the Pro price is not shown.",
    watch: [
      "Built for one aspirant at a time: no batches, class lists or mentor review",
      "Hindi-medium support is not stated",
    ],
    compare: "answerwriting",
    seeAlso: { href: "/for/upsc-answer-writing/", label: "Running a test series? Evalezy for UPSC answer writing" },
  },
  {
    name: "ZipGrade",
    bestFor: "Multiple-choice tests on bubble sheets, on a tiny budget",
    summary:
      "Scan bubble sheets with a phone camera against an answer key, with multiple key versions and item analysis. Free for 100 papers a month; unlimited for $6.99 a year. The vendor says more than 1 million teachers have used it.",
    watch: ["Objective answers only: no handwriting reading and no written answers"],
  },
];

export const BEST_FAQS: Faq[] = [
  {
    q: "What is the best AI copy checking software?",
    a: "It depends on the job. For checking a class's or an exam's handwritten answer sheets in English, Evalezy documents the most of the job in our research (12 of 14 capabilities: reading handwriting, marking against a scheme with half marks and reasons, bulk upload, matching copies to students, a red-pen checked copy, teacher review, question paper import and a public API) at a published ₹1 per page. For answers in Hindi or another Indian language, Eklavvya documents eight languages. For university courses graded by staff, Gradescope. For US essays, CoGrader. For human marking at board scale, an on-screen marking vendor such as Coempt Onmark. Evalezy publishes this guide; every score links to its source.",
  },
  {
    q: "Can AI check handwritten answer sheets?",
    a: "Yes. Current tools read handwriting from scans or phone photos with vision models and mark each answer against a marking scheme. The best results come from treating AI marks as a first check that a teacher reviews: almost every tool in our research builds in a teacher review step, and Evalezy keeps every mark as a draft until a teacher releases it.",
  },
  {
    q: "Is there a free AI copy checker?",
    a: "For individual use, yes: AnswerWriting.com has a free tier for UPSC and PSC aspirants, CoGrader's free Starter plan includes handwritten essays, Gradescope's Basic plan is free (staff grade, no AI marking) and ZipGrade grades 100 bubble sheets a month free. For institutes, most tools quote a price. Evalezy has no free plan; it charges ₹1 per page checked, and failed, stopped and unreadable copies are free.",
  },
  {
    q: "Which AI answer sheet checking tools are made in India?",
    a: "Evalezy, Eklavvya, CrazyGoldFish, Smart Paper and Extramarks mark answers with AI. The on-screen marking providers Coempt Onmark, DEXIT Global, MeritTrac, TCS iON, Excelsoft Saras and Mercer | Mettl move scanned scripts to human examiners. SuperKalam, AnswerWriting, PrepAiro, Likhit and CollectorBabu give UPSC aspirants AI feedback on their own answers.",
  },
  {
    q: "What does copy checking mean?",
    a: "In India a \"copy\" is a student's answer sheet or exam notebook, and copy checking means marking it: ticks, crosses, marks per question and the total. It is not plagiarism or AI-content checking. If that is what you need, Turnitin is the usual choice for essays, and CoGrader and Top Marks AI include AI-writing detection.",
  },
  {
    q: "How much does AI answer sheet checking cost?",
    a: "Few tools publish prices. Evalezy charges ₹1 per page checked ($0.01 outside India). CoGrader starts at $15 per teacher per month, UPSC answer-evaluation apps charge aspirants from about ₹299 a month, and ZipGrade costs $6.99 a year for multiple choice only. On-screen marking providers and most institutional AI tools quote per exam or per contract.",
  },
];
