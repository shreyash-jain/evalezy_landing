"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Icon } from "./ui";
import { AUDIENCE_NAV, COMPARE_NAV, DEV_NAV, PRODUCT_NAV, RESOURCE_NAV } from "@/lib/nav";
import { LOGIN_URL, bookHref } from "@/lib/site";

type MenuKey = "product" | "solutions" | "resources" | null;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const link = "rounded-full px-3 py-2 text-[0.93rem] font-semibold text-slate-700 transition hover:text-ink";

  const Trigger = ({ k, label }: { k: Exclude<MenuKey, null>; label: string }) => (
    <button
      type="button"
      className={`flex items-center gap-1 ${link}`}
      aria-expanded={open === k}
      onClick={() => setOpen(open === k ? null : k)}
      onMouseEnter={() => setOpen(k)}
    >
      {label}
      <ChevronDown className={`h-4 w-4 transition ${open === k ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open || mobile ? "border-b border-line bg-paper/92 backdrop-blur-md" : "bg-paper/0"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" aria-label="Evalezy by Vacademy, home" className="flex shrink-0 items-end gap-2">
          <Logo className="h-7 w-auto md:h-8" />
          <span className="hidden pb-0.5 text-[0.7rem] font-semibold tracking-wide text-slate-500 sm:inline md:text-xs">by Vacademy</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          <Trigger k="product" label="Product" />
          <Trigger k="solutions" label="Who it's for" />
          <Link href="/pricing/" className={link} onMouseEnter={() => setOpen(null)}>Pricing</Link>
          <Link href="/api/" className={link} onMouseEnter={() => setOpen(null)}>API</Link>
          <Trigger k="resources" label="Resources" />
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={LOGIN_URL} className={link} rel="nofollow">Log in</a>
          <Link href={bookHref()} className="btn btn-pen !py-2.5" data-track="book_demo">
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
          onClick={() => setMobile((m) => !m)}
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop mega menus */}
      {open && (
        <div className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_30px_60px_-30px_rgba(15,26,58,0.35)] lg:block">
          <div className="wrap py-8">
            {open === "product" && (
              <div className="grid grid-cols-[1fr_1fr_19rem] gap-8">
                <ul className="col-span-2 grid grid-cols-2 gap-1">
                  {PRODUCT_NAV.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="block rounded-xl p-4 transition hover:bg-paper">
                        <span className="font-bold text-ink">{p.label}</span>
                        <span className="mt-1 block text-sm text-slate-500">{p.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl bg-ink p-6 text-white">
                  <p className="text-sm font-bold text-pen-300">For developers</p>
                  <ul className="mt-3 space-y-3">
                    {DEV_NAV.map((d) => (
                      <li key={d.href}>
                        <Link href={d.href} className="block text-sm hover:text-pen-200">
                          <span className="font-semibold">{d.label}</span>
                          <span className="block text-slate-400">{d.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/how-it-works/" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-white hover:text-pen-200">
                    How it works <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
            {open === "solutions" && (
              <div className="grid grid-cols-[1.4fr_1fr] gap-10">
                <ul className="grid grid-cols-2 gap-1">
                  {AUDIENCE_NAV.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/for/${a.slug}/`} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-paper">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-pen-50 text-pen-700"><Icon name={a.icon} className="h-[1.1rem] w-[1.1rem]" /></span>
                        <span className="font-semibold text-ink">{a.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div>
                  <p className="eyebrow">Compare</p>
                  <ul className="mt-3 space-y-1">
                    {COMPARE_NAV.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/compare/${c.slug}/`} className="block rounded-lg px-2 py-1.5 text-[0.95rem] text-slate-700 hover:bg-paper hover:text-ink">{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {open === "resources" && (
              <ul className="grid grid-cols-3 gap-1">
                {RESOURCE_NAV.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="block rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-paper hover:text-ink">{r.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobile && (
        <div className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper lg:hidden">
          <div className="wrap space-y-6 py-6">
            <MobileGroup title="Product" open items={PRODUCT_NAV.map((p) => ({ href: p.href, label: p.label }))} />
            <MobileGroup title="Who it's for" items={AUDIENCE_NAV.map((a) => ({ href: `/for/${a.slug}/`, label: a.label }))} />
            <MobileGroup
              title="Pricing, API & resources"
              items={[{ href: "/pricing/", label: "Pricing" }, { href: "/api/", label: "API" }, ...RESOURCE_NAV.map((r) => ({ href: r.href, label: r.label }))]}
            />
            <div className="grid gap-3 pb-8">
              <Link href={bookHref()} className="btn btn-pen btn-lg w-full" data-track="book_demo">Book a demo</Link>
              <a href={LOGIN_URL} className="btn btn-outline btn-lg w-full" rel="nofollow">Log in</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileGroup({ title, items, open = false }: { title: string; items: { href: string; label: string }[]; open?: boolean }) {
  return (
    <details className="group border-b border-line pb-4" open={open}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
      </summary>
      <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="block rounded-lg py-2 text-slate-700">{i.label}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
