import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits, Sources } from "@/components/BlogShell";
import Link from "next/link";
import { docsUrl } from "@/content/api";
import { API_BASE, DOCS_URL, SALES_EMAIL } from "@/lib/site";

const SLUG = "handwritten-answer-grading-api";

export const metadata = postMetadata(SLUG);

/* The API facts below follow the live docs at docs.evalezy.com (v1, launched 2 Oct 2026; read 2 Oct 2026), the same
   source as src/content/api.ts. Not available yet, so never claimed here: webhooks, phone photos, sending a sheet by
   URL, rubric generation on request, CSV results, Hindi. */

const SUBMIT_CODE = `// Node.js 18+, run as an ES module. Call Evalezy from your server only.
import { readFile, stat } from "node:fs/promises";

const API = "${API_BASE}";

async function call(method, path, body, idempotencyKey) {
  const res = await fetch(API + path, {
    method,
    headers: {
      "X-API-Key": process.env.EVALEZY_API_KEY,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(res.status + " " + json.error.code + ": " + json.error.message);
  return json;
}

// 1. Create the exam once and open it. Criteria must add up to max_marks.
const exam = await call("POST", "/exams", {
  title: "Social Science · Half-Yearly Mock Test 4",
  mode: "handwritten",
  external_ref: "sst-ix-mock-4",
  open: true,
  questions: [
    {
      label: "30", type: "long_answer", max_marks: 3,
      text: "Explain the factors affecting climate.",
      rubric: { criteria: [
        { name: "Names valid factors of climate", marks: 1.5 },
        { name: "Explains how each factor affects climate", marks: 1 },
        { name: "Uses a correct example", marks: 0.5 },
      ] },
    },
    // ...one entry per question on the paper
  ],
}, "exam-sst-ix-mock-4");

// 2. Ask for a presigned upload URL, then PUT the PDF to it (no API key on the PUT)
const file = "scans/IXB-14.pdf";
const { uploads: [upload] } = await call("POST", "/uploads", {
  filename: "IXB-14.pdf",
  content_type: "application/pdf",
  size_bytes: (await stat(file)).size,
});
const put = await fetch(upload.upload_url, {
  method: "PUT", headers: upload.headers, body: await readFile(file),
});
if (!put.ok) throw new Error("Upload failed: " + put.status);

// 3. Submit it, naming the student by your own id. 202 Accepted, price fixed now.
const sub = await call("POST", "/exams/" + exam.id + "/submissions", {
  candidate: { external_id: "IXB-14", name: "Aditi Sharma", roll_number: "14" },
  upload_id: upload.id,
}, "sst-ix-mock-4-IXB-14");
console.log(sub.status, sub.quote); // "queued" { unit: "page", pages: 7, credits: 7, ... }`;

