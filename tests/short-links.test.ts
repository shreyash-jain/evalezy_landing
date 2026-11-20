// Run: pnpm test  (node --test with native TypeScript stripping; no extra deps)
import { test } from "node:test";
import assert from "node:assert/strict";
import { shortLinkCode, shortLinkTarget } from "../src/lib/shortLinks.ts";

const links = [
  { code: "ig", source: "instagram", campaign: "launch" },
  { code: "wa", source: "whatsapp", campaign: null },
  { code: " LI ", source: " LinkedIn ", campaign: " " },
];

test("a short link opens the home page with its source and campaign", () => {
  assert.equal(shortLinkTarget("/ig", links), "/?utm_source=instagram&utm_campaign=launch");
  assert.equal(shortLinkTarget("/ig/", links), "/?utm_source=instagram&utm_campaign=launch");
  assert.equal(shortLinkTarget("/IG", links), "/?utm_source=instagram&utm_campaign=launch");
  assert.equal(shortLinkTarget("/wa", links), "/?utm_source=whatsapp");
  assert.equal(shortLinkTarget("/li", links), "/?utm_source=linkedin");
});

test("any other missing page stays a 404", () => {
  assert.equal(shortLinkTarget("/nope", links), null);
  assert.equal(shortLinkTarget("/ig/extra", links), null);
  assert.equal(shortLinkTarget("/", links), null);
  assert.equal(shortLinkTarget("/ig", null), null);
  assert.equal(shortLinkTarget("/ig", [{ code: "ig", source: " " }]), null);
});

test("only a single lowercase path part can be a short link", () => {
  assert.equal(shortLinkCode("/ig/"), "ig");
  assert.equal(shortLinkCode("/blog/post"), null);
  assert.equal(shortLinkCode("/a b"), null);
  assert.equal(shortLinkCode("/-ig"), null);
});
