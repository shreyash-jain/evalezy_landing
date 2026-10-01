import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { LogoMark } from "@/components/Logo";
import { ClientGrid } from "@/components/ClientLogos";

const PATH = "/about/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="About"
      h1="We built the red pen we wished teachers had."
      lede="Evalezy comes from the team behind Vacademy, a learning and assessment platform used by schools, online academies and training institutes across 5 countries. Online tests were already easy to check. Handwritten copies were not: they still went home in a teacher's bag every weekend."
      secondary={null}
    >
      <section className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="prose-ez max-w-2xl">
          <h2>Why the copy, not the score</h2>
          <p>
            Most automated grading stops at a number. But students do not learn from a number; they learn from seeing their own page marked: which line earned the tick, where the cross is, what the right answer was. Teachers know this, which is why they still check by hand. So we set out to return the copy itself, checked the way a careful teacher would check it.
          </p>
          <h2>Why the teacher stays in charge</h2>
          <p>
            Marks matter to children and parents. An AI that publishes marks on its own is a liability. In Evalezy every mark is a draft, every deduction comes with a reason, unreadable copies are never guessed, and nothing reaches a student until a teacher releases it.
          </p>
          <h2>Why ₹1 a page</h2>
          <p>
            Pricing should be something a school can work out on the back of an exam paper. Pages are what teachers count, so that is what we charge for, and nothing when a check fails.
          </p>
          <h2>The name</h2>
          <p>
            Evalezy is evaluation, made easy. The logo is the loop a teacher draws around the total at the top of a copy, with a tick inside.
          </p>
        </div>
        <aside className="space-y-4">
          <div className="card flex items-center gap-4 p-6">
            <LogoMark className="h-14 w-14" />
            <div>
              <p className="h-card text-lg text-ink">Evalezy</p>
              <p className="text-sm text-slate-500">A Vacademy product · Vidyayatan Technologies LLP</p>
            </div>
          </div>
          <Link href="https://vacademy.io" className="card card-hover flex items-center justify-between p-6">
            <span>
              <span className="block font-semibold text-ink">Vacademy</span>
              <span className="text-sm text-slate-500">The learning and assessment platform Evalezy is part of</span>
            </span>
            <ArrowRight className="h-5 w-5 text-pen" />
          </Link>
          <Link href="/sample/" className="card card-hover flex items-center justify-between p-6" data-track="view_sample">
            <span>
              <span className="block font-semibold text-ink">See a checked copy</span>
              <span className="text-sm text-slate-500">7 real pages, checked by Evalezy</span>
            </span>
            <ArrowRight className="h-5 w-5 text-pen" />
          </Link>
        </aside>
      </section>
      <section className="border-t border-line bg-white">
        <div className="wrap py-14 md:py-20">
          <h2 className="h-section max-w-3xl text-ink">Institutes on Vacademy</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Schools, online academies and training institutes across 5 countries run on Vacademy, the platform Evalezy is part of.
          </p>
          <div className="mt-10"><ClientGrid /></div>
        </div>
      </section>
    </PageShell>
  );
}