const SYNC_CODE = `// 4. No webhooks yet: poll the feed of every submission that changed.
//    Run a pass every 30 to 60 seconds and save the watermark it returns.
//    On the first run, pass a time before your first submission.
async function syncOnce(watermark) {
  const since = new Date(Date.parse(watermark) - 2 * 60 * 1000).toISOString();
  const params = new URLSearchParams({ updated_since: since, limit: "200" });
  for (;;) {
    const page = await call("GET", "/submissions?" + params);
    for (const row of page.data) {
      if (Date.parse(row.updated_at) > Date.parse(watermark)) watermark = row.updated_at;
      if (row.state !== "live") continue; // replaced or deleted: mark it so on your side
      if (row.status === "graded" || row.status === "partially_graded") {
        // 5. Draft marks, criteria with reasons, feedback, confidence, needs_review
        const result = await call("GET", "/submissions/" + row.id + "/result");
        await saveResult(row, result); // your upsert, keyed by row.id
      } else if (row.status === "failed") {
        await saveFailure(row, row.error.code); // e.g. copy_unreadable; not charged
      }
    }
    if (!page.has_more) return watermark;
    params.set("cursor", page.next_cursor);
  }
}

// 6. After a teacher's review, in your app or the Vacademy dashboard, make the marks final.
//    This call needs a key with the evaluation:finalize scope. all_graded covers "graded"
//    copies only; finalize partially_graded ones by id with allow_partial: true once a
//    teacher has marked the questions the AI could not grade.
await call("POST", "/exams/" + exam.id + "/finalize", { all_graded: true });`;

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "Printed-text OCR is the wrong tool for student handwriting: even Tesseract’s own FAQ says it is designed for printed text.",
        "A production grading pipeline is ten problems, not one: cleanup, line geometry, reading, answer location, rubric grading, validation, annotation, review, failure handling and billing.",
        "Treat student writing as untrusted input: an answer can contain instructions aimed at the grader.",
        "Build if grading is your core product or you need a script Evalezy has not tested; use an API if grading is a feature and you want marks plus a checked PDF.",
        "The Evalezy API is asynchronous: create an exam, upload each answer sheet as a PDF, submit it, poll the submission feed (there are no webhooks yet), then read the draft marks and finalize them.",
      ]}
      toc={[
        { id: "why-ocr-fails", label: "Why OCR fails on handwriting" },
        { id: "pipeline", label: "What a robust pipeline needs" },
        { id: "build-vs-buy", label: "Build vs buy" },
        { id: "api-flow", label: "How the Evalezy API works" },
        { id: "shipping", label: "Shipping it in your product" },
      ]}
      faqs={[
        {
          q: "Can I grade handwritten answers with Tesseract or another OCR library?",
          a: "You can extract some text, but Tesseract’s own FAQ says it will not work very well on handwriting because it is designed for printed text. Grading also needs answer location, a rubric, validation and annotation on top of reading, so OCR is at most one stage of the pipeline.",
        },
        {
          q: "Why not send the page straight to a general chatbot?",
          a: "A single chat prompt gives you a mark, but not a fixed rubric reused for every student, mark validation, a checked PDF, a review step or clear failure on unreadable pages. We compare the two approaches on the Evalezy vs ChatGPT page.",
        },
        {
          q: "Is the Evalezy API synchronous?",
          a: "No. POST /exams/{id}/submissions answers 202 Accepted straight away, with a submission id, a queue position, an estimated ready time and a fixed-price quote. A handwritten copy typically takes a few minutes, and longer copies take longer. There are no webhooks yet: poll GET /submissions/{id} for one copy, or the feed GET /submissions?updated_since= for everything that changed since your last check.",
        },
        {
          q: "What does a graded submission return?",
          a: "GET /submissions/{id}/result returns the totals and, for each question, the marks awarded out of the maximum, the marks and a reason for each rubric criterion, feedback, the text Evalezy read from the copy, a confidence from 0 to 1 and a needs_review flag. GET /submissions/{id}/checked-copy downloads the student’s PDF with the marks and notes on it. All marks are drafts until you call finalize.",
        },
        {
          q: "How is the API billed?",
          a: "In credits, at a fixed price quoted before grading starts: 1 credit per page of a handwritten PDF, blank pages included, and 1 credit per non-blank typed long answer. Objective answers are free. Failed and cancelled copies are not charged; re-evaluating a copy is charged again. Credits are bought in the Vacademy dashboard. At the standard rate a page costs ₹1 in India (excluding GST) or $0.01 elsewhere, the same as the dashboard.",
        },
        {
          q: "Is there a sandbox or test mode?",
          a: "No. Every key is live and every graded copy is charged. Test with a small exam and one or two short copies. Typed submissions with only objective answers are free, so you can try exam setup and the submission flow without spending credits.",
        },
        {
          q: "Can I send phone photos, or a link to the answer sheet?",
          a: "Not yet. The API takes one PDF per answer sheet, up to 50 MB, uploaded through a presigned URL from POST /uploads. Combine phone photos into one PDF first. Copies of up to 40 pages are graded normally, copies of 41 to 80 pages are graded and flagged for review, and longer ones are refused before any charge.",
        },
        {
          q: "Does it read Hindi or other Indian-language handwriting?",
          a: "Not yet. The API grades English answers only for now: a handwritten copy written in Hindi or another regional language fails with language_not_supported and is not charged. Hindi and regional languages are on the API roadmap; if you need them, tell us at hello@evalezy.com, since partner demand sets the order.",
        },
      ]}
    >
      <p>
        Your learners write on paper. Your product lives online. Somewhere between the two, a handwritten answer sheet has to
        become marks, feedback and something a learner actually wants to open. If you are a product manager or engineer adding
        that step to an edtech app, this post covers why plain OCR does not get you there, what a pipeline needs before you
        can trust it in production, how to think about building it yourself, and how the Evalezy API handles it.
      </p>

      <h2 id="why-ocr-fails">Why printed-text OCR fails on student handwriting</h2>
      <p>
        Most OCR engines were built for print. Tesseract, the open-source OCR engine, says so in its own FAQ: you can
        use it for handwriting, but “it won’t work very well, as Tesseract is designed for printed text.” Handwriting is a
        harder problem because, as Wikipedia’s overview of the field puts it, “different people have different handwriting
        styles.”
      </p>
      <p>
        Cloud document services do read handwriting, but check the language list before you plan around one. Microsoft’s
        Document Intelligence Read model lists Hindi, Marathi, Tamil and many other languages for printed text. Its v4.0 list
        for handwritten text has twelve languages, and none of them is an Indian language.
      </p>
      <p>
        Student answer sheets then add problems of their own on top of the handwriting itself. These are the ones Evalezy’s
        pipeline is built to handle:
      </p>
      <ul>
        <li>
          <strong>Phone photos, not scans.</strong> The <Link href="/sample/">sample copy</Link> on this site is a phone photo
          of a spiral notebook. Pages arrive tilted, shadowed and low in contrast. (Through the API, combine the photos into
          one PDF per answer sheet first.)
        </li>
        <li>
          <strong>Answers out of order.</strong> Students answer Question 7 before Question 3, or number answers wrongly. A
          pipeline that trusts the written number marks the wrong answer.
        </li>
        <li>
          <strong>Maths.</strong> Fractions, powers and working spread over several lines need a careful second look.
        </li>
        <li>
          <strong>Long copies.</strong> A 20-page script has to be split into answers before anything can be graded.
        </li>
      </ul>
      <p>
        And when reading fails, grading fails quietly. A grader handed garbled text has nothing true to grade. The pipeline
        must be able to say “this copy could not be read” instead of returning a mark.
      </p>

      <h2 id="pipeline">What a robust pipeline needs</h2>
      <p>
        “Read the page, ask a model for a mark” is a demo. A version you can put in front of thousands of learners needs every
        stage below, and each one is a small project of its own.
      </p>
      <Table
        caption="Stages of a handwritten answer grading pipeline"
        head={["Stage", "What it does", "What breaks without it"]}
        rows={[
          ["Page cleanup", "Deskews, denoises and boosts contrast on scans and phone photos", "Faint or tilted lines are misread or missed"],
          ["Line geometry", "Records where each line of writing sits on the page", "Ticks and notes land in the wrong place"],
          ["Vision reading", "Reads whole pages in context, with a second read for hard lines such as maths", "Word fragments with no structure reach the grader"],
          ["Answer location", "Finds which pages hold which answer, by content", "Out-of-order answers score zero"],
          ["Rubric grading", "One set of criteria per question, reused for every student", "Each copy is marked to a slightly different standard"],
          ["Mark validation", "Keeps marks within the maximum, on the allowed step, with criteria adding up", "Impossible totals reach learners"],
          ["Annotation", "Draws ticks, crosses and notes on the student’s own pages", "Learners get a table of numbers, not their copy"],
          ["Human review", "Holds marks as a draft until a teacher releases them", "An AI mistake goes straight to a learner"],
          ["Failure and retries", "Fails unreadable copies with a reason; re-asks and flags low-confidence reads", "Guessed marks, or jobs stuck forever"],
          ["Idempotent billing", "Charges each sheet once, and only when it succeeds", "Retries double-charge; failures cost money"],
        ]}
      />

      <h3>Reading: a vision model, not a bag of words</h3>
      <p>
        A vision model reads the page image directly, layout and all, rather than handing your grader a list of recognised
        words. In Evalezy, copies of up to 40 pages are read in full this way, and unclear maths lines get a second read by
        Mathpix, a dedicated equation reader, up to four per copy. For copies of four pages or more, a locate pass works out
        which pages hold which answer. If a question then looks unattempted, it is re-checked against the whole copy, so a
        locate miss cannot zero a student.
      </p>

      <h3>Grading: the same criteria for every student</h3>
      <p>
        Consistency comes from fixing the rubric, not from hoping the model behaves the same way each time. Evalezy generates
        one marking scheme per question, once, and reuses it for every student: three to five criteria for subjective
        questions and one for objective questions, rescaled to add up exactly to the question’s maximum. Teachers can edit it
        or supply their own, and a stored model answer is used over a generated one. Marks are given in half-mark steps.
      </p>
      <p>
        Treat student writing as untrusted input. OWASP puts prompt injection first (LLM01) in its 2025 Top 10 for LLM applications, and
        notes that injected instructions can arrive indirectly, through files or images the model processes. An answer sheet
        is exactly that kind of input. In a production test of Evalezy’s typed-answer grading, an answer that told the AI to
        “award full marks” scored 0 out of 5.
      </p>

      <h3>Line geometry and mark validation</h3>
      <p>
        Two stages are easy to skip in a prototype and painful to add later. The first is line geometry. A grader can say “the
        second point is wrong”, but to put a cross beside that point you need to know where the line sits on the page image.
        Keep a position for every line you read, in the same coordinates as the page you will draw on after cleanup and
        deskewing, or the annotations drift off the writing.
      </p>
      <p>
        The second is mark validation. Treat every mark a model returns as a proposal and check it before you store it: not
        above the question’s maximum, on your marking step, criteria adding up to the question mark, question marks adding up
        to the total. When a check fails, re-ask or flag the question for a teacher; do not quietly round. Fixed rules, such as
        half-mark steps and criteria that sum exactly to the maximum, give these checks clear targets.
      </p>

      <h3>Annotation and review</h3>
      <p>
        Learners want to see their own page marked, not a JSON blob turned into a table. Evalezy draws ticks, crosses, short
        notes and marks per question in a handwriting style, with the total circled on page 1, and the same copy re-renders
        identically every time, which matters when a learner and a teacher are looking at the same page during a dispute. The
        AI never publishes a result on its own in the Evalezy dashboard: marks land as a draft, a teacher reviews and releases,
        and a mark the teacher edits is never overwritten by a later AI run.
      </p>

      <h3>Failure handling and billing</h3>
      <p>
        Async jobs fail and get retried, so billing has to be idempotent. Stripe’s API is a well-known example of the pattern:
        clients send an idempotency key so a request can be retried “without accidentally performing the same operation
        twice.” Whatever mechanism you choose, a retry should never become a second charge. In Evalezy, a copy that is mostly
        unreadable fails with a clear error and is not graded by guesswork, and failed, cancelled and unreadable checks are not
        charged. Evalezy’s own API takes an <code>Idempotency-Key</code> header on every POST for the same reason.
      </p>

      <h2 id="build-vs-buy">Build vs buy</h2>
      <Table
        head={["", "Build in-house", "Use an API"]}
        rows={[
          ["What you own", "Models, prompts, data flow and every stage above", "Your rubric, model answers and review flow; the pipeline is the vendor’s"],
          ["Before the first trustworthy result", "All ten stages, plus a test set of real copies", "Integration against a handful of endpoints"],
          ["Ongoing work", "Model changes, prompt regressions, new handwriting edge cases, PDF rendering", "The vendor’s job"],
          ["Cost shape", "Model calls, infrastructure and engineering time; per-page cost varies", "A fixed price per page, quoted before grading (Evalezy: ₹1 or $0.01); failed copies are free"],
          ["Languages and scripts", "Whatever you build and test", "Evalezy: English answers only for now; Hindi and regional languages are on the roadmap"],
        ]}
      />
      <p>
        <strong>Build</strong> if grading is your core product, if you need a language or script now that no vendor has
        tested, or if answer sheets must never leave your own infrastructure. <strong>Use an API</strong> if grading is one
        feature of a larger product, if you want a checked PDF and a review step without building them, and if a per-page cost
        is easier to plan for than a team. If you are weighing a general chatbot instead, our{" "}
        <Link href="/compare/chatgpt/">comparison with ChatGPT</Link> covers that approach.
      </p>

      <p>
        Either way, decide on evidence. Collect a test set of real answer sheets from your own learners, say fifty copies
        across neat and messy handwriting, phone photos and scans, and have experienced teachers mark them first. Run them
        through your prototype or a vendor and compare question by question: where marks differ, whether the reasons make
        sense, and which copies failed. Keep that set. It becomes your regression test for every model or prompt change
        afterwards.
      </p>

      <h2 id="api-flow">How the Evalezy API works</h2>
      <p>
        The Evaluation API went live on 2 October 2026 at <code>{API_BASE}</code>, with full documentation at{" "}
        <a href={DOCS_URL} data-track="open_docs">docs.evalezy.com</a>. It is JSON over HTTPS, and every request carries
        your key in an <code>X-API-Key</code> header. It grades handwritten copies and typed long answers.
      </p>
      <Callout tone="info" title="Getting a key, and why there is no test mode">
        <p>
          Evalezy switches the API on per institute: write to <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a> or
          request access on the <Link href="/api/">API page</Link>. An institute admin then creates keys in the Vacademy
          dashboard, under Settings → Integrations → API keys. Keys look like <code>vak_eval_…</code> and belong on your
          server only, never in a web page or a mobile app.
        </p>
        <p>
          There is no sandbox. Every key is live and every graded copy is charged, so test with a small exam of one or two
          short copies. See <a href={docsUrl("/authentication")} data-track="open_docs">Authentication</a> in the docs.
        </p>
      </Callout>
      <Steps
        items={[
          {
            title: "Create the exam",
            body: "POST /exams with the questions, max marks, answer keys for objective questions and a rubric or model answer for each long answer, with mode set to handwritten (or typed, for typed answers). Send open: true to accept submissions straight away. Rubric criteria must add up exactly to the question’s marks, or the request is refused. A long answer with neither a rubric nor a model answer gets a rubric generated on the first copy, reused for every candidate.",
          },
          {
            title: "Upload each answer sheet",
            body: "POST /uploads returns a short-lived presigned URL for each PDF, up to 100 files per call. PUT the file to that URL, without your API key. Read GET /uploads/{id} if you want to see the page count before you submit. One PDF per answer sheet, up to 50 MB.",
          },
          {
            title: "Submit the copy",
            body: "POST /exams/{id}/submissions with the candidate, named by your own external_id, and the upload_id. You get 202 Accepted with the submission id, status queued, a queue position, an estimated ready time and a fixed-price quote. Typed exams send answers[] instead of an upload.",
          },
          {
            title: "Follow grading",
            body: "Each submission moves through queued, processing, reading and grading, and ends as graded, partially_graded, failed or cancelled. There are no webhooks yet: poll GET /submissions/{id} for one copy, or the feed GET /submissions?updated_since= for every change across your exams.",
          },
          {
            title: "Read the result",
            body: "GET /submissions/{id}/result gives the totals and, per question, awarded and max marks, criteria with reasons, feedback, the extracted answer, a confidence score and needs_review. GET /submissions/{id}/checked-copy downloads the red-pen PDF.",
          },
          {
            title: "Review, then finalize",
            body: "A teacher overrides a question’s marks (free) or approves the copy, either in your product through the review endpoints or in the Vacademy dashboard, where exams created through the API appear tagged Source: API. POST /exams/{id}/finalize then turns the draft marks into final marks.",
          },
        ]}
      />
      <p>
        Here is the core of an integration in Node.js 18 or later. The first part creates the exam, uploads one student’s
        PDF and submits it:
      </p>
      <pre className="code mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-slate-200">
        <code>{SUBMIT_CODE}</code>
      </pre>
      <p>
        The second part is a worker you run every 30 to 60 seconds. It reads the feed of every submission that changed,
        across all your exams, and fetches the result of each copy that has finished. Each pass starts two minutes before
        the last <code>updated_at</code> it processed, so a change saved a moment late is not missed:
      </p>
      <pre className="code mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-slate-200">
        <code>{SYNC_CODE}</code>
      </pre>
      <p>
        New keys get the read and write scopes. Finalizing needs the <code>evaluation:finalize</code> scope, and overriding
        or approving marks needs <code>evaluation:review</code>, so a system that only sends copies never gets to publish
        marks. The example values come from the real <Link href="/sample/">sample copy</Link>, a 7-page Class IX Social
        Science answer sheet that scored 38 out of 80; at 1 credit a page, it costs 7 credits.
      </p>
      <p>
        The docs have the same flow in curl, Python and Node: the{" "}
        <a href={docsUrl("/quickstart")} data-track="open_docs">quickstart</a>, the{" "}
        <a href={docsUrl("/guides/handwritten-exams")} data-track="open_docs">handwritten exams guide</a> and a complete
        sync worker with retries in <a href={docsUrl("/guides/syncing-results")} data-track="open_docs">Syncing results</a>.
      </p>

      <h2 id="shipping">Shipping it in your product</h2>
      <ul>
        <li>
          <strong>Keep the key on your server.</strong> The API is server-to-server only. Anyone with the key can spend
          your credits, so your app talks to your backend and your backend talks to Evalezy. Use one key per system and
          environment, with only the scopes it needs.
        </li>
        <li>
          <strong>Show the checked copy, not only the JSON.</strong> The <Link href="/checked-copy/">checked copy</Link> is
          what learners open and share. Your server can fetch it from{" "}
          <code>{"GET /submissions/{id}/checked-copy"}</code> whenever a learner asks, so you need not store it. Put it
          first; use the per-question data for progress tracking and reports.
        </li>
        <li>
          <strong>Put a reviewer before the learner.</strong> The API returns draft marks with reasons, and{" "}
          <code>needs_review</code> flags what the AI was unsure about, for example a confidence below 0.60. Nothing is
          final until you call finalize. Teachers can review in your own screens, or in the Vacademy dashboard, where API
          exams appear tagged Source: API and their changes show up in your results. We recommend that a teacher looks
          first, as in Evalezy’s own <Link href="/teacher-review/">teacher review</Link>.
        </li>
        <li>
          <strong>Map results to your users.</strong> Send your own student id as <code>candidate.external_id</code> on
          every submission, and your own answer-sheet id in <code>metadata</code> if you need it, so every row in the feed
          maps straight back to the right learner.
        </li>
        <li>
          <strong>Make retries safe.</strong> Send an <code>Idempotency-Key</code> on every POST: a retry with the same key
          returns the stored response instead of creating or charging a second submission. A candidate has one live
          submission per exam, so a duplicate is refused with <code>409 submission_exists</code>; send{" "}
          <code>replace: true</code> when you do mean to send a new copy.
        </li>
        <li>
          <strong>Design for minutes, not seconds.</strong> A handwritten copy typically takes a few minutes, and longer
          copies take longer. Each submission carries an estimated ready time. Show progress, let the learner leave and
          notify them when the result is ready.
        </li>
        <li>
          <strong>Handle failure honestly.</strong> When a copy fails as <code>copy_unreadable</code>, ask the learner for a
          clearer scan and send it with <code>replace: true</code>, rather than showing a zero. Failed copies are not
          charged.
        </li>
        <li>
          <strong>Know the limits.</strong> One PDF per answer sheet, up to 50 MB; phone photos must be combined into a
          PDF first. English answers only for now. Diagrams, maps and graphs are judged by their labels and written
          explanation, not as drawings.
        </li>
        <li>
          <strong>Budget per page.</strong> A 5-page copy is 5 credits, blank pages included, which is ₹5 or $0.05 at the
          standard rate. <code>POST /credits/quote</code> prices a whole exam before you submit it. Re-evaluating a copy is
          charged again, so re-evaluate deliberately.
        </li>
      </ul>
      <p>
        Before your first real exam, run through the docs’{" "}
        <a href={docsUrl("/guides/going-live")} data-track="open_docs">going-live checklist</a> (keys, quotas and rate
        limits), and check the <a href={docsUrl("/platform/roadmap")} data-track="open_docs">roadmap</a> for what is not
        available yet.
      </p>

      <WhereEvalezyFits>
        <p>
          Evalezy handles the reading, grading, annotation and review stages for you, in a dashboard or through the API.
          Upload a handwritten answer sheet as a PDF, or send typed answers, and get back per-question marks, criteria with
          reasons, feedback, the student’s answer as read and a red-pen <Link href="/checked-copy/">checked PDF</Link>, as
          drafts until you finalize them.
        </p>
        <p>
          <strong>Same price as the dashboard.</strong> 1 credit per page, quoted before grading: ₹1 in India (excluding
          GST) or $0.01 elsewhere. Typed long answers are 1 credit each and objective answers are free. Failed and
          cancelled copies are not charged. See <Link href="/pricing/">pricing</Link>.
        </p>
        <p>
          <strong>Your rubric, checked when you send it.</strong> Send your own criteria or a model answer for each
          question; criteria that do not add up to the question’s marks are refused, not quietly rescaled. Leave both out
          and a rubric is generated on the first copy and reused for every candidate, and you can read it back and replace
          it. See the <Link href="/api/">API page</Link>, the <a href={DOCS_URL} data-track="open_docs">API docs</a> and the{" "}
          <Link href="/for/edtech-platforms/">edtech platforms page</Link>.
        </p>
      </WhereEvalezyFits>

      <Sources
        items={[
          {
            label: "Tesseract documentation, FAQ: “Can I use Tesseract for handwriting recognition?”",
            url: "https://tesseract-ocr.github.io/tessdoc/FAQ.html",
            checked: "2026-10-01",
          },
          {
            label: "Wikipedia, Handwriting recognition (offline recognition and handwriting styles)",
            url: "https://en.wikipedia.org/wiki/Handwriting_recognition",
            checked: "2026-10-01",
          },
          {
            label: "Microsoft Learn, Language and locale support for Read and Layout document analysis (Document Intelligence v4.0)",
            url: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/language-support/ocr",
            checked: "2026-10-01",
          },
          {
            label: "OWASP Gen AI Security Project, LLM01:2025 Prompt Injection",
            url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
            checked: "2026-10-01",
          },
          {
            label: "Stripe API reference, Idempotent requests",
            url: "https://docs.stripe.com/api/idempotent_requests",
            checked: "2026-10-01",
          },
          {
            label: "Evalezy API documentation (introduction, authentication, submissions, results, pricing and roadmap)",
            url: DOCS_URL,
            checked: "2026-10-02",
          },
        ]}
      />
    </BlogShell>
  );
}
