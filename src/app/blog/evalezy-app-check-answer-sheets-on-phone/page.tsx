import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "evalezy-app-check-answer-sheets-on-phone";
export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "The Evalezy app is launching soon. It puts Evalezy’s copy checking on a phone: no scanner, no laptop.",
        "Four steps: pick the test, scan each student’s copy with the camera (or pick PDFs), check them all, and download the checked copies as one zip.",
        "Each copy’s photos become one PDF; Evalezy reads the student’s name, matches the copy and checks it, the same as in the dashboard.",
        "Same login, same tests and the same price: ₹1 per page checked. Failed and unreadable copies are free.",
        "Set the test up and review and release marks in the Evalezy dashboard; the app is for getting copies in and checked copies out.",
      ]}
      toc={[
        { id: "what", label: "What the app does" },
        { id: "how", label: "How it works" },
        { id: "use-cases", label: "Use cases" },
        { id: "vs", label: "App or dashboard?" },
        { id: "tips", label: "Tips for good scans" },
      ]}
      faqs={[
        {
          q: "When is the Evalezy app available?",
          a: "It is launching soon, on Android first. Book a demo or message us on WhatsApp and we will tell you as soon as it is in the store.",
        },
        {
          q: "Does the app cost extra?",
          a: "No. It uses the same account and credits as the dashboard: ₹1 per page checked in India, $0.01 elsewhere. Failed, stopped and unreadable copies are free.",
        },
        {
          q: "Can I create a test or release results from the app?",
          a: "Not yet. Create the test and upload the question paper in the dashboard first, and review and release marks there. The app is for adding copies, running the check and downloading the checked copies.",
        },
        {
          q: "Can my institute turn the app off?",
          a: "Yes. An institute admin can switch the app off, or switch camera scanning and file upload on or off separately, in Settings.",
        },
        {
          q: "Is this an app for students?",
          a: "No. The Evalezy app is for the teacher or exam cell checking copies. Students receive their checked copy by email when results are released.",
        },
      ]}
    >
      <p>
        The pile of copies after a test usually sits in a staff room, not next to a scanner. The Evalezy app is built
        for that moment: a teacher takes photos of each student’s copy on their phone, sends the whole class for AI
        checking, and gets every copy back checked in red pen.
      </p>
      <Callout title="Launching soon" tone="tip">
        <p>
          The Evalezy app is in its final stage before release, on Android first. Everything below describes how it
          works today in our builds. <Link href="/demo/">Book a demo</Link> to try it on your own copies.
        </p>
      </Callout>

      <h2 id="what">What the app does</h2>
      <p>
        The app is Evalezy’s copy-checking flow in your pocket. It uses the same login, the same tests and the same
        credits as the dashboard, and starts exactly the same check: Evalezy reads each student’s name and roll number,
        matches the copy to the class list, marks every answer against one scheme per question and writes the result
        back onto the copy in red pen.
      </p>

      <h2 id="how">How it works</h2>
      <Steps
        items={[
          { title: "Pick the test", body: "Your tests appear in a list. Choose the one whose copies you have in front of you." },
          { title: "Add the copies", body: "Scan with the camera page by page, tapping Next student between copies. Or pick files: each PDF is one copy, and photos picked together make one copy." },
          { title: "Check them all", body: "Each copy’s photos become one PDF and the whole batch goes for AI checking. You see progress live, and pick the student yourself for any copy that could not be matched." },
          { title: "Download the checked copies", body: "All checked copies download as one zip. On a phone it opens the share sheet, so you can send it to WhatsApp, Drive or email. You also get an email when the batch is done." },
        ]}
      />

      <h2 id="use-cases">Use cases</h2>
      <h3>A class teacher after a unit test</h3>
      <p>
        Forty notebooks on the desk. The teacher photographs each one, tapping Next student between copies, and sends
        the batch before leaving school. By evening the checked copies are ready to review in the dashboard.
      </p>
      <h3>A coaching centre after a weekend test</h3>
      <p>
        The centre coordinator scans every batch’s copies on Sunday afternoon. Copies are matched by the name and roll
        number on page one; the coordinator only steps in for a copy with no name. Faculty review marks on Monday and
        release results.
      </p>
      <h3>A UPSC answer-writing programme</h3>
      <p>
        Mentors collect the day’s answer sheets, scan them on the phone and send them for checking against the scheme
        they set for each question. Aspirants get their own copy back with notes on every answer once the mentor
        releases it.
      </p>
      <h3>An exam cell sharing checked copies</h3>
      <p>
        After checking, the exam cell downloads the zip of all checked copies and shares it with the class teacher on
        WhatsApp or Drive, straight from the phone.
      </p>

      <h2 id="vs">App or dashboard?</h2>
      <Table
        head={["Task", "Evalezy app", "Evalezy dashboard"]}
        rows={[
          ["Create a test, upload the question paper, edit the marking scheme", "No (do it in the dashboard)", "Yes"],
          ["Scan copies with the phone camera", "Yes", "Upload phone photos or PDFs"],
          ["Upload PDFs", "Yes", "Yes, up to 200 at a time"],
          ["Run the AI check, see progress, match students", "Yes", "Yes"],
          ["Review and edit marks, release results", "No (do it in the dashboard)", "Yes"],
          ["Download checked copies", "Yes, as one zip", "Yes"],
          ["Price", "₹1 per page", "₹1 per page"],
        ]}
      />

      <h2 id="tips">Tips for good scans</h2>
      <ul>
        <li>Shoot in even, bright light; avoid your own shadow over the page.</li>
        <li>Keep the whole page in the frame, flat, with the edges visible.</li>
        <li>Make sure the student’s name and roll number are written at the top of page one.</li>
        <li>Tap Next student before starting each new copy, so pages are not mixed.</li>
      </ul>
      <p>
        More in our guide to <Link href="/blog/scan-answer-sheets-with-phone/">scanning answer sheets with a phone</Link>.
      </p>

      <WhereEvalezyFits>
        <p>
          The app is one more way into Evalezy. The checking is the same: <strong>AI does the first check, the teacher
          reviews and releases</strong>, and each student gets their own copy back in red pen. See what that looks like on
          a <Link href="/sample/">real checked copy</Link>, or read about the app on <Link href="/app/">evalezy.com/app</Link>.
        </p>
      </WhereEvalezyFits>
    </BlogShell>
  );
}
