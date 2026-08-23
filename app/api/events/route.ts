import { NextRequest, NextResponse } from "next/server";

const allowed = new Set(["page_view", "scroll_depth_50", "scroll_depth_90", "media_kit_download", "rate_card_download", "book_collab", "email_contact", "instagram_dm"]);
const MAX_BODY_BYTES = 1024;
const MAX_REQUESTS_PER_MINUTE = 60;
const requests = new Map<string, { count: number; resetAt: number }>();

function json(body: { ok: boolean }, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

function isRateLimited(request: NextRequest) {
  const now = Date.now();
  const key = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const current = requests.get(key);
  if (!current || current.resetAt <= now) {
    requests.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  current.count += 1;
  if (requests.size > 500) for (const [entryKey, value] of requests) if (value.resetAt <= now) requests.delete(entryKey);
  return current.count > MAX_REQUESTS_PER_MINUTE;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if ((origin && origin !== request.nextUrl.origin) || request.headers.get("sec-fetch-site") === "cross-site") return json({ ok: false }, 403);
  if (isRateLimited(request)) return json({ ok: false }, 429);

  const declaredSize = Number(request.headers.get("content-length") || 0);
  if (!Number.isFinite(declaredSize) || declaredSize > MAX_BODY_BYTES) return json({ ok: false }, 413);
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (contentType && contentType !== "application/json" && contentType !== "text/plain") return json({ ok: false }, 415);

  const raw = await request.text().catch(() => "");
  if (!raw || new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return json({ ok: false }, 413);

  let body: { event?: unknown; path?: unknown };
  try { body = JSON.parse(raw) as { event?: unknown; path?: unknown }; } catch { return json({ ok: false }, 400); }
  if (typeof body.event !== "string" || !allowed.has(body.event)) return json({ ok: false }, 400);

  const path = typeof body.path === "string" && body.path.startsWith("/")
    ? Array.from(body.path).filter((character) => {
        const code = character.charCodeAt(0);
        return code >= 32 && code !== 127;
      }).join("").slice(0, 120)
    : "/";
  console.info(JSON.stringify({ event: body.event, path, at: new Date().toISOString() }));
  return json({ ok: true });
}
