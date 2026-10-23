import Link from "next/link";
import { Breadcrumbs } from "@/components/ui";
import { SALES_EMAIL, SITE } from "@/lib/site";

export type Source = { id: string; title: string; publisher: string; url: string; type: "Primary" | "Estimate" | "Vendor" | "Survey" | "Press" };

export type DatasetMeta = {
  name: string;
  description: string;
  /** Path under /public, e.g. "/research/ai-answer-sheet-evaluation-landscape-2026.csv". */
  csv: string;
  keywords: string[];
};

/**
 * Shell for /research/* reports, ported from vacademy.io/research. What AI answer engines and Google reward on
 * a data page: the key number in a quotable sentence near the top, inline sources, a visible "last updated"
 * date, a method section, a disclosure, and a downloadable dataset marked up as Dataset. No FAQPage (Google
 * retired FAQ rich results in 2026). The site layout already renders the nav and footer.
 */
export default function ResearchShell({
  slug,
  eyebrow,
  title,
  dek,
  published,
  updated,
  sources,
  dataset,
  crumb,
  path,
  crumbs,
  kind = "Report",
  extraLd = [],
  children,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  dek: string;
  /** ISO dates. */
  published: string;
  updated: string;
  sources: Source[];
  dataset?: DatasetMeta;
  /** Short breadcrumb label for this report. */
  crumb: string;
  /** URL path when the page does not live under /research/ (e.g. "/best-ai-copy-checking-software/"). */
  path?: string;
  /** Breadcrumb trail above the title; defaults to Research / crumb. */
  crumbs?: { label: string; href?: string }[];
  /** schema.org type of the main entity. */
  kind?: "Report" | "Article";
  /** More JSON-LD nodes for the same @graph (e.g. an ItemList). */
  extraLd?: Record<string, unknown>[];
  children: React.ReactNode;
}) {
  const url = `${SITE}${path ?? `/research/${slug}/`}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": kind,
      "@id": `${url}#report`,
      headline: title,
      description: dek,
      url,
      datePublished: published,
      dateModified: updated,
      inLanguage: "en",
      author: { "@id": `${SITE}/#org` },
      publisher: { "@id": `${SITE}/#org` },
      isPartOf: { "@id": path ? `${SITE}/#website` : `${SITE}/research/#collection` },
      citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.title, publisher: s.publisher, url: s.url })),
    },
    ...extraLd,
  ];
  if (dataset) {
    graph.push({
      "@type": "Dataset",
      "@id": `${url}#dataset`,
      name: dataset.name,
      description: dataset.description,
      url,
      keywords: dataset.keywords,
      license: "https://creativecommons.org/licenses/by/4.0/",
      isAccessibleForFree: true,
      creator: { "@id": `${SITE}/#org` },
      dateModified: updated,
      distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE}${dataset.csv}` }],
    });
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />
      <article className="wrap max-w-4xl pb-16 pt-10 md:pt-14">
        <Breadcrumbs items={crumbs ?? [{ label: "Research", href: "/research/" }, { label: crumb }]} />
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="h-display mt-3 text-[2.2rem] text-ink md:text-[3rem]">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">{dek}</p>
        <p className="mt-5 text-sm text-slate-500">
          By the Evalezy research team · Published <time dateTime={published}>{fmt(published)}</time> · Updated{" "}
          <time dateTime={updated}>{fmt(updated)}</time>
          {dataset && (
            <>
              {" · "}
              <a href={dataset.csv} download className="font-semibold text-pen-700 underline underline-offset-2" data-track="download_research_csv">
                Download the data (CSV)
              </a>
            </>
          )}
        </p>

        <div role="note" className="mt-6 rounded-xl border border-warn/30 bg-warn-50 p-4 text-sm leading-relaxed text-[#6b4a12]">
          <strong>Disclosure.</strong> Evalezy publishes this {kind === "Article" ? "guide" : "report"} and sells AI answer-sheet checking, so we are one of
          the vendors in this market. Every score links to its source, the method is published below, Evalezy is scored
          with the same rubric (including what it does not do), and anything we could not verify counts as not
          documented. Spot an error? Write to{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="underline">{SALES_EMAIL}</a> with a source and we will correct it.
        </div>

        <div className="research-prose mt-10">{children}</div>

        <section aria-labelledby="sources" className="mt-14 border-t border-line pt-8">
          <h2 id="sources" className="h-card text-2xl text-ink">Sources</h2>
          <ol className="mt-4 space-y-2 text-sm text-slate-600">
            {sources.map((s) => (
              <li key={s.id} id={`src-${s.id}`} className="scroll-mt-24 break-words">
                <span className="font-mono text-xs text-slate-500">[{s.id}]</span>{" "}
                <a href={s.url} rel="noopener" target="_blank" className="text-ink underline underline-offset-2 hover:text-pen-700">
                  {s.title}
                </a>{" "}
                · {s.publisher} <span className="text-xs text-slate-500">({s.type})</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-slate-500">
            More: <Link href="/research/" className="underline underline-offset-2 hover:text-pen-700">all Evalezy research</Link>
          </p>
        </section>
      </article>
    </main>
  );
}

/** Inline citation marker, e.g. <Cite id="3" /> → [3] linking to the sources list. */
export function Cite({ id }: { id: string }) {
  return (
    <sup className="ml-0.5">
      <a href={`#src-${id}`} className="text-pen-700 no-underline hover:underline" aria-label={`Source ${id}`}>
        [{id}]
      </a>
    </sup>
  );
}

/** A headline number with one quotable sentence beside it. */
export function KeyStat({ value, label, cite }: { value: string; label: React.ReactNode; cite?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="h-display text-3xl text-ink">{value}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {label}
        {cite && <Cite id={cite} />}
      </p>
    </div>
  );
}

function fmt(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
