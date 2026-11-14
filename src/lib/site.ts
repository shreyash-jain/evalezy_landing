import trialOffer from "@/content/trialOffer.json";

/**
 * Site constants and the registry of hand-written pages. Data-driven pages
 * (audiences, comparisons, blog posts) live in src/content and are merged in
 * src/lib/routes.ts, which feeds the sitemap, footer and llms-full.txt.
 */
export const SITE = "https://evalezy.com";
export const SITE_NAME = "Evalezy";
/** Social card image for every page (a page-level openGraph replaces the layout's, so pass this explicitly). */
export const OG_IMAGES = [{ url: "/og.png", width: 1200, height: 630, alt: "An answer sheet checked by Evalezy, with ticks, crosses and the total circled" }];
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
/** Where existing customers sign in: the Evalezy web app (same accounts as the Vacademy admin dashboard). */
export const LOGIN_URL = "https://evalezy.vacademy.io/login";
/** Self sign-up: a {TRIAL_DAYS}-day trial without a card. Runs on the same host as LOGIN_URL. */
export const SIGNUP_URL = "https://evalezy.vacademy.io/signup/start";
/** Trial days and the AI credits each new sign-up gets, as set on the health dashboard (Products → Evalezy).
 *  scripts/trial-offer.mjs refreshes the JSON before every build; useTrialOffer() updates key buttons live. */
export const TRIAL_DAYS: number = trialOffer.trial_days;
/** 1 credit checks 1 handwritten page. */
export const TRIAL_CREDITS: number = trialOffer.demo_credits;
export const OFFER_API = "https://backend-stage.vacademy.io/admin-core-service/public/product/v1/evalezy/offer";
/** Evalezy app on the App Store (iPhone, live 7 Nov 2026). Android is in closed testing: no Play link yet. */
export const APP_STORE_URL = "https://apps.apple.com/in/app/evalezy-ai-copy-checking/id6831890999";
export interface Plan {
  key: string;
  name: string;
  /** Price for one plan period, in rupees, before GST. */
  price_inr: number;
  /** AI credits included for the plan period; 1 credit checks 1 page. */
  credits: number;
  users: number;
}
/** Paid plans, plan length and extra-credit price: set on the health dashboard (Products → Evalezy → Pricing). */
export const PLANS: Plan[] = trialOffer.plans;
export const PLAN_MONTHS: number = trialOffer.plan_validity_months;
export const EXTRA_CREDIT_INR: number = trialOffer.extra_credit_price_inr;
/** "year" for 12 months, else "N months". */
export const planPeriod = (months: number = PLAN_MONTHS) => (months === 12 ? "year" : months === 1 ? "month" : `${months} months`);
export const cheapestPlan = (plans: Plan[] = PLANS) => plans.reduce((a, b) => (b.price_inr < a.price_inr ? b : a), plans[0]);
/** Free trial sign-up (plan= only tells sign-up which plan interested them; it stays a trial). */
export const signupHref = (plan?: string) =>
  `${SIGNUP_URL}?product=evalezy&source=website${plan ? `&plan=${encodeURIComponent(plan)}` : ""}`;
/** "Buy <plan>": sign up (or log in) first, then the app opens that plan's checkout (buy=). */
export const buyHref = (plan: string) => `${signupHref(plan)}&buy=${encodeURIComponent(plan)}`;

/** Evaluation API (live since 2 Oct 2026) and its developer docs (Mintlify). Facts: src/content/api.ts. */
export const API_BASE = "https://api.evalezy.com/v1";
export const DOCS_URL = "https://docs.evalezy.com";

