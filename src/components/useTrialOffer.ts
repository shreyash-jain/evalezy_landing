"use client";

import { useEffect, useState } from "react";
import { EXTRA_CREDIT_INR, OFFER_API, PLANS, PLAN_MONTHS, TRIAL_CREDITS, TRIAL_DAYS, type Plan } from "@/lib/site";

export interface Offer {
  days: number;
  credits: number;
  plans: Plan[];
  months: number;
  extra: number;
}

const BUILT: Offer = { days: TRIAL_DAYS, credits: TRIAL_CREDITS, plans: PLANS, months: PLAN_MONTHS, extra: EXTRA_CREDIT_INR };
const count = (n: unknown, fallback: number) => (Number.isInteger(n) && (n as number) >= 0 ? (n as number) : fallback);
const okPlan = (p: Partial<Plan>): p is Plan =>
  typeof p?.key === "string" && typeof p?.name === "string" && [p.price_inr, p.credits, p.users].every((n) => Number.isInteger(n));

let cached: Promise<Offer> | null = null;

/** The offer from the health dashboard (trial, plans), read once per page view; build-time values until it answers. */
export function useTrialOffer(): Offer {
  const [offer, setOffer] = useState(BUILT);
  useEffect(() => {
    cached ??= fetch(OFFER_API)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((o): Offer => {
        const plans = Array.isArray(o.plans) && o.plans.length > 0 && o.plans.every(okPlan) ? (o.plans as Plan[]) : PLANS;
        return {
          days: count(o.trial_days, TRIAL_DAYS),
          credits: count(o.demo_credits, TRIAL_CREDITS),
          plans,
          months: count(o.plan_validity_months, PLAN_MONTHS) || PLAN_MONTHS,
          extra: typeof o.extra_credit_price_inr === "number" && o.extra_credit_price_inr >= 0 ? o.extra_credit_price_inr : EXTRA_CREDIT_INR,
        };
      })
      .catch(() => BUILT);
    let alive = true;
    cached.then((o) => alive && setOffer(o));
    return () => {
      alive = false;
    };
  }, []);
  return offer;
}
