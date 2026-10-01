"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import { PRICE_INR, PRICE_USD } from "@/lib/site";
import { track } from "@/lib/track";

/* ------------------------------------------------------------------ */
/* Currency: INR in India, USD elsewhere (decided after mount)          */
/* ------------------------------------------------------------------ */

export type Currency = "INR" | "USD";

export function useCurrency(): [Currency, (c: Currency) => void] {
  const [cur, setCur] = useState<Currency>("INR");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("evalezy.cur");
      if (saved === "INR" || saved === "USD") return setCur(saved);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz && !/Kolkata|Calcutta/.test(tz)) setCur("USD");
    } catch {
      /* keep INR */
    }
  }, []);
  const set = (c: Currency) => {
    setCur(c);
    try {
      localStorage.setItem("evalezy.cur", c);
    } catch {
      /* ignore */
    }
  };
  return [cur, set];
}

export function money(amount: number, cur: Currency) {
  if (cur === "INR") {
    return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: amount < 100 ? 2 : 0 })}`;
  }
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: amount < 1000 ? 2 : 0, maximumFractionDigits: 2 })}`;
}

function CurrencyToggle({ cur, setCur }: { cur: Currency; setCur: (c: Currency) => void }) {
  return (
    <div role="group" aria-label="Currency" className="inline-flex rounded-full border border-line bg-white p-0.5 text-xs font-bold">
      {(["INR", "USD"] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCur(c)}
          aria-pressed={cur === c}
          className={`rounded-full px-3 py-1.5 transition ${cur === c ? "bg-ink text-white" : "text-slate-500 hover:text-ink"}`}
        >
          {c === "INR" ? "₹ INR" : "$ USD"}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Anatomy of a checked copy: hotspots on the real page one             */
/* ------------------------------------------------------------------ */

const SPOTS = [
  { x: 87, y: 12.5, title: "The total, circled", body: "Marks are added up and the total is circled at the top right of page one, the way a teacher does. Here: 38 out of 80." },
  { x: 37.5, y: 17.4, title: "A tick on what earned marks", body: "Correct answers get a red tick on the line itself, drawn with a slightly uneven hand so it reads as pen, not stamp." },
  { x: 74, y: 19.3, title: "Marks per question, in the margin", body: "Every question gets its marks written beside it, in half-mark steps where the scheme allows." },
  { x: 30, y: 33.2, title: "A cross, with the correct answer", body: "Wrong answers get a cross and the correct answer beside it: \"Wrong answer. Correct: latitude (distance from the equator).\"" },
  { x: 60, y: 66.4, title: "A note where marks were lost", body: "Incomplete answers get a short note explaining what was missing, so the student knows what to fix, not just that they lost a mark." },
];

export function CopyAnatomy() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div className="relative mx-auto w-full max-w-[32rem]">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-paper">
          <img
            src="/copy/page-1.webp"
            alt="Page one of the sample answer copy checked by Evalezy"
            className="block h-auto w-full"
            loading="lazy"
            width={1200}
            height={1600}
          />
          {SPOTS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`${i + 1}. ${s.title}`}
              aria-pressed={active === i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <span className={`relative grid h-7 w-7 place-items-center rounded-full text-xs font-bold shadow-lg transition ${active === i ? "scale-110 bg-ink text-white" : "bg-white text-ink ring-2 ring-ink/80"}`}>
                {active === i && <span className="absolute inset-0 animate-pulse-dot rounded-full bg-ink/40" />}
                <span className="relative">{i + 1}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <ol className="space-y-2">
        {SPOTS.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`w-full rounded-2xl border p-4 text-left transition ${active === i ? "border-ink bg-white shadow-paper" : "border-transparent hover:border-line hover:bg-white/60"}`}
            >
              <span className="flex items-start gap-3">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active === i ? "bg-ink text-white" : "bg-paper-2 text-ink"}`}>{i + 1}</span>
                <span>
                  <span className="block font-semibold text-ink">{s.title}</span>
                  <span className={`mt-1 block leading-relaxed text-slate-600 ${active === i ? "" : "hidden lg:block lg:line-clamp-1"}`}>{s.body}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Code block + API tabs                                                */
/* ------------------------------------------------------------------ */

export function CodeBlock({ code, label, className = "" }: { code: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl border border-ink-3 bg-ink ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-slate-400">{label}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(code).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code overflow-x-auto p-4 text-slate-200"><code>{code}</code></pre>
    </div>
  );
}

export function ApiTabs({ tabs }: { tabs: { label: string; code: string; file?: string }[] }) {
  const [i, setI] = useState(0);
  const t = tabs[i];
  return (
    <div>
      <div role="tablist" className="mb-3 flex flex-wrap gap-1.5">
        {tabs.map((x, j) => (
          <button
            key={x.label}
            role="tab"
            type="button"
            aria-selected={i === j}
            onClick={() => setI(j)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${i === j ? "bg-ink text-white" : "bg-white text-slate-600 ring-1 ring-line hover:text-ink"}`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <CodeBlock code={t.code} label={t.file ?? t.label} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Price calculator                                                     */
/* ------------------------------------------------------------------ */

function NumberField({ id, label, value, onChange, min = 1, max = 100000, suffix }: { id: string; label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; suffix?: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="mt-1.5 flex items-center rounded-xl border border-line bg-white focus-within:border-ink">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(Math.max(0, Math.min(max, Number(e.target.value))))}
          className="w-full rounded-xl bg-transparent px-3.5 py-2.5 font-mono text-base text-ink outline-none"
        />
        {suffix && <span className="pr-3.5 text-sm text-slate-400">{suffix}</span>}
      </span>
    </label>
  );
}

export function PriceCalculator({ defaults = { copies: 160, pages: 8, tests: 4, minutes: 6 } }: { defaults?: { copies: number; pages: number; tests: number; minutes: number } }) {
  const [cur, setCur] = useCurrency();
  const [copies, setCopies] = useState(defaults.copies);
  const [pages, setPages] = useState(defaults.pages);
  const [tests, setTests] = useState(defaults.tests);
  const [minutes, setMinutes] = useState(defaults.minutes);
  const rate = cur === "INR" ? PRICE_INR : PRICE_USD;
  const r = useMemo(() => {
    const perTest = copies * pages * rate;
    const perMonth = perTest * tests;
    const hours = (copies * tests * minutes) / 60;
    return { perTest, perMonth, perCopy: pages * rate, hours, pagesMonth: copies * pages * tests };
  }, [copies, pages, tests, minutes, rate]);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-paper">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
        <p className="h-card text-lg text-ink">What would it cost you?</p>
        <CurrencyToggle cur={cur} setCur={setCur} />
      </div>
      <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
        <div className="grid grid-cols-2 gap-4 p-6">
          <NumberField id="calc-copies" label="Copies per test" value={copies} onChange={setCopies} suffix="students" />
          <NumberField id="calc-pages" label="Pages per copy" value={pages} onChange={setPages} max={40} suffix="pages" />
          <NumberField id="calc-tests" label="Tests per month" value={tests} onChange={setTests} max={100} />
          <NumberField id="calc-mins" label="Minutes to check one copy by hand" value={minutes} onChange={setMinutes} max={120} suffix="min" />
          <p className="col-span-2 text-xs leading-relaxed text-slate-500">
            Price is per page checked: {cur === "INR" ? `₹${PRICE_INR}` : `$${PRICE_USD}`}. Failed, stopped and unreadable copies are not charged.
            {cur === "INR" ? " Prices exclude GST." : ""}
          </p>
        </div>
        <div className="ruled flex flex-col justify-center gap-5 border-t border-line p-6 pl-16 md:border-l md:border-t-0">
          <div>
            <p className="text-sm text-slate-500">Per test</p>
            <p className="h-display text-4xl text-ink">{money(r.perTest, cur)}</p>
            <p className="text-sm text-slate-500">{money(r.perCopy, cur)} a copy</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Per month · {r.pagesMonth.toLocaleString("en-IN")} pages</p>
            <p className="h-display text-3xl text-pen">{money(r.perMonth, cur)}</p>
          </div>
          <div className="rounded-xl bg-white/80 p-3 ring-1 ring-line">
            <p className="text-sm text-slate-600">
              Checking by hand at {minutes} min a copy: <strong className="text-ink">{Math.round(r.hours).toLocaleString("en-IN")} teacher-hours</strong> a month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sample copy viewer                                                   */
/* ------------------------------------------------------------------ */

const SAMPLE_PAGES = [
  { n: 1, note: "Section A, one-mark answers: ticks, crosses with the correct answer beside them, and the total 38/80 circled at the top." },
  { n: 2, note: "The rest of Section A, then Section B: 1.5/2 with a note on what the definition missed, and 2/2 with \"Good.\"" },
  { n: 3, note: "Weather vs climate as a table (2/2); one feature where two were asked (1/2, \"Second feature missing\"); a muddled example (1.5/2)." },
  { n: 4, note: "Why study social science: 1.5/3 with a note on what the answer left out. The long answer on the atmosphere begins." },
  { n: 5, note: "The atmosphere answer finishes with 3/3. Factors of climate: 0.5/3, \"Only weather elements listed; no factors of climate explained.\"" },
  { n: 6, note: "Economic problems (3.5/5) with a note on what lacked detail; a case-based question (2.5/5) with the unanswered part flagged." },
  { n: 7, note: "The last answer, every part ticked: 5/5." },
];

export function SampleViewer() {
  const [p, setP] = useState(1);
  const page = SAMPLE_PAGES[p - 1];
  return (
    <div className="grid gap-6 lg:grid-cols-[7rem_1fr_18rem]">
      <ol className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
        {SAMPLE_PAGES.map((x) => (
          <li key={x.n} className="shrink-0">
            <button
              type="button"
              onClick={() => setP(x.n)}
              aria-label={`Page ${x.n}`}
              aria-pressed={p === x.n}
              className={`block w-16 overflow-hidden rounded-md border-2 bg-white transition lg:w-full ${p === x.n ? "border-pen" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={`/copy/page-${x.n}-sm.webp`} alt="" className="aspect-[3/4] w-full object-cover" loading="lazy" width={560} height={747} />
              <span className="block py-0.5 text-center text-[0.7rem] font-semibold text-slate-600">{x.n}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="order-1 lg:order-2">
        <div className="overflow-hidden rounded-lg bg-white shadow-paper">
          <img
            key={p}
            src={`/copy/page-${p}.webp`}
            alt={`Page ${p} of 7 of the sample answer copy checked by Evalezy. ${page.note}`}
            className="block h-auto w-full animate-rise"
            width={1200}
            height={1600}
          />
        </div>
      </div>
      <aside className="order-3 space-y-4">
        <div className="card p-5">
          <p className="eyebrow">Page {p} of 7</p>
          <p className="mt-2 leading-relaxed text-slate-700">{page.note}</p>
          <div className="mt-4 flex gap-2">
            <button type="button" className="btn btn-outline !px-3 !py-2 text-sm" onClick={() => setP(Math.max(1, p - 1))} disabled={p === 1}>Previous</button>
            <button type="button" className="btn btn-ink !px-3 !py-2 text-sm" onClick={() => setP(Math.min(7, p + 1))} disabled={p === 7}>Next page</button>
          </div>
        </div>
        <div className="card space-y-2 p-5 text-sm">
          <a href="/evalezy-sample-checked-copy.pdf" className="flex items-center gap-2 font-semibold text-ink hover:text-pen-700" data-track="download_sample" onClick={() => track("download_sample")} download>
            <Download className="h-4 w-4" /> Download the PDF (2.3 MB)
          </a>
          <a href={`/copy/page-${p}.webp`} target="_blank" rel="noopener" className="flex items-center gap-2 text-slate-600 hover:text-ink">
            <ExternalLink className="h-4 w-4" /> Open this page full size
          </a>
        </div>
      </aside>
    </div>
  );
}
