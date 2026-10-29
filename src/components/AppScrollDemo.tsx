"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Check, Download, FileText, ImagePlus, Upload } from "lucide-react";
import { PhoneFrame } from "./AppMock";

/**
 * /app/ walkthrough: three steps on the left, one phone on the right whose screen follows the step in view.
 * Below lg there is no sticky phone; each step shows its own screen. The last screen uses the real sample copy.
 */
const STEPS = [
  {
    k: "Add the paper",
    t: "Add the question paper once.",
    b: "Upload the question paper PDF and it is read into questions with marks. Evalezy drafts a marking scheme per question that you can edit. Do it once per test; every copy is marked to the same scheme.",
    note: "Today the paper is added in the Evalezy dashboard, with the same login.",
  },
  {
    k: "Add the copies",
    t: "Upload the copies, or click photos of them.",
    b: "Point the camera at each page and tap the shutter; tap Next student before the next copy. Or pick PDFs or photos already on the phone. Each student’s pages become one PDF.",
  },
  {
    k: "Get them checked",
    t: "Every copy comes back checked.",
    b: "Evalezy reads the name and roll number, matches the copy to the student and checks every answer. The student’s own copy comes back in red pen with the total circled. Download them all as one zip.",
  },
];

function Header({ step }: { step: number }) {
  return (
    <div className="border-b border-line bg-white px-4 pb-3 pt-8">
      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Step {step + 1} of 3</p>
      <p className="h-card truncate text-base text-ink">SST Half-Yearly Mock · IX-B</p>
      <div className="mt-2 flex gap-1">
        {STEPS.map((s, i) => (
          <span key={s.k} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-pen" : "bg-line"}`} />
        ))}
      </div>
    </div>
  );
}

function PaperScreen() {
  return (
    <div className="space-y-3 p-3">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-pen-50 text-pen-700"><FileText className="h-5 w-5" /></span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">SST_half_yearly_IX.pdf</p>
          <p className="text-xs text-ok">Read · 38 questions · 80 marks</p>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-white p-3">
        {[
          ["A", "Q1–20", "20"],
          ["B", "Q21–26", "12"],
          ["C", "Q27–32", "18"],
          ["D", "Q33–36", "20"],
          ["E", "Q37–38", "10"],
        ].map(([sec, q, m]) => (
          <div key={sec} className="flex items-center justify-between border-b border-line py-1.5 text-xs last:border-0">
            <span className="font-semibold text-ink">Section {sec}</span>
            <span className="text-slate-500">{q}</span>
            <span className="font-semibold text-ink">{m} marks</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-ok/30 bg-ok-50 p-3">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ok"><Check className="h-4 w-4" /> Marking scheme ready</p>
        <p className="mt-0.5 text-xs text-slate-600">One per question, criteria add up to the marks</p>
      </div>
      <span className="flex items-center justify-center gap-1.5 rounded-xl bg-pen py-3 text-sm font-bold text-white">Add copies</span>
    </div>
  );
}

function CameraScreen() {
  return (
    <div className="flex h-[calc(100%-5.6rem)] flex-col">
      <div className="flex gap-1 p-2">
        <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-ink py-1.5 text-xs font-bold text-white"><Camera className="h-3.5 w-3.5" /> Scan</span>
        <span className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-line bg-white py-1.5 text-xs font-bold text-slate-600"><Upload className="h-3.5 w-3.5" /> Upload files</span>
      </div>
      <div className="relative mx-2 flex-1 overflow-hidden rounded-xl bg-slate-800">
        <div className="absolute inset-4 rotate-[-2deg] rounded-sm bg-[#f4f1e8] p-3 shadow-lg">
          <p className="hand text-sm text-slate-700">Aditi Sharma · Roll 14 · IX-B</p>
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="mt-2.5 h-px bg-slate-300">
              <div className="h-[3px] -translate-y-1 rounded-full bg-slate-500/60" style={{ width: `${45 + ((i * 37) % 45)}%` }} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-2 rounded-lg border-2 border-dashed border-white/70" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[0.65rem] font-bold text-white">Page 2</span>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="flex items-center gap-1 text-xs font-semibold text-slate-600"><ImagePlus className="h-4 w-4" /> 2 pages</span>
        <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-pen/30 bg-pen" aria-hidden />
        <span className="rounded-lg border border-line bg-white px-2 py-1 text-xs font-bold text-ink">Next student</span>
      </div>
    </div>
  );
}

function CheckedScreen() {
  return (
    <div className="space-y-2 p-3">
      <div className="relative overflow-hidden rounded-lg border border-line bg-white">
        <img src="/copy/page-1-sm.webp" alt="Page 1 of a real Class IX Social Science copy checked by Evalezy, total 38/80 circled" width={560} height={747} className="h-[12rem] w-full object-cover object-top" />
        <span className="absolute bottom-2 left-2 rounded-full bg-ink/85 px-2 py-0.5 text-[0.65rem] font-bold text-white">Real checked copy</span>
      </div>
      {[
        { n: "Aditi Sharma", r: "Roll 14", s: "Checked · 38/80" },
        { n: "Rohan Gupta", r: "Roll 15", s: "Checked" },
        { n: "Sara Khan", r: "Roll 16", s: "Checked" },
      ].map((c) => (
        <div key={c.n} className="flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2">
          <div>
            <p className="text-sm font-semibold text-ink">{c.n}</p>
            <p className="text-[0.7rem] text-slate-500">{c.r}</p>
          </div>
          <span className="rounded-full bg-ok-50 px-2 py-0.5 text-[0.68rem] font-bold text-ok">{c.s}</span>
        </div>
      ))}
      <span className="flex items-center justify-center gap-1.5 rounded-xl bg-pen py-2.5 text-sm font-bold text-white"><Download className="h-4 w-4" /> Download checked copies</span>
    </div>
  );
}

const SCREENS = [PaperScreen, CameraScreen, CheckedScreen];

function Screen({ i }: { i: number }) {
  const S = SCREENS[i];
  return (
    <>
      <Header step={i} />
      <S />
    </>
  );
}

export function AppScrollDemo() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
      <ol>
        {STEPS.map((s, i) => (
          <li
            key={s.k}
            ref={(el) => { refs.current[i] = el; }}
            data-step={i}
            className={`flex flex-col justify-center py-10 transition-opacity duration-500 lg:min-h-[78vh] ${active === i ? "lg:opacity-100" : "lg:opacity-35"}`}
          >
            <p className="flex items-center gap-3">
              <span className="hand text-4xl text-pen">{i + 1}</span>
              <span className="eyebrow">{s.k}</span>
            </p>
            <h3 className="h-section mt-3 max-w-xl text-ink">{s.t}</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">{s.b}</p>
            {s.note && <p className="mt-3 max-w-xl text-sm text-slate-500">{s.note}</p>}
            <div className="mt-8 lg:hidden">
              <PhoneFrame><Screen i={i} /></PhoneFrame>
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-19rem)]">
          <PhoneFrame>
            {SCREENS.map((_, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${active === i ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={active !== i}>
                <Screen i={i} />
              </div>
            ))}
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
