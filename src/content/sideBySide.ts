/**
 * One maths answer copy, checked twice: by a teacher (green pen) and by Evalezy (red pen).
 * Source: side-by-side-comparision/ (owner, 2 Oct 2026). Both PDFs are the same 7-page phone scan, so the page
 * images line up pixel for pixel. Every verdict below was checked by hand against the student's working on
 * 2 Oct 2026 (see docs/PRODUCT_FACTS.md → "Side-by-side copy"). There is no question paper in the folder, so
 * where the right answer depends on it, the item is a judgement call, not a verdict.
 *
 * Framing rule: this copy shows each checker catching what the other missed. Never present it as
 * "AI beats teachers": on this copy Evalezy also misread five answers that the teacher marked correctly.
 */

export type Verdict = "evalezy" | "teacher" | "judgement";

export interface Disagreement {
  q: number;
  /** 1-based page of the copy where the answer is. */
  page: number;
  /** What the student wrote, short. */
  wrote: string;
  teacher: string;
  evalezy: string;
  verdict: Verdict;
  /** One or two sentences: what happened and why the verdict. */
  why: string;
  /** Crop files: /side-by-side/q{q}-teacher.jpg and -ai.jpg, with their pixel size. */
  w: number;
  h: number;
}

export const COPY = {
  subject: "Maths half-yearly mock test",
  marks: 80,
  questions: 32,
  pages: 7,
  teacherTotal: 48,
  evalezyTotal: 40,
  /** Written notes on the copy (Evalezy's includes one "Good."). The teacher wrote ticks, crosses and marks only. */
  teacherNotes: 0,
  evalezyNotes: 12,
};

export const DISAGREEMENTS: Disagreement[] = [
  {
    q: 30, page: 7, wrote: "A = 7, B = 6; check: 37 + 25 = 65", teacher: "3/3, check ticked", evalezy: "2.5/3: “Check wrong: 37+25 = 62, not 65”",
    verdict: "evalezy",
    why: "The student’s own check says 37 + 25 = 65. It is 62. The teacher ticked it; Evalezy crossed it and wrote the right sum. The answer was right, so the slip cost half a mark.",
    w: 1100, h: 370,
  },
  {
    q: 28, page: 5, wrote: "625t⁴/2, via × 25/2 t⁻⁸", teacher: "3/3", evalezy: "2.5/3: exponent error and a 2/26 slip",
    verdict: "evalezy",
    why: "Dividing by (2/25)t⁻⁸, the student wrote × 25/2 t⁻⁸ where it should be t⁸. The final answer is right; the working isn’t. The teacher gave full marks, Evalezy took half a mark and said why. (Evalezy also crossed one correct line, 5⁻³ = 1/125, by reading the 5 as a 6.)",
    w: 1100, h: 618,
  },
  {
    q: 18, page: 2, wrote: "(c) ₹720", teacher: "1/1", evalezy: "0/1: “Correct: (c) ₹720”",
    verdict: "teacher",
    why: "The student chose (c), the right option. Evalezy read ₹720 as ₹120 and marked it wrong, while its own note names (c) as correct.",
    w: 1100, h: 137,
  },
  {
    q: 6, page: 1, wrote: "(b) −19/7", teacher: "1/1", evalezy: "0/1: “option b with minus sign”",
    verdict: "teacher",
    why: "The student chose (b) and did write the minus sign. Evalezy missed the small minus and marked a right answer wrong.",
    w: 1100, h: 119,
  },
  {
    q: 25, page: 4, wrote: "7/30", teacher: "2/2", evalezy: "1/2: “Common factor 7/5 missed”",
    verdict: "teacher",
    why: "The boxed answer is 7/30, which is right. Evalezy read the 7 as a 1, took a mark for a “missing” factor, and its note was cut off mid-sentence.",
    w: 1100, h: 676,
  },
  {
    q: 26, page: 4, wrote: "350 km (corrected from 360)", teacher: "2/2", evalezy: "0/2: “Correct answer: 350 km”",
    verdict: "teacher",
    why: "The student struck out 360 and wrote 350 above it. Evalezy read the crossed-out number and gave 0/2, while naming 350 km as the right answer.",
    w: 1100, h: 241,
  },
  {
    q: 29, page: 6, wrote: "x = 5, y = 5 (both boxed)", teacher: "3/3", evalezy: "2.5/3: “Final values not stated”",
    verdict: "teacher",
    why: "Both values are boxed on the page. Evalezy took half a mark for not stating them.",
    w: 1100, h: 839,
  },
  {
    q: 27, page: 5, wrote: "900 = 30²", teacher: "3/3", evalezy: "2.5/3: “Divisibility of 900 by 6, 9, 15 not verified”",
    verdict: "judgement",
    why: "The answer is right. Evalezy wanted the student to show that 900 divides by 6, 9 and 15; the teacher didn’t. A strictness call.",
    w: 1100, h: 506,
  },
  {
    q: 32, page: 7, wrote: "Part (i) only", teacher: "2/3", evalezy: "1.5/3: “Part (ii) not attempted”",
    verdict: "judgement",
    why: "Both took marks for the missing part (ii); they differ by half a mark. Evalezy’s note for this question was printed at the foot of page 4 by mistake.",
    w: 1100, h: 370,
  },
  {
    q: 22, page: 3, wrote: "4a²/b²", teacher: "2/2", evalezy: "1.5/2: “Steps not shown clearly”",
    verdict: "judgement",
    why: "Evalezy took half a mark for unclear exponent steps; the teacher gave full marks. Settling who is right needs the question paper, which we don’t have.",
    w: 1100, h: 220,
  },
];

export const count = (v: Verdict) => DISAGREEMENTS.filter((d) => d.verdict === v).length;
export const byVerdict = (v: Verdict) => DISAGREEMENTS.filter((d) => d.verdict === v);

/** What sits on each page, for the page-by-page viewer. */
export const PAGE_NOTES: string[] = [
  "Section A, one-mark answers. Both crossed Q3. They split on Q6: the student wrote −19/7, and Evalezy missed the minus sign.",
  "The rest of Section A, then √1764 = 42. They split on Q18: Evalezy read ₹720 as ₹120.",
  "Q22 to Q24. They split on Q22 by half a mark; Q23 and Q24 match.",
  "Q25 and Q26: Evalezy misread 7/30 and the 350 km correction. The red note at the bottom belongs to Q32.",
  "Q27 and Q28. On Q28, Evalezy flagged a t⁻⁸ that should be t⁸; the teacher gave full marks.",
  "Q29 and the start of Q30. Evalezy docked Q29 for values that are boxed on the page.",
  "Q30’s check, 37 + 25 = 65: the teacher ticked it, Evalezy caught it. Q31 matches; Q32 differs by half a mark.",
];
