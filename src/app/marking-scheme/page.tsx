import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { ReviewPanel, RubricCard } from "@/components/Visuals";
import { TickList } from "@/components/Pen";

const PATH = "/marking-scheme/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="AI marking scheme"
      h1="One marking scheme per question. The same for every student."
      lede="Consistency starts with the scheme. Evalezy drafts criteria for each question that add up exactly to its marks, you edit what you want, and that scheme is used for every copy in the assessment."
      visual={<RubricCard />}
      faqs={[
        { q: "How many criteria does a question get?", a: "One for objective questions (one-mark answers and anything with options). Three to five for subjective questions, each with its share of the marks." },
        { q: "What if the criteria marks don't add up?", a: "They always do: criterion marks are rescaled so they sum exactly to the question's maximum marks." },
        { q: "Can I use my board's marking scheme?", a: "Yes. Replace the AI draft with your own criteria per question, or set a fixed scheme for the whole assessment. Add a model answer per question if you have one; a stored model answer is used ahead of anything generated." },
        { q: "Does the AI look for exact wording?", a: "No. A model answer is a reference, not wording the student must match. Answers that say the right thing in different words still earn the marks." },
        { q: "When is the scheme created?", a: "Once per question, the first time a copy of that assessment is checked, and then reused. Two copies starting at the same moment still get one scheme, not two." },
      ]}
    >
      <section className="wrap space-y-20 py-16 md:py-24">
        <FeatureRow
          eyebrow="Why it matters"
          title="Copy 1 and copy 200 are judged the same way."
          body={
            <>
              <p>When a person checks 200 copies, the standard drifts: generous early, strict late, or the other way round. When several teachers share a paper, each brings their own standard.</p>
              <p>Evalezy fixes the scheme before the first copy is checked and uses it for every copy. That is the single biggest reason AI checking can be fairer than a tired human, and why we ask you to read the scheme first.</p>
            </>
          }
          visual={
            <div className="card divide-y divide-line">
              {[
                ["Copy 1", "Q30", "0.5 / 3", "Named weather elements, not climate factors"],
                ["Copy 87", "Q30", "2.5 / 3", "Three factors, explained, no example"],
                ["Copy 200", "Q30", "3 / 3", "Factors, effects and an example"],
              ].map(([c, q, m, why]) => (
                <div key={c} className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{c} · {q}</p>
                    <p className="text-sm text-slate-500">{why}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-paper-2 px-3 py-1 font-mono text-sm font-semibold text-ink">{m}</span>
                </div>
              ))}
              <p className="p-4 text-xs text-slate-500">Illustration: three different answers to the same question, all judged against the same three criteria.</p>
            </div>
          }
        />
        <FeatureRow
          flip
          eyebrow="Guidance, not formulas"
          title="Criteria describe quality. The marks stay with the criterion."
          body={
            <>
              <p>Each criterion says what a good answer does: names the factors, explains the effect, gives an example. The marks live on the criterion, not inside the wording, so editing one never silently caps another.</p>
              <TickList items={["Marks awarded in half-mark steps", "Per-criterion marks shown on the review screen", "Edit a criterion and every later check uses the new version"]} />
            </>
          }
          visual={<ReviewPanel />}
        />
      </section>
    </PageShell>
  );
}