export const bookHref = () => BOOKING_URL || "/demo/";
export const whatsappHref = (text = "Hi, I'd like to see Evalezy check a few of our answer sheets.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const PRIVACY_URL = "/privacy/";
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
  { path: "/copy-checking-software/", label: "Copy checking software", group: "product", title: "Copy Checking Software: Check Answer Copies with AI", description: "AI copy checking software for schools, coaching and colleges. Upload scanned or phone-photographed copies; get each one checked in red pen. Free trial." },
  { path: "/how-it-works/", label: "How it works", group: "product", title: "How AI Answer Sheet Checking Works, Step by Step", description: "From question paper to released results: how Evalezy reads handwritten copies, matches students, marks against one scheme and returns red-pen copies." },
  { path: "/checked-copy/", label: "Red-pen checked copy", group: "product", title: "AI-Checked Answer Copies That Look Teacher-Checked", description: "Evalezy returns the student's own copy with ticks, crosses, notes, marks per question and the total circled, in a handwriting-style red pen. Not a score table." },
  { path: "/bulk-upload/", label: "Bulk upload & student matching", group: "product", title: "Bulk Answer Sheet Upload and Student Matching", description: "Upload up to 200 scanned answer sheets at once. Evalezy reads each student's name and roll number, matches the copy to your class list and never guesses." },
  { path: "/question-paper-import/", label: "Question paper import", group: "product", title: "Turn a Question Paper PDF into a Gradable Test", description: "Upload the question paper and Evalezy reads it into questions with marks, ready for AI checking. No retyping, no setting up questions one by one." },
  { path: "/marking-scheme/", label: "AI marking scheme", group: "product", title: "AI Marking Scheme Generator or Your Own Rubric", description: "Evalezy drafts a marking scheme for every question, with criteria that add up to the marks. Edit it, replace it or add a model answer. One scheme for all." },
  { path: "/teacher-review/", label: "Teacher review & release", group: "product", title: "Teacher Review: Approve AI Marks Before Release", description: "AI marks land as a draft. Teachers see each answer, the feedback and the criteria, change any mark, then release results. Edited marks are never overwritten." },
  { path: "/typed-answers/", label: "Typed essays & long answers", group: "product", title: "AI Essay Grading for Online Long-Answer Questions", description: "Evalezy also grades essays, letters and emails typed in an online test, on format, content, organisation and language, with word limits and a teacher review." },
  { path: "/app/", label: "Evalezy mobile app", group: "product", title: "Evalezy App: Check Answer Sheets on Your Phone", description: "The Evalezy app, on iPhone now and Android soon: create the test from the paper, photograph each copy, check the class with AI and share the checked copies." },
  { path: "/api/", label: "Evaluation API", group: "product", title: "Answer Sheet Evaluation API for Developers", description: "Grade handwritten copies and typed long answers from your own exam system: upload PDFs, read question-wise marks and the checked copy. Docs at docs.evalezy.com." },
  { path: "/pricing/", label: "Pricing", group: "product", title: `Pricing: From ₹${cheapestPlan().price_inr.toLocaleString("en-IN")} a ${planPeriod()[0].toUpperCase()}${planPeriod().slice(1)}, AI Credits Included`, description: `Evalezy plans include AI credits: ${PLANS.map((p) => `${p.name} ₹${p.price_inr.toLocaleString("en-IN")} with ${p.credits.toLocaleString("en-IN")} credits`).join(", ")}. 1 credit checks 1 page; extra credits ₹${EXTRA_CREDIT_INR}. Free ${TRIAL_DAYS}-day trial.` },
  { path: "/side-by-side/", label: "AI vs teacher: one copy", group: "product", title: "AI vs Teacher: One Answer Copy, Checked Twice", description: "One maths copy checked by a teacher and by Evalezy, page by page. Evalezy caught 2 slips the teacher ticked; the teacher caught 5 answers it misread." },
  { path: "/sample/", label: "See a checked copy", group: "product", title: "Sample: A Real Answer Sheet Checked by Evalezy", description: "A real 7-page Class IX Social Science copy checked by Evalezy: ticks, crosses, corrections, half marks, margin notes and a circled total of 38/80." },
  // Resources
  { path: "/for/", label: "Who it's for", group: "resource", title: "Who Uses Evalezy: Schools, Coaching, Colleges", description: "How schools, coaching institutes, UPSC answer-writing programs, colleges, exam bodies and edtech platforms use AI to check handwritten answer sheets." },
  { path: "/compare/", label: "Compare", group: "resource", title: "Evalezy vs Acadine, Eklavvya, Gradescope and More", description: "Sourced comparisons of Evalezy with Acadine, Eklavvya, Gradescope, CoGrader, CrazyGoldFish, OSM, ChatGPT and checking by hand, incl. when the other is better." },
  { path: "/case-studies/", label: "Case studies", group: "resource", title: "Case Studies: Real Answer Copies Checked by AI", description: "Real, unedited answer copies checked by Evalezy: a maths copy checked by a teacher and by AI, and a Class IX copy shot on a phone. Every mark shown." },
  { path: "/research/", label: "Research", group: "resource", title: "Evalezy Research: Data on Answer Sheet Evaluation", description: "Sourced, downloadable research on how answer sheets are checked: AI evaluation, on-screen marking and AI grading tools, what each does and what it costs." },
  { path: "/blog/", label: "Blog", group: "resource", title: "The Evalezy Blog: Assessment and AI Checking Guides", description: "Practical guides for teachers and exam heads: faster copy checking, marking schemes, scanning answer sheets, fair marking and using AI with control." },
  { path: "/faq/", label: "FAQ", group: "resource", title: "Evalezy FAQ: AI Answer Sheet Checking Questions", description: "Straight answers on AI copy checking: accuracy and control, handwriting, maths, diagrams, languages, scanning, pricing, privacy, matching and the API." },
  { path: "/security/", label: "Data & privacy", group: "resource", title: "Data, Privacy and Control in AI Copy Checking", description: "How Evalezy handles answer sheets and marks, who sees what and when, why the AI never publishes a result, and what we do not claim." },
  // Company
  { path: "/about/", label: "About", group: "company", title: "About Evalezy: AI Copy Checking by Vacademy", description: "AI answer-sheet checking from the team behind Vacademy, built to give teachers back the hours spent checking copies, without taking away the red pen." },
  { path: "/demo/", label: "Book a demo", group: "company", title: "Book an Evalezy Demo or Request API Access", description: "See Evalezy check answer sheets like yours in a 20-minute demo, or request Evaluation API access. Tell us how many copies you check." },
  { path: "/privacy/", label: "Privacy policy", group: "company", title: "Evalezy Privacy Policy", description: "What the Evalezy app and website collect, why, who it is shared with, how long it is kept, and the choices you have." },
  { path: "/delete-account/", label: "Delete account", group: "company", title: "Delete Your Evalezy Account", description: "How to delete your Evalezy account in the app or by email, what is deleted, what is kept, and for how long." },
];

export const byGroup = (g: PageGroup) => PAGES.filter((p) => p.group === g);
export const findPage = (path: string) => PAGES.find((p) => p.path === path);
