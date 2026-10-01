import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { BulkCheckPanel, UploadDialog } from "@/components/Visuals";
import { TickList } from "@/components/Pen";

const PATH = "/bulk-upload/";
export const metadata = pageMetadata(PATH);

const MATCH = [
  { k: "Unique roll number on the sheet", v: "Matched", tone: "ok" },
  { k: "Name matches one student clearly", v: "Matched", tone: "ok" },
  { k: "Roll number shared by two students", v: "You pick", tone: "warn" },
  { k: "Two students with very similar names", v: "You pick", tone: "warn" },
  { k: "No name found, or a weak match", v: "You pick", tone: "warn" },
  { k: "A second copy for a student already matched", v: "You pick", tone: "warn" },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Bulk upload & student matching"
      h1="Upload the whole pile. Every copy finds its student."
      lede="Scan a section's copies, one PDF per student, and drop up to 200 of them in at once. Evalezy reads the name and roll number written on each copy, matches it to your students, and checks them one after another in the background."
      visual={<UploadDialog />}
      faqs={[
        { q: "What does the student need to write?", a: "Their name, and ideally roll number and class or section, at the top of the first page, the way they already do. Evalezy reads the top of page one first, then the whole first page, then the top of page two if needed." },
        { q: "What if a student wrote their name in Hindi?", a: "Names written in other scripts are read and transliterated so they can be matched against the names in your student list." },
        { q: "Does reading names cost anything?", a: "No. Reading and matching names is free. You pay only for the pages that are checked." },
        { q: "What happens to copies that don't match?", a: "They wait in the Bulk checks panel with the reason (no name found, two close matches, a duplicate). Pick the student from a scored list of suggestions, or skip the copy. Nothing is checked under a guessed name." },
        { q: "Can students upload their own copies instead?", a: "Yes. In an online test set to manual evaluation, students upload a PDF of their answer sheet. Check all submitted copies with one click, select a few and check those, or switch on auto-check so each copy is checked as soon as it is submitted. Already-checked copies are skipped unless you choose to re-check." },
        { q: "How will I know when it's done?", a: "The batch settles as completed or needing review, and you get a bell alert and, if you ticked the box, an email with the counts." },
      ]}
    >
      <section className="wrap py-16 md:py-24">
        <FeatureRow
          eyebrow="Live batch view"
          title="See every copy, who it went to, and where its check is."
          body={
            <>
              <p>The bulk panel lists each file with what was read from the sheet, the student it was matched to and its status: reading, checking question by question, checked, or waiting for you.</p>
              <TickList items={["Counts for checked, in progress, need review and failed", "Pick student, Skip or Retry on any copy", "Failed and unreadable copies are not charged"]} />
            </>
          }
          visual={<BulkCheckPanel />}
        />
      </section>
      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-24">
          <h2 className="h-section max-w-3xl text-ink">Evalezy never guesses a student.</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">A copy filed under the wrong name is worse than a copy not checked. So matching is strict, and anything uncertain comes to you.</p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left">
              <thead className="bg-paper-2 text-sm text-ink">
                <tr><th className="px-5 py-3 font-semibold">What was read from the copy</th><th className="px-5 py-3 font-semibold">Result</th></tr>
              </thead>
              <tbody>
                {MATCH.map((m) => (
                  <tr key={m.k} className="border-t border-line">
                    <td className="px-5 py-3.5 text-slate-700">{m.k}</td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-sm font-semibold ${m.tone === "ok" ? "bg-ok-50 text-ok" : "bg-warn-50 text-warn"}`}>{m.v}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="wrap grid gap-6 py-16 md:grid-cols-3 md:py-24">
        {[
          { t: "Scanning tips", b: "One PDF per student, pages in order. Phone scanner apps work well. Keep the whole page in frame and avoid deep shadows across the writing." },
          { t: "Limits", b: "Up to 200 files per upload and 60 MB per file. Copies up to 40 pages are read in full." },
          { t: "Timing", b: "Usually 1–8 minutes a copy, several at once. First results in about 10 minutes; 100 copies in roughly 2–3 hours." },
        ].map((x) => (
          <div key={x.t} className="card p-6">
            <p className="h-card text-lg text-ink">{x.t}</p>
            <p className="mt-2 leading-relaxed text-slate-600">{x.b}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
