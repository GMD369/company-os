"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type Company = { id: string; name: string };
type Document = { id: string; filename: string; status: string };

export default function DashboardPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [companyData, documentsData] = await Promise.all([
          apiFetch("/companies/me"),
          apiFetch("/documents"),
        ]);
        setCompany(companyData);
        setDocuments(documentsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">
        {company ? `Welcome, ${company.name}` : "Dashboard"}
      </h1>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border p-4">
          <p className="text-sm text-gray-500">Documents</p>
          <p className="text-2xl">{documents.length}</p>
        </div>
        <div className="rounded border p-4">
          <p className="text-sm text-gray-500">Quick actions</p>
          <div className="flex flex-col gap-1 text-sm">
            <Link href="/dashboard/documents" className="underline">
              Upload a document
            </Link>
            <Link href="/dashboard/chat" className="underline">
              Ask a question
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
