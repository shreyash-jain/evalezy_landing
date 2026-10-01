import Link from "next/link";
import {
  ArrowRight, BadgeCheck, BookOpenCheck, Building2, ClipboardList, Code2, FileStack, GraduationCap, Landmark,
  MessageSquareText, PenLine, ScanLine, School, Search, ShieldCheck, Sigma, Timer, Users, Webhook, type LucideIcon,
} from "lucide-react";
import type { Faq, IconName } from "@/content/types";
import { SITE, bookHref } from "@/lib/site";
import { JsonLd } from "./JsonLd";

const ICONS: Record<IconName, LucideIcon> = {
  School, GraduationCap, BookOpenCheck, Landmark, Building2, Code2, PenLine, Users, FileStack, ScanLine, ClipboardList,
  ShieldCheck, Timer, Sigma, Search, BadgeCheck, MessageSquareText, Webhook,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = ICONS[name] ?? BadgeCheck;
  return <C className={className} aria-hidden />;
}

export function Breadcrumbs({ items, dark = false }: { items: { label: string; href?: string }[]; dark?: boolean }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden className={dark ? "text-slate-600" : "text-slate-300"}>/</span>}
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className={dark ? "hover:text-white" : "hover:text-ink"}>{c.label}</Link>
              ) : (
                <span className={dark ? "text-slate-200" : "text-slate-700"} aria-current={i === all.length - 1 ? "page" : undefined}>{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${SITE}${c.href}` } : {}),
          })),
        }}
      />
    </>
  );
}

export function SectionHeading({
  eyebrow, title, lede, dark, center, id, className = "",
}: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; dark?: boolean; center?: boolean; id?: string; className?: string }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`h-section mt-3 ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lede && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{lede}</p>}
    </div>
  );
}

/** FAQ accordion + FAQPage JSON-LD (only one FAQPage per URL: pass withSchema={false} for extra lists). */
export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {faqs.map((f, i) => (
          <details key={i} className="group p-5 md:p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-semibold text-ink">
              <span>{f.q}</span>
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-slate-500 transition group-open:rotate-45 group-open:border-pen group-open:bg-pen group-open:text-white">+</span>
            </summary>
            <p className="mt-3 pr-8 leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </>
  );
}

/** Closing call-to-action band used at the foot of most pages. */
export function CtaBand({
  title = "See your own copies checked.",
  body = "Book a 20-minute demo. Bring a question paper and a few scanned answer sheets, and watch Evalezy check them in red pen.",
}: { title?: string; body?: string }) {
  return (
    <section className="wrap py-16 md:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-white md:px-14 md:py-16">
        <div className="dots-dark pointer-events-none absolute inset-0" />
        <svg viewBox="0 0 400 300" className="pointer-events-none absolute -right-16 -top-10 h-[22rem] w-[30rem] opacity-30" aria-hidden>
          <path d="M330 60 C 280 10, 90 0, 40 80 C 0 150, 60 260, 200 270 C 330 280, 400 200, 380 130 C 365 80, 320 50, 250 40" fill="none" stroke="#FF5A63" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="h-section text-white">{title}</h2>
            <p className="mt-4 max-w-xl text-lg text-slate-300">{body}</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href={bookHref()} className="btn btn-pen btn-lg" data-track="book_demo">
              Book a demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/sample/" className="btn btn-ghost-dark btn-lg" data-track="view_sample">
              See a real checked copy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A small label + value pill. */
export function Stat({ value, label, dark = false }: { value: React.ReactNode; label: string; dark?: boolean }) {
  return (
    <div>
      <p className={`h-display text-3xl md:text-4xl ${dark ? "text-white" : "text-ink"}`}>{value}</p>
      <p className={`mt-1 text-sm leading-snug ${dark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
    </div>
  );
}
