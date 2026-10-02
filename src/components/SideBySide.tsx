"use client";

import { useRef, useState } from "react";
import { Columns2, SplitSquareHorizontal } from "lucide-react";
import { COPY, PAGE_NOTES } from "@/content/sideBySide";

const PAGE_W = 1100;
const PAGE_H = 1681;

/**
 * The same 7-page scan, checked by a teacher (green) and by Evalezy (red). Both images are pixel-aligned, so a
 * wipe shows exactly where the two checkers differ. Drag on the page with a pointer (vertical swipes still scroll
 * on phones), or use the slider under it with a keyboard or screen reader.
 */
export function CopyCompareViewer() {
  const [page, setPage] = useState(1);
  const [pos, setPos] = useState(50);
  const [mode, setMode] = useState<"wipe" | "split">("wipe");
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const moveTo = (clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const src = (who: "teacher" | "ai", n = page) => `/side-by-side/${who}-p${n}.jpg`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Page" className="flex flex-wrap gap-1.5">
          {Array.from({ length: COPY.pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              role="tab"
              type="button"
              aria-selected={page === n}
              onClick={() => setPage(n)}
              className={`h-9 min-w-9 rounded-full px-3 text-sm font-semibold transition ${page === n ? "bg-ink text-white" : "bg-white text-slate-600 ring-1 ring-line hover:text-ink"}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div role="group" aria-label="View" className="inline-flex rounded-full border border-line bg-white p-0.5 text-xs font-bold">
          <button type="button" onClick={() => setMode("wipe")} aria-pressed={mode === "wipe"} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${mode === "wipe" ? "bg-ink text-white" : "text-slate-500 hover:text-ink"}`}>
            <SplitSquareHorizontal className="h-3.5 w-3.5" /> Wipe
          </button>
          <button type="button" onClick={() => setMode("split")} aria-pressed={mode === "split"} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${mode === "split" ? "bg-ink text-white" : "text-slate-500 hover:text-ink"}`}>
            <Columns2 className="h-3.5 w-3.5" /> Side by side
          </button>
        </div>
      </div>

      <p className="mt-4 min-h-12 max-w-3xl leading-relaxed text-slate-600" aria-live="polite">
        <span className="font-semibold text-ink">Page {page}.</span> {PAGE_NOTES[page - 1]}
      </p>

      {mode === "wipe" ? (
        <figure className="mx-auto mt-5 max-w-[40rem]">
          {/* Drag anywhere on the page. touch-action: pan-y keeps vertical swipes scrolling the page on phones. */}
          <div
            ref={frame}
            className="relative cursor-ew-resize select-none overflow-hidden rounded-lg bg-white shadow-paper"
            style={{ aspectRatio: `${PAGE_W} / ${PAGE_H}`, touchAction: "pan-y" }}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              moveTo(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <img src={src("teacher")} alt={`Page ${page}, checked by the teacher in green pen`} className="absolute inset-0 h-full w-full" width={PAGE_W} height={PAGE_H} draggable={false} />
            <img
              src={src("ai")}
              alt={`Page ${page}, checked by Evalezy in red pen`}
              className="absolute inset-0 h-full w-full"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              width={PAGE_W}
              height={PAGE_H}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-ink" style={{ left: `${pos}%` }}>
              <div className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-white shadow-lg">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#1f7a35] px-2.5 py-1 text-xs font-bold text-white">Teacher</span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-pen px-2.5 py-1 text-xs font-bold text-white">Evalezy</span>
          </div>
          <label className="mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <span className="text-[#1f7a35]">Teacher</span>
            <input
              type="range"
              min={0}
              max={100}
              step={0.5}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Compare the teacher's copy (left) with Evalezy's copy (right)"
              className="h-2 w-full cursor-ew-resize accent-[#0f1a3a]"
            />
            <span className="text-pen-700">Evalezy</span>
          </label>
          <figcaption className="mt-2 text-center text-sm text-slate-500">Drag across the page or use the slider: teacher’s green pen on the left, Evalezy’s red pen on the right.</figcaption>
        </figure>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 md:gap-5">
          {(["teacher", "ai"] as const).map((who) => (
            <figure key={who}>
              <figcaption className={`mb-2 text-sm font-bold ${who === "teacher" ? "text-[#1f7a35]" : "text-pen-700"}`}>
                {who === "teacher" ? `Teacher · ${COPY.teacherTotal}/${COPY.marks}` : `Evalezy · ${COPY.evalezyTotal}/${COPY.marks}`}
              </figcaption>
              <div className="overflow-hidden rounded-lg bg-white shadow-paper">
                <img src={src(who)} alt={`Page ${page}, checked by ${who === "teacher" ? "the teacher in green pen" : "Evalezy in red pen"}`} className="block h-auto w-full" width={PAGE_W} height={PAGE_H} loading="lazy" />
              </div>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
