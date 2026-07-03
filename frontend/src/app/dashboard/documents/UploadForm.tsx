"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { apiFetch } from "@/lib/api";

export function UploadForm({ onUploaded }: { onUploaded: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const storagePath = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(storagePath, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      await apiFetch("/documents", {
        method: "POST",
        body: JSON.stringify({
          filename: file.name,
          storage_path: storagePath,
          mime_type: file.type,
        }),
      });

      onUploaded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) uploadFile(file);
    event.target.value = "";
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragOver ? "border-brand bg-indigo-50" : "border-border bg-white hover:bg-slate-50"
        }`}
      >
        <UploadCloud className="h-8 w-8 text-slate-400" />
        <p className="text-sm font-medium text-slate-700">
          {uploading ? "Uploading and processing..." : "Click to upload or drag and drop"}
        </p>
        <p className="text-xs text-slate-400">PDF, DOCX, XLSX, CSV, or TXT</p>
        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          disabled={uploading}
          className="hidden"
        />
      </div>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
