import Link from "next/link";
import { CloudUpload, Headset, MapPin, Printer, ScanLine, UserRoundCheck } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { OnsitePhoto, PrinterVisual } from "@/components/Onsite";
import { DemoForm } from "@/components/DemoForm";
import { FaqList } from "@/components/ui";
import { PenUnderline, TickList } from "@/components/Pen";
import { JsonLd } from "@/components/JsonLd";
import { EXTRA_CREDIT_INR, ONSITE, PLANS, SITE, planPeriod } from "@/lib/site";

const PATH = "/onsite/";
export const metadata = pageMetadata(PATH);

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const credits = ONSITE.credits.toLocaleString("en-IN");
const supportAddon = inr(ONSITE.onsite_support_inr);

const STEPS = [
  { icon: ScanLine, t: "Scan", b: "Scan each student's copy on the OnSite printer, one PDF per student." },
  { icon: CloudUpload, t: "Upload and check", b: "Upload the PDFs to Evalezy, up to 200 at a time. Each copy is matched to its student by name and roll number and checked against one marking scheme per question." },
  { icon: UserRoundCheck, t: "Review", b: "Marks land as a draft. A teacher looks through them, changes any mark and releases the results. Nothing reaches students before that." },
  { icon: Printer, t: "Print", b: "Download the checked copies and print them on the same printer: the student's own copy with ticks, crosses, notes and the total circled." },
];

/** Same examples as /pricing/: credits one test uses, and how many such tests the OnSite credits cover. */
const EXAMPLES = [
  { who: "One section, unit test", copies: 40, pages: 4 },
  { who: "Four sections, half-yearly", copies: 160, pages: 8 },
  { who: "Coaching weekly test", copies: 300, pages: 6 },
];

const WHY = [
  { t: "One desk for the exam cell", b: "Copies are scanned and the checked copies printed on one machine in the staff room. No hunting for a scanner before results day." },
  { t: "Paper back in students' hands", b: "Hand back the checked copy on paper, the way a teacher-checked copy comes back. Students also get it by email when you release results." },
  { t: "The same Evalezy, more credits", b: `The same checking, teacher review and red-pen copy as every plan, with ${credits} AI credits to start. Teachers can still scan with the Evalezy phone app.` },
];

