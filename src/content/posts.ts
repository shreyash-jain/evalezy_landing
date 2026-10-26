/**
 * Blog registry: drives /blog/, the sitemap, llms-full.txt and the "From the blog" block on
 * any page listed in a post's `pages`. Each post is src/app/blog/<slug>/page.tsx using BlogShell.
 */
export interface Post {
  slug: string;
  /** The article's H1 and BlogPosting headline. */
  title: string;
  /** Shorter <title> and social title when the H1 is too long for search results; defaults to `title`. */
  seoTitle?: string;
  description: string;
  category: "Guides" | "Assessment" | "AI checking" | "For developers";
  published: string; // YYYY-MM-DD
  updated?: string;
  readMins: number;
  keywords: string[];
  /** Site pages that should link to this post. */
  pages?: string[];
}

export const POSTS: Post[] = [
  {
    slug: "reduce-teacher-workload-automated-answer-sheet-checking",
    title: "How to Reduce Teachers' Workload With Automated Answer Sheet Checking",
    description: "Discover how automated answer sheet checking can help teachers manage exam workloads, streamline grading, and provide timely feedback to students.",
    category: "Guides",
    published: "2026-10-26",
    readMins: 10,
    keywords: ["automated answer sheet checking", "reduce teachers' workload", "AI answer sheet checking", "automated exam grading", "AI tools for teachers", "handwritten answer sheet checking software", "AI evaluation software for schools"],
    pages: ["/copy-checking-software/", "/bulk-upload/", "/for/coaching-institutes/", "/compare/manual-checking/"],
  },
  {
    slug: "maths-step-marking-partial-credit",
    title: "Maths Step Marking: How to Award Partial Credit Fairly",
    description: "A practical maths step-marking guide with a worked 4-mark example, follow-through rules, alternative methods and checks for AI-read handwritten answers.",
    category: "Assessment",
    published: "2026-10-10",
    readMins: 6,
    keywords: ["maths step marking", "partial credit in maths", "maths answer sheet evaluation", "method marks", "marking handwritten maths answers"],
    pages: ["/marking-scheme/", "/teacher-review/", "/for/schools/", "/side-by-side/"],
  },
  {
    slug: "answer-sheet-moderation-checklist",
    title: "Answer Sheet Moderation: A Checklist Before Releasing Results",
    description: "Use this answer sheet moderation checklist to compare markers, record disagreements, check totals and review AI draft marks before releasing exam results.",
    category: "Guides",
    published: "2026-10-10",
    readMins: 6,
    keywords: ["answer sheet moderation", "exam moderation checklist", "marking consistency", "moderation of marking", "review AI grading"],
    pages: ["/teacher-review/", "/for/colleges-universities/", "/for/exam-boards/", "/bulk-upload/"],
  },
  {
    slug: "feedback-on-student-answer-sheets",
    title: "Feedback on Student Answer Sheets: Examples That Guide Revision",
    description: "Write useful feedback on student answer sheets with subject-specific comment examples, a simple response routine and a checklist for reviewing AI comments.",
    category: "Guides",
    published: "2026-10-10",
    readMins: 6,
    keywords: ["feedback on student answer sheets", "answer sheet feedback examples", "teacher marking comments", "actionable feedback for students", "exam feedback"],
    pages: ["/checked-copy/", "/typed-answers/", "/for/schools/", "/for/coaching-institutes/"],
  },
  {
    slug: "upsc-answer-writing-evaluation-at-scale",
    title: "UPSC Mains Answer Writing Evaluation at Scale (and Where AI Helps)",
    description: "How to run UPSC Mains answer writing evaluation at scale: a GS rubric, mentor workflow, daily cadence, and where an AI first evaluation helps or mentors judge.",
    category: "Guides",
    published: "2026-10-01",
    readMins: 9,
    keywords: ["UPSC answer writing evaluation", "mains answer evaluation", "answer writing practice", "UPSC answer copy evaluation", "UPSC mains answer writing", "GS answer rubric", "answer writing programme"],
    pages: ["/for/upsc-answer-writing/", "/for/coaching-institutes/", "/marking-scheme/", "/teacher-review/"],
  },
  {
    slug: "handwritten-answer-grading-api",
    title: "Handwritten Answer Grading API: OCR, Vision Models, Build vs Buy",
    description: "Why OCR fails on student handwriting, what a production grading pipeline needs, build vs buy, and how the Evalezy API grades uploaded PDF answer sheets.",
    category: "For developers",
    published: "2026-10-01",
    updated: "2026-10-02",
    readMins: 8,
    keywords: ["handwritten answer grading API", "answer sheet evaluation API", "handwriting recognition for grading", "AI grading API", "OCR for handwritten answers", "handwritten text recognition", "edtech grading API"],
    pages: ["/api/", "/for/edtech-platforms/", "/how-it-works/", "/compare/chatgpt/"],
  },
  {
    slug: "scan-answer-sheets-with-phone",
    title: "How to Scan Answer Sheets With a Phone: A Practical Guide for Schools",
    description: "Scan answer sheets with a phone: which apps make PDFs, light and framing, spiral notebooks, one PDF per student, file names and a pre-upload checklist.",
    category: "Guides",
    published: "2026-10-01",
    readMins: 9,
    keywords: ["scan answer sheets", "how to scan answer sheets with phone", "scanning exam papers", "answer sheet scanning for evaluation", "scan answer copies to PDF", "phone scanner app for schools", "bulk upload answer sheets"],
    pages: ["/bulk-upload/", "/for/schools/", "/how-it-works/", "/faq/"],
  },
  {
    slug: "on-screen-marking-vs-ai-evaluation",
    title: "On-Screen Marking (OSM) vs AI Evaluation: What Exam Bodies Should Know",
    description: "How on-screen marking works, how CBSE and universities in India use it, what it does not fix, and how an AI first evaluation with human review fits in.",
    category: "Assessment",
    published: "2026-10-01",
    readMins: 9,
    keywords: ["on-screen marking", "OSM evaluation", "digital evaluation of answer sheets", "AI evaluation of answer sheets", "onscreen evaluation system", "CBSE on-screen marking", "evaluator variance"],
    pages: ["/compare/on-screen-marking/", "/for/exam-boards/", "/for/colleges-universities/", "/teacher-review/"],
  },
  {
    slug: "how-to-check-answer-sheets-faster",
    title: "How to Check 200 Answer Sheets Faster Without Losing Fairness",
    description: "Practical copy checking tips for teachers: mark question by question, fix the scheme first, work in passes, moderate a sample and use feedback codes.",
    category: "Guides",
    published: "2026-10-01",
    readMins: 9,
    keywords: ["how to check answer sheets fast", "copy checking tips for teachers", "answer sheet checking", "how to check copies faster", "marking answer sheets", "moderation of marking", "teacher marking workload"],
    pages: ["/compare/manual-checking/", "/bulk-upload/", "/for/schools/", "/teacher-review/"],
  },
  {
    slug: "ai-answer-sheet-evaluation-buyers-guide",
    title: "AI Answer Sheet Evaluation: How It Works and 12 Questions to Ask",
    description: "How AI answer sheet evaluation reads handwriting and marks against a scheme, plus 12 questions to ask any AI copy checking vendor before you buy.",
    category: "AI checking",
    published: "2026-10-01",
    readMins: 8,
    keywords: ["AI answer sheet evaluation", "AI copy checking software", "automated answer sheet evaluation", "AI answer sheet checking", "handwritten answer sheet evaluation", "AI evaluation of answer sheets"],
    pages: ["/how-it-works/", "/compare/on-screen-marking/", "/compare/chatgpt/", "/for/schools/"],
  },
  {
    slug: "how-to-write-a-marking-scheme",
    title: "How to Write a Marking Scheme (Rubric): 2, 3 and 5-Mark Examples",
    description: "How to write a marking scheme for subjective answers: rules for criteria and half marks, with worked 2, 3 and 5-mark examples in the CBSE value-point style.",
    category: "Assessment",
    published: "2026-10-01",
    readMins: 8,
    keywords: ["marking scheme", "how to write a rubric", "marking scheme for subjective questions", "CBSE marking scheme style", "how to write a marking scheme", "rubric examples", "value points marking scheme"],
    pages: ["/marking-scheme/", "/question-paper-import/", "/teacher-review/", "/for/coaching-institutes/"],
  },
];

export const postPath = (slug: string) => `/blog/${slug}/`;
export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);
