import Link from "next/link";
import { ArrowRight, Clock, MessageCircle } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { SITE, signupHref, whatsappHref } from "@/lib/site";
import {
  FULL_TUTORIAL, TUTORIALS, TUTORIALS_PATH, TUTORIALS_UPDATED, type Tutorial,
  isoDuration, mmss, tutorialPoster, tutorialVideo,
} from "@/content/tutorials";

const PATH = TUTORIALS_PATH;
export const metadata = pageMetadata(PATH);

/** A portrait (9:16) tutorial in a phone frame. Loads only when played. */
function Video({ t, className = "" }: { t: Tutorial; className?: string }) {
  return (
    <div className={`mx-auto w-full rounded-[2rem] bg-ink p-2 shadow-[0_30px_60px_-30px_rgba(15,26,58,0.6)] ${className}`}>
      <video
        className="block aspect-[9/16] w-full rounded-[1.6rem] bg-paper object-cover"
        src={tutorialVideo(t.slug)}
        poster={tutorialPoster(t.slug)}
        controls
        playsInline
        preload="none"
        aria-label={t.title}
      />
    </div>
  );
}

export default function Page() {
  const all = [FULL_TUTORIAL, ...TUTORIALS];
  return (
    <PageShell
      path={PATH}
      eyebrow="Video tutorials"
      h1="Learn Evalezy in two minutes."
      lede={
        <>
          Short videos with voice and captions for every step: sign up, create a test from the question paper, add the copies,
          check them with AI and download the checked copies. The same steps work on the website and in the iPhone app.
        </>
      }
      visual={<Video t={FULL_TUTORIAL} className="max-w-[300px]" />}
      secondary={{ href: signupHref(), label: "Start free trial", track: "cta_trial_click" }}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Evalezy video tutorials",
          itemListElement: all.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "VideoObject",
              name: t.title,
              description: t.summary,
              thumbnailUrl: `${SITE}${tutorialPoster(t.slug)}`,
              contentUrl: `${SITE}${tutorialVideo(t.slug)}`,
              uploadDate: TUTORIALS_UPDATED,
              duration: isoDuration(t.duration),
              inLanguage: "en-IN",
            },
          })),
        }}
      />

      <section className="wrap py-14 md:py-20">
        <p className="eyebrow">The full flow</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">{FULL_TUTORIAL.title}</h2>
        <ol className="mt-8 grid gap-3 md:grid-cols-2">
          {FULL_TUTORIAL.steps.map((s, i) => (
            <li key={s} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
              <span className="hand shrink-0 text-2xl leading-none text-pen">{i + 1}.</span>
              <span className="leading-relaxed text-slate-700">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-white">
        <div className="wrap py-14 md:py-20">
          <p className="eyebrow">Step by step</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">One short video for each step</h2>
          <nav aria-label="Tutorials" className="mt-6 flex flex-wrap gap-2">
            {TUTORIALS.map((t, i) => (
              <a key={t.slug} href={`#${t.slug}`} className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-pen hover:text-pen-700">
                {i + 1}. {t.title}
              </a>
            ))}
          </nav>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {TUTORIALS.map((t, i) => (
              <article key={t.slug} id={t.slug} className="card scroll-mt-24 grid gap-6 p-5 sm:grid-cols-[200px_1fr] sm:p-6">
                <Video t={t} className="max-w-[220px] self-start sm:max-w-none" />
                <div>
                  <p className="eyebrow">Step {i + 1}</p>
                  <h3 className="h-card mt-2 text-xl text-ink">{t.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><Clock className="h-3.5 w-3.5" /> {mmss(t.duration)} · {t.summary}</p>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-slate-700 marker:font-bold marker:text-pen">
                    {t.steps.map((s) => <li key={s}>{s}</li>)}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-14">
        <div className="grid gap-6 rounded-3xl border border-line bg-paper p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="h-card text-2xl text-ink">Stuck on a step?</h2>
            <p className="mt-2 text-slate-600">Message us on WhatsApp with a screenshot and we will walk you through it, or read the <Link href="/faq/" className="font-semibold text-pen-700 underline underline-offset-4">FAQ</Link>.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={whatsappHref("Hi, I need help with a step in Evalezy.")} className="btn btn-outline btn-lg" data-track="tutorial_help_whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp us</a>
            <a href={signupHref()} className="btn btn-pen btn-lg" rel="nofollow" data-track="cta_trial_click">Start free trial <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
