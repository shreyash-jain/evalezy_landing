import { PageShell, pageMetadata } from "@/components/PageShell";
import { SampleViewer } from "@/components/Interactive";
import { MarkLegend } from "@/components/Visuals";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const PATH = "/sample/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <PageShell
      path={PATH}
      eyebrow="Sample checked copy"
      h1="A real answer sheet, checked by Evalezy."
      lede="A Class IX Social Science half-yearly mock test: 80 marks, 38 questions, 7 pages of a spiral notebook photographed on a phone. Every tick, cross, note and mark below was written by Evalezy. Final score: 38/80."
      secondary={{ href: "/evalezy-sample-checked-copy.pdf", label: "Download the PDF", track: "download_sample" }}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Sample answer copy checked by Evalezy",
          url: `${SITE}${PATH}`,
          image: Array.from({ length: 7 }, (_, i) => ({
            "@type": "ImageObject",
            contentUrl: `${SITE}/copy/page-${i + 1}.webp`,
            caption: `Page ${i + 1} of 7 of a Class IX Social Science answer copy checked by Evalezy`,
          })),
        }}
      />
      <section className="wrap py-14 md:py-20">
        <SampleViewer />
      </section>
      <section className="border-t border-line bg-white">
        <div className="wrap py-14 md:py-20">
          <h2 className="h-section text-ink">What to look for</h2>
          <div className="mt-8"><MarkLegend /></div>
          <ul className="mt-8 grid gap-4 text-slate-600 md:grid-cols-3">
            <li className="card p-5"><strong className="text-ink">Phone photo, not a scanner.</strong> Shadows, a curved spiral notebook and ruled lines, all read.</li>
            <li className="card p-5"><strong className="text-ink">Half marks with reasons.</strong> 1.5/2, 0.5/3, 3.5/5: each with a note on what was missing.</li>
            <li className="card p-5"><strong className="text-ink">Mixed handwriting quality.</strong> Crossed-out words, insertions above the line and answers that run across pages.</li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
