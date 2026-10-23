// Tell Bing (which ChatGPT search and Copilot draw on), Yandex, Seznam and Naver that pages changed.
// Run after a deploy is live:  pnpm indexnow            (every URL in the live sitemap)
//                              pnpm indexnow /pricing/  (only these paths)
// The key file public/<key>.txt must be live at https://evalezy.com/<key>.txt first.
const SITE = "https://evalezy.com";
const KEY = "a25de188d5f90aa74a1ca1e604cf24b5";

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => new URL(p, SITE).href);
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const keyLive = await fetch(`${SITE}/${KEY}.txt`).then((r) => (r.ok ? r.text() : "")).catch(() => "");
if (keyLive.trim() !== KEY) {
  console.error(`Key file ${SITE}/${KEY}.txt is not live yet. Deploy first.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "evalezy.com", key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 300) process.exit(1);
