import { PageShell, pageMetadata } from "@/components/PageShell";
import { TickList } from "@/components/Pen";
import { PRIVACY_URL } from "@/lib/site";

const PATH = "/security/";
export const metadata = pageMetadata(PATH);

const SECTIONS = [
  {
    t: "Who sees what, and when",
    items: [
      "Answer sheets, marks and checked copies live inside your institute's account.",
      "Students see only their own result, and only after a teacher releases it. Before release the server refuses their marks, report and checked copy, not just the app.",
      "Copies uploaded by teachers and copies uploaded by students are both held as pending until release.",
    ],
  },
  {
    t: "The AI never has the last word",
    items: [
      "Every AI mark is a draft. A teacher reviews, edits and releases.",
      "A mark a teacher edits is never overwritten by a later AI check.",
      "A released result is not changed by a late AI update.",
      "A copy is never matched to a student by guesswork; uncertain matches wait for a person.",
    ],
  },
  {
    t: "When something goes wrong",
    items: [
      "Unreadable copies fail with a clear reason instead of getting invented marks.",
      "If the checked PDF cannot be produced, the marks still arrive and can be reviewed.",
      "Failed, stopped and unreadable checks are not charged.",
      "Typed answers are treated as data, not instructions: an answer telling the AI to award full marks scored 0/5 in testing.",
    ],
  },
  {
    t: "How the checking is done",
    items: [
      "Pages are processed by Evalezy's pipeline and by AI model and equation-reading providers it uses to read handwriting and mark answers.",
      "Each step only receives what it needs: page images for reading, answer text and criteria for marking.",
      "Usage is billed once per check, recorded against your institute.",
    ],
  },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Data & privacy"
      h1="Your students' answer sheets, handled with care."
      lede="Answer sheets carry names, roll numbers and children's handwriting. Here is how Evalezy treats them, what stays in your control, and what we do not claim."
      secondary={null}
    >
      <section className="wrap grid gap-6 py-14 md:grid-cols-2 md:py-20">
        {SECTIONS.map((s) => (
          <div key={s.t} className="card p-7">
            <h2 className="h-card text-xl text-ink">{s.t}</h2>
            <TickList className="mt-5" items={s.items} />
          </div>
        ))}
      </section>
      <section className="border-t border-line bg-white">
        <div className="wrap py-14 md:py-16">
          <h2 className="h-display text-2xl text-ink md:text-3xl">What we do not claim</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
            Evalezy does not hold SOC 2 or ISO 27001 certification today, does not offer on-premise deployment, and does not publish an accuracy percentage. If your procurement needs any of these, tell us early and we will tell you plainly where we stand. Evalezy is operated by Vidyayatan Technologies LLP under the Vacademy{" "}
            <a href={PRIVACY_URL} className="font-semibold text-pen-700 underline underline-offset-4">privacy policy</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
