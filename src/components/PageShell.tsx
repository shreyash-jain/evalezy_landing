import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/content/types";
import { findPage, SITE, bookHref } from "@/lib/site";
import { POSTS, postPath } from "@/content/posts";
import { Breadcrumbs, CtaBand, FaqList } from "./ui";
import { JsonLd } from "./JsonLd";

/** Metadata for a registry page (src/lib/site.ts). */
export function pageMetadata(path: string): Metadata {
  const p = findPage(path);
  if (!p) throw new Error(`Page ${path} missing from PAGES in src/lib/site.ts`);
  const url = `${SITE}${path}`;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: { url, title: p.title, description: p.description },
    twitter: { title: p.title, description: p.description },
  };
}

/**
 * Shell for the hand-written product and guide pages: header with breadcrumbs,
 * the page body, an optional FAQ block, related blog posts and a closing CTA.
 */
export function PageShell({
  path, eyebrow, h1, lede, visual, faqs, faqTitle = "Frequently asked questions", children, hideCta = false,
  secondary = { href: "/sample/", label: "See a real checked copy", track: "view_sample" }, crumbs, meta,
}: {
  path: string;
  eyebrow: string;
  h1: React.ReactNode;
  lede: React.ReactNode;
  visual?: React.ReactNode;
  faqs?: Faq[];
  faqTitle?: string;
  children: React.ReactNode;
  hideCta?: boolean;
  secondary?: { href: string; label: string; track: string } | null;
  crumbs?: { label: string; href?: string }[];
  /** For data-driven pages not in PAGES (audiences, comparisons): their own URL, title and description. */
  meta?: { path: string; title: string; description: string };
}) {
  const reg = findPage(path);
  const p = meta ? { title: meta.title, description: meta.description, label: reg?.label ?? "" } : reg;
  const url = `${SITE}${meta?.path ?? path}`;
  const related = POSTS.filter((x) => x.pages?.includes(meta?.path ?? path)).slice(0, 3);
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: p?.title,
          description: p?.description,
          url,
          isPartOf: { "@id": `${SITE}/#website` },
          about: { "@id": `${SITE}/#app` },
        }}
      />
      <section className="relative overflow-hidden border-b border-line">
        <div className="ruled-faint pointer-events-none absolute inset-0" />
        <div className={`wrap relative grid gap-12 pb-14 pt-10 md:pb-20 md:pt-14 ${visual ? "lg:grid-cols-[1.05fr_1fr] lg:items-center" : ""}`}>
          <div>
            <Breadcrumbs items={crumbs ?? [{ label: p?.label ?? "" }]} />
            <p className="eyebrow mt-8">{eyebrow}</p>
            <h1 className="h-display mt-3 max-w-4xl text-[2.5rem] text-ink md:text-[3.4rem]">{h1}</h1>
            <div className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{lede}</div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref()} className="btn btn-pen btn-lg" data-track="book_demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
              {secondary &&
                (/\.(pdf|png|webp)$/.test(secondary.href) ? (
                  <a href={secondary.href} className="btn btn-outline btn-lg" data-track={secondary.track} download>{secondary.label}</a>
                ) : /^https?:/.test(secondary.href) ? (
                  <a href={secondary.href} className="btn btn-outline btn-lg" data-track={secondary.track}>{secondary.label}</a>
                ) : (
                  <Link href={secondary.href} className="btn btn-outline btn-lg" data-track={secondary.track}>{secondary.label}</Link>
                ))}
            </div>
          </div>
          {visual && <div>{visual}</div>}
        </div>
      </section>

      {children}

      {faqs && faqs.length > 0 && (
        <section className="wrap py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="h-section text-ink">{faqTitle}</h2>
            <FaqList faqs={faqs} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="wrap py-14">
            <h2 className="h-card text-2xl text-ink">From the blog</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={postPath(r.slug)} className="card card-hover p-6">
                  <p className="eyebrow">{r.category}</p>
                  <p className="mt-2 font-bold leading-snug text-ink">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {!hideCta && <CtaBand />}
    </main>
  );
}

/** A two-column feature row used inside PageShell pages. */
export function FeatureRow({
  eyebrow, title, body, visual, flip = false, id,
}: { eyebrow?: string; title: string; body: React.ReactNode; visual: React.ReactNode; flip?: boolean; id?: string }) {
  return (
    <div id={id} className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className={flip ? "lg:order-2" : ""}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h-display mt-3 text-3xl text-ink md:text-[2.4rem]">{title}</h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate-600">{body}</div>
      </div>
      <div className={flip ? "lg:order-1" : ""}>{visual}</div>
    </div>
  );
}
