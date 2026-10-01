import type { Faq } from "./types";

/** The /faq/ page, grouped. HOME_FAQS is the short list on the home page. Claims: docs/PRODUCT_FACTS.md. */
export const FAQ_GROUPS: { title: string; faqs: Faq[] }[] = [
  {
    title: "How it checks",
    faqs: [
      { q: "What exactly does Evalezy do?", a: "It checks handwritten answer sheets. You upload scanned or photographed copies as PDFs; Evalezy reads the handwriting, finds each answer, marks it against a marking scheme for that question, and returns marks per question plus the student's own copy checked in red pen: ticks, crosses, short notes, marks in the margin and the total circled on page one." },
      { q: "How does it decide the marks?", a: "Every question gets a marking scheme: a few criteria whose marks add up exactly to the question's maximum. Evalezy can draft the scheme for you, or you can write your own and add a model answer. The scheme is created once per question and reused for every student, so all copies are judged the same way. Marks are given in half-mark steps." },
      { q: "How accurate is it?", a: "We do not publish an accuracy percentage, because it depends on handwriting, scan quality, subject and how good the marking scheme is. What we do instead: every mark comes with the student's answer as read and the reason for the mark, low-confidence questions are flagged for review, unreadable copies are never guessed, and nothing reaches students until a teacher releases it. Try it on your own copies in a demo." },
      { q: "Can students answer questions out of order?", a: "Yes. Answers are matched to questions by their content, not by the number the student wrote. On longer copies Evalezy first works out which pages hold which answer; if a question then looks unattempted, it re-checks the whole copy before giving zero." },
      { q: "Does it handle maths?", a: "Yes for written working and equations. Pages are read by a vision model, and maths lines it is unsure of get a second read by a dedicated equation reader." },
      { q: "What about diagrams, maps and graphs?", a: "Grading works from what is written. Diagrams are judged by their labels and the written explanation, not as drawings. For questions that are mostly a diagram, keep a teacher on the final mark." },
      { q: "Which languages does it support?", a: "Evalezy is built and tested on English answer sheets. Students' names written in other scripts are read and transliterated for matching. For Hindi-medium or other-language answers, send us sample copies and we will tell you honestly how it does." },
      { q: "Can it check typed answers from an online test?", a: "Yes. Long-answer questions typed in an online test (essays, letters, emails) are graded on format, content, organisation and language, with word limits. A typed answer takes about 20 seconds." },
    ],
  },
  {
    title: "Uploading copies",
    faqs: [
      { q: "Do I need a scanner?", a: "No. Phone photos combined into a PDF work. The sample copy on this site is a phone photo of a spiral notebook. Pages are straightened, cleaned and contrast-boosted before reading." },
      { q: "How many copies can I upload at once?", a: "Up to 200 PDFs per upload, one file per student, up to 60 MB each. Copies up to 40 pages are read in full." },
      { q: "How does it know which copy belongs to which student?", a: "It reads the name, roll number and class or section written at the top of the first page (or the second page's header) and matches it to the students in that assessment. If there is no name, the match is weak, or two students are close, it does not guess: the copy waits for you to pick the student or skip it." },
      { q: "What if a copy is unreadable?", a: "If most pages are too blurred, dark or blank to read, the check fails with a clear message and you are not charged. Re-scan and upload it again." },
      { q: "Can students upload their own answer sheets?", a: "Yes. In an online test set to manual evaluation, students upload their answer sheet as a PDF. You can check every submitted copy with one click, or switch on auto-check so each copy is checked as soon as it is submitted." },
      { q: "How long does it take?", a: "Usually 1 to 8 minutes per copy, with several copies checked in parallel. The first results appear in about 10 minutes; 100 copies take roughly 2 to 3 hours. You get a bell alert and an email when a batch is done." },
    ],
  },
  {
    title: "Teachers, students and results",
    faqs: [
      { q: "Can teachers change the AI's marks?", a: "Yes, any mark on any question. The review screen shows the student's answer as read, the AI's feedback and the criteria breakdown. A mark a teacher edits is never overwritten, even if the copy is checked again." },
      { q: "When do students see their results?", a: "Only after a teacher presses Release Result. Until then students see \"Results pending\" and the marks are hidden on the server, not just in the app." },
      { q: "How do students get the checked copy?", a: "On release each student is emailed their checked copy as a PDF. If you have connected WhatsApp in Automations, you can send results there too." },
      { q: "Can I stop a check that is running?", a: "Yes. Stop it from the progress screen; it halts within seconds and a stopped check is not charged." },
    ],
  },
  {
    title: "Pricing",
    faqs: [
      { q: "How much does it cost?", a: "₹1 per page checked in India, $0.01 per page elsewhere. A 7-page copy costs ₹7. There is no subscription and no setup fee. Indian prices exclude GST." },
      { q: "What is not charged?", a: "Failed checks, stopped checks and unreadable copies are free. Reading names and matching copies to students is free." },
      { q: "Is a re-check charged?", a: "Yes. Re-checking a copy runs a fresh check and replaces the marks, so it is billed again. Teacher edits are free and are kept." },
      { q: "Is the API priced differently?", a: "No. The API costs the same per page as the dashboard." },
      { q: "Do you offer volume pricing?", a: "For large volumes (exam bodies, platforms) talk to us about capacity and pricing before your exam window." },
    ],
  },
  {
    title: "API and data",
    faqs: [
      { q: "Is there an API?", a: "Yes. Create assessments, set evaluation criteria, send answer sheets by file upload or URL, and get marks, feedback and the checked PDF from a status endpoint or a webhook. API access is enabled per account; request it on the demo page." },
      { q: "Who can see the answer sheets?", a: "Copies and marks live inside your institute's account. Students see their own results only after release. See the data and privacy page for details." },
      { q: "Who is behind Evalezy?", a: "Evalezy is built by the team behind Vacademy (Vidyayatan Technologies), a learning and assessment platform used by schools, online academies and training institutes across 5 countries. Evalezy is the AI checking engine of that platform, offered on its own." },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.faqs);

const pick = (q: string) => {
  const f = ALL_FAQS.find((x) => x.q === q);
  if (!f) throw new Error(`FAQ not found: ${q}`);
  return f;
};

export const HOME_FAQS: Faq[] = [
  pick("How accurate is it?"),
  pick("Can teachers change the AI's marks?"),
  pick("Do I need a scanner?"),
  pick("How does it know which copy belongs to which student?"),
  pick("What about diagrams, maps and graphs?"),
  pick("How long does it take?"),
  pick("What is not charged?"),
  pick("Is there an API?"),
];

export const PRICING_FAQS: Faq[] = [
  pick("How much does it cost?"),
  pick("What is not charged?"),
  pick("Is a re-check charged?"),
  pick("Is the API priced differently?"),
  pick("Do you offer volume pricing?"),
];
