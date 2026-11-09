// Before each build: read the free-trial offer the health dashboard set (Products → Evalezy:
// trial days, credits for each new sign-up) and write it to src/content/trialOffer.json.
// If the API cannot be reached, the file in git is kept, so a build never fails on this.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../src/content/trialOffer.json", import.meta.url);
const API = "https://backend-stage.vacademy.io";
const OFFER = `${API}/admin-core-service/public/product/v1/evalezy/offer`;
const CONFIG = `${API}/auth-service/v1/self-signup/config?product=evalezy`;

const current = JSON.parse(readFileSync(FILE, "utf8"));
const get = async (url) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};
const isCount = (n) => Number.isInteger(n) && n >= 0 && n <= 100000;

let next = { ...current };
let source = "file in git";
try {
  const o = await get(OFFER);
  if (isCount(o.trial_days)) next.trial_days = o.trial_days;
  if (isCount(o.demo_credits)) next.demo_credits = o.demo_credits;
  const okPlan = (p) => p && /^[a-z0-9-]{1,30}$/.test(p.key) && typeof p.name === "string" && [p.price_inr, p.credits, p.users].every(isCount);
  if (Array.isArray(o.plans) && o.plans.length > 0 && o.plans.every(okPlan)) {
    next.plans = o.plans.map(({ key, name, price_inr, credits, users }) => ({ key, name, price_inr, credits, users }));
  }
  if (isCount(o.plan_validity_months) && o.plan_validity_months > 0) next.plan_validity_months = o.plan_validity_months;
  if (typeof o.extra_credit_price_inr === "number" && o.extra_credit_price_inr >= 0) next.extra_credit_price_inr = o.extra_credit_price_inr;
  source = "health dashboard (offer API)";
} catch (e) {
  // Offer API not live yet: trial days still come from the sign-up config.
  try {
    const c = await get(CONFIG);
    if (isCount(c.trial_days)) next.trial_days = c.trial_days;
    source = "health dashboard (sign-up config); credits from the file in git";
  } catch (e2) {
    console.log(`trial offer: kept the file in git (${e2.message})`);
  }
}
if (JSON.stringify(next) !== JSON.stringify(current)) writeFileSync(FILE, JSON.stringify(next, null, 2) + "\n");

// llms.txt is a static file: keep its trial numbers in step.
const LLMS = new URL("../public/llms.txt", import.meta.url);
const llms = readFileSync(LLMS, "utf8");
const rs = (n) => `₹${n.toLocaleString("en-IN")}`;
const period = next.plan_validity_months === 12 ? "year" : `${next.plan_validity_months} months`;
const planText = next.plans
  .map((p) => `${p.name} ${rs(p.price_inr)} a ${period} (${p.users === 1 ? "1 user" : `${p.users} users`}, ${p.credits.toLocaleString("en-IN")} AI credits)`)
  .join(", ");
const priceSentence = `Price: plans with AI credits included: ${planText}; 1 credit checks 1 page; extra credits ${rs(next.extra_credit_price_inr)} each; failed, stopped and unreadable copies are free; ${next.trial_days}-day free trial without a card (1 teacher, ${next.demo_credits} free AI credits) at https://evalezy.vacademy.io/signup/start.`;
const fixed = llms
  .replace(/Price: [^\n]*?signup\/start\./, priceSentence)
  .replace(/^- \[Pricing\]\(https:\/\/evalezy\.com\/pricing\/\): .*$/m, `- [Pricing](https://evalezy.com/pricing/): ${planText}; 1 credit checks 1 page; extra credits ${rs(next.extra_credit_price_inr)}; ${next.trial_days}-day free trial`)
  .replace(/\b\d+-day (free )?trial/g, (_m, free) => `${next.trial_days}-day ${free ?? ""}trial`)
  .replace(/\b\d+ free AI credits/g, `${next.demo_credits} free AI credits`);
if (fixed !== llms) writeFileSync(LLMS, fixed);
console.log(`trial offer: ${next.trial_days} days, ${next.demo_credits} credits (${source})`);
