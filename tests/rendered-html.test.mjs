import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/", init = {}, origin = "http://localhost") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`${origin}${path}`, { ...init, headers: { accept: "text/html", ...(init.headers || {}) } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished media kit", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.match(response.headers.get("content-security-policy") ?? "", /object-src 'none'/);
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);

  const html = await response.text();
  assert.match(html, /Annie Azhar \| tireddesimom Media Kit/);
  assert.match(html, /Real life\./);
  assert.match(html, /1\.53M monthly viewers/);
  assert.match(html, /Best Affiliate Influencer of the Year/);
  assert.match(html, /Full rate card and package pricing/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("download route only accepts the two hardcoded files", async () => {
  const mediaKit = await render("/api/download?file=media-kit");
  const rateCard = await render("/api/download?file=rate-card");
  const traversal = await render("/api/download?file=../../package.json");
  const missing = await render("/api/download");

  assert.equal(mediaKit.status, 307);
  assert.equal(mediaKit.headers.get("location"), "http://localhost/downloads/annie-azhar-media-kit.pdf");
  assert.equal(rateCard.status, 307);
  assert.equal(rateCard.headers.get("location"), "http://localhost/downloads/annie-azhar-rate-card.pdf");
  assert.equal(traversal.status, 404);
  assert.equal(missing.status, 404);
  assert.equal(mediaKit.headers.get("cache-control"), "no-store");
});

test("analytics endpoint validates origin, payload type and body size", async () => {
  const validPayload = JSON.stringify({ event: "page_view", path: "/" });
  const valid = await render("/api/events", { method: "POST", headers: { "content-type": "text/plain", origin: "http://localhost" }, body: validPayload });
  const invalidEvent = await render("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ event: "anything" }) });
  const crossOrigin = await render("/api/events", { method: "POST", headers: { "content-type": "text/plain", origin: "https://attacker.example" }, body: validPayload });
  const oversized = await render("/api/events", { method: "POST", headers: { "content-type": "text/plain" }, body: JSON.stringify({ event: "page_view", path: `/${"x".repeat(1100)}` }) });

  assert.equal(valid.status, 200);
  assert.equal(valid.headers.get("cache-control"), "no-store");
  assert.equal(invalidEvent.status, 400);
  assert.equal(crossOrigin.status, 403);
  assert.equal(oversized.status, 413);
});

test("unused image optimizer endpoint stays closed", async () => {
  const response = await render("/_vinext/image?url=%2Fimages%2Fannie-profile.webp&w=640&q=75");
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

test("HTTPS responses include long-lived transport security", async () => {
  const response = await render("/", {}, "https://media.example.com");
  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000; includeSubDomains; preload");
});
