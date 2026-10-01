/**
 * Demo and API-access requests go straight from the browser to the Vacademy CRM
 * (Audience Manager → the Evalezy audience), same pattern as vacademy.io,
 * tutezy.ai and telleo.ai.
 *
 * Browser-side on purpose: a Worker subrequest to backend-stage.vacademy.io
 * 308-loops at the edge.
 */
import { utmNote } from "./track";

const CRM_API_BASE = "https://backend-stage.vacademy.io";
const CRM_AUDIENCE_ID = "b4940a67-acc7-4c30-8259-5862a47db33f";

// Custom-field ids on that audience (ids, not names).
const CRM_FIELD = {
  fullName: "46d26332-cf27-4db0-955e-f5fec2a95f23",
  email: "307817d3-357a-4db3-a1c2-cbfbe491ef44",
  phone: "0884ac17-d227-49bc-be04-e7ca541eb1d1",
  designation: "b3a88220-ea06-4f87-a812-ef51aae5bcbe",
  instituteName: "aa7667ac-1e34-41a6-ba4d-eaa384656b90",
  /** Labelled "School Result" in the CRM; carries what the lead asked for (interest, volume, message, source). */
  details: "d10da8cf-b178-4002-b0bb-a669417e6690",
} as const;

export type Interest = "dashboard" | "api" | "both";

export interface DemoLead {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  role?: string;
  institute?: string;
  interest?: Interest;
  volume?: string;
  message?: string;
  /** Which form sent it, e.g. "demo-page", "api-page", "home". */
  origin?: string;
}

const INTEREST_LABEL: Record<Interest, string> = {
  dashboard: "Checking in the dashboard",
  api: "API access",
  both: "Dashboard + API",
};

/** One readable line for the CRM, e.g. "Evalezy · API access · 5,000–20,000 pages/mo · src: google/cpc · …". */
export function leadSummary(l: DemoLead): string {
  return [
    "Evalezy",
    l.interest ? INTEREST_LABEL[l.interest] : "",
    l.volume ? `${l.volume} pages/mo` : "",
    l.origin ? `form: ${l.origin}` : "",
    utmNote(),
    l.message?.trim() ? `"${l.message.trim()}"` : "",
  ]
    .filter(Boolean)
    .join(" · ")
    .slice(0, 900);
}

/** The CRM answers 200 with the new lead id, or 200 with a sentence when it refuses (e.g. duplicate email). */
function crmRejection(body: string): string | null {
  const text = (body || "").trim();
  if (!text) return "empty response";
  if (/^"?[0-9a-f-]{32,36}"?$/i.test(text)) return null;
  return text;
}

export async function submitDemoLead(lead: DemoLead): Promise<{ ok: boolean; note?: string; duplicate?: boolean }> {
  const name = lead.name.trim();
  const email = lead.email.trim();
  const fullPhone = lead.phone.trim() ? `${lead.countryCode}${lead.phone}`.replace(/[^+\d]/g, "") : "";
  const custom: Record<string, string> = {
    [CRM_FIELD.fullName]: name,
    [CRM_FIELD.email]: email,
    [CRM_FIELD.details]: leadSummary(lead),
  };
  if (fullPhone) custom[CRM_FIELD.phone] = fullPhone;
  if (lead.role?.trim()) custom[CRM_FIELD.designation] = lead.role.trim();
  if (lead.institute?.trim()) custom[CRM_FIELD.instituteName] = lead.institute.trim();

  try {
    const res = await fetch(`${CRM_API_BASE}/admin-core-service/open/v1/audience/lead/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
      keepalive: true,
      body: JSON.stringify({
        audience_id: CRM_AUDIENCE_ID,
        source_type: "AUDIENCE_CAMPAIGN",
        source_id: CRM_AUDIENCE_ID,
        custom_field_values: custom,
        user_dto: {
          id: "", username: email, email, full_name: name, address_line: "", city: "", region: "", pin_code: "",
          mobile_number: fullPhone, date_of_birth: null, gender: "", password: "", profile_pic_file_id: "",
          roles: [], last_login_time: null, root_user: false,
        },
      }),
    });
    const text = await res.text().catch(() => "");
    if (!res.ok) return { ok: false, note: `HTTP ${res.status}` };
    const rejection = crmRejection(text);
    if (rejection && !/duplicate|already/i.test(rejection)) return { ok: false, note: rejection };
    return { ok: true, duplicate: Boolean(rejection) };
  } catch (err) {
    return { ok: false, note: err instanceof Error ? err.message : "network error" };
  }
}
