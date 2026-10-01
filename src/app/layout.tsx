import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Kalam, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tracking } from "@/components/Tracking";
import { COMPANY, SALES_EMAIL, SITE, SITE_NAME, WHATSAPP_NUMBER } from "@/lib/site";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-bricolage", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-kalam", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jb", display: "swap" });

/** Same GTM container as vacademy.io, tutezy.ai and telleo.ai; configure Evalezy triggers there (README). */
const GTM_ID = "GTM-5C4DDJ6W";

const DESCRIPTION =
  "Evalezy checks handwritten answer sheets with AI and returns each student's copy checked in red pen: ticks, crosses, notes, marks per question and the total circled. Bulk upload, automatic student matching, teacher review. ₹1 per page.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Evalezy: AI Answer Sheet Checking for Handwritten Copies", template: "%s | Evalezy" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/site.webmanifest",
  keywords: [
    "AI answer sheet checking", "AI copy checking", "answer sheet evaluation software", "handwritten answer evaluation",
    "AI exam paper checker", "automated answer sheet evaluation", "AI grading handwritten", "subjective answer evaluation AI",
    "answer sheet evaluation API", "on-screen marking alternative", "Evalezy",
  ],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: SITE_NAME,
    locale: "en_IN",
    title: "Evalezy: answer sheets checked by AI, in a teacher's red pen",
    description: "Upload a class's handwritten copies. Get each one back checked in red pen, matched to the right student, ready for teacher review. ₹1 per page.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "An answer sheet checked by Evalezy, with ticks, crosses and the total circled" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evalezy: answer sheets checked by AI, in a teacher's red pen",
    description: "Bulk upload handwritten copies, get them back checked in red pen. ₹1 per page.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  alternates: { canonical: SITE },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#FBF9F4", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: SITE_NAME,
      legalName: COMPANY,
      url: SITE,
      logo: `${SITE}/logo.png`,
      description: DESCRIPTION,
      email: SALES_EMAIL,
      sameAs: ["https://vacademy.io"],
      parentOrganization: { "@type": "Organization", name: "Vacademy", url: "https://vacademy.io" },
      contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: `+${WHATSAPP_NUMBER}`, email: SALES_EMAIL, availableLanguage: ["en", "hi"] }],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: SITE_NAME,
      url: SITE,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE}/#org` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE}/#app`,
      name: "Evalezy",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: SITE,
      description: DESCRIPTION,
      offers: [
        { "@type": "Offer", name: "Per page checked (India)", price: "1", priceCurrency: "INR", description: "₹1 per answer-sheet page checked, excluding GST" },
        { "@type": "Offer", name: "Per page checked", price: "0.01", priceCurrency: "USD", description: "$0.01 per answer-sheet page checked" },
      ],
      publisher: { "@id": `${SITE}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${inter.variable} ${kalam.variable} ${mono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="gtm" />
            </noscript>
          </>
        )}
        <Tracking />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Nav />
        <div id="main" className="pt-16 md:pt-[4.5rem]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
