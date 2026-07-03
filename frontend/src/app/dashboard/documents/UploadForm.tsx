"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { apiFetch } from "@/lib/api";

export function UploadForm({ onUploaded }: { onUploaded: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

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
      event.target.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={handleChange} disabled={uploading} />
      {uploading && <p className="text-sm text-gray-500">Uploading and processing...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
