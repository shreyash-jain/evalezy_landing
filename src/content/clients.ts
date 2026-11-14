/**
 * Vacademy's client logos, exactly as on the vacademy.io homepage (landing_page origin/main dc6c4bb5, live
 * 2026-10-01; elevate.jpg cropped to its wordmark to drop a stray fragment). These institutes use Vacademy, the platform Evalezy is part of. They are NOT confirmed Evalezy
 * (AI copy-checking) users, so every place that shows them says so (docs/PRODUCT_FACTS.md → "Customers").
 *
 * width/height are the files' real pixel sizes, so the <img> never changes shape on load (the marquee
 * animates by -50% of its own width; a shape change would make it jump).
 */
export interface Client {
  src: string;
  name: string;
  width: number;
  height: number;
}

export const CLIENTS: Client[] = [
  { src: "/clients/ssdc-logo.webp", name: "SSDC", width: 120, height: 120 },
  { src: "/clients/code-circle-logo.webp", name: "Code Circle", width: 126, height: 48 },
  { src: "/clients/aanandham-logo.webp", name: "Aanandham", width: 120, height: 120 },
  { src: "/clients/the-7cs-logo.webp", name: "The 7Cs", width: 120, height: 120 },
  { src: "/clients/vet-education-logo.png", name: "VET Education", width: 110, height: 68 },
  { src: "/clients/edu_stream.webp", name: "Edu Stream", width: 120, height: 120 },
  { src: "/clients/five_sap.webp", name: "Five SAP", width: 120, height: 120 },
  { src: "/clients/jump_start.webp", name: "Jump Start", width: 392, height: 120 },
  { src: "/clients/read_on_rent.webp", name: "Read on Rent", width: 120, height: 120 },
  { src: "/clients/stemx.webp", name: "StemX", width: 120, height: 120 },
  { src: "/clients/enark-uplift.webp", name: "Enark Uplift", width: 234, height: 120 },
  { src: "/clients/shiksha-nation.webp", name: "Shiksha Nation", width: 120, height: 120 },
  { src: "/clients/dzumo.webp", name: "Dzumo", width: 120, height: 120 },
  { src: "/clients/agilore-global.webp", name: "Agilore Global", width: 413, height: 128 },
  { src: "/clients/be-bright.webp", name: "Be Bright", width: 446, height: 128 },
  { src: "/clients/brahm-varchas.webp", name: "Brahm Varchas", width: 128, height: 128 },
  { src: "/clients/dumbee.webp", name: "Dumbee", width: 128, height: 128 },
  { src: "/clients/elevate-wordmark.webp", name: "Elevate", width: 261, height: 84 },
  { src: "/clients/hcca.webp", name: "HCCA", width: 327, height: 128 },
  { src: "/clients/the-learning-bridge.webp", name: "The Learning Bridge", width: 239, height: 128 },
  { src: "/clients/oui-academie.webp", name: "Oui Académie", width: 204, height: 128 },
  { src: "/clients/sreedhars-tts.webp", name: "Sreedhar's TTS", width: 128, height: 128 },
  { src: "/clients/smart-ai-academy.webp", name: "Smart AI Academy", width: 130, height: 128 },
  { src: "/clients/suchbliss.webp", name: "Suchbliss", width: 276, height: 128 },
  { src: "/clients/vasco-maritime.webp", name: "Vasco Maritime Career Institute", width: 128, height: 128 },
];

/** The one sentence that frames the logos. vacademy.io's own line is "across 5 countries". */
export const CLIENTS_LINE = "Evalezy is built by the team behind Vacademy, the learning platform used by schools, online academies and training institutes across 5 countries.";
