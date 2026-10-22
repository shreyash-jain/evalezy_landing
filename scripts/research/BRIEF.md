# Evalezy Research: AI answer-sheet evaluation landscape 2026 — research brief

Goal: a sourced, fair comparison of the software institutes use to check/grade student answers (handwritten and
typed), published at evalezy.com/research/. Every value must come from a page you actually opened (vendor site,
docs, help centre, pricing page, press release, reputable news). Read date: October 2026.

## Output: one JSON array per batch, written to scripts/research/<batch>.json

Each vendor record:
{
  "name": "Gradescope",                       // product name as the vendor writes it
  "company": "Turnitin",                       // owner / parent, if different
  "website": "https://www.gradescope.com",
  "hq_country": "United States",
  "founded_year": 2014,                        // or null
  "segment": "one of: ai-copy-checking | osm | handwritten-grading | ai-grading-assistant | omr | upsc-answer-writing | lms-ai",
  "target_customers": "short phrase",
  "pricing": {
    "public_pricing": true,                    // are prices published on the vendor's site?
    "model": "per page | per script/copy | per student/yr | per teacher/mo | per institution | free | quote",
    "entry_price": {"amount": 1, "currency": "INR", "period": "page", "plan_name": "…", "notes": "…"} or null,
    "free_plan": true/false/null
  },
  "capabilities": {                            // each: {"value": "yes|partial|no|unknown", "evidence": "<=200 chars, quote or close paraphrase"}
    "handwritten_reading":   …,  // reads handwritten answers from scans/photos (not just bubbles)
    "subjective_ai_marking": …,  // AI awards marks to written/subjective answers (not only MCQ/auto-key)
    "stem_maths":            …,  // marks maths working / equations
    "rubric_marking_scheme": …,  // per-question rubric or marking scheme used for marking (custom or AI-drafted)
    "partial_marks_feedback":…,  // partial marks per question with a written reason/feedback
    "typed_answers":         …,  // grades typed/online long answers or essays
    "indian_languages":      …,  // grades answers written in Hindi or another Indian language (documented)
    "bulk_scan_ingest":      …,  // upload/scan a whole batch of answer sheets at once
    "student_identification":…,  // identifies which student a sheet belongs to (name/roll read, QR/barcode, template)
    "annotated_copy":        …,  // returns the student's own sheet marked up (ticks, marks, comments on the page)
    "teacher_review":        …,  // a human reviews/overrides/moderates marks before results are released
    "question_paper_import": …,  // builds the question list/marking from an uploaded question paper
    "public_api":            …,  // documented public API for grading/evaluation
    "integrity_checks":      …   // plagiarism or AI-writing detection on answers
  },
  "scale": {"customers_claimed": "…", "funding_or_owner_notes": "…"},
  "notable_2025_2026": "one sentence on a dated 2025-26 change (launch, acquisition, funding, pricing), or null",
  "notable_source": "URL or null",
  "sources": {"homepage": "url", "pricing": "url", "capabilities.<key>": "url", ...},   // one URL per non-unknown value where possible
  "as_of": "2026-10-22"
}

## Rules
- yes = documented natively; partial = add-on, limited, beta, only some question types, or via integration;
  no = vendor explicitly says it does not; unknown = you could not find it documented. Never guess "yes".
- Human-only on-screen marking (OSM): subjective_ai_marking = no unless AI marking is documented; teacher_review = yes.
- Do not invent prices, customer counts or dates. Prefer the vendor's own pages; mark third-party claims in evidence.
- Keep evidence short and factual. No marketing adjectives.
- Budget: about 40 web searches/fetches in total. If a vendor has almost no public information, include it with
  unknowns and say so in evidence, or drop it and say why in your final answer.
