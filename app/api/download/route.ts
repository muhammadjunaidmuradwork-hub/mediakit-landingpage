import { NextRequest, NextResponse } from "next/server";

const downloads = {
  "media-kit": "/downloads/annie-azhar-media-kit.pdf",
  "rate-card": "/downloads/annie-azhar-rate-card.pdf",
} as const;

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get("file") as keyof typeof downloads | null;
  if (!file || !downloads[file]) return new NextResponse("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  console.info(JSON.stringify({ event: `${file}_download`, at: new Date().toISOString() }));
  const response = NextResponse.redirect(new URL(downloads[file], request.url), 307);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
