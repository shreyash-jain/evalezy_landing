import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { PriceCalculator } from "@/components/Interactive";
import { PenCircle, TickList } from "@/components/Pen";
import { JsonLd } from "@/components/JsonLd";
import { PRICING_FAQS } from "@/content/faqs";
import { SITE, bookHref } from "@/lib/site";

const PATH = "/pricing/";
export const metadata = pageMetadata(PATH);

const EXAMPLES = [
  { who: "One section, unit test", copies: 40, pages: 4 },
  { who: "Four sections, half-yearly", copies: 160, pages: 8 },
  { who: "Coaching weekly test", copies: 300, pages: 6 },
  { who: "UPSC daily answer (a month)", copies: 500 * 26, pages: 3 },
];

const INCLUDED = [
  "Question paper import",
  "AI-drafted marking schemes, editable",
  "Reading names and matching copies to students",
  "The red-pen checked copy PDF",
  "Teacher review, edits and release",
  "Result emails to students with the checked copy",
  "The same price on the API",
];

const FREE = ["Failed checks", "Stopped or cancelled checks", "Copies too blurred or blank to read", "Reading names in bulk uploads", "Teacher edits"];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Pricing"
      h1={<>One price: <PenCircle>₹1</PenCircle> a page checked.</>}
      lede="$0.01 a page outside India. No subscription, no setup fee, no seats. You pay for the pages Evalezy checks, and nothing for the ones it could not."
      secondary={null}
      visual={
        <div className="ruled mx-auto flex max-w-md items-center gap-6 rounded-[1.75rem] border border-line p-6 pl-16 shadow-paper">
          <img src="/copy/page-1-sm.webp" alt="The 7-page sample copy" className="w-28 shrink-0 -rotate-3 rounded shadow-paper" width={560} height={747} />
          <div>
            <p className="text-sm text-slate-500">The sample copy on this site</p>
            <p className="mt-1 font-mono text-sm text-slate-600">7 pages × ₹1</p>
            <p className="h-display mt-1 text-5xl text-pen">₹7</p>
            <p className="mt-2 text-sm text-slate-500">38 questions marked, every page annotated. $0.07 outside India.</p>
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
          description: "AI checking of handwritten answer sheets with a red-pen checked copy, priced per page checked.",
          brand: { "@type": "Brand", name: "Evalezy" },
          url: `${SITE}${PATH}`,
          image: `${SITE}/og.png`,
          offers: [
            { "@type": "Offer", price: "1.00", priceCurrency: "INR", url: `${SITE}${PATH}`, availability: "https://schema.org/InStock", description: "Per page checked, excluding GST" },
            { "@type": "Offer", price: "0.01", priceCurrency: "USD", url: `${SITE}${PATH}`, availability: "https://schema.org/InStock", description: "Per page checked" },
          ],
        }}
      />
      <section className="wrap grid gap-6 py-16 md:py-20 lg:grid-cols-3">
        <div className="card flex flex-col p-7">
          <p className="eyebrow">Dashboard</p>
          <p className="h-display mt-4 text-5xl text-ink">₹1<span className="text-xl text-slate-500"> / page</span></p>
          <p className="mt-1 text-sm text-slate-500">$0.01 outside India · prepaid credits · excl. GST</p>
          <p className="mt-5 leading-relaxed text-slate-600">For schools, coaching institutes and colleges checking copies in the Evalezy dashboard.</p>
          <TickList className="mt-6 flex-1" items={INCLUDED.slice(0, 6)} />
          <Link href={bookHref()} className="btn btn-pen mt-8 w-full" data-track="book_demo">Book a demo</Link>
        </div>
        <div className="flex flex-col rounded-[1.25rem] border-2 border-ink bg-ink p-7 text-white">
          <p className="eyebrow eyebrow-dark">API</p>
          <p className="h-display mt-4 text-5xl">₹1<span className="text-xl text-slate-400"> / page</span></p>
          <p className="mt-1 text-sm text-slate-400">$0.01 outside India · billed on completed evaluations</p>
          <p className="mt-5 leading-relaxed text-slate-300">For edtech platforms and developers adding handwritten answer checking to their product.</p>
          <TickList dark className="mt-6 flex-1" items={["Assessments, criteria, answer sheets, results", "Answer sheets by upload or URL", "Webhooks or status polling", "Marks, feedback and the checked PDF in the response", "Failed and cancelled: not billed"]} />
          <Link href="/demo/#api" className="btn btn-pen mt-8 w-full" data-track="request_api">Request API access</Link>
        </div>
        <div className="card flex flex-col p-7">
          <p className="eyebrow">Volume</p>
          <p className="h-display mt-4 text-5xl text-ink">Custom</p>
          <p className="mt-1 text-sm text-slate-500">For 1,00,000+ pages a month</p>
          <p className="mt-5 leading-relaxed text-slate-600">For exam bodies, university-wide rollouts and large platforms that need capacity planned around an exam window.</p>
          <TickList className="mt-6 flex-1" items={["Capacity planned for your exam dates", "Invoice billing", "A named contact during the evaluation window", "Help writing marking schemes"]} />
          <Link href="/demo/" className="btn btn-outline mt-8 w-full" data-track="book_demo">Talk to us</Link>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-16 md:py-20">
          <h2 className="h-section text-ink">Work out your cost</h2>
          <p className="mt-3 max-w-2xl text-slate-600">Change the numbers to match your school or batch.</p>
          <div className="mt-10"><PriceCalculator /></div>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[36rem] text-left">
              <thead className="bg-paper-2 text-sm text-ink">
                <tr>
                  <th className="px-5 py-3 font-semibold">Example</th>
                  <th className="px-5 py-3 font-semibold">Copies</th>
                  <th className="px-5 py-3 font-semibold">Pages each</th>
                  <th className="px-5 py-3 font-semibold">Cost (India)</th>
                  <th className="px-5 py-3 font-semibold">Cost (elsewhere)</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((e) => (
                  <tr key={e.who} className="border-t border-line">
                    <td className="px-5 py-3.5 text-slate-700">{e.who}</td>
                    <td className="px-5 py-3.5 font-mono text-sm">{e.copies.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3.5 font-mono text-sm">{e.pages}</td>
                    <td className="px-5 py-3.5 font-mono text-sm font-semibold text-ink">₹{(e.copies * e.pages).toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3.5 font-mono text-sm text-slate-600">${(e.copies * e.pages * 0.01).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">Indian prices exclude GST.</p>
        </div>
      </section>

      <section className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="h-display text-3xl text-ink">Included in the page price</h2>
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
