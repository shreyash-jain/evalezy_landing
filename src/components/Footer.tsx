import Link from "next/link";
import { Logo } from "./Logo";
import { AUDIENCES } from "@/content/audiences";
import { COMPARISONS } from "@/content/comparisons";
import { PRODUCT_NAV } from "@/lib/nav";
import { COMPANY, PRIVACY_URL, SALES_EMAIL, TERMS_URL, WHATSAPP_DISPLAY, bookHref, whatsappHref } from "@/lib/site";

export function Footer() {
  const cols: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: "Product",
      links: [
        { href: "/how-it-works/", label: "How it works" },
        ...PRODUCT_NAV.map((p) => ({ href: p.href, label: p.label })),
        { href: "/pricing/", label: "Pricing" },
        { href: "/sample/", label: "See a checked copy" },
        { href: "/side-by-side/", label: "AI vs teacher: one copy" },
      ],
    },
    {
      title: "Who it's for",
      links: [...AUDIENCES.map((a) => ({ href: `/for/${a.slug}/`, label: a.label })), { href: "/api/", label: "Evaluation API" }],
    },
    {
      title: "Compare & learn",
      links: [
        ...COMPARISONS.map((c) => ({ href: `/compare/${c.slug}/`, label: c.label })),
        { href: "/blog/", label: "Blog" },
        { href: "/faq/", label: "FAQ" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about/", label: "About" },
        { href: "https://vacademy.io/", label: "Vacademy" },
        { href: "/security/", label: "Data & privacy" },
        { href: bookHref(), label: "Book a demo" },
        { href: "/demo/#api", label: "Request API access" },
      ],
    },
  ];
  return (
    <footer className="border-t border-line bg-white">
      <div className="wrap grid gap-12 py-14 lg:grid-cols-[1.1fr_2.4fr]">
        <div>
          <Logo className="h-8 w-auto" />
          <p className="mt-4 max-w-xs leading-relaxed text-slate-600">
            AI answer-sheet checking that looks like a teacher&apos;s red pen. Built by the team behind{" "}
            <a href="https://vacademy.io/" className="font-semibold text-ink underline-offset-4 hover:underline">Vacademy</a>, the learning and assessment platform.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li>
              <a href={`mailto:${SALES_EMAIL}`} className="font-semibold text-ink hover:text-pen-700">{SALES_EMAIL}</a>
            </li>
            <li>
              <a href={whatsappHref()} className="hover:text-ink" data-track="whatsapp" rel="noopener" target="_blank">WhatsApp {WHATSAPP_DISPLAY}</a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-bold text-ink">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-slate-600 hover:text-ink">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY}. Evalezy is a{" "}
            <a href="https://vacademy.io/" className="hover:text-ink">Vacademy</a> product.
          </p>
          <div className="flex gap-5">
            <a href={PRIVACY_URL} className="hover:text-ink">Privacy</a>
            <a href={TERMS_URL} className="hover:text-ink">Terms</a>
            <a href="/llms.txt" className="hover:text-ink">llms.txt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
