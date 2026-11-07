import { pageMetadata } from "@/components/PageShell";

const PATH = "/delete-account/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <main>
      <section className="wrap py-14 md:py-20">
        <p className="eyebrow">Legal</p>
        <h1 className="h-display mt-3 text-[2.5rem] text-ink md:text-[3.4rem]">Delete your Evalezy account</h1>
        <p className="mt-4 text-slate-600">Vidyayatan Technologies LLP</p>
        <div className="prose-ez mt-8 max-w-3xl">
          <p>This page is for people who use the Evalezy app (<code>io.evalezy.app</code>), published by Vidyayatan Technologies LLP.</p>
          <h2>Delete your account in the app</h2>
          <ol>
            <li>Sign in to the Evalezy app.</li>
            <li>Open the menu (three dots) and tap View profile.</li>
            <li>Tap Delete my account and confirm.</li>
          </ol>
          <p>Your access to the institute ends straight away and you are signed out.</p>
          <h2>Erase your personal details or your institute</h2>
          <ol>
            <li>Email <a href="mailto:hello@evalezy.com">hello@evalezy.com</a> from the email address on your Evalezy account.</li>
            <li>Use the subject &quot;Delete my Evalezy account&quot;.</li>
            <li>Tell us your username and your institute&apos;s name, and say if you also want the institute deleted.</li>
          </ol>
          <p>We may ask you to confirm the request. We complete it within 30 days.</p>
          <h2>What is deleted</h2>
          <ul>
            <li>Your access to the institute, as soon as you delete your account in the app.</li>
            <li>Your name, email address, phone number, username and password, when you ask us by email.</li>
            <li>If you are the only admin of your institute and ask us to delete it, its answer copies, question papers, results, checked copies and settings.</li>
          </ul>
          <h2>What is kept</h2>
          <ul>
            <li>Invoices and payment records, for as long as tax and accounting law requires.</li>
            <li>Backup copies, for up to 30 days after deletion.</li>
            <li>If your institute stays open, the copies and results that belong to it stay with the institute.</li>
          </ul>
          <p>Unused credits cannot be used after an institute is deleted.</p>
          <h2>Students and parents</h2>
          <p>If an institute uploaded your copy, please contact that institute. It controls that data, and we will help it respond to your request.</p>
        </div>
      </section>
    </main>
  );
}
