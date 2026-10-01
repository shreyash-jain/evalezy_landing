import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COMPARISONS, findComparison } from "@/content/comparisons";
import { SITE } from "@/lib/site";
import { TickList } from "@/components/Pen";
import { ScoreTableVsCopy } from "@/components/Visuals";

export const dynamicParams = false;
export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = findComparison(slug);
  if (!c) return {};
  const url = `${SITE}/compare/${c.slug}/`;
  return { title: c.title, description: c.description, alternates: { canonical: url }, openGraph: { url, title: c.title, description: c.description }, twitter: { title: c.title, description: c.description } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = findComparison(slug);
  if (!c) notFound();
  const others = COMPARISONS.filter((x) => x.slug !== c.slug);
  return (
    <PageShell
      path="/compare/"
      meta={{ path: `/compare/${c.slug}/`, title: c.title, description: c.description }}
      crumbs={[{ label: "Compare", href: "/compare/" }, { label: c.label }]}
      eyebrow="Compare"
      h1={c.h1}
      lede={c.lede}
      faqs={c.faqs}
    >
      <section className="wrap py-14 md:py-20">
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[40rem] text-left">
            <thead>
              <tr className="bg-paper-2 text-sm text-ink">
                <th className="w-[22%] px-5 py-3.5 font-semibold"> </th>
                <th className="px-5 py-3.5 font-semibold text-pen-700">Evalezy</th>
                <th className="px-5 py-3.5 font-semibold">{c.them}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.aspect} className="border-t border-line align-top">
                  <th scope="row" className="px-5 py-4 text-sm font-semibold text-ink">{r.aspect}</th>
                  <td className="px-5 py-4 text-sm leading-relaxed text-slate-700">{r.evalezy}</td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-slate-600">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="border-y border-line bg-white">
        <div className="wrap grid gap-6 py-14 md:grid-cols-2 md:py-20">
          <div className="card p-7">
            <h2 className="h-card text-xl text-ink">Choose {c.them.toLowerCase()} when</h2>
            <TickList className="mt-5" items={c.whenThem} />
          </div>
          <div className="rounded-[1.25rem] border-2 border-pen/30 bg-white p-7">
            <h2 className="h-card text-xl text-ink">Choose Evalezy when</h2>
            <TickList className="mt-5" items={c.whenEvalezy} />
          </div>
        </div>
      </section>
      <section className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1fr]">
        <div className="prose-ez">
          {c.body.map((b) => (
            <div key={b.heading}>
              <h2>{b.heading}</h2>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
        <div className="lg:pt-10"><ScoreTableVsCopy /></div>
      </section>
      <section className="wrap pb-6">
        <p className="eyebrow">Other comparisons</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/compare/${o.slug}/`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-ink hover:text-ink">{o.label}</Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
