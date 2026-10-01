import { MessageCircle, Mail } from "lucide-react";
import { pageMetadata } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/ui";
import { DemoForm } from "@/components/DemoForm";
import { TickList } from "@/components/Pen";
import { SALES_EMAIL, WHATSAPP_DISPLAY, whatsappHref } from "@/lib/site";

const PATH = "/demo/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="ruled-faint pointer-events-none absolute inset-0" />
      <div className="wrap relative grid gap-12 py-10 md:py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Breadcrumbs items={[{ label: "Book a demo" }]} />
          <p className="eyebrow mt-8">Book a demo</p>
          <h1 className="h-display mt-3 text-[2.5rem] text-ink md:text-[3.4rem]">See Evalezy check copies like yours.</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            A 20-minute call. We upload a question paper and a few scanned answer sheets, and you watch them come back checked in red pen, matched to students and ready to review.
          </p>
          <TickList
            className="mt-8"
            items={[
              "Bring a question paper and 3–4 scanned copies if you can",
              "See the review screen and how release works",
              "Get a cost estimate for your volume",
            ]}
          />
          <div className="mt-10 rounded-2xl border border-line bg-white p-6" id="api">
            <p className="h-card text-lg text-ink">Developers: request API access</p>
            <p className="mt-2 leading-relaxed text-slate-600">Choose &ldquo;API access&rdquo; in the form and tell us what you are building and your expected monthly pages. API access is enabled per account.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:gap-6">
            <a href={whatsappHref()} className="flex items-center gap-2 font-semibold text-ink hover:text-pen-700" data-track="whatsapp" target="_blank" rel="noopener">
              <MessageCircle className="h-4 w-4 text-pen" /> WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <a href={`mailto:${SALES_EMAIL}`} className="flex items-center gap-2 font-semibold text-ink hover:text-pen-700">
              <Mail className="h-4 w-4 text-pen" /> {SALES_EMAIL}
            </a>
          </div>
        </div>
        <div className="lg:pt-16">
          <DemoForm origin="demo-page" />
        </div>
      </div>
    </main>
  );
}
