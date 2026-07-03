"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, MessageSquare, Upload, ArrowRight } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Card } from "@/components/ui/Card";

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

  const ready = documents.filter((d) => d.status === "ready").length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {company ? `Welcome back, ${company.name}` : "Dashboard"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here&apos;s what&apos;s happening in your workspace.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-brand">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Documents</p>
              <p className="text-xl font-semibold text-slate-900">{documents.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ready to search</p>
              <p className="text-xl font-semibold text-slate-900">{ready}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ask a question</p>
              <Link
                href="/dashboard/chat"
                className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
              >
                Open chat <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent documents</h2>
          <Link
            href="/dashboard/documents"
            className="text-sm font-medium text-brand hover:text-brand-dark"
          >
            View all
          </Link>
        </div>
        {documents.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-10 text-center">
            <p className="text-sm text-slate-500">No documents yet.</p>
            <Link
              href="/dashboard/documents"
              className="text-sm font-medium text-brand hover:text-brand-dark"
            >
              Upload your first document
            </Link>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {documents.slice(0, 5).map((doc) => (
              <li key={doc.id} className="flex items-center justify-between py-3 text-sm">
                <span className="text-slate-700">{doc.filename}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    doc.status === "ready"
                      ? "bg-emerald-50 text-emerald-700"
                      : doc.status === "failed"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {doc.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
