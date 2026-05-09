"use client";

import { useRef, useState } from "react";

type Props = {
  /** Form field name — gets a hidden input so the URL submits with the form */
  name: string;
  /** Current value (existing image URL) */
  defaultValue?: string;
  label?: string;
  /** Optional help text shown under the field */
  hint?: string;
  /** Aspect of the preview box */
  previewAspect?: "square" | "video" | "wide";
};

export function ImageUpload({
  name,
  defaultValue = "",
  label,
  hint,
  previewAspect = "square",
}: Props) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setErr(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const j = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !j.url) {
        throw new Error(j.error || `Upload failed (${res.status})`);
      }
      setUrl(j.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  const aspectClass =
    previewAspect === "video"
      ? "aspect-video"
      : previewAspect === "wide"
      ? "aspect-[4/3]"
      : "aspect-square";

  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-xs font-semibold uppercase text-stone-500">{label}</label>
      ) : null}

      <input type="hidden" name={name} value={url} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div
          className={`relative flex w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 ${aspectClass}`}
        >
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="px-2 text-center text-[11px] font-medium text-stone-400">
              No image
            </span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-[#1e40af] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a] disabled:opacity-60"
            >
              {busy ? "Uploading…" : url ? "Replace image" : "Upload image"}
            </button>
            {url ? (
              <button
                type="button"
                onClick={() => setUrl("")}
                disabled={busy}
                className="rounded-full border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-100 disabled:opacity-60"
              >
                Remove
              </button>
            ) : null}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="…or paste an image URL"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
          />

          {err ? <p className="text-xs text-rose-600">{err}</p> : null}
          {hint ? <p className="text-[11px] text-stone-500">{hint}</p> : null}
        </div>
      </div>
    </div>
  );
}
