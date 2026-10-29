import { Camera, Download } from "lucide-react";

/** The Evalezy app's batch screen, drawn in markup (no screenshot yet). Used on /app/ and the homepage. */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <figure data-llms-skip aria-label="Evalezy app screen (illustration)" className={`relative mx-auto w-[17.5rem] rounded-[2.6rem] border-[10px] border-ink bg-ink shadow-paper ${className}`}>
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative h-[36rem] overflow-hidden rounded-[2rem] bg-paper">{children}</div>
    </figure>
  );
}

export function PhoneMock() {
  return (
    <figure data-llms-skip aria-label="Evalezy app batch screen (illustration)" className="relative mx-auto w-[17.5rem] rounded-[2.6rem] border-[10px] border-ink bg-ink shadow-paper">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
      <div className="overflow-hidden rounded-[2rem] bg-paper">
        <div className="flex items-center justify-between border-b border-line bg-white px-4 pb-3 pt-8">
          <p className="h-card text-base text-ink">Unit Test 3 · Maths</p>
          <span className="rounded-full bg-pen-50 px-2 py-0.5 text-[0.65rem] font-bold text-pen-700">Class 8-B</span>
        </div>
        <div className="space-y-2 p-3">
          {[
            { n: "Aarav S.", r: "Roll 12", s: "Checked · 31/40", tone: "ok" },
            { n: "Diya M.", r: "Roll 13", s: "Checked · 27/40", tone: "ok" },
            { n: "Kabir R.", r: "Roll 14", s: "Checking Q9 of 18", tone: "run" },
            { n: "No name found", r: "3 pages", s: "Pick student", tone: "warn" },
          ].map((c) => (
            <div key={c.n} className="flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-ink">{c.n}</p>
                <p className="text-xs text-slate-500">{c.r}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[0.68rem] font-bold ${c.tone === "ok" ? "bg-ok-50 text-ok" : c.tone === "warn" ? "bg-warn-50 text-warn" : "bg-paper-2 text-slate-600"}`}>{c.s}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 border-t border-line bg-white p-3">
          <div className="flex gap-2">
            <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line py-2.5 text-xs font-bold text-ink"><Camera className="h-4 w-4" /> Scan</span>
            <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line py-2.5 text-xs font-bold text-ink">Upload files</span>
          </div>
          <span className="flex items-center justify-center gap-1.5 rounded-xl bg-pen py-3 text-sm font-bold text-white"><Download className="h-4 w-4" /> Download checked copies</span>
        </div>
      </div>
    </figure>
  );
}
