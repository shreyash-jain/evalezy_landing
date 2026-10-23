import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { COMPARISONS, VENDOR_COMPARISONS } from "@/content/comparisons";
import { BEST_PATH } from "@/content/bestTools";

const PATH = "/compare/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Compare"
      h1="How Evalezy compares"
      lede="Honest comparisons with the ways answer sheets are checked today and with named tools, including where the other option is the better choice."
    >
      <section className="wrap pt-16 md:pt-20">
        <Link href={BEST_PATH} className="card card-hover group flex flex-col gap-3 border-2 border-pen/30 p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Buyer&apos;s guide 2026</p>
            <h2 className="h-card mt-2 text-2xl text-ink">The best AI copy checking software, one pick per job</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">Ten tools for schools, coaching, UPSC, universities, boards and edtech, with sourced capabilities and prices, including where Evalezy is not the right choice.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-pen-700">Read the guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
        </Link>
      </section>
      <section className="wrap pt-14">
        <h2 className="h-card text-2xl text-ink">Compared with other ways of checking</h2>
      </section>
      <section className="wrap grid gap-4 pb-6 pt-6 md:grid-cols-3">
        {COMPARISONS.map((c) => (
          <Link key={c.slug} href={`/compare/${c.slug}/`} className="card card-hover group flex flex-col p-7">
            <h2 className="h-card text-xl text-ink">{c.label}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-slate-600">{c.description}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-pen-700">Read the comparison <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
          </Link>
        ))}
      </section>
      <section className="wrap pt-10">
        <h2 className="h-card text-2xl text-ink">Compared with other tools</h2>
      </section>
      <section className="wrap grid gap-4 pb-16 pt-6 md:grid-cols-3 md:pb-20">
        {VENDOR_COMPARISONS.map((c) => (
          <Link key={c.slug} href={`/compare/${c.slug}/`} className="card card-hover group flex flex-col p-7">
            <h3 className="h-card text-xl text-ink">{c.label}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-slate-600">{c.description}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-pen-700">Read the comparison <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
