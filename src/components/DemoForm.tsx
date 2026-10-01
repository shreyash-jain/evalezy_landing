"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitDemoLead, type Interest } from "@/lib/leadSubmit";
import { track } from "@/lib/track";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/site";

const ROLES = ["Principal / Director", "Owner / Founder", "Exam controller / Academic head", "Teacher / Faculty", "Developer / Product", "Other"];
const VOLUMES = ["Under 1,000", "1,000–5,000", "5,000–20,000", "20,000–1,00,000", "Over 1,00,000"];
const CODES = ["+91", "+1", "+44", "+971", "+65", "+61", "+977", "+880", "+94"];

export function DemoForm({ origin, defaultInterest = "dashboard", compact = false }: { origin: string; defaultInterest?: Interest; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [dup, setDup] = useState(false);
  const [interest, setInterest] = useState<Interest>(defaultInterest);
  // /demo/#api (from the API page and pricing) opens the form on API access.
  useEffect(() => {
    const pick = () => {
      if (window.location.hash === "#api") setInterest("api");
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    if (get("website")) return; // honeypot
    setState("sending");
    const res = await submitDemoLead({
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      countryCode: get("cc") || "+91",
      role: get("role"),
      institute: get("institute"),
      interest,
      volume: get("volume"),
      message: get("message"),
      origin,
    });
    if (res.ok) {
      setDup(Boolean(res.duplicate));
      setState("done");
      track("demo_request", { interest, origin });
    } else {
      setState("error");
      track("demo_request_failed", { note: res.note });
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-paper">
        <CheckCircle2 className="mx-auto h-10 w-10 text-ok" />
        <p className="h-card mt-4 text-2xl text-ink">{dup ? "Welcome back. We have your details." : "Thank you. We'll be in touch."}</p>
        <p className="mx-auto mt-2 max-w-md text-slate-600">
          {interest === "api"
            ? "We usually reply within one working day with API access details."
            : "We usually call or email within one working day to set up your demo. Keep a question paper and three or four scanned copies handy."}
        </p>
        <a href={whatsappHref()} className="btn btn-outline mt-6" data-track="whatsapp" target="_blank" rel="noopener">
          Or WhatsApp us now: {WHATSAPP_DISPLAY}
        </a>
      </div>
    );
  }

  const input = "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[0.97rem] text-ink outline-none transition placeholder:text-slate-400 focus:border-ink";
  const label = "text-sm font-semibold text-ink";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-paper md:p-7" noValidate={false}>
      <fieldset>
        <legend className={label}>What are you looking for?</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {([["dashboard", "Check copies"], ["api", "API access"], ["both", "Both"]] as [Interest, string][]).map(([k, l]) => (
            <button
              key={k}
              type="button"
              onClick={() => setInterest(k)}
              aria-pressed={interest === k}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${interest === k ? "border-ink bg-ink text-white" : "border-line bg-white text-slate-600 hover:border-ink"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </fieldset>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <label className="block">
          <span className={label}>Full name</span>
          <input name="name" required autoComplete="name" className={`${input} mt-1.5`} placeholder="Your name" />
        </label>
        <label className="block">
          <span className={label}>Work email</span>
          <input name="email" type="email" required autoComplete="email" className={`${input} mt-1.5`} placeholder="you@school.edu" />
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <span className="mt-1.5 flex gap-2">
            <select name="cc" className={`${input} !w-24 shrink-0`} defaultValue="+91" aria-label="Country code">
              {CODES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input name="phone" type="tel" required autoComplete="tel-national" inputMode="tel" pattern="[0-9 ()-]{6,15}" className={input} placeholder="98765 43210" />
          </span>
        </label>
        <label className="block">
          <span className={label}>Your role</span>
          <select name="role" required className={`${input} mt-1.5`} defaultValue="">
            <option value="" disabled>Choose one</option>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={label}>{interest === "api" ? "Company / platform" : "School / institute"}</span>
          <input name="institute" required autoComplete="organization" className={`${input} mt-1.5`} placeholder={interest === "api" ? "Company name" : "Institute name"} />
        </label>
        <label className="block">
          <span className={label}>Pages checked per month</span>
          <select name="volume" className={`${input} mt-1.5`} defaultValue="">
            <option value="">Not sure yet</option>
            {VOLUMES.map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
      </div>
      <label className="block">
        <span className={label}>Anything we should know? <span className="font-normal text-slate-400">(optional)</span></span>
        <textarea name="message" rows={compact ? 2 : 3} className={`${input} mt-1.5`} placeholder="Subjects, board, class sizes, when your next exam is…" />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state === "error" && (
        <p className="rounded-xl bg-pen-50 px-4 py-3 text-sm text-pen-700">
          That did not go through. Please try again, or WhatsApp us at{" "}
          <a href={whatsappHref()} className="font-semibold underline">{WHATSAPP_DISPLAY}</a>.
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn btn-pen btn-lg w-full disabled:opacity-70">
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {interest === "api" ? "Request API access" : "Book my demo"}
        {state !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-slate-500">We usually reply within one working day. Your details stay with us.</p>
    </form>
  );
}
