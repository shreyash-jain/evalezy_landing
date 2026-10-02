/**
 * The Evalezy Evaluation API as shown on /api/. Source of truth: the live docs at https://docs.evalezy.com
 * (v1, launched 2 Oct 2026; read 2 Oct 2026). Keep this file in step with the docs' API reference and changelog:
 * every endpoint, status and limit here is copied from them. Not available yet (docs roadmap): webhooks, phone
 * photos, bulk name matching, question-paper import, CSV results, Hindi. Not offered at all: sending an answer
 * sheet by URL (copies go in only as uploaded PDFs). Never claim those here.
 */
import { API_BASE, DOCS_URL } from "@/lib/site";

export interface Endpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  summary: string;
  group: "Exams" | "Rubrics" | "Candidates" | "Uploads" | "Submissions" | "Results" | "Review" | "Credits";
  /** Path on docs.evalezy.com. */
  doc: string;
}

export const ENDPOINTS: Endpoint[] = [
  { method: "POST", path: "/exams", group: "Exams", summary: "Create an exam with its questions, marks, answer keys and rubrics or model answers. Send open: true to accept submissions straight away.", doc: "/api-reference/exams/create-an-exam" },
  { method: "POST", path: "/exams/{id}/open", group: "Exams", summary: "Open a draft exam to accept copies. Rubrics must add up to max marks; questions, marks and answer keys are then fixed.", doc: "/api-reference/exams/open" },
  { method: "PUT", path: "/exams/{id}/questions/{qid}/rubric", group: "Rubrics", summary: "Set one long-answer question's rubric and model answer. Without one, a rubric is generated on the first copy and reused.", doc: "/api-reference/rubrics/set-a-questions-rubric" },
  { method: "POST", path: "/candidates", group: "Candidates", summary: "Create or update up to 2,000 candidates by your own external_id. Or skip it and send the candidate with the submission.", doc: "/api-reference/candidates/create-or-update-candidates" },
  { method: "POST", path: "/uploads", group: "Uploads", summary: "Get presigned URLs for 1 to 100 PDFs (50 MB each), PUT each file, then read it back to check its page count.", doc: "/api-reference/uploads/create-uploads" },
  { method: "POST", path: "/exams/{id}/submissions", group: "Submissions", summary: "Submit one candidate's copy (upload_id) or typed answers. Returns 202 with a fixed-price quote.", doc: "/api-reference/submissions/create-a-submission" },
  { method: "GET", path: "/submissions?updated_since=…", group: "Submissions", summary: "The feed of every submission that changed, across exams. Poll it to pick up results (no webhooks yet).", doc: "/api-reference/submissions/submission-feed" },
  { method: "GET", path: "/submissions/{id}/result", group: "Results", summary: "Question-wise marks, criteria with reasons, feedback, the answer as read, confidence and needs_review.", doc: "/api-reference/results/get-result" },
  { method: "GET", path: "/submissions/{id}/checked-copy", group: "Results", summary: "Download the checked copy: the student's PDF with ticks, crosses, notes and marks.", doc: "/api-reference/results/download-the-checked-copy" },
  { method: "PATCH", path: "/submissions/{id}/questions/{qid}", group: "Review", summary: "A teacher's override: marks (0.5 steps) and feedback for one question. Overrides are free.", doc: "/api-reference/review/override-a-questions-marks" },
  { method: "POST", path: "/exams/{id}/finalize", group: "Review", summary: "Publish draft marks as final, for chosen submissions or every graded one. Nothing is final until you call it.", doc: "/api-reference/review/finalize-results" },
  { method: "POST", path: "/credits/quote", group: "Credits", summary: "Quote the fixed price before you submit, and check your balance covers it.", doc: "/api-reference/credits/quote-a-price" },
];

export const STATUSES: { status: string; meaning: string }[] = [
  { status: "queued", meaning: "Waiting for a grading slot, with queue position and estimated ready time." },
  { status: "processing", meaning: "Grading has started." },
  { status: "reading", meaning: "The handwriting is being read." },
  { status: "grading", meaning: "Answers are being marked." },
  { status: "graded", meaning: "Every question was graded. Marks are drafts until you finalize." },
  { status: "partially_graded", meaning: "At least one question could not be graded; a teacher marks it." },
  { status: "failed", meaning: "The copy could not be graded, e.g. unreadable. Reason in error.code. Not charged." },
  { status: "cancelled", meaning: "You cancelled it. Not charged." },
];

/** Short, factual list of what the API does not do yet (docs roadmap), shown on /api/. */
export const NOT_YET: string[] = [
  "Webhooks: poll the submission feed for now",
  "Phone photos: send one PDF per answer sheet",
  "Bulk scans split and matched by name: one PDF per candidate",
  "Exams from a question-paper PDF: send questions as JSON",
  "CSV results and Hindi or regional-language answers",
];

export const docsUrl = (path = "") => `${DOCS_URL}${path}`;

