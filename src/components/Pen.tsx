/**
 * Red-pen motifs drawn in SVG: the same marks Evalezy writes on a checked copy.
 * All decorative (aria-hidden); the words they wrap stay plain text for SEO and screen readers.
 */

/** A hand-drawn red underline under a word or phrase. */
export function PenUnderline({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.18em] left-0 z-0 h-[0.38em] w-full" aria-hidden>
        <path
          d="M3 13 C 60 6, 130 4, 200 7 S 280 12, 297 8"
          fill="none"
          stroke="#D61C28"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          className="animate-draw"
        />
      </svg>
    </span>
  );
}

/** A hand-drawn red loop around a word or number, like the circled total on page one. */
export function PenCircle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative mx-[0.1em] inline-block px-[0.16em] ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-[-0.1em] top-[-0.16em] z-0 h-[calc(100%+0.3em)] w-[calc(100%+0.2em)]"
        aria-hidden
      >
        <path
          d="M158 12 C 110 -2, 30 4, 10 40 C -4 70, 50 98, 112 96 C 170 94, 200 72, 195 42 C 190 16, 150 4, 96 6"
          fill="none"
          stroke="#D61C28"
          strokeWidth="3.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1"
          className="animate-draw"
        />
      </svg>
    </span>
  );
}

export function Tick({ className = "h-5 w-5", color = "#D61C28" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3.5 13.2 C 5.5 14.6, 7.6 16.8, 9.2 19.4 C 12.2 12.6, 16.2 7.4, 21 3.6" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Cross({ className = "h-5 w-5", color = "#D61C28" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 5.5 C 9 9.4, 14.6 14.8, 19.2 19" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M18.6 4.8 C 14.6 9, 9.4 14.6, 5.4 19.4" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/** A tick bullet list in red pen. */
export function TickList({ items, dark = false, className = "" }: { items: React.ReactNode[]; dark?: boolean; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className={`flex gap-3 leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
          <Tick className="mt-0.5 h-5 w-5 shrink-0" color={dark ? "#FF5A63" : "#D61C28"} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
