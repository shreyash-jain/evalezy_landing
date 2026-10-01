import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { CopyAnatomy } from "@/components/Interactive";
import { MarkLegend, ScoreTableVsCopy } from "@/components/Visuals";
import { TickList } from "@/components/Pen";

const PATH = "/checked-copy/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Red-pen checked copy"
      h1="The student's own copy, checked the way a teacher would."
      lede={<>Evalezy does not stop at a score. It writes back onto the student&apos;s pages: a tick where marks were earned, a cross with the correct answer where they were not, a short note where an answer fell short, marks in the margin and the total circled on page one.</>}
      visual={
        <div className="mx-auto max-w-md rotate-[1.5deg] overflow-hidden rounded-md bg-white shadow-paper">
          <img src="/copy/page-2.webp" alt="Page two of a checked copy: ticks, a 0/1 with 'Wrong answer. Correct: Mohenjo-daro', 1.5/2 with a note on what the definition missed, and 2/2 with 'Good.'" className="block w-full" width={1200} height={1600} />
        </div>
      }
      faqs={[
        { q: "Why does the checked copy look handwritten?", a: "Because students and parents trust a copy that looks checked. Notes are drawn in a handwriting-style font with a slight wobble, ticks are drawn as uneven pen strokes, and the ink is a teacher's red. The same copy always re-renders identically." },
        { q: "Can teachers edit the checked copy?", a: "Teachers change marks and feedback on the review screen; marks they edit are kept and never overwritten by the AI. The marks students see are the marks the teacher released." },
        { q: "How do students get it?", a: "When a teacher releases results, each student receives the checked copy as a PDF by email. Results can also go out on WhatsApp through Automations if you have connected WhatsApp." },
        { q: "How big is the checked PDF?", a: "Page images are re-encoded so the checked PDF stays under 18 MB, small enough to email, even for a long phone-scanned copy." },
      ]}
    >
      <section className="wrap py-16 md:py-24">
        <h2 className="h-section max-w-3xl text-ink">Students learn from the page, not the number.</h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">On the left, what most AI graders return. On the right, two crops from a real copy checked by Evalezy.</p>
        <div className="mt-10"><ScoreTableVsCopy /></div>
      </section>
      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-24">
          <h2 className="h-section max-w-3xl text-ink">Anatomy of a checked page</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Tap a number to see what each mark means.</p>
          <div className="mt-10"><CopyAnatomy /></div>
        </div>
      </section>
      <section className="wrap space-y-20 py-16 md:py-24">
        <FeatureRow
          eyebrow="Half marks, with a reason"
          title="Partial credit you can see."
          body={
            <>
              <p>Marks are given in half-mark steps against the question&apos;s criteria. When an answer earns part of the marks, Evalezy writes what was missing next to it, so &ldquo;1.5/2&rdquo; comes with a reason.</p>
              <TickList items={["One score per question, written in the margin", "One clear note per deduction, never a wall of text", "Short, kind praise where an answer is complete"]} />
            </>
          }
          visual={<img src="/copy/crop-partial.webp" alt="Two answers on the copy: 1.5/2 with the note 'Q21: Methodology and purpose of Social Science not mentioned.' and 2/2 with 'Good.'" className="w-full rounded-2xl border border-line bg-white shadow-paper" loading="lazy" width={1400} height={739} />}
        />
        <FeatureRow
          flip
          eyebrow="Long answers"
          title="Notes on what a long answer missed."
          body={
            <>
              <p>On 3- and 5-mark answers, the note names the gap: a missing part, a missing example, a list where an explanation was asked for. It sits right under the answer, in the same red pen.</p>
              <p>The note is written for the student, not the teacher: what to add next time.</p>
            </>
          }
          visual={<img src="/copy/crop-steps.webp" alt="A long answer marked 3.5/5 with the note: 'How to Produce' lacks production techniques; 'What' lacks detail on goods." className="w-full rounded-2xl border border-line bg-white shadow-paper" loading="lazy" width={1400} height={188} />}
        />
        <div>
          <h2 className="h-display text-3xl text-ink md:text-[2.4rem]">The marks on every copy</h2>
          <div className="mt-8"><MarkLegend /></div>
          <Link href="/sample/" className="mt-8 inline-flex items-center gap-1 font-semibold text-pen-700" data-track="view_sample">Read the full 7-page sample <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </PageShell>
  );
}
