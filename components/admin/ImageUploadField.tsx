"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }

      setUrl(data.url);
    } catch {
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-gold-dark">
        {label}
      </label>

      <input type="hidden" name={name} value={url} />

      {url && (
        <div className="relative mt-2 aspect-video w-full max-w-xs overflow-hidden rounded border border-navy/20">
          <Image src={url} alt="" fill className="object-cover" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="mt-2 block text-sm text-navy-dark file:mr-3 file:rounded file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-light"
      />

      {uploading && <p className="mt-1 text-xs text-navy-dark/60">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-crimson">{error}</p>}
      {!url && !uploading && (
        <p className="mt-1 text-xs text-navy-dark/50">Optional — you can paste a URL directly too by editing this later.</p>
      )}
    </div>
  );
}
