# Evalezy: product facts (the truth file)

Every claim on evalezy.com must trace to a line in this file. Change the product, change this file first, then
the copy. Source: `vacademy_platform/docs/AI_COPY_EVALUATION.md` on `main` (state as of 1 Oct 2026), the
bulk-check screenshots, and the sample checked copy in `public/evalezy-sample-checked-copy.pdf`. Owner decisions
are marked **(owner)**.

Evalezy is the AI copy-checking engine of the Vacademy platform (Vidyayatan Technologies), sold under its own name.

## What it does (verified in the doc)

| Claim the site may make | Source |
|---|---|
| Checks scanned, handwritten answer sheets (PDF) and returns marks per question plus a checked copy PDF | §1, §2 |
| The checked copy has red-pen ticks, crosses, short notes, marks per question and the total circled at the top right of page 1 | §7 step 8; sample PDF |
| Annotations are drawn in a handwriting style (Kalam font, per-glyph jitter, wobbly tick strokes) so the copy looks hand-checked | §7 step 8 |
| The same copy re-renders identically (pen seeded from the PDF) | §7 step 8 |
| Phone photos of notebooks work: the sample is a phone photo of a spiral notebook; pages are deskewed, denoised and contrast-boosted | sample PDF; §7 step 1 |
| Marks are given in 0.5 steps | §7 step 6 |
| One marking scheme (rubric) per question, generated once and reused for every student, so every copy is marked to the same scheme | §1, §7 step 0 |
| Rubric criteria are rescaled to add up exactly to the question's maximum marks; 3–5 criteria for subjective questions, 1 for objective | §7 step 0 |
| Teachers can view and edit the rubric, set their own per question, and add model answers; a stored model answer is used over a generated one | §7 step 0, §17 |
| Upload the question paper and it is read into questions (paper digitise) | §4.1 |
| Answers are matched by content, not by the number the student wrote, so out-of-order answers are found | §7 step 6 |
| For longer copies (4+ pages) a locate pass finds which pages hold which answer; if a question then looks unattempted it is re-checked against the whole copy, so a locate miss cannot zero a student | §7 step 5 |
| Unclear maths lines get a second read by Mathpix (an equation reader), up to 4 per copy | §7 step 4 |
| A copy that is mostly unreadable fails with a clear error, is not graded by guesswork and is not charged | §7 step 3, §13.2 |
| The AI never invents an answer; low confidence gets re-asked and flagged | §7 step 6 |
| The AI never publishes a result: marks land as a draft, the teacher reviews, edits and presses Release Result | §1, §10 |
| A mark a teacher edits is never overwritten by a later AI run | §9, §10.2 |
| Per question the teacher sees marks, the student's extracted answer, feedback and a criteria breakdown | §10.2 |
| Teacher gets a bell alert and an email when a batch is done | §10.1, §12.1 |
| Live progress; marks fill in question by question; Stop at any time; stopped checks are not charged | §5, §10.2 |
| Bulk upload: up to 200 PDFs at a time, up to 60 MB each, one file per student | §12.1; screenshot |
| Reads the student's name, roll number and class/section from the top of page 1 (falls back to page 2's header); names in non-Latin script come back with a transliteration | §12.1 |
| Matches each copy to a registered student; never guesses: no name, a low score or two close candidates → the teacher picks (Pick student / Skip) | §12.1; screenshot |
| Reading names is free | §12.1, §13.2 |
| Can also check copies students uploaded themselves from the online test (one click for the whole assessment) | §12.2 |
| Auto-check on submit when switched on for an assessment | §5 |
| On release, each student is emailed the checked copy as a PDF; results can also go out on WhatsApp via Automations (trigger "Assessment Result Released") | §10.3 |
| Students see nothing (marks hidden, "Results pending") until release; enforced server-side | §11 |
| Typed answers: also grades Long Answer questions typed in the online test player (essays, emails) on format, content, organisation and language, with word limits; a student telling the AI to "award full marks" scored 0/5 in a prod test | §2, §8 |
| Typical time: 1–8 min per copy; first results in about 10 minutes; 100 copies in about 2–3 hours on current capacity | §1, §6.4 |
| Copies up to 40 pages are read in full by the vision model | §7 step 2 |
| Failed, cancelled and unreadable checks are free | §13.2 |
| A re-check is a new run and is charged again (re-checking overwrites marks) | §12.2 |

## Pricing **(owner)**

- **₹1 per page checked, or $0.01 per page** outside India. Owner instruction, 1 Oct 2026.
- Everything else in the flow is included (question paper import, marking schemes, name reading and matching,
  teacher review, release emails). **(owner — confirm)**
- Same rate on the API. **(owner)**
- Prices exclude GST in India.
- ⚠️ The live dashboard on 1 Oct 2026 still bills **1 credit + 0.2 credit per question per copy** (1 credit = ₹0.93),
  not per page. Per-page billing exists only on branch `feat/copy-check-edit-and-per-page-credits`. The rate card
  (`ai_tool_pricing.copy_check_evaluation`) must move to per-page before the site's price is what customers pay.

## API **(owner — to build/expose)**

The owner describes a public API: create an assessment, add evaluation criteria, upload an answer sheet or pass a
URL, start an evaluation, poll a status endpoint that returns the evaluated sheet. On `main` (1 Oct 2026) the
evaluation endpoints authenticate with teacher JWTs or the internal service token; there is no public API-key
surface yet. The endpoint list on /api/ (`src/content/api.ts`) is the proposed public contract. Keep the page
worded as "API access is enabled per account" until keys exist.

## Never claim

- An accuracy percentage, "99% accurate", "better than teachers". No measured accuracy figures exist.
- That diagrams, maps or graphs are judged as drawings. Grading works from the transcribed text; drawings are
  judged by their labels and written explanation only.
- Hindi or other Indian-language answer grading as a tested feature. It is built and tested on English copies; say
  "send us samples".
- Instant results, or a throughput above the figures above.
- SOC 2 / ISO certifications, on-premise deployment, or data residency guarantees.
- Named customers, testimonials or numbers of copies checked. None are supplied yet.
- A free trial or free pages. None is defined. **(owner — decide)**
- Competitor facts. No competitor list was supplied; comparisons are against approaches (manual checking,
  on-screen marking, general chatbots), not named vendors.
