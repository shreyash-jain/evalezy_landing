/**
 * Site constants and the registry of hand-written pages. Data-driven pages
 * (audiences, comparisons, blog posts) live in src/content and are merged in
 * src/lib/routes.ts, which feeds the sitemap, footer and llms-full.txt.
 */
export const SITE = "https://evalezy.com";
export const SITE_NAME = "Evalezy";
export const COMPANY = "Vidyayatan Technologies LLP";
export const TAGLINE = "AI answer-sheet checking that looks like a teacher's red pen.";

/** Price per checked page. Owner decision 2026-10-01 (see docs/PRODUCT_FACTS.md). */
export const PRICE_INR = 1;
export const PRICE_USD = 0.01;

export const WHATSAPP_NUMBER = "919993336616";
export const WHATSAPP_DISPLAY = "+91 99933 36616";
/** Mailbox must exist before launch (README → Before launch). */
export const SALES_EMAIL = "hello@evalezy.com";
/** Booking page for "Book a demo". Empty = every CTA goes to the /demo/ form. */
export const BOOKING_URL = "";
/** Where existing customers sign in (Evalezy runs inside the Vacademy admin dashboard). */
export const LOGIN_URL = "https://dash.vacademy.io/";
/** Public API base shown in the docs (src/content/api.ts). */
export const API_BASE = "https://api.evalezy.com/v1";

export const bookHref = () => BOOKING_URL || "/demo/";
export const whatsappHref = (text = "Hi, I'd like to see Evalezy check a few of our answer sheets.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const PRIVACY_URL = "https://vacademy.io/privacy-policy";
export const TERMS_URL = "https://vacademy.io/terms-of-service";

export type PageGroup = "product" | "resource" | "company";

export interface SitePage {
  path: string;
  /** Short label for nav/footer. */
  label: string;
  /** <title> without the site suffix. */
  title: string;
  description: string;
  group: PageGroup;
}

export const PAGES: SitePage[] = [
  // Product
  { path: "/how-it-works/", label: "How it works", group: "product", title: "How AI Answer Sheet Checking Works, Step by Step", description: "From question paper to released results: how Evalezy reads handwritten copies, matches students, marks every answer against one scheme and returns red-pen checked copies." },
  { path: "/checked-copy/", label: "Red-pen checked copy", group: "product", title: "AI-Checked Answer Copies That Look Teacher-Checked", description: "Evalezy returns the student's own copy with ticks, crosses, short notes, marks per question and the total circled, in a handwriting-style red pen. Not a score table." },
  { path: "/bulk-upload/", label: "Bulk upload & student matching", group: "product", title: "Bulk Answer Sheet Upload with Automatic Student Matching", description: "Upload up to 200 scanned answer sheets at once. Evalezy reads each student's name and roll number, matches the copy to your class list and never guesses." },
  { path: "/question-paper-import/", label: "Question paper import", group: "product", title: "Turn a Question Paper PDF into a Gradable Test", description: "Upload the question paper and Evalezy reads it into questions with marks, ready for AI checking. No retyping, no setting up questions one by one." },
  { path: "/marking-scheme/", label: "AI marking scheme", group: "product", title: "AI Marking Scheme Generator, or Bring Your Own Rubric", description: "Evalezy drafts a marking scheme for every question, with criteria that add up to the marks. Edit it, replace it or add a model answer. One scheme for every student." },
  { path: "/teacher-review/", label: "Teacher review & release", group: "product", title: "Teacher Review: Approve AI Marks Before Students See Them", description: "AI marks land as a draft. Teachers see each answer, the feedback and the criteria, change any mark, then release results. Edited marks are never overwritten." },
  { path: "/typed-answers/", label: "Typed essays & long answers", group: "product", title: "AI Essay Grading for Online Long-Answer Questions", description: "Evalezy also grades essays, letters and emails typed in an online test, on format, content, organisation and language, with word limits and a teacher review." },
  { path: "/api/", label: "Evaluation API", group: "product", title: "Answer Sheet Evaluation API for Developers", description: "Add AI copy checking to your app: create an assessment, set criteria, send an answer sheet file or URL, get marks and a red-pen checked PDF back. ₹1 / $0.01 per page." },
  { path: "/pricing/", label: "Pricing", group: "product", title: "Pricing: ₹1 per Page Checked ($0.01)", description: "Evalezy pricing is per page checked: ₹1 in India, $0.01 elsewhere. No subscription, no setup fee. Failed and unreadable copies are free. Same price on the API." },
  { path: "/sample/", label: "See a checked copy", group: "product", title: "Sample: A Real Answer Sheet Checked by Evalezy", description: "Look through a real 7-page Class IX Social Science answer copy checked by Evalezy: ticks, crosses, corrections, half marks, margin notes and a circled total of 38/80." },
  // Resources
  { path: "/for/", label: "Who it's for", group: "resource", title: "Who Uses Evalezy: Schools, Coaching, Colleges, Boards", description: "How schools, coaching institutes, UPSC answer-writing programs, colleges, exam bodies and edtech platforms use AI to check handwritten answer sheets." },
  { path: "/compare/", label: "Compare", group: "resource", title: "Evalezy vs Manual Checking, OSM and ChatGPT", description: "Honest comparisons of AI copy checking with Evalezy against checking by hand, on-screen marking (OSM) systems and pasting answers into a general chatbot." },
  { path: "/blog/", label: "Blog", group: "resource", title: "The Evalezy Blog: Assessment and AI Checking Guides", description: "Practical guides for teachers and exam heads: faster copy checking, marking schemes, scanning answer sheets, consistent marking and using AI without losing control." },
  { path: "/faq/", label: "FAQ", group: "resource", title: "Evalezy FAQ: AI Answer Sheet Checking Questions", description: "Straight answers about AI copy checking: accuracy and control, handwriting, maths, diagrams, languages, scanning, pricing, privacy, student matching and the API." },
  { path: "/security/", label: "Data & privacy", group: "resource", title: "Data, Privacy and Control in AI Copy Checking", description: "How Evalezy handles answer sheets and marks, who sees what and when, why the AI never publishes a result, what is free when a check fails, and what we do not claim." },
  // Company
  { path: "/about/", label: "About", group: "company", title: "About Evalezy", description: "Evalezy is AI answer-sheet checking from the team behind Vacademy, built to give teachers back the hours they spend checking copies, without taking away the red pen." },
  { path: "/demo/", label: "Book a demo", group: "company", title: "Book an Evalezy Demo or Request API Access", description: "See Evalezy check answer sheets like yours in a 20-minute demo, or request API keys. Tell us how many copies you check and we'll show you the workflow." },
];

export const byGroup = (g: PageGroup) => PAGES.filter((p) => p.group === g);
export const findPage = (path: string) => PAGES.find((p) => p.path === path);
