import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { Icon } from "@/components/ui";
import { AUDIENCES } from "@/content/audiences";

const PATH = "/for/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Who it's for"
      h1="Built for anyone who checks handwritten answers at scale."
      lede="Schools after every exam, coaching institutes after every weekly test, answer-writing programs every day, colleges every semester, exam bodies every season, and platforms all the time."
    >
      <section className="wrap grid gap-4 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-3">
        {AUDIENCES.map((a) => (
          <Link key={a.slug} href={`/for/${a.slug}/`} className="card card-hover group flex flex-col p-7">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-pen-50 text-pen-700"><Icon name={a.icon} className="h-5 w-5" /></span>
            <h2 className="h-card mt-5 text-xl text-ink">{a.label}</h2>
            <p className="mt-2 font-semibold text-slate-700">{a.h1}</p>
            <p className="mt-2 flex-1 leading-relaxed text-slate-600">{a.description}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-pen-700">Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
