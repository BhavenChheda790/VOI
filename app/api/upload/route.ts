import { put } from "@vercel/blob";
import { randomBytes } from "node:crypto";
import { extname } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

const EXT_BY_MIME: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

export async function POST(req: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type}` },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      {
        error: `File too large — max 4 MB, got ${(file.size / 1024 / 1024).toFixed(1)} MB. Compress at tinypng.com and retry.`,
      },
      { status: 413 }
    );
  }

  // Build a stable, safe filename
  const safeOriginal = file.name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(-40);
  const fallbackExt = EXT_BY_MIME[file.type] ?? "";
  const originalExt = extname(safeOriginal);
  const ext = originalExt || fallbackExt;
  const stem =
    (originalExt ? safeOriginal.slice(0, -originalExt.length) : safeOriginal) ||
    "image";
  const random = randomBytes(4).toString("hex");
  const filename = `${Date.now()}-${random}-${stem}${ext}`;

  // Vercel Blob — production. Requires BLOB_READ_WRITE_TOKEN in env.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`uploads/${filename}`, file, {
        access: "public",
        contentType: file.type,
        addRandomSuffix: false,
      });
      return NextResponse.json({ url: blob.url });
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      console.error("[upload] blob.put failed:", detail);
      return NextResponse.json(
        { error: `Blob storage error: ${detail}` },
        { status: 500 }
      );
    }
  }

  // Fallback for local dev / when Blob isn't connected — encode as data URL.
  // Only safe for small files; rejected if it would exceed Vercel's response cap.
  if (file.size > 1 * 1024 * 1024) {
    return NextResponse.json(
      {
        error:
          "Blob storage not configured. Files over 1 MB need Vercel Blob. Connect a Blob store in Vercel → Storage and redeploy.",
      },
      { status: 503 }
    );
  }
  const buf = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${buf.toString("base64")}`;
  return NextResponse.json({ url: dataUrl });
}
