import { pageMetadata } from "@/components/PageShell";

const PATH = "/privacy/";
export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <main>
      <section className="wrap py-14 md:py-20">
        <p className="eyebrow">Legal</p>
        <h1 className="h-display mt-3 text-[2.5rem] text-ink md:text-[3.4rem]">Evalezy Privacy Policy</h1>
        <p className="mt-4 text-slate-600">Last updated: 7 November 2026</p>
        <div className="prose-ez mt-8 max-w-3xl">
          <p>Evalezy is a product of Vidyayatan Technologies LLP (&quot;we&quot;, &quot;us&quot;), 1st Floor, M-15 Shastri Nagar, Depot Square, Bhopal 462003, Madhya Pradesh, India.</p>
          <p>This policy explains what we collect when you use the Evalezy mobile app (<code>io.evalezy.app</code>) and website, why we collect it, and the choices you have.</p>
          <h2>Who this covers</h2>
          <p>Evalezy is used by teachers, schools, coaching institutes and colleges to check answer copies. Two groups of people are involved:</p>
          <ul>
            <li><strong>Account holders:</strong> the teachers and staff who sign in.</li>
            <li><strong>Students:</strong> the people whose answer copies are uploaded. Students do not use the Evalezy app to have a copy checked.</li>
          </ul>
          <p>The institute decides which copies to upload and owns its data. We process that data on the institute&apos;s instructions so that we can provide the service.</p>
          <h2>What we collect</h2>
          <p><strong>Account details.</strong> Your name, email address, phone number, username and password, and your institute&apos;s name, type, teacher count, city and state. If you sign in with Google on the web, we receive your name and email address from Google.</p>
          <p><strong>Answer copies and question papers.</strong> The photos and files you scan or upload, and anything written on them. Copies can show a student&apos;s name, roll number, class and handwriting.</p>
          <p><strong>Results.</strong> The marks, notes and checked copies Evalezy produces, the students you match copies to, and your evaluation settings.</p>
          <p><strong>Credit and payment records.</strong> Your credit balance, usage history, orders and invoices. Payments are made through our payment provider, which collects your card or bank details. We do not store full card numbers.</p>
          <p><strong>Device and usage data.</strong> Your device type, IP address, the actions you take in the app, and crash and error reports. If you allow notifications, we also store a push token for your device.</p>
          <h2>Camera and files</h2>
          <p>The app uses your camera only when you choose to scan a copy or a question paper. It reads files and photos only when you pick them.</p>
          <h2>How we use this information</h2>
          <ul>
            <li>To create your account and sign you in.</li>
            <li>To read, check and mark the copies you submit, and to produce the checked copies.</li>
            <li>To charge credits, issue invoices and show your usage history.</li>
            <li>To send sign-up codes, service emails and notifications, such as a message when a batch is finished.</li>
            <li>To keep the service secure, fix problems and improve the product.</li>
          </ul>
          <h2>AI processing</h2>
          <p>Pages are processed by our own systems and by the AI model and equation-reading providers we use to read handwriting and mark answers. Each step receives what it needs: page images for reading, and answer text and criteria for marking.</p>
          <p>AI marks can be wrong. Teachers should review them before relying on them.</p>
          <h2>Who we share information with</h2>
          <p>We do not sell personal data. We share information only with:</p>
          <ul>
            <li><strong>Your institute:</strong> its authorised staff can see the institute&apos;s copies, results and usage.</li>
            <li><strong>Service providers:</strong> companies that provide cloud hosting and storage, content delivery and security, AI processing, payments, email and notifications, crash reporting and product analytics. They process data to provide these services to us.</li>
            <li><strong>Authorities or successors:</strong> where the law requires it, to protect rights and safety, or as part of a merger or sale of the business.</li>
          </ul>
          <h2>Students and children</h2>
          <p>Answer copies may belong to children. The institute is responsible for having any notice or consent the law requires, including from a parent or guardian, before uploading a copy. The Evalezy app is meant for teachers and staff, not for children.</p>
          <h2>How long we keep information</h2>
          <p>We keep information while the account is active and for as long as we need it to provide the service, meet legal obligations and resolve disputes. Backup copies are kept for up to 30 days after deletion. We keep invoices and payment records for as long as tax and accounting law requires.</p>
          <h2>Deleting your account</h2>
          <p>You can ask us to delete your account and its data. You can delete your account in the app from View profile, or ask us by email. The steps, and what is deleted and kept, are at <a href="/delete-account/">evalezy.com/delete-account</a>.</p>
          <h2>Your rights</h2>
          <p>Subject to applicable law, including India&apos;s Digital Personal Data Protection Act, 2023, you can ask to access, correct or delete your personal data, withdraw consent, and raise a grievance.</p>
          <p>If you are a student or parent and your copy was uploaded by an institute, please contact that institute first. We will help it respond to your request.</p>
          <h2>Security</h2>
          <p>We use encryption in transit, role-based access and monitoring to protect data. No online service can be guaranteed completely secure, so please use a strong password and tell us about any suspected problem.</p>
          <h2>Where data is processed</h2>
          <p>Data may be stored or processed in India or in other countries where our service providers operate.</p>
          <h2>Changes to this policy</h2>
          <p>We will post any changes on this page and update the date at the top.</p>
          <h2>Contact us</h2>
          <p>Vidyayatan Technologies LLP</p>
          <p>1st Floor, M-15 Shastri Nagar, Depot Square, Bhopal 462003, Madhya Pradesh, India</p>
          <p>Email: <a href="mailto:hello@evalezy.com">hello@evalezy.com</a></p>
          <p>Grievance Officer: Shreyash Jain, <a href="mailto:shreyash@vidyayatan.com">shreyash@vidyayatan.com</a></p>
        </div>
      </section>
    </main>
  );
}