const FAQS = [
  { q: "What is Evalezy OnSite?", a: `A plan that comes with an all-in-one printer for your school and ${credits} AI credits. Teachers scan the answer sheets on the printer, Evalezy checks them, and the checked copies are printed on the same printer. It costs ${inr(ONSITE.price_inr)} plus 18% GST, with online support. For ${supportAddon} more, a member of our team comes to your school to do it for you.` },
  { q: "Does the checking happen on the printer, without internet?", a: "No. The printer scans and prints at your school; the checking runs on Evalezy online, the same as on every plan, so you need an internet connection. Evalezy is not installed on your own servers." },
  { q: "How many copies do the credits cover?", a: `1 credit checks 1 page, so ${credits} credits check ${credits} pages. A half-yearly for four sections (160 copies of 8 pages) uses 1,280 credits. When the credits run out, extra credits are ₹${EXTRA_CREDIT_INR} each. Failed, stopped and unreadable copies are not charged.` },
  { q: "How do the scanned copies get into Evalezy?", a: "Scan each student's copy as its own PDF and upload the PDFs in Evalezy, up to 200 at a time and up to 60 MB each. Evalezy reads the name and roll number on page one and matches each copy to your class list; a copy it cannot match waits for you to pick the student." },
  { q: "Can teachers still use the phone app and the dashboard?", a: "Yes. It is the same Evalezy account: scan on the printer or with the phone app, and review and release results in the dashboard. Every copy uses the same credits." },
  { q: "Do marks reach students without a teacher?", a: "No. AI marks are a draft. A teacher reviews them, changes any mark and presses Release. A mark a teacher edits is never overwritten by a later AI run." },
  { q: "Can someone from your team do it for us?", a: `Yes. For ${supportAddon} more (plus GST), a member of our team comes to your school and does the work: scanning the copies, running the check and printing the checked copies. Without it, ${ONSITE.name} comes with online support. We agree the days with you on the demo call.` },
  { q: "Which printer do we get, and how does it reach us?", a: "We confirm the printer and its delivery to your school on the demo call. Book one below or WhatsApp us." },
];

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow={`New · ${ONSITE.name}`}
      h1={<>Scan in. <PenUnderline>Checked copies</PenUnderline> out.</>}
      lede={`${ONSITE.name} comes with an all-in-one printer for your school and ${credits} AI credits. Teachers scan the answer sheets on it, Evalezy checks every copy, and the red-pen checked copies print on the same machine. ${inr(ONSITE.price_inr)} + GST with online support, or ${supportAddon} more and our team does it at your school.`}
      visual={<OnsitePhoto />}
      primary={{ href: "#demo", label: "Book an OnSite demo", track: "onsite_demo" }}
      hideCta
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: ONSITE.name,
          description: `An all-in-one printer for the school plus ${credits} AI credits for checking handwritten answer sheets: scan the copies, Evalezy checks them online, print the red-pen checked copies.`,
          brand: { "@type": "Brand", name: "Evalezy" },
          url: `${SITE}${PATH}`,
          image: `${SITE}/og.png`,
          offers: [
            {
              "@type": "Offer",
              name: `${ONSITE.name} with online support`,
              price: String(ONSITE.price_inr),
              priceCurrency: "INR",
              url: `${SITE}${PATH}`,
              availability: "https://schema.org/InStock",
              description: `All-in-one printer, ${credits} AI credits (1 credit checks 1 page) and online support. Excludes GST.`,
            },
            {
              "@type": "Offer",
              name: `${ONSITE.name} with on-site support`,
              price: String(ONSITE.price_inr + ONSITE.onsite_support_inr),
              priceCurrency: "INR",
              url: `${SITE}${PATH}`,
              availability: "https://schema.org/InStock",
              description: `All-in-one printer, ${credits} AI credits and a member of our team at the school to scan, check and print. Excludes GST.`,
            },
          ],
        }}
      />

      <section className="wrap py-16 md:py-24">
        <p className="eyebrow">How it works</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">From the exam hall to a printed checked copy, in four steps.</h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <ol className="grid gap-4 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.t} className="card p-6">
                <div className="flex items-center justify-between">
                  <s.icon className="h-6 w-6 text-pen" />
                  <span className="hand text-2xl text-slate-300">{i + 1}</span>
                </div>
                <p className="h-card mt-4 text-lg text-ink">{s.t}</p>
                <p className="mt-2 leading-relaxed text-slate-600">{s.b}</p>
              </li>
            ))}
          </ol>
          <PrinterVisual />
        </div>
        <p className="mt-6 text-sm text-slate-500">
          The checking runs on Evalezy online, as on every plan, so you need an internet connection to upload the scans and download the checked copies.{" "}
          <Link href="/sample/" className="font-semibold text-pen-700 underline underline-offset-4">See a real checked copy</Link>.
        </p>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">What you get</p>
            <h2 className="h-section mt-3 text-ink">A printer and {credits} pages of checking.</h2>
            <TickList
              className="mt-6"
              items={[
                "An all-in-one printer that scans and prints, for your school",
                `${credits} AI credits: 1 credit checks 1 page`,
                "Question paper import, AI marking schemes and name matching",
                "Teacher review and release, and result emails with the checked copy",
                "Online support from our team",
                `Extra credits ₹${EXTRA_CREDIT_INR} each when you need more`,
                "Failed, stopped and unreadable copies are not charged",
              ]}
            />
            <p className="h-display mt-8 text-5xl text-ink">{inr(ONSITE.price_inr)}<span className="text-xl text-slate-500"> + 18% GST</span></p>
            <p className="mt-2 text-slate-600">On-site support: <strong className="text-ink">+{supportAddon}</strong>, our team member at your school.</p>
          </div>
          <div>
            <h3 className="h-card text-2xl text-ink">How far {credits} credits go</h3>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[30rem] text-left">
                <thead className="bg-paper-2 text-sm text-ink">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Example</th>
                    <th className="whitespace-nowrap px-5 py-3 font-semibold">Copies × pages</th>
                    <th className="px-5 py-3 font-semibold">Credits a test</th>
                    <th className="px-5 py-3 font-semibold">Tests covered</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLES.map((e) => {
                    const used = e.copies * e.pages;
                    return (
                      <tr key={e.who} className="border-t border-line">
                        <td className="px-5 py-3.5 text-slate-700">{e.who}</td>
                        <td className="px-5 py-3.5 font-mono text-sm">{e.copies} × {e.pages}</td>
                        <td className="px-5 py-3.5 font-mono text-sm">{used.toLocaleString("en-IN")}</td>
                        <td className="px-5 py-3.5 font-mono text-sm font-semibold text-ink">{Math.floor(ONSITE.credits / used)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">Examples, not customer figures. A 7-page copy uses 7 credits.</p>
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <p className="eyebrow">Support</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Run it yourself, or let our team run it at your school.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col p-7">
            <div className="flex items-center justify-between gap-3">
              <Headset className="h-7 w-7 text-pen" />
              <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-bold text-ink ring-1 ring-line">Included</span>
            </div>
            <h3 className="h-card mt-5 text-xl text-ink">Online support</h3>
            <p className="h-display mt-2 text-4xl text-ink">{inr(ONSITE.price_inr)}<span className="text-lg text-slate-500"> + GST</span></p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Your teachers scan, check and print. Our team helps online when they get stuck: setting up a test, scanning, checking or printing.
            </p>
          </div>
          <div className="flex flex-col rounded-[1.25rem] border-2 border-pen bg-white p-7">
            <div className="flex items-center justify-between gap-3">
              <MapPin className="h-7 w-7 text-pen" />
              <span className="rounded-full bg-pen px-3 py-1 text-xs font-bold text-white">+{supportAddon}</span>
            </div>
            <h3 className="h-card mt-5 text-xl text-ink">On-site support</h3>
            <p className="h-display mt-2 text-4xl text-ink">{inr(ONSITE.price_inr + ONSITE.onsite_support_inr)}<span className="text-lg text-slate-500"> + GST</span></p>
            <p className="mt-4 leading-relaxed text-slate-600">
              A member of our team comes to your school and does the work: scanning the copies, running the check and printing the checked copies. Your teachers review and release the marks.
            </p>
            <Link href="#demo" className="btn btn-pen mt-6 self-start" data-track="onsite_support_demo">Ask about on-site support</Link>
          </div>
        </div>
      </section>

      <section className="wrap pb-16 md:pb-24">
        <p className="eyebrow">Why a printer</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">For schools that want copies scanned and printed in-house.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {WHY.map((w) => (
            <div key={w.t} className="card p-6">
              <p className="h-card text-lg text-ink">{w.t}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{w.b}</p>
            </div>
          ))}
        </div>

        <h3 className="h-card mt-16 text-2xl text-ink">OnSite next to the other plans</h3>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[36rem] text-left">
            <thead>
              <tr className="bg-paper-2 text-sm text-ink">
                <th className="w-[30%] px-4 py-3 font-semibold"> </th>
                {PLANS.map((p) => <th key={p.key} className="px-4 py-3 font-semibold">{p.name}</th>)}
                <th className="px-4 py-3 font-semibold text-pen-700">{ONSITE.name}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-line">
                <th scope="row" className="px-4 py-3.5 font-semibold text-ink">Price (before GST)</th>
                {PLANS.map((p) => <td key={p.key} className="px-4 py-3.5 text-slate-700">{inr(p.price_inr)} a {planPeriod()}</td>)}
                <td className="px-4 py-3.5 font-semibold text-ink">{inr(ONSITE.price_inr)}</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="px-4 py-3.5 font-semibold text-ink">AI credits included</th>
                {PLANS.map((p) => <td key={p.key} className="px-4 py-3.5 text-slate-700">{p.credits.toLocaleString("en-IN")}</td>)}
                <td className="px-4 py-3.5 font-semibold text-ink">{credits}</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="px-4 py-3.5 font-semibold text-ink">All-in-one printer at your school</th>
                {PLANS.map((p) => <td key={p.key} className="px-4 py-3.5 text-slate-500">No</td>)}
                <td className="px-4 py-3.5 font-semibold text-ink">Included</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="px-4 py-3.5 font-semibold text-ink">Our team at your school</th>
                {PLANS.map((p) => <td key={p.key} className="px-4 py-3.5 text-slate-500">No</td>)}
                <td className="px-4 py-3.5 font-semibold text-ink">+{supportAddon}</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="px-4 py-3.5 font-semibold text-ink">Extra credits</th>
                {PLANS.map((p) => <td key={p.key} className="px-4 py-3.5 text-slate-700">₹{EXTRA_CREDIT_INR} each</td>)}
                <td className="px-4 py-3.5 text-slate-700">₹{EXTRA_CREDIT_INR} each</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          All plans: <Link href="/pricing/" className="underline underline-offset-2 hover:text-ink">pricing</Link>.
        </p>
      </section>

      <section className="border-t border-line bg-white">
        <div className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="h-section text-ink">OnSite questions</h2>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line" id="demo">
        <div className="ruled-faint pointer-events-none absolute inset-0" />
        <div className="wrap relative grid gap-12 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Book an OnSite demo</p>
            <h2 className="h-section mt-3 text-ink">See Evalezy check copies like yours.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              A short call: we check a few of your answer sheets in Evalezy and show you the checked copy you would print. Tell us how many copies you check, and we confirm the printer and delivery for your school.
            </p>
            <TickList
              className="mt-8"
              items={[
                "Bring a question paper and 3–4 answer sheets if you can",
                "See teacher review and how results are released",
                "Get the OnSite details for your school",
              ]}
            />
          </div>
          <div>
            <DemoForm origin="onsite-page" defaultInterest="onsite" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
