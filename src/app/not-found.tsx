import Link from "next/link";
import { Cross } from "@/components/Pen";

export default function NotFound() {
  return (
    <main className="wrap grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <Cross className="mx-auto h-14 w-14" />
        <p className="hand mt-4 text-3xl text-pen">0 / 1 · page not found</p>
        <h1 className="h-display mt-4 text-4xl text-ink">This page isn&apos;t on the paper.</h1>
        <p className="mt-3 text-slate-600">The link may be old, or the page has moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-pen">Go home</Link>
          <Link href="/sample/" className="btn btn-outline">See a checked copy</Link>
        </div>
      </div>
    </main>
  );
}
