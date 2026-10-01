import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { COMPARISONS } from "@/content/comparisons";

const PATH = "/compare/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Compare"
      h1="How Evalezy compares"
      lede="Honest comparisons with the ways answer sheets are checked today, including where the other option is the better choice."
    >
      <section className="wrap grid gap-4 py-16 md:grid-cols-3 md:py-20">
        {COMPARISONS.map((c) => (
          <Link key={c.slug} href={`/compare/${c.slug}/`} className="card card-hover group flex flex-col p-7">
            <h2 className="h-card text-xl text-ink">{c.label}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-slate-600">{c.description}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-pen-700">Read the comparison <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
