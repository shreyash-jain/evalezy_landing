/** An outside source cited in a blog post; `checked` = YYYY-MM-DD the page was read. */
export interface Source {
  label: string;
  url: string;
  checked: string;
}

export interface Faq {
  q: string;
  a: string;
}

export type IconName =
  | "School"
  | "GraduationCap"
  | "BookOpenCheck"
  | "Landmark"
  | "Building2"
  | "Code2"
  | "PenLine"
  | "Users"
  | "FileStack"
  | "ScanLine"
  | "ClipboardList"
  | "ShieldCheck"
  | "Timer"
  | "Sigma"
  | "Search"
  | "BadgeCheck"
  | "MessageSquareText"
  | "Webhook";

/** A "who it's for" page: /for/<slug>/. */
export interface Audience {
  slug: string;
  /** Nav label, e.g. "Schools". */
  label: string;
  icon: IconName;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  /** The problem today, in their words. */
  pains: { title: string; body: string }[];
  /** How Evalezy fits their workflow, in order. */
  workflow: { title: string; body: string }[];
  /** Short bullet outcomes. */
  outcomes: string[];
  /** A worked cost example for this audience. */
  example: { copies: number; pages: number; label: string };
  faqs: Faq[];
}

/** A comparison page: /compare/<slug>/. */
export interface Comparison {
  slug: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  them: string;
  rows: { aspect: string; evalezy: string; them: string }[];
  whenThem: string[];
  whenEvalezy: string[];
  body: { heading: string; text: string }[];
  faqs: Faq[];
}
