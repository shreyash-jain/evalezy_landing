import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { AUDIENCES, findAudience } from "@/content/audiences";
import { DOCS_URL, SITE } from "@/lib/site";
import { TickList } from "@/components/Pen";
import { BulkCheckPanel, ReviewPanel } from "@/components/Visuals";
import { CodeBlock } from "@/components/Interactive";
import { SNIPPETS } from "@/content/api";

export const dynamicParams = false;
export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = findAudience(slug);
  if (!a) return {};
  const url = `${SITE}/for/${a.slug}/`;
  return { title: a.title, description: a.description, alternates: { canonical: url }, openGraph: { url, title: a.title, description: a.description }, twitter: { title: a.title, description: a.description } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = findAudience(slug);
  if (!a) notFound();
  const cost = a.example.copies * a.example.pages;
  const others = AUDIENCES.filter((x) => x.slug !== a.slug);
  return (
    <PageShell
      path="/for/"
      meta={{ path: `/for/${a.slug}/`, title: a.title, description: a.description }}
      crumbs={[{ label: "Who it's for", href: "/for/" }, { label: a.label }]}
      eyebrow={a.eyebrow}
      h1={a.h1}
      lede={a.lede}
      visual={a.slug === "edtech-platforms" ? <CodeBlock code={SNIPPETS.result} label="GET /submissions/{id}/result" /> : a.slug === "exam-boards" || a.slug === "colleges-universities" ? <ReviewPanel /> : <BulkCheckPanel compact />}
      secondary={a.slug === "edtech-platforms" ? { href: DOCS_URL, label: "Read the API docs", track: "open_docs" } : undefined}
      faqs={a.faqs}
    >
      <section className="wrap py-16 md:py-20">
        <h2 className="h-section max-w-3xl text-ink">The problem today</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {a.pains.map((p) => (
            <div key={p.title} className="card p-6">
              <p className="hand text-xl text-pen">{p.title}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-20">
          <h2 className="h-section max-w-3xl text-ink">How it fits your workflow</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {a.workflow.map((w, i) => (
              <li key={w.title} className="margin-line relative rounded-2xl border border-line p-6 pl-[4.25rem]">
                <span className="hand absolute left-4 top-5 text-2xl text-pen">{i + 1}.</span>
                <p className="h-card text-lg text-ink">{w.title}</p>
                <p className="mt-2 leading-relaxed text-slate-600">{w.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="h-display text-3xl text-ink md:text-[2.4rem]">What changes</h2>
          <TickList className="mt-6" items={a.outcomes} />
        </div>
        <div className="ruled rounded-[1.75rem] border border-line p-8 pl-20 shadow-paper">
          <p className="text-sm font-semibold text-slate-500">Worked example</p>
          <p className="mt-2 text-lg text-ink first-letter:uppercase">{a.example.label}</p>
          <p className="mt-6 text-sm text-slate-500">{a.example.copies.toLocaleString("en-IN")} copies × {a.example.pages} pages × ₹1</p>
          <p className="h-display mt-1 text-5xl text-pen">₹{cost.toLocaleString("en-IN")}</p>
          <p className="mt-2 text-sm text-slate-500">${(cost * 0.01).toLocaleString("en-US", { minimumFractionDigits: 2 })} outside India · excl. GST · failed copies free</p>
          <Link href="/pricing/" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-pen-700">Work out your own <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <section className="border-t border-line bg-white">
        <div className="wrap py-14">
          <p className="eyebrow">Evalezy is also for</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/for/${o.slug}/`} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-slate-700 hover:border-ink hover:text-ink">{o.label}</Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
