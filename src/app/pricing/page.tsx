import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { PlanCalculator } from "@/components/Interactive";
import { PenCircle, TickList } from "@/components/Pen";
import { JsonLd } from "@/components/JsonLd";
import { PRICING_FAQS } from "@/content/faqs";
import { PLANS, SITE, TRIAL_DAYS, signupHref } from "@/lib/site";
import { docsUrl } from "@/content/api";

const PATH = "/pricing/";
export const metadata = pageMetadata(PATH);

const EXAMPLES = [
  { who: "One section, unit test", copies: 40, pages: 4 },
  { who: "Four sections, half-yearly", copies: 160, pages: 8 },
  { who: "Coaching weekly test", copies: 300, pages: 6 },
  { who: "UPSC daily answer (a month)", copies: 500 * 26, pages: 4 },
];

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const PLAN_CARDS = [
  { key: "starter" as const, who: "1 teacher", popular: false, items: ["Upload copies, get marked PDFs", "Reports and result emails", "Checking history"] },
  { key: "team" as const, who: "Up to 15 teachers", popular: true, items: ["Everything in Starter", "Shared across your team", "Teacher review before release"] },
];

const PAGE_CHARGES = [
  ["Each page checked", "₹1"],
  ["Failed or unreadable copies", "free"],
  ["Checking a copy again", "₹1/page"],
];

const INCLUDED = [
  "Question paper import",
  "AI-drafted marking schemes, editable",
  "Reading names and matching copies to students",
  "The red-pen checked copy PDF",
  "Teacher review, edits and release",
  "Result emails to students with the checked copy",
];

