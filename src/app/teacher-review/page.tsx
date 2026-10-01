import { Bell, Eye, EyeOff, Mail, MessageCircle, Pencil, Send, StopCircle } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { ReviewPanel } from "@/components/Visuals";
import { TickList } from "@/components/Pen";

const PATH = "/teacher-review/";
export const metadata = pageMetadata(PATH);

const FLOW = [
  { icon: Eye, t: "Watch it fill in", b: "Marks appear question by question while a copy is being checked. Stop a check at any time; a stopped check is not charged." },
  { icon: Bell, t: "Get told when it's done", b: "A bell alert and an email when a batch finishes, so nobody has to keep checking the screen." },
  { icon: Pencil, t: "Review and adjust", b: "For each question: the student's answer as read, the marks, the feedback and the criteria. Change any mark and its feedback." },
  { icon: EyeOff, t: "Students wait", b: "Until release, students see \"Results pending\". Marks and the checked copy are held back on the server." },
  { icon: Send, t: "Release", b: "Release one student, a selection or the whole assessment from the Submissions tab." },
  { icon: Mail, t: "Students receive the copy", b: "Each student is emailed their checked copy as a PDF. Add WhatsApp through Automations." },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Teacher review & release"
      h1="The AI checks. The teacher decides."
      lede="Every AI mark is a draft. Teachers see the answer as it was read, the reason for each mark and the criteria behind it, change anything they disagree with, and release results when they are ready. Not before."
      visual={<ReviewPanel />}
      faqs={[
        { q: "What happens to my edits if the copy is checked again?", a: "They are kept. A question a teacher has edited is never overwritten by a later AI check." },
        { q: "Can students see anything before release?", a: "No. Students see \"Results pending\"; their marks, report and checked copy are refused by the server until release." },
        { q: "Who gets notified when checking is done?", a: "The teacher who started the check, the assessment's creator and evaluator, and the institute's admins get a bell alert; admins also get an email. Bulk uploads send one notice for the whole batch." },
        { q: "Can I send results on WhatsApp?", a: "Yes, through Automations: use the \"Assessment Result Released\" trigger with a WhatsApp, email or push step. The student's name, marks, total, percentage and checked-copy file are available to the message." },
        { q: "What does \"Need review\" mean?", a: "A copy or question the system was less sure about: a low-confidence read, a copy that could not be matched to a student, or a question still waiting. Start your review there." },
      ]}
    >
      <section className="wrap py-16 md:py-24">
        <h2 className="h-section max-w-3xl text-ink">From check to release</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLOW.map((f, i) => (
            <li key={f.t} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-pen-50 text-pen-700"><f.icon className="h-5 w-5" /></span>
                <span className="hand text-xl text-pen">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="h-card mt-4 text-lg text-ink">{f.t}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{f.b}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-24">
          <FeatureRow
            eyebrow="Built-in safety"
            title="Marks students can trust."
            body={
              <TickList
                items={[
                  "A total is only final when every question is graded; a partly checked copy never shows a misleading total",
                  "A released result is not changed by a late AI callback",
                  "Edited marks are labelled and recorded with who changed them and when",
                  "Unreadable copies fail clearly instead of getting guessed marks",
                ]}
              />
            }
            visual={
              <div className="card space-y-3 p-6">
                {[
                  { icon: StopCircle, t: "Stop", b: "Halts within seconds. Not charged." },
                  { icon: Pencil, t: "Edit", b: "Marks clamped between 0 and the question's maximum." },
                  { icon: MessageCircle, t: "Release", b: "Email with the checked copy attached; WhatsApp via Automations." },
                ].map((x) => (
                  <div key={x.t} className="flex items-start gap-3 rounded-xl bg-paper p-4">
                    <x.icon className="mt-0.5 h-5 w-5 shrink-0 text-pen" />
                    <div>
                      <p className="font-semibold text-ink">{x.t}</p>
                      <p className="text-sm text-slate-600">{x.b}</p>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>
    </PageShell>
  );
}
