"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { CLIENTS, CLIENTS_LINE, type Client } from "@/content/clients";

/**
 * Vacademy's client logos (src/content/clients.ts), in full colour as on vacademy.io. Always on a white surface:
 * many files are JPGs with a white background. Every placement carries CLIENTS_LINE or similar framing: these
 * are Vacademy customers, not confirmed Evalezy users.
 */

/** Squarish marks render taller than wordmarks so both read at a similar visual weight. */
const heightFor = (c: Client, compact = false) =>
  c.width / c.height <= 1.25 ? (compact ? "h-8 md:h-10" : "h-9 md:h-12") : compact ? "h-6 md:h-8" : "h-7 md:h-9";

function LogoImg({ c, decorative = false, compact = false }: { c: Client; decorative?: boolean; compact?: boolean }) {
  return (
    <img
      src={c.src}
      alt={decorative ? "" : c.name}
      title={decorative ? undefined : c.name}
      width={c.width}
      height={c.height}
      loading="lazy"
      decoding="async"
      className={`${heightFor(c, compact)} w-auto object-contain`}
    />
  );
}

/**
 * Two rows scrolling in opposite directions. Each row holds four copies of its logos and moves by -50%
 * (two copies), so the track is always wider than the screen (no blank gap on 2560px displays) and the loop
 * is seamless (every <li> carries its own padding). A visible button pauses it (WCAG 2.2.2), as do hover and
 * keyboard focus. Visitors who prefer reduced motion get one static, wrapped set instead.
 */
export function ClientMarquee({ label = CLIENTS_LINE }: { label?: string }) {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(CLIENTS.length / 2);
  const rows = [CLIENTS.slice(0, half), CLIENTS.slice(half)];
  const state = paused ? "[animation-play-state:paused]" : "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]";

  return (
    <figure className="bg-white">
      <figcaption className="mx-auto max-w-2xl px-5 text-center text-sm leading-relaxed text-slate-500">{label}</figcaption>

      {/* Moving version */}
      <div className="group relative mt-7 motion-reduce:hidden">
        <div className="space-y-5 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
          {rows.map((row, r) => (
            <div key={r} className="overflow-hidden">
              <ul
                aria-label={r === 0 ? "Institutes that use Vacademy" : undefined}
                className={`flex w-max items-center ${r % 2 ? "animate-marquee-rev" : "animate-marquee"} ${state}`}
              >
                {[0, 1, 2, 3].map((copy) =>
                  row.map((c) => (
                    <li key={`${copy}-${c.src}`} aria-hidden={copy > 0 || undefined} className="flex shrink-0 items-center px-5 md:px-8">
                      <LogoImg c={c} decorative={copy > 0} />
                    </li>
                  )),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="wrap mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-ink hover:text-ink"
          >
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
            {paused ? "Play logos" : "Pause logos"}
          </button>
        </div>
      </div>

      {/* Reduced-motion version: every logo once, wrapped and centred */}
      <ul data-llms-skip aria-label="Institutes that use Vacademy" className="wrap mt-7 hidden flex-wrap items-center justify-center gap-x-5 gap-y-4 motion-reduce:flex md:gap-x-10 md:gap-y-6">
        {CLIENTS.map((c) => (
          <li key={c.src} className="flex items-center">
            <LogoImg c={c} compact />
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** Every logo with its name, for the About page. */
export function ClientGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="Institutes that use Vacademy">
      {CLIENTS.map((c) => (
        <li key={c.src} className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-5 text-center">
          <span className="flex h-14 items-center">
            <img src={c.src} alt="" width={c.width} height={c.height} loading="lazy" decoding="async" className={`${c.width / c.height <= 1.25 ? "h-14" : "h-10"} w-auto max-w-full object-contain`} />
          </span>
          <span className="text-xs font-semibold text-slate-600">{c.name}</span>
        </li>
      ))}
    </ul>
  );
}
