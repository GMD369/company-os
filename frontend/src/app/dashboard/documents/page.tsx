"use client";

import { useCallback, useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { UploadForm } from "./UploadForm";

type Document = {
  id: string;
  filename: string;
  status: string;
  error_message: string | null;
  created_at: string;
};

const statusStyles: Record<string, string> = {
  ready: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
  processing: "bg-amber-50 text-amber-700",
  pending: "bg-slate-100 text-slate-600",
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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Documents</h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload files to make them searchable in chat.
        </p>
      </div>

      <UploadForm onUploaded={load} />

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <Card className="overflow-hidden">
        {documents.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">
            No documents uploaded yet.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">File</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Uploaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="flex items-center gap-2 px-6 py-3 text-slate-700">
                    <FileText className="h-4 w-4 text-slate-400" />
                    {doc.filename}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusStyles[doc.status] ?? statusStyles.pending
                      }`}
                    >
                      {doc.status}
                    </span>
                    {doc.error_message && (
                      <span className="ml-2 text-xs text-red-600">{doc.error_message}</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-slate-500">
                    {new Date(doc.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
