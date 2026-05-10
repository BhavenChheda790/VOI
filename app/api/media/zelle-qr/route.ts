import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * Public endpoint that serves the admin-uploaded Zelle QR as an image.
 * The QR is stored in SiteConfig.zelleQrUrl as either:
 *   - a data URL (`data:image/png;base64,...`) — current upload pipeline
 *   - a plain `/uploads/...` path (legacy local-disk uploads)
 *   - an absolute https:// URL (future Vercel Blob / S3)
 *
 * WhatsApp Cloud API can't fetch data URLs directly, so the bot uses
 * `https://voi24.org/api/media/zelle-qr` instead.
 */
export async function GET() {
  const config = await prisma.siteConfig.findUnique({
    where: { id: 1 },
    select: { zelleQrUrl: true },
  });
  const url = config?.zelleQrUrl;

  if (!url) {
    return NextResponse.json({ error: "QR not configured" }, { status: 404 });
  }

  if (url.startsWith("data:")) {
    const match = url.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json({ error: "Invalid data URL" }, { status: 500 });
    }
    const [, mime, base64] = match;
    const buffer = Buffer.from(base64, "base64");
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=300",
      },
    });
  }

  if (url.startsWith("http")) {
    return NextResponse.redirect(url, 302);
  }

  // Relative paths (e.g. /uploads/...) — redirect to that path on the same origin
  if (url.startsWith("/")) {
    return NextResponse.redirect(new URL(url, "https://voi24.org"), 302);
  }

  return NextResponse.json({ error: "Unsupported QR URL format" }, { status: 500 });
}