export const SNIPPETS = {
  createExam: `curl ${API_BASE}/exams \\
  -H "X-API-Key: $EVALEZY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: sst-ix-mock-4" \\
  -d '{
    "title": "Social Science · Half-Yearly Mock Test 4",
    "mode": "handwritten",
    "external_ref": "sst-ix-mock-4",
    "class": "9",
    "open": true,
    "questions": [{
      "label": "30",
      "type": "long_answer",
      "text": "Explain the factors affecting climate.",
      "max_marks": 3,
      "rubric": { "criteria": [
        { "name": "Names valid factors of climate", "marks": 1.5 },
        { "name": "Explains how each factor affects climate", "marks": 1 },
        { "name": "Uses a correct example", "marks": 0.5 }
      ]}
    }]
  }'`,

  upload: `# 1. Ask for a presigned upload URL (1 to 100 PDFs per call, 50 MB each)
curl ${API_BASE}/uploads \\
  -H "X-API-Key: $EVALEZY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"filename": "IXB-14.pdf", "content_type": "application/pdf", "size_bytes": 8421337}'

# 2. PUT the PDF to the upload_url it returns (no API key on this call)
curl -X PUT "$UPLOAD_URL" -H "Content-Type: application/pdf" --data-binary @IXB-14.pdf`,

  submitCurl: `curl ${API_BASE}/exams/$EXAM_ID/submissions \\
  -H "X-API-Key: $EVALEZY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: sst-ix-mock-4-IXB-14" \\
  -d '{
    "candidate": { "external_id": "IXB-14", "name": "Aditi Sharma", "roll_number": "14" },
    "upload_id": "0d2b6c1e-6a1f-4c55-9a43-2b1f0c9e7a10"
  }'`,

  submitNode: `const res = await fetch(\`${API_BASE}/exams/\${examId}/submissions\`, {
  method: "POST",
  headers: {
    "X-API-Key": process.env.EVALEZY_API_KEY,
    "Content-Type": "application/json",
    "Idempotency-Key": \`sst-ix-mock-4-\${rollNo}\`,
  },
  body: JSON.stringify({
    candidate: { external_id: \`IXB-\${rollNo}\`, name, roll_number: rollNo },
    upload_id: uploadId,
  }),
});
const submission = await res.json(); // 202: status "queued", quote.credits = pages`,

  submitPython: `import os, requests

API = "${API_BASE}"
HEADERS = {"X-API-Key": os.environ["EVALEZY_API_KEY"]}

resp = requests.post(
    f"{API}/exams/{exam_id}/submissions",
    headers={**HEADERS, "Idempotency-Key": f"sst-ix-mock-4-{roll_no}"},
    json={
        "candidate": {"external_id": f"IXB-{roll_no}", "name": name, "roll_number": roll_no},
        "upload_id": upload_id,
    },
    timeout=60,
)
submission = resp.json()  # 202: status "queued", quote.credits = pages`,

  accepted: `{
  "id": "5a7e2c90-1b4d-4e8f-a3c2-7d9e0f1a2b3c",
  "status": "queued",
  "pages": 7,
  "queue": { "position": 3, "estimated_ready_at": "2026-10-02T10:24:00Z" },
  "quote": { "unit": "page", "pages": 7, "credits": 7, "rate_source": "standard" },
  "credits_charged": null
}`,

  result: `{
  "submission_id": "5a7e2c90-1b4d-4e8f-a3c2-7d9e0f1a2b3c",
  "status": "graded",
  "needs_review": true,
  "finalized": false,
  "totals": { "awarded": 38, "max": 80, "percentage": 47.5 },
  "questions": [
    {
      "label": "30",
      "awarded": 0.5,
      "max": 3,
      "source": "ai",
      "confidence": 0.88,
      "needs_review": false,
      "extracted_answer": "1. Temperature 2. Humidity 3. Precipitation 4. Atmospheric Pressure 5. Wind",
      "feedback": "Only weather elements listed; no factors of climate explained.",
      "criteria": [
        { "name": "Names valid factors of climate", "awarded": 0.5, "max": 1.5, "reason": "Lists weather elements, not factors." },
        { "name": "Explains how each factor affects climate", "awarded": 0, "max": 1, "reason": "No explanation." },
        { "name": "Uses a correct example", "awarded": 0, "max": 0.5, "reason": "No example." }
      ]
    }
  ],
  "checked_copy": { "available": true, "download_path": "/submissions/5a7e2c90-…/checked-copy" },
  "credits_charged": 7
}`,

  feed: `# No webhooks yet: poll the feed and follow next_cursor until has_more is false
curl "${API_BASE}/submissions?updated_since=2026-10-02T10:00:00Z" \\
  -H "X-API-Key: $EVALEZY_API_KEY"`,

  finalize: `curl -X POST ${API_BASE}/exams/$EXAM_ID/finalize \\
  -H "X-API-Key: $EVALEZY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"all_graded": true}'`,
};
