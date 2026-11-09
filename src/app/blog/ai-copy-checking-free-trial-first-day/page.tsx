import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits } from "@/components/BlogShell";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EXTRA_CREDIT_INR, PLANS, TRIAL_CREDITS, TRIAL_DAYS, cheapestPlan, planPeriod, signupHref } from "@/lib/site";

const SLUG = "ai-copy-checking-free-trial-first-day";
export const metadata = postMetadata(SLUG);

const APP_STORE_URL = "https://apps.apple.com/in/app/evalezy-ai-copy-checking/id6831890999";
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function TrialCta({ label = `Start your ${TRIAL_DAYS}-day free trial` }: { label?: string }) {
  return (
    <div className="my-8 flex flex-col gap-3 rounded-2xl border border-pen-100 bg-pen-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="!mt-0 font-bold text-ink">Check your own copies free for {TRIAL_DAYS} days</p>
        <p className="!mt-1 text-sm text-slate-600">No card needed. 1 teacher, {TRIAL_CREDITS} free AI credits.</p>
      </div>
      <a href={signupHref()} className="btn btn-pen shrink-0 !text-white !no-underline" rel="nofollow" data-track="cta_trial_click">
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        `You can try Evalezy’s AI copy checking free for ${TRIAL_DAYS} days, with no card: 1 teacher and ${TRIAL_CREDITS} free AI credits, which check ${TRIAL_CREDITS} pages of real answer copies.`,
        "Sign up with Google on the web, or with your email (a one-time code) plus a username and password, on the web or in the app.",
        `Spend day one on one real test: import the question paper, check the marking scheme, pick the pen, then check about ${Math.max(1, Math.floor(TRIAL_CREDITS / 7))} real copies.`,
        "Review the AI marks, correct what needs correcting, update the checked copies and download or release them, so you judge the whole workflow, not a demo.",
        `When the trial ends, uploads stop and your reports stay for 30 days. Plans start at ${inr(cheapestPlan().price_inr)} a ${planPeriod()} with AI credits included; extra credits are ₹${EXTRA_CREDIT_INR} each.`,
      ]}
      toc={[
        { id: "what-you-get", label: "What the free trial includes" },
        { id: "sign-up", label: "How to sign up" },
        { id: "day-one", label: "Day 1: check one real test" },
        { id: "judge", label: "What to look for" },
        { id: "after", label: "After the trial" },
      ]}
      faqs={[
        {
          q: "Is the Evalezy free trial really free?",
          a: `Yes. ${TRIAL_DAYS} days, no card needed, for 1 teacher and ${TRIAL_CREDITS} free AI credits. You are not charged when the trial ends.`,
        },
        {
          q: "How many copies can I check in the trial?",
          a: `You get ${TRIAL_CREDITS} AI credits, and 1 credit checks 1 handwritten page, so about ${TRIAL_CREDITS} pages: for example about ${Math.floor(TRIAL_CREDITS / 7)} copies of 7 pages. Failed and unreadable copies do not count.`,
        },
        {
          q: "Can I sign up on my phone?",
          a: "Yes. Sign up on the web or in the Evalezy app (on the App Store for iPhone; Android is coming soon). Continue with Google is available on the web; in the app, sign up with your email.",
        },
        {
          q: "What happens to my checked copies when the trial ends?",
          a: "Uploads stop, and your reports stay available for 30 days, so you can still look at the marks and download the checked copies while you decide on a plan.",
        },
        {
          q: "Do I need to set up the test in advance?",
          a: "Only the question paper. Upload it as a PDF or photos and Evalezy reads it into questions with marks; you check them and AI checking is ready.",
        },
      ]}
    >
      <p>
        The best way to judge AI copy checking is on your own answer sheets. Evalezy’s free trial gives you{" "}
        <strong>{TRIAL_DAYS} days, 1 teacher and {TRIAL_CREDITS} free AI credits</strong>, with no card. This guide shows what to do on day
        one so that, by the end of the trial, you know whether it works for your school or coaching institute.
      </p>
      <TrialCta />

      <h2 id="what-you-get">What the free trial includes</h2>
      <Table
        head={["", "Free trial"]}
        rows={[
          ["Length", `${TRIAL_DAYS} days`],
          ["Teachers", "1"],
          ["AI credits", `${TRIAL_CREDITS} (1 credit checks 1 handwritten page)`],
          ["Card", "Not needed"],
          ["Features", "The full flow: question paper import, marking schemes, name reading and matching, the red-pen checked copy, teacher review and release"],
          ["Where", "On the web, and in the Evalezy app"],
        ]}
      />

      <h2 id="sign-up">How to sign up</h2>
      <Steps
        items={[
          { title: "Choose how to sign in", body: "Continue with Google (on the web), or enter your email and the one-time code we send you." },
          { title: "Pick a username and password", body: "If you signed up with email, you set these once and use them to log in on the web and in the app." },
          { title: "Add your details", body: "A few details about you and your institute, and your trial account is ready." },
        ]}
      />
      <p>
        On iPhone you can also <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">get the Evalezy app
        from the App Store</a> and sign up there; Android is coming soon.
      </p>

      <h2 id="day-one">Day 1: check one real test</h2>
      <p>
        Pick a test you have already given, ideally one with a mix of short and long answers, and 5–10 student copies.
      </p>
      <Steps
        items={[
          { title: "Create the test from the question paper", body: "Upload the paper as a PDF (or photos in the app) with the test name and total marks. Evalezy reads it into questions; review them and enable AI checking." },
          { title: "Check the marking scheme", body: "Evalezy drafts a scheme for every question, with criteria that add up to the marks. Edit it, use your own, or add a model answer. The same scheme is used for every copy." },
          { title: "Choose the pen", body: "In Settings pick the ink colour, darkness, size and handwriting, and press “See how it will look” for a full sample page. Add instructions for the AI checker if you follow a board pattern." },
          { title: "Upload or scan 5–10 copies", body: "Upload one PDF per student in the dashboard, or scan each copy page by page with the app camera. Evalezy reads each student’s name and roll number and matches the copy to your list." },
          { title: "Let it check", body: "A copy typically takes 1–8 minutes, and the first results in a batch arrive in about 10 minutes. You get an email when the batch is done." },
          { title: "Review, correct and update", body: "Open each copy, compare the AI’s marks with your own judgement, change any mark or remark, then press “Update checked copy” so the PDF shows your corrections." },
          { title: "Download or release", body: "Download the checked copies (in the app, as one zip through the share sheet), or release results so each student is emailed their copy." },
        ]}
      />
      <Callout title={`Make ${TRIAL_CREDITS} credits count`} tone="tip">
        <p>
          Each page of a handwritten copy uses one credit of your trial. Choose copies that show your real range, a good
          one, a weak one, an untidy one, rather than many copies from the same student group. Failed and unreadable
          copies do not count.
        </p>
      </Callout>
      <p>
        For more on the pen options, see <Link href="/blog/choose-pen-handwriting-ai-checked-copy/">how to choose the
        pen and handwriting</Link>; for the review step, see{" "}
        <Link href="/blog/correct-ai-checked-copy-before-release/">how to correct an AI-checked copy before
        release</Link>.
      </p>

      <h2 id="judge">What to look for</h2>
      <ol>
        <li><strong>Marks against yours.</strong> Check the copies yourself too, and look at where you and the AI differ, and why.</li>
        <li><strong>The checked copy.</strong> Would a student understand the ticks, crosses and remarks? See a <Link href="/sample/">real checked copy</Link> for comparison.</li>
        <li><strong>Time to review.</strong> How long did it take you to review and correct a copy, compared with checking it from scratch?</li>
        <li><strong>Student matching.</strong> Were copies matched to the right students? Copies it was unsure about wait for you to pick.</li>
        <li><strong>Your hardest questions.</strong> Long answers, maths working, and the subjects where marking is most debated.</li>
      </ol>
      <Callout title="What it does not do" tone="warn">
        <p>
          Diagrams and maps are judged by their labels and written explanation only. Grading is built and tested on
          English copies; for Hindi or regional-language papers, send us samples.
        </p>
      </Callout>

      <h2 id="after">After the trial</h2>
      <p>
        When the {TRIAL_DAYS} days end, uploads stop and your reports stay for 30 days. To keep checking, pick a plan:
        every plan includes AI credits for a {planPeriod()}, and extra credits cost ₹{EXTRA_CREDIT_INR} each. Current plans are on the{" "}
        <Link href="/pricing/">pricing page</Link>:
      </p>
      <Table
        head={["Plan", "Users", "AI credits included", `Price (per ${planPeriod()}, before GST)`]}
        rows={[
          ...PLANS.map((p) => [p.name, p.users === 1 ? "1" : `Up to ${p.users}`, p.credits.toLocaleString("en-IN"), inr(p.price_inr)]),
          ["Enterprise", `More than ${Math.max(...PLANS.map((p) => p.users))}`, "Custom", "Talk to us"],
        ]}
      />
      <p>1 credit checks 1 page; extra credits are ₹{EXTRA_CREDIT_INR} each. No setup fee. Failed and unreadable copies are free.</p>
      <TrialCta label="Start free trial" />

      <WhereEvalezyFits>
        <p>
          Evalezy checks scanned or phone-photographed answer copies and returns each student’s own copy{" "}
          <Link href="/checked-copy/">checked in a teacher-like pen</Link>, with marks per question and every mark
          waiting for <Link href="/teacher-review/">teacher review</Link>. Import the paper with{" "}
          <Link href="/question-paper-import/">question paper import</Link>, upload a class with{" "}
          <Link href="/bulk-upload/">bulk upload</Link>, or scan in the <Link href="/app/">Evalezy app</Link>.
        </p>
      </WhereEvalezyFits>
    </BlogShell>
  );
}
