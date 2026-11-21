import Link from "next/link";
import { ArrowRight, Cloud, Printer, ScanLine } from "lucide-react";
import { TickList } from "./Pen";
import { EXTRA_CREDIT_INR, ONSITE } from "@/lib/site";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * Evalezy OnSite drawn as an all-in-one printer: the handwritten copy feeds in at the top, the screen runs
 * Scanning → Evalezy is checking → Printing, and the red-pen checked copy slides out of the slot. The checking
 * itself runs online (the "checks online" tag), never on the printer. Animations: onsite-* in globals.css; with
 * reduced motion the picture rests on its last frame (copy printed).
 */
export function PrinterVisual() {
  const shadow = "shadow-[0_34px_60px_-30px_rgba(15,26,58,0.5)]";
  return (
    <div className="relative mx-auto w-full max-w-[22rem] select-none pt-2" aria-hidden>
      <p className="hand absolute -left-4 top-6 hidden -rotate-6 text-xl text-pen sm:block md:-left-16">scan in ↓</p>

      {/* Document feeder: the tray, its paper guides and the student's copy going in */}
      <div className="relative mx-auto h-44 w-64">
        <div className="absolute inset-x-0 bottom-0 top-10 rounded-t-2xl border border-line bg-paper-3" />
        <div className="absolute bottom-0 left-4 top-14 w-1.5 rounded-full bg-line" />
        <div className="absolute bottom-0 right-4 top-14 w-1.5 rounded-full bg-line" />
        {/* The next students' copies, waiting in the tray */}
        <div className="absolute inset-x-0 top-[4.5rem] flex justify-center">
          <div className="ruled h-28 w-52 rotate-1 rounded-t-md border border-line shadow-paper" />
        </div>
        <div className="absolute inset-x-0 top-[4rem] flex justify-center">
          <div className="ruled h-28 w-52 -rotate-[0.5deg] rounded-t-md border border-line" />
        </div>
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div className="animate-onsite-feed relative h-44 w-52 -rotate-1 overflow-hidden rounded-t-md border border-line bg-white shadow-paper">
            <div className="ruled absolute inset-0" />
            {/* leading-8 = the 2rem rules of .ruled; pl clears its 3.25rem margin line */}
            <div className="hand relative whitespace-nowrap pl-[3.7rem] pt-[0.55rem] text-[0.82rem] leading-8 text-biro">
              <p>Q1. Democracy is rule</p>
              <p>by the people, who</p>
              <p>elect their leaders</p>
              <p>and can change them.</p>
              <p>Q2. (a) Monsoon…</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scanner lid with the feeder slot */}
      <div className="relative z-10 -mt-7 rounded-t-[1.4rem] border border-b-0 border-line bg-white px-6 pb-2 pt-3">
        <div className="mx-auto h-2 w-56 max-w-full rounded-full bg-ink/85" />
        <div className="mt-3 h-px bg-line" />
        <span className="absolute -right-3 -top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-paper ring-1 ring-line sm:-right-8">
          <Cloud className="h-3.5 w-3.5 text-pen" /> Evalezy checks it online
        </span>
      </div>

      {/* Body: control panel (screen, buttons, power) and the output slot */}
      <div className="relative z-10 border-x border-line bg-white px-5 pb-3 pt-1">
        <div className="flex items-center gap-3">
          <div className="relative h-11 flex-1 overflow-hidden rounded-lg bg-ink ring-2 ring-paper-3">
            <span className="animate-onsite-s1 absolute inset-x-3 top-2 flex items-center gap-1.5 text-[0.7rem] font-semibold text-white opacity-0">
              <ScanLine className="h-3.5 w-3.5 text-pen-300" /> Scanning the copy…
            </span>
            <span className="animate-onsite-s2 absolute inset-x-3 top-2 flex items-center gap-1.5 text-[0.7rem] font-semibold text-white opacity-0">
              <Cloud className="h-3.5 w-3.5 text-pen-300" /> Evalezy is checking…
            </span>
            <span className="animate-onsite-s3 absolute inset-x-3 top-2 flex items-center gap-1.5 text-[0.7rem] font-semibold text-white">
              <Printer className="h-3.5 w-3.5 text-pen-300" /> Printing checked copy
            </span>
            <div className="absolute inset-x-3 bottom-2 h-1 overflow-hidden rounded-full bg-white/15">
              <div className="animate-onsite-bar h-full w-full rounded-full bg-pen" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-3.5 w-3.5 rounded-full border border-line bg-paper-2" />
            ))}
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-paper-2">
            <span className="h-2 w-2 rounded-full bg-ok" />
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-slate-400">{ONSITE.name}</span>
          <span className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-3 w-1 rounded-full bg-paper-3" />)}
          </span>
        </div>
        <div className="mt-2.5 h-2.5 rounded-full bg-ink" />
      </div>

      {/* Paper drawer and feet, with the checked copy sliding out of the slot over them */}
      <div className="relative">
        <div className={`rounded-b-[1.4rem] border border-t-0 border-line bg-white px-5 pb-4 pt-2 ${shadow}`}>
          <div className="flex h-20 items-end justify-center rounded-xl border border-line bg-paper-2 pb-2.5">
            <span className="h-1.5 w-16 rounded-full bg-paper-3" />
          </div>
        </div>
        <div className="flex justify-between px-10">
          <span className="h-1.5 w-10 rounded-b-md bg-ink/20" />
          <span className="h-1.5 w-10 rounded-b-md bg-ink/20" />
        </div>
        {/* Top edge = the middle of the slot, so the copy appears out of it */}
        <div className="absolute inset-x-0 -top-[1.1rem] z-20 flex justify-center">
          <div className="h-44 w-52 overflow-hidden px-4 pb-4 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <img src="/copy/page-1-sm.webp" alt="" width={560} height={746} className="animate-onsite-out w-full rounded-b-sm shadow-paper" />
          </div>
        </div>
      </div>
      <p className="hand absolute -right-4 bottom-6 hidden rotate-6 text-xl text-pen sm:block md:-right-24">checked copy out</p>
    </div>
  );
}

