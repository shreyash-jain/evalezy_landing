import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { POSTS, postPath } from "@/content/posts";

const PATH = "/blog/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  const posts = [...POSTS].sort((a, b) => (b.published > a.published ? 1 : -1));
  return (
    <PageShell
      path={PATH}
      eyebrow="Blog"
      h1="Guides for faster, fairer checking"
      lede="Practical writing for teachers, exam heads and edtech builders on checking answer sheets, marking schemes, scanning and using AI without losing control."
      secondary={null}
    >
      <section className="wrap py-16 md:py-20">
        {posts.length === 0 ? (
          <p className="text-slate-600">First posts coming soon.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={postPath(p.slug)} className="card card-hover group flex flex-col p-7">
                <p className="eyebrow">{p.category}</p>
                <h2 className="h-card mt-3 text-xl leading-snug text-ink">{p.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{p.description}</p>
                <p className="mt-5 flex items-center justify-between text-sm text-slate-500">
                  <span>{new Date(`${p.published}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {p.readMins} min read</span>
                  <ArrowRight className="h-4 w-4 text-pen transition group-hover:translate-x-0.5" />
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
