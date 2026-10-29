import Link from "next/link";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { PhoneMock } from "@/components/AppMock";
import { AppScrollDemo } from "@/components/AppScrollDemo";
import { TickList } from "@/components/Pen";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

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
  { k: "Price", ez: "₹1 per page checked; failed copies free", ac: "Not published", scan: "Free or a subscription; checking is still by hand" },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Evalezy app · Launching soon"
      h1="Check a whole class’s copies from your phone."
      lede="No scanner, no laptop. Photograph each student’s copy, send the class for AI checking, and get every copy back checked in red pen, ready to share. Same login, same tests and the same ₹1 a page as the dashboard."
      visual={<PhoneMock />}
      secondary={{ href: "/blog/evalezy-app-check-answer-sheets-on-phone/", label: "Read how it works", track: "app_guide" }}
      faqs={[
        { q: "When can I download it?", a: "The Evalezy app is launching soon, on Android first. Book a demo or message us on WhatsApp and we will tell you the day it is in the store." },
        { q: "Does it cost extra?", a: "No. The app uses your institute’s Evalezy account and credits: ₹1 per page checked in India, $0.01 elsewhere. Failed, stopped and unreadable copies are free." },
        { q: "Where do I create the test and release results?", a: "In the Evalezy dashboard. Set up the test and question paper there, and review, edit and release marks there. The app is for getting copies in and checked copies out." },
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
          operatingSystem: "Android",
          applicationCategory: "EducationalApplication",
          description: "Launching soon on Android. Scan students' handwritten answer copies with a phone camera, check the whole class with AI and download the checked copies.",
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
