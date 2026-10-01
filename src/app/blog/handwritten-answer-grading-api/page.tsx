import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "handwritten-answer-grading-api";

export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "Printed-text OCR is the wrong tool for student handwriting: even Tesseract’s own FAQ says it is designed for printed text.",
        "A production grading pipeline is ten problems, not one: cleanup, line geometry, reading, answer location, rubric grading, validation, annotation, review, failure handling and billing.",
        "Treat student writing as untrusted input: an answer can contain instructions aimed at the grader.",
        "Build if grading is your core product or you need a script Evalezy has not tested; use an API if grading is a feature and you want marks plus a checked PDF.",
        "The Evalezy API flow is asynchronous: create an assessment, set criteria, start an evaluation by URL or file, then poll or take a webhook.",
      ]}
      toc={[
        { id: "why-ocr-fails", label: "Why OCR fails on handwriting" },
        { id: "pipeline", label: "What a robust pipeline needs" },
        { id: "build-vs-buy", label: "Build vs buy" },
        { id: "api-flow", label: "How the Evalezy API flow works" },
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
          a: "No. Checking a copy typically takes 1 to 8 minutes, so evaluations are asynchronous: you get an id straight away, then poll the status endpoint or receive a webhook when the check completes or fails.",
        },
        {
          q: "What does a completed evaluation return?",
          a: "The total, and for each question the marks awarded and maximum, the student’s answer as read, feedback and the criteria breakdown, plus a URL to the checked copy PDF and the pages billed.",
        },
        {
          q: "How is the API billed?",
          a: "Per page checked: ₹1 in India (excluding GST) or $0.01 elsewhere, the same as the dashboard. Failed, cancelled and unreadable sheets are not billed. A re-check is a new run and is billed again.",
        },
        {
          q: "Does it read Hindi or other Indian-language handwriting?",
          a: "Evalezy is built and tested on English answer sheets. If your learners write in another language, send us sample copies before you plan a launch around it.",
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
          of a spiral notebook. Pages arrive tilted, shadowed and low in contrast.
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
        charged.
      </p>

      <h2 id="build-vs-buy">Build vs buy</h2>
      <Table
        head={["", "Build in-house", "Use an API"]}
        rows={[
          ["What you own", "Models, prompts, data flow and every stage above", "Your rubric, model answers and review flow; the pipeline is the vendor’s"],
          ["Before the first trustworthy result", "All ten stages, plus a test set of real copies", "Integration against a handful of endpoints"],
          ["Ongoing work", "Model changes, prompt regressions, new handwriting edge cases, PDF rendering", "The vendor’s job"],
          ["Cost shape", "Model calls, infrastructure and engineering time; per-page cost varies", "A fixed rate per page (Evalezy: ₹1 or $0.01); failures not billed"],
          ["Languages and scripts", "Whatever you build and test", "Evalezy: tested on English; other languages need samples first"],
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

      <h2 id="api-flow">How the Evalezy API flow works</h2>
      <Callout tone="info" title="API access is enabled per account">
        <p>
          Request access on the <Link href="/api/">API page</Link> with your use case and expected monthly volume. The full
          endpoint list, statuses and webhook format are there too.
        </p>
      </Callout>
      <Steps
        items={[
          {
            title: "Create an assessment",
            body: "POST /assessments with a list of questions and marks, or a question paper URL to be read into questions. You get back an assessment id.",
          },
          {
            title: "Set evaluation criteria",
            body: "PUT /assessments/{id}/criteria with criteria and an optional model answer per question; criteria marks are rescaled to sum to the question’s marks. Or POST /assessments/{id}/criteria/generate for a draft to review and edit.",
          },
          {
            title: "Start an evaluation",
            body: "POST /evaluations with a public answer_sheet_url, or a file id from POST /files, plus your own student id and an optional webhook_url. It returns an evaluation id with status queued.",
          },
          {
            title: "Poll or wait for the webhook",
            body: "GET /evaluations/{id} moves through queued, reading and grading to completed, failed or cancelled. With a webhook_url, Evalezy posts to you when the evaluation completes or fails.",
          },
          {
            title: "Use the result",
            body: "The total, per-question marks, the student’s answer as read, feedback, the criteria breakdown, the checked_copy_url for the red-pen PDF and the pages billed.",
          },
        ]}
      />
      <p>Here is the core of an integration in Node.js 18 or later, polling instead of using a webhook:</p>
      <pre className="code overflow-x-auto rounded-2xl bg-ink p-4 text-slate-200">
        <code>{`const API = "https://api.evalezy.com/v1";
const headers = {
  Authorization: "Bearer " + process.env.EVALEZY_API_KEY,
  "Content-Type": "application/json",
};

// 1. Start checking one answer sheet
const res = await fetch(API + "/evaluations", {
  method: "POST",
  headers,
  body: JSON.stringify({
    assessment_id: "asm_7Hq2",
    answer_sheet_url: "https://files.example.edu/ix-b/roll-14.pdf",
    student: { external_id: "IXB-14" },
  }),
});
const { id } = await res.json(); // status: "queued"

// 2. Poll every 30 s until it finishes (or pass webhook_url instead)
let ev;
do {
  await new Promise((r) => setTimeout(r, 30000));
  ev = await (await fetch(API + "/evaluations/" + id, { headers })).json();
} while (["queued", "reading", "grading"].includes(ev.status));

// 3. Use the result
if (ev.status === "completed") {
  console.log(ev.total);            // { awarded: 38, max: 80 }
  console.log(ev.checked_copy_url); // red-pen PDF to show the learner
} else {
  console.log(ev.status, ev);       // failed includes a reason; not billed
}`}</code>
      </pre>
      <p>
        The example values come from the real <Link href="/sample/">sample copy</Link>, a 7-page Class IX Social Science
        answer sheet that scored 38 out of 80.
      </p>

      <h2 id="shipping">Shipping it in your product</h2>
      <ul>
        <li>
          <strong>Show the checked copy, not only the JSON.</strong> The <Link href="/checked-copy/">checked copy</Link> is
          what learners open and share. Put it first; use the per-question data for progress tracking and reports.
        </li>
        <li>
          <strong>Put a reviewer before the learner.</strong> The API returns the AI’s marks with reasons. Whether a teacher
          sees them first is up to your product, and we recommend that one does, as in Evalezy’s own{" "}
          <Link href="/teacher-review/">teacher review</Link>.
        </li>
        <li>
          <strong>Map results to your users.</strong> Send your own student id as <code>student.external_id</code> on every
          evaluation, so a webhook or poll result maps straight back to the right learner.
        </li>
        <li>
          <strong>Make your own side idempotent.</strong> Store the evaluation id against the learner’s submission as soon as
          you get it. If your worker crashes and retries, look up the stored id instead of starting a second evaluation of the
          same sheet, which would be a separate run.
        </li>
        <li>
          <strong>Design for minutes, not seconds.</strong> A copy typically takes 1 to 8 minutes. Show progress, let the
          learner leave and notify them when the result is ready.
        </li>
        <li>
          <strong>Handle failure honestly.</strong> When a sheet fails as unreadable, ask the learner for a clearer scan
          rather than showing a zero. Failed checks are not billed.
        </li>
        <li>
          <strong>Know the limits.</strong> Diagrams, maps and graphs are judged by their labels and written explanation, not
          as drawings. Grading is tested on English answer sheets.
        </li>
        <li>
          <strong>Budget per page.</strong> A 5-page sheet costs ₹5 or $0.05. A re-check is a new run and is billed again,
          so re-check deliberately.
        </li>
      </ul>

      <WhereEvalezyFits>
        <p>
          Evalezy handles the reading, grading, annotation and review stages for you, in a dashboard or through the API. Send a
          handwritten answer sheet by URL or file and get back per-question marks, feedback, the student’s answer as read, a criteria breakdown and a red-pen{" "}
          <Link href="/checked-copy/">checked PDF</Link>.
        </p>
        <p>
          <strong>Same engine, same price.</strong> ₹1 per page in India (excluding GST) or $0.01 elsewhere, the same rate as
          the dashboard. Failed, cancelled and unreadable sheets are not billed. See <Link href="/pricing/">pricing</Link>.
        </p>
        <p>
          <strong>Your rubric, or a draft to edit.</strong> Send your own criteria and model answers, or ask for generated
          criteria and review them before you evaluate. See <Link href="/how-it-works/">how it works</Link> and the{" "}
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
        ]}
      />
    </BlogShell>
  );
}
