import Link from "next/link";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { PhoneMock } from "@/components/AppMock";
import { AppScrollDemo } from "@/components/AppScrollDemo";
import { TickList } from "@/components/Pen";
import { JsonLd } from "@/components/JsonLd";
import { SITE, APP_STORE_URL, signupHref, TRIAL_CREDITS, TRIAL_DAYS } from "@/lib/site";

const PATH = "/app/";
export const metadata = pageMetadata(PATH);

const USE_CASES = [
  { t: "Class teacher, after a unit test", b: "Forty notebooks, one phone. Scan them in the staff room and send the batch before you leave school." },
  { t: "Coaching centre, after a weekend test", b: "The coordinator scans every batch on Sunday. Faculty review marks on Monday and release results." },
  { t: "UPSC answer-writing programme", b: "Mentors scan the day’s answer sheets; aspirants get their own copy back with notes on every answer." },
  { t: "Exam cell, sharing results", b: "Download the zip of checked copies and share it with class teachers straight from the phone." },
];

const COMPARE = [
  { k: "Made for", ez: "The teacher or exam cell checking copies", ac: "Students, teachers and admins of one institute (white-label)", scan: "Turning pages into PDFs" },
  { k: "Scan copies with the camera", ez: "Yes, page by page, Next student between copies", ac: "Not described", scan: "Yes" },
  { k: "AI checks the copies", ez: "Yes, every answer against one scheme per question", ac: "AI evaluation is in Acadine; doing it from the app is not described", scan: "No" },
  { k: "Copy matched to the student", ez: "Name and roll number read from page one", ac: "Not described", scan: "No, you rename files" },
  { k: "What comes back", ez: "The student’s own copy checked in red pen, as a zip", ac: "Notifications for grades, tests and announcements", scan: "The PDF you scanned" },
  { k: "Teacher review before students see marks", ez: "Yes, in the Evalezy dashboard", ac: "Results publish automatically (teacher guide)", scan: "Not applicable" },
  { k: "Price", ez: "1 credit per page, from your plan’s credits; failed copies free", ac: "Not published", scan: "Free or a subscription; checking is still by hand" },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Evalezy app · Now on iPhone"
      h1="Check a whole class’s copies from your phone."
      lede="No scanner, no laptop. Photograph each student’s copy, send the class for AI checking, and get every copy back checked in red pen, ready to share. Same login, same tests and the same credits as the dashboard. On the App Store for iPhone; Android coming soon."
      visual={<PhoneMock />}
      secondary={{ href: APP_STORE_URL, label: "Download on the App Store", track: "app_store" }}
      faqs={[
        { q: "Where can I download it?", a: "On the App Store for iPhone, as “Evalezy: AI Copy Checking”. Android is in testing on Google Play and coming soon. On any phone or computer you can also use the same app in the browser at evalezy.vacademy.io." },
        { q: "Can I try it free?", a: `Yes. Start a ${TRIAL_DAYS}-day free trial from the app or the website: 1 teacher, ${TRIAL_CREDITS} free AI credits (1 credit = 1 page), no card. Sign up with Google on the web, or with your email and a one-time code.` },
        { q: "Does it cost extra?", a: "No. The app uses your institute’s Evalezy plan and credits, the same as the dashboard: 1 credit per page checked. Failed, stopped and unreadable copies are free." },
        { q: "Can I create the test in the app?", a: "Yes. Tap New, give the test a name and total marks, and add the question paper as a PDF or photos. Evalezy reads it into questions; you check them and switch on AI checking. Reviewing, editing and releasing marks happen in the Evalezy dashboard." },
        { q: "Can I choose the pen the AI writes with?", a: "Yes. In the app’s Settings, pick the handwriting, ink colour, darkness and size, and whether remarks go on the copy or beside it. Every copy checked after you save uses that pen." },
        { q: "What if a copy has no name on it?", a: "It waits for you. Pick the student from the list and the copy is checked; nothing is filed under a guessed name." },
        { q: "Can our institute control who uses it?", a: "Yes. An institute admin can switch the app off, or turn camera scanning and file upload on or off separately." },
        { q: "Is there an app for students?", a: "The Evalezy app is for teachers and exam cells. Students receive their checked copy by email when you release results." },
      ]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: "Evalezy",
          operatingSystem: "iOS",
          installUrl: APP_STORE_URL,
          downloadUrl: APP_STORE_URL,
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          applicationCategory: "EducationalApplication",
          description: "AI copy checking on your phone: create the test from the question paper, scan students' handwritten answer copies with the camera, check the whole class with AI and download the checked copies. iPhone now, Android coming soon.",
          url: `${SITE}${PATH}`,
          publisher: { "@type": "Organization", name: "Evalezy", url: SITE },
        }}
      />

      <section className="wrap py-16 md:py-24">
        <p className="eyebrow">How it works</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Paper in, copies in, checked copies out.</h2>
        <div className="mt-6 lg:mt-0">
          <AppScrollDemo />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={APP_STORE_URL} className="btn btn-ink" rel="noopener" data-track="app_store">Download on the App Store</a>
          <a href={signupHref()} className="btn btn-outline" data-track="trial_app_page">Start {TRIAL_DAYS}-day free trial</a>
        </div>
        <p className="mt-3 text-sm text-slate-500">iPhone now. Android is in testing and coming soon.</p>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow">Use cases</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">Made for the moment the copies land on your desk.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {USE_CASES.map((u) => (
              <div key={u.t} className="card p-6">
                <p className="h-card text-lg text-ink">{u.t}</p>
                <p className="mt-2 leading-relaxed text-slate-600">{u.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="h-section text-ink">The same checking as the dashboard.</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            The app starts exactly the same check. What you get back does not depend on where the copies came from.
          </p>
          <TickList
            className="mt-6"
            items={[
              "Name and roll number read from page one; unsure copies wait for you",
              "One marking scheme per question, the same for every student",
              "Half marks with a written reason on every answer",
              "The student’s own copy checked in red pen, total circled",
              "An email when the batch is done",
              "The pen you chose in Settings: handwriting, ink colour and darkness",
              "Nothing reaches students until a teacher releases it",
            ]}
          />
          <p className="mt-6 text-slate-600">
            See a <Link href="/sample/" className="font-semibold text-pen-700 underline underline-offset-4">real checked copy</Link> or{" "}
            <Link href="/case-studies/" className="font-semibold text-pen-700 underline underline-offset-4">our case studies</Link>.
          </p>
        </div>
        <div>
          <h2 className="h-card text-2xl text-ink">How it compares</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[42rem] text-left">
              <thead>
                <tr className="bg-paper-2 text-sm text-ink">
                  <th className="w-[24%] px-4 py-3 font-semibold"> </th>
                  <th className="px-4 py-3 font-semibold text-pen-700">Evalezy app</th>
                  <th className="px-4 py-3 font-semibold">Acadine app</th>
                  <th className="px-4 py-3 font-semibold">A scanner app + checking by hand</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.k} className="border-t border-line align-top">
                    <th scope="row" className="px-4 py-3.5 text-sm font-semibold text-ink">{r.k}</th>
                    <td className="px-4 py-3.5 text-sm leading-relaxed text-slate-700">{r.ez}</td>
                    <td className="px-4 py-3.5 text-sm leading-relaxed text-slate-600">{r.ac}</td>
                    <td className="px-4 py-3.5 text-sm leading-relaxed text-slate-600">{r.scan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Acadine’s column is read from acadine.ai and docs.acadine.ai on 29 October 2026. Full, sourced comparison:{" "}
            <Link href="/compare/acadine/" className="underline underline-offset-2 hover:text-ink">Evalezy vs Acadine</Link>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