const FREE = ["Failed checks", "Stopped or cancelled checks", "Copies too blurred or blank to read", "Reading names in bulk uploads", "Teacher edits"];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Pricing"
      h1={<>A yearly platform fee, plus <PenCircle>₹1</PenCircle> for every page checked.</>}
      lede={`Try it free for ${TRIAL_DAYS} days, no card needed. All prices are per year and exclude 18% GST. Paying monthly costs 20% more. No setup fee.`}
      secondary={null}
      visual={
        <div className="ruled mx-auto flex max-w-md items-center gap-6 rounded-[1.75rem] border border-line p-6 pl-16 shadow-paper">
          <img src="/copy/page-1-sm.webp" alt="The 7-page sample copy" className="w-28 shrink-0 -rotate-3 rounded shadow-paper" width={560} height={746} />
          <div>
            <p className="text-sm text-slate-500">The sample copy on this site</p>
            <p className="mt-1 font-mono text-sm text-slate-600">7 pages × ₹1</p>
            <p className="h-display mt-1 text-5xl text-pen">₹7</p>
            <p className="mt-2 text-sm text-slate-500">38 questions marked, every page annotated.</p>
          </div>
        </div>
      }
      faqs={PRICING_FAQS}
      faqTitle="Pricing questions"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Evalezy AI answer sheet checking",
          description: "AI checking of handwritten answer sheets with a red-pen checked copy: a yearly platform fee plus a price per page checked.",
          brand: { "@type": "Brand", name: "Evalezy" },
          url: `${SITE}${PATH}`,
          image: `${SITE}/og.png`,
          offers: [
            { "@type": "Offer", name: "Starter", price: String(PLANS.starter.yearly), priceCurrency: "INR", url: `${SITE}${PATH}`, availability: "https://schema.org/InStock", description: "1 teacher, per year, plus ₹1 per page checked. Excludes GST." },
            { "@type": "Offer", name: "Team", price: String(PLANS.team.yearly), priceCurrency: "INR", url: `${SITE}${PATH}`, availability: "https://schema.org/InStock", description: "Up to 15 teachers, per year, plus ₹1 per page checked. Excludes GST." },
          ],
        }}
      />
      <section className="wrap py-16 md:py-20">
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {PLAN_CARDS.map((p) => (
            <div key={p.key} className={p.popular ? "flex flex-col rounded-[1.25rem] border-2 border-pen bg-white p-7" : "card flex flex-col p-7"}>
              <div className="flex items-center justify-between gap-2">
                <h2 className="h-card text-xl text-ink">{PLANS[p.key].name}</h2>
                {p.popular && <span className="rounded-full bg-pen px-3 py-1 text-xs font-bold text-white">Most popular</span>}
              </div>
              <p className="mt-1 text-sm text-slate-500">{p.who}</p>
              <p className="h-display mt-4 text-5xl text-ink">{inr(PLANS[p.key].yearly)}<span className="text-xl text-slate-500"> / year</span></p>
              <p className="mt-1 text-sm text-slate-500">or {inr((PLANS[p.key].yearly * 1.2) / 12)} a month</p>
              <TickList className="mt-6 flex-1" items={p.items} />
              <a href={signupHref(p.key)} className="btn btn-pen mt-8 w-full" rel="nofollow" data-track="cta_trial_click">Start {TRIAL_DAYS}-day trial</a>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-slate-600">
          More than 15 teachers or 1,00,000+ pages a month? <strong className="text-ink">Enterprise</strong>: custom price.{" "}
          <Link href="/demo/" className="font-semibold text-pen-700 underline" data-track="book_demo">Talk to us</Link>
        </p>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-20">
          <h2 className="h-section text-ink">Work out your cost</h2>
          <div className="mt-8"><PlanCalculator /></div>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[32rem] text-left">
              <thead className="bg-paper-2 text-sm text-ink">
                <tr>
                  <th className="px-5 py-3 font-semibold">Example</th>
                  <th className="px-5 py-3 font-semibold">Copies</th>
                  <th className="px-5 py-3 font-semibold">Pages each</th>
                  <th className="px-5 py-3 font-semibold">Page charges</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((e) => (
                  <tr key={e.who} className="border-t border-line">
                    <td className="px-5 py-3.5 text-slate-700">{e.who}</td>
                    <td className="px-5 py-3.5 font-mono text-sm">{e.copies.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3.5 font-mono text-sm">{e.pages}</td>
                    <td className="px-5 py-3.5 font-mono text-sm font-semibold text-ink">₹{(e.copies * e.pages).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">Plus the yearly platform fee. Prices exclude 18% GST.</p>
        </div>
      </section>

      <section className="wrap grid gap-6 py-16 md:py-20 lg:grid-cols-2">
        <div className="flex flex-col rounded-[1.25rem] border-2 border-ink bg-ink p-7 text-white">
          <p className="eyebrow eyebrow-dark">API</p>
          <p className="h-display mt-4 text-5xl">₹1<span className="text-xl text-slate-400"> / page</span></p>
          <p className="mt-1 text-sm text-slate-400">No platform fee · $0.01 outside India · 1 credit a page</p>
          <p className="mt-5 leading-relaxed text-slate-300">For edtech platforms, ERPs and exam systems grading handwritten copies or typed long answers.</p>
          <TickList
            dark
            className="mt-6 flex-1"
            items={[
              "Exams, rubrics, candidates, PDF uploads and results",
              "Typed tests: 1 credit per non-blank long answer; objective answers free",
              "Question-wise marks, reasons, feedback and the checked copy PDF",
              "Failed and cancelled copies: not charged",
            ]}
          />
          <Link href="/demo/#api" className="btn btn-pen mt-8 w-full" data-track="request_api">Request API access</Link>
          <a href={docsUrl("/platform/pricing")} className="mt-4 text-center text-sm font-semibold text-slate-300 underline decoration-white/30 underline-offset-4">API pricing details</a>
        </div>
        <div className="card flex flex-col p-7">
          <p className="eyebrow">Charged per page</p>
          <table className="mt-4 w-full text-left">
            <tbody>
              {PAGE_CHARGES.map(([what, price]) => (
                <tr key={what} className="border-t border-line first:border-t-0">
                  <td className="py-3 text-slate-700">{what}</td>
                  <td className="py-3 text-right font-mono text-sm font-semibold text-ink">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="h-display text-3xl text-ink">Included in every plan</h2>
          <TickList className="mt-6" items={INCLUDED} />
        </div>
        <div>
          <h2 className="h-display text-3xl text-ink">Never charged</h2>
          <TickList className="mt-6" items={FREE} />
          <p className="mt-6 leading-relaxed text-slate-600">
            A re-check is a fresh check and is billed again. Edits a teacher makes are free and are kept.
          </p>
          <Link href="/faq/" className="mt-6 inline-flex items-center gap-1 font-semibold text-pen-700">All questions <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </PageShell>
  );
}
