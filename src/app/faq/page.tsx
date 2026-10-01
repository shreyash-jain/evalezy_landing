import { PageShell, pageMetadata } from "@/components/PageShell";
import { FaqList } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { ALL_FAQS, FAQ_GROUPS } from "@/content/faqs";

const PATH = "/faq/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="FAQ"
      h1="Questions about AI answer sheet checking"
      lede="How Evalezy marks, what it can and cannot read, how students are matched, what teachers control, what it costs and how the API works."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ALL_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <section className="wrap py-14 md:py-20">
        <div className="space-y-14">
          {FAQ_GROUPS.map((g) => (
            <div key={g.title} className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr]">
              <h2 className="h-display text-2xl text-ink md:text-3xl">{g.title}</h2>
              <FaqList faqs={g.faqs} withSchema={false} />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
