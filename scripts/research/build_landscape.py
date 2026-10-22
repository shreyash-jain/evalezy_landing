#!/usr/bin/env python3
"""
Build the AI Answer-Sheet Evaluation Landscape dataset from the raw vendor research.

  python3 scripts/research/build_landscape.py

Inputs  scripts/research/*.json  (one array of vendor records per research batch; schema in BRIEF.md;
        evalezy.json is our own record) + scripts/research/corrections.json (later fixes, each with a source)
Outputs src/app/research/data/landscape.json                       (what the pages import)
        public/research/ai-answer-sheet-evaluation-landscape-2026.csv (the download, CC BY 4.0)

Scoring (published on the page, identical for every vendor, Evalezy included):
  yes = 1, partial = 0.5, no / unknown = 0. "Unknown" means the vendor does not document the capability
  publicly, so it scores 0; the page says so.
  Marking axis  = handwritten reading, AI marking of subjective answers, maths working, rubric / marking scheme,
                  partial marks with reasons, typed answers, Indian-language answers (7)
  Workflow axis = bulk scan upload, student identification, annotated copy returned, teacher review before
                  release, question-paper import, public API, integrity checks (7)
  Each axis is reported as a percentage of its maximum.
"""
import csv, json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "scripts/research"

MARKING = ["handwritten_reading", "subjective_ai_marking", "stem_maths", "rubric_marking_scheme",
           "partial_marks_feedback", "typed_answers", "indian_languages"]
WORKFLOW = ["bulk_scan_ingest", "student_identification", "annotated_copy", "teacher_review",
            "question_paper_import", "public_api", "integrity_checks"]
CAP_LABELS = {
    "handwritten_reading": "Reads handwriting", "subjective_ai_marking": "AI marks written answers",
    "stem_maths": "Maths working", "rubric_marking_scheme": "Rubric / marking scheme",
    "partial_marks_feedback": "Partial marks + reasons", "typed_answers": "Typed answers",
    "indian_languages": "Indian languages",
    "bulk_scan_ingest": "Bulk scan upload", "student_identification": "Identifies the student",
    "annotated_copy": "Annotated copy back", "teacher_review": "Teacher review",
    "question_paper_import": "Paper import", "public_api": "Public API", "integrity_checks": "Integrity checks",
}
POINTS = {"yes": 1.0, "partial": 0.5}
VALID = {"yes", "partial", "no", "unknown"}

BATCHES = ["evalezy.json", "india-ai.json", "india-osm.json", "global-handwritten.json", "global-ai-assistants.json"]

# Short display names (the full product name stays in "fullName" and in the CSV).
SHORT = {
    "Eklavvya AI Answer Sheet Checking (OSM Auto Evaluation)": "Eklavvya",
    "Grade Direct (formerly Graded Pro)": "Grade Direct",
    "Turnitin Feedback Studio (with Clarity and Originality)": "Turnitin",
    "TCS Marking as a Service (TCS iON Digital Marking Hub)": "TCS iON",
    "DEXIT On-Screen Marking (OSM)": "DEXIT Global",
    "TracMARKS": "MeritTrac",
    "Saras eMarking": "Excelsoft Saras",
    "Onmark": "Coempt Onmark",
    "Gradient (GradeCam)": "GradeCam",
    "Extramarks Extra Intelligence": "Extramarks",
    "Mercer | Mettl Digital Evaluation": "Mercer | Mettl",
}

def short_name(name: str) -> str:
    if name in SHORT:
        return SHORT[name]
    for full, short in SHORT.items():
        if name.startswith(full.split(" (")[0]) and len(name) > 22:
            return short
    return name if len(name) <= 22 else name.split(" (")[0]

def score(caps, keys):
    return sum(POINTS.get((caps.get(k) or {}).get("value", "unknown"), 0.0) for k in keys)

