/**
 * The public evaluation API as shown on /api/. This is the proposed public contract
 * (docs/PRODUCT_FACTS.md → "API"): keep it in step with what is actually exposed.
 * Example values come from the sample copy on /sample/ (38/80, Class IX Social Science).
 */
import { API_BASE } from "@/lib/site";

export interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  summary: string;
  group: "Assessments" | "Criteria" | "Answer sheets" | "Evaluations";
}

export const ENDPOINTS: Endpoint[] = [
  { method: "POST", path: "/assessments", group: "Assessments", summary: "Create an assessment from a list of questions with marks, or from a question paper URL to be read into questions." },
  { method: "GET", path: "/assessments/{id}", group: "Assessments", summary: "Fetch an assessment with its questions, marks and current criteria." },
  { method: "PUT", path: "/assessments/{id}/criteria", group: "Criteria", summary: "Set evaluation criteria and model answers per question. Criteria marks are rescaled to sum to the question's marks." },
  { method: "POST", path: "/assessments/{id}/criteria/generate", group: "Criteria", summary: "Ask Evalezy to draft criteria for every question; review and edit before you evaluate." },
  { method: "POST", path: "/files", group: "Answer sheets", summary: "Upload an answer sheet PDF (multipart). Returns a file id to evaluate." },
  { method: "POST", path: "/evaluations", group: "Evaluations", summary: "Start checking one answer sheet, by file id or public URL, with your student id and an optional webhook." },
  { method: "GET", path: "/evaluations/{id}", group: "Evaluations", summary: "Status, progress and, once completed, marks per question, feedback and the checked copy PDF URL." },
  { method: "POST", path: "/evaluations/{id}/cancel", group: "Evaluations", summary: "Stop a running evaluation. Cancelled evaluations are not billed." },
];

export const STATUSES: { status: string; meaning: string }[] = [
  { status: "queued", meaning: "Accepted and waiting for a slot." },
  { status: "reading", meaning: "Pages are being read: layout, handwriting, maths lines." },
  { status: "grading", meaning: "Questions are being marked; progress shows questions done / total." },
  { status: "completed", meaning: "Marks, feedback and the checked PDF are ready." },
  { status: "failed", meaning: "Could not be checked, e.g. an unreadable copy. Reason included. Not billed." },
  { status: "cancelled", meaning: "Stopped by you. Not billed." },
];

export const SNIPPETS = {
  createAssessment: `curl ${API_BASE}/assessments \\
  -H "Authorization: Bearer $EVALEZY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Social Science · Half-Yearly Mock Test 4",
    "class": "IX",
    "question_paper_url": "https://files.example.edu/papers/sst-ix-mock-4.pdf"
  }'`,

  setCriteria: `curl -X PUT ${API_BASE}/assessments/asm_7Hq2/criteria \\
  -H "Authorization: Bearer $EVALEZY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "questions": [{
      "question_id": "q_30",
      "max_marks": 3,
      "model_answer": "Latitude, altitude, pressure and wind system, distance from the sea, ocean currents, relief.",
      "criteria": [
        { "name": "Names valid factors of climate", "marks": 1.5 },
        { "name": "Explains how each factor affects climate", "marks": 1 },
        { "name": "Uses a correct example", "marks": 0.5 }
      ]
    }]
  }'`,

  evaluateCurl: `curl ${API_BASE}/evaluations \\
  -H "Authorization: Bearer $EVALEZY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "assessment_id": "asm_7Hq2",
    "answer_sheet_url": "https://files.example.edu/ix-b/roll-14.pdf",
    "student": { "external_id": "IXB-14" },
    "webhook_url": "https://api.example.edu/hooks/evalezy"
  }'`,

  evaluateNode: `const res = await fetch("${API_BASE}/evaluations", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.EVALEZY_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    assessment_id: "asm_7Hq2",
    answer_sheet_url: "https://files.example.edu/ix-b/roll-14.pdf",
    student: { external_id: "IXB-14" },
    webhook_url: "https://api.example.edu/hooks/evalezy",
  }),
});
const { id, status } = await res.json(); // "ev_3kP9…", "queued"`,

  evaluatePython: `import os, requests

res = requests.post(
    "${API_BASE}/evaluations",
    headers={"Authorization": f"Bearer {os.environ['EVALEZY_API_KEY']}"},
    json={
        "assessment_id": "asm_7Hq2",
        "answer_sheet_url": "https://files.example.edu/ix-b/roll-14.pdf",
        "student": {"external_id": "IXB-14"},
        "webhook_url": "https://api.example.edu/hooks/evalezy",
    },
)
evaluation = res.json()  # {"id": "ev_3kP9…", "status": "queued"}`,

  accepted: `{
  "id": "ev_3kP9xW",
  "status": "queued",
  "assessment_id": "asm_7Hq2",
  "student": { "external_id": "IXB-14" }
}`,

  result: `{
  "id": "ev_3kP9xW",
  "status": "completed",
  "pages": 7,
  "total": { "awarded": 38, "max": 80 },
  "questions": [
    {
      "number": "4",
      "awarded": 0,
      "max": 1,
      "student_answer": "Temperature",
      "feedback": "Wrong answer. Correct: latitude (distance from the equator)."
    },
    {
      "number": "30",
      "awarded": 0.5,
      "max": 3,
      "student_answer": "1. Temperature 2. Humidity 3. Precipitation 4. Atmospheric Pressure 5. Wind",
      "feedback": "Only weather elements listed; no factors of climate explained.",
      "criteria": [
        { "name": "Names valid factors of climate", "awarded": 0.5, "max": 1.5 },
        { "name": "Explains how each factor affects climate", "awarded": 0, "max": 1 },
        { "name": "Uses a correct example", "awarded": 0, "max": 0.5 }
      ]
    }
  ],
  "checked_copy_url": "https://files.evalezy.com/ev_3kP9xW/checked-copy.pdf",
  "billing": { "pages": 7, "amount": 7, "currency": "INR" }
}`,

  webhook: `POST https://api.example.edu/hooks/evalezy
{
  "event": "evaluation.completed",
  "evaluation_id": "ev_3kP9xW",
  "status": "completed",
  "total": { "awarded": 38, "max": 80 }
}`,
};