/**
 * Hero picture, as on the Evalezy standee: the printer photo, the student's copy going in unchecked on the left and
 * the same copy coming out checked on the right. The copy is the maths copy from /side-by-side/, cropped above Q28.
 */
export function OnsitePhoto() {
  return (
    <figure className="relative mx-auto w-full max-w-[34rem] select-none px-3 pb-14 pt-6 sm:px-6">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#1c2544] shadow-[0_40px_80px_-40px_rgba(15,26,58,0.6)]">
        <img
          src="/onsite/printer.webp"
          alt="An all-in-one printer with an answer copy in its feeder and a page coming out"
          width={1400}
          height={1050}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* Dashed arrows: pile → feeder, output → checked copy. viewBox matches the 4:3 card. */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
          <defs>
            <marker id="onsite-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M1 1 L8 5 L1 9" stroke="#ff5a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </marker>
          </defs>
          <path d="M112 62 C 150 40, 178 58, 172 96" stroke="#ff5a63" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" markerEnd="url(#onsite-arrow)" />
          <path d="M214 236 C 210 262, 226 276, 250 276" stroke="#ff5a63" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" markerEnd="url(#onsite-arrow)" />
        </svg>
      </div>

      <div className="absolute left-0 top-0 w-[38%] -rotate-6 sm:-left-6">
        <span className="absolute -top-3 left-3 z-10 rounded-full bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink shadow-paper ring-1 ring-line">In · Unchecked</span>
        <img src="/onsite/copy-in.webp" alt="A student's maths answer copy before checking" width={640} height={554} className="w-full rounded-md border border-line bg-white shadow-paper" />
      </div>

      <div className="absolute bottom-0 right-0 w-[40%] rotate-3 sm:-right-6">
        <span className="absolute -top-3 left-3 z-10 rounded-full bg-pen px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-paper">Out · Checked</span>
        <img src="/onsite/copy-out.webp" alt="The same copy checked by Evalezy in red pen: ticks, a cross, 2.5/3 and a note" width={640} height={554} className="w-full rounded-md border border-line bg-white shadow-paper" />
      </div>

      <figcaption className="absolute inset-x-0 -bottom-3 text-center text-xs text-slate-500 sm:text-left sm:pl-6">The same real student copy, before and after.</figcaption>
    </figure>
  );
}

/** The OnSite plan as one wide card, under the online plans on /pricing/ and in the home page's pricing section. */
export function OnsiteCard({ as: Heading = "h2", className = "" }: { as?: "h2" | "h3"; className?: string }) {
  return (
    <div className={`mx-auto grid max-w-5xl gap-8 rounded-[1.25rem] border-2 border-ink bg-white p-7 md:grid-cols-[1fr_1.1fr_auto] md:items-center ${className}`}>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Heading className="h-card text-xl text-ink">{ONSITE.name}</Heading>
          <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">New · Printer included</span>
        </div>
        <p className="mt-1 text-sm text-slate-500">Scanning and printing at your school</p>
        <p className="h-display mt-4 text-5xl text-ink">{inr(ONSITE.price_inr)}<span className="text-xl text-slate-500"> + GST</span></p>
        <p className="mt-1 text-sm font-semibold text-pen-700">{ONSITE.credits.toLocaleString("en-IN")} AI credits included</p>
        <p className="mt-3 text-sm text-slate-600">On-site support: <strong className="text-ink">+{inr(ONSITE.onsite_support_inr)}</strong></p>
      </div>
      <TickList
        items={[
          "An all-in-one printer (scan + print) for your school",
          `${ONSITE.credits.toLocaleString("en-IN")} pages checked (1 credit = 1 page)`,
          "Scan the copies in, print the checked copies out",
          "Online support included",
          `Extra credits ₹${EXTRA_CREDIT_INR} each`,
        ]}
      />
      <div className="flex flex-col gap-3 md:w-56">
        <Link href="/onsite/#demo" className="btn btn-pen w-full" data-track="onsite_demo">Book an OnSite demo</Link>
        <Link href="/onsite/" className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-pen-700" data-track="onsite_view">
          How OnSite works <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