corrections_file = RAW / "corrections.json"
CORRECTIONS = json.loads(corrections_file.read_text()) if corrections_file.exists() else []

vendors, seen = [], set()
for fname in BATCHES:
    path = RAW / fname
    if not path.exists():
        print(f"(missing batch {fname}, skipped)")
        continue
    for v in json.loads(path.read_text()):
        key = v["name"].strip().lower()
        if key in seen:
            print(f"duplicate skipped: {v['name']} in {fname}")
            continue
        seen.add(key)
        caps = v.get("capabilities") or {}
        for c in CORRECTIONS:
            if c["vendor"].lower() == key:
                caps[c["cap"]] = {"value": c["value"], "evidence": c["evidence"]}
                v.setdefault("sources", {})[f'capabilities.{c["cap"]}'] = c["source"]
        clean = {}
        for k in MARKING + WORKFLOW:
            c = caps.get(k) or {}
            val = c.get("value", "unknown")
            clean[k] = {"value": val if val in VALID else "unknown", "evidence": (c.get("evidence") or "")[:240]}
        m, w = score(clean, MARKING), score(clean, WORKFLOW)
        is_us = fname == "evalezy.json"
        hq = v.get("hq_country") or ""
        vendors.append({
            "name": short_name(v["name"]),
            "fullName": v["name"],
            "company": v.get("company"),
            "region": "evalezy" if is_us else ("india" if hq.lower() == "india" else "global"),
            "hq": hq or None,
            "segment": v.get("segment"),
            "website": v.get("website"),
            "target": v.get("target_customers"),
            "pricing": v.get("pricing") or {},
            "capabilities": clean,
            "marking": round(m / len(MARKING) * 100),
            "workflow": round(w / len(WORKFLOW) * 100),
            "breadth": m + w,
            "scale": v.get("scale") or {},
            "notable": v.get("notable_2025_2026"),
            "notableSource": v.get("notable_source"),
            "sources": v.get("sources") or {},
            "asOf": v.get("as_of"),
        })

out = {"capLabels": CAP_LABELS, "marking": MARKING, "workflow": WORKFLOW, "vendors": vendors}
(ROOT / "src/app/research/data").mkdir(parents=True, exist_ok=True)
(ROOT / "src/app/research/data/landscape.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))

(ROOT / "public/research").mkdir(parents=True, exist_ok=True)
with open(ROOT / "public/research/ai-answer-sheet-evaluation-landscape-2026.csv", "w", newline="", encoding="utf-8") as f:
    wr = csv.writer(f)
    wr.writerow(["vendor", "product_full_name", "company", "region", "hq_country", "segment", "marking_score_pct", "workflow_score_pct",
                 "capabilities_out_of_14"] + [CAP_LABELS[k] for k in MARKING + WORKFLOW] +
                ["public_pricing", "pricing_model", "entry_price", "currency", "per", "free_plan", "as_of", "website", "pricing_source"])
    yn = lambda b: "" if b is None else ("yes" if b else "no")
    for v in vendors:
        p, e = v["pricing"], (v["pricing"].get("entry_price") or {})
        wr.writerow([v["name"], v["fullName"], v["company"] or "", v["region"], v["hq"] or "", v["segment"], v["marking"], v["workflow"], f'{v["breadth"]:g}']
                    + [v["capabilities"][k]["value"] for k in MARKING + WORKFLOW]
                    + [yn(p.get("public_pricing")), p.get("model") or "", e.get("amount") or "", e.get("currency") or "",
                       e.get("period") or "", yn(p.get("free_plan")), v["asOf"], v["website"] or "", v["sources"].get("pricing", "")])

for v in sorted(vendors, key=lambda x: -x["breadth"]):
    print(f'{v["name"][:24]:24} {v["region"]:8} {str(v["segment"])[:22]:22} M{v["marking"]:>4} W{v["workflow"]:>4}  {v["breadth"]:>4}/14')
print(len(vendors), "vendors")
