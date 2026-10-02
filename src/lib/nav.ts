import { AUDIENCES } from "@/content/audiences";
import { COMPARISONS } from "@/content/comparisons";

export const PRODUCT_NAV = [
  { href: "/checked-copy/", label: "Red-pen checked copy", desc: "The student's own copy, checked like a teacher would." },
  { href: "/bulk-upload/", label: "Bulk upload & matching", desc: "200 copies at once, matched to students by name." },
  { href: "/question-paper-import/", label: "Question paper import", desc: "Upload the paper, get the questions." },
  { href: "/marking-scheme/", label: "AI marking scheme", desc: "Drafted for you, or bring your own." },
  { href: "/teacher-review/", label: "Teacher review & release", desc: "Nothing reaches students until you say so." },
  { href: "/typed-answers/", label: "Typed essays & long answers", desc: "Online long answers graded in seconds." },
];

export const DEV_NAV = [
  { href: "/api/", label: "Evaluation API", desc: "Assessments, criteria, answer sheets, results." },
  { href: "/api/#endpoints", label: "Endpoints", desc: "Every call, one table." },
  { href: "/api/#webhooks", label: "Webhooks & statuses", desc: "Know when a check is done." },
];

export const AUDIENCE_NAV = AUDIENCES.map((a) => ({ slug: a.slug, label: a.label, icon: a.icon }));
export const COMPARE_NAV = COMPARISONS.map((c) => ({ slug: c.slug, label: c.label }));

export const RESOURCE_NAV = [
  { href: "/how-it-works/", label: "How it works" },
  { href: "/sample/", label: "See a checked copy" },
  { href: "/side-by-side/", label: "AI vs teacher: one copy" },
  { href: "/blog/", label: "Blog" },
  { href: "/faq/", label: "FAQ" },
  { href: "/security/", label: "Data & privacy" },
  { href: "/about/", label: "About" },
];
