"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { UploadForm } from "./UploadForm";

type Document = {
  id: string;
  filename: string;
  status: string;
  error_message: string | null;
  created_at: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await apiFetch("/documents");
      setDocuments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load documents");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Documents</h1>
      <UploadForm onUploaded={load} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Filename</th>
            <th className="py-2">Status</th>
            <th className="py-2">Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b">
              <td className="py-2">{doc.filename}</td>
              <td className="py-2">
                {doc.status}
                {doc.error_message && (
                  <span className="ml-2 text-xs text-red-600">{doc.error_message}</span>
                )}
              </td>
              <td className="py-2">{new Date(doc.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
