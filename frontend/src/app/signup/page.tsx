"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { apiFetch } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/auth/AuthShell";

export default function SignupPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setPending(false);
      setError(signUpError.message);
      return;
    }

    if (!data.session) {
      setPending(false);
      setNeedsConfirmation(true);
      return;
    }

    try {
      await apiFetch("/companies/bootstrap", {
        method: "POST",
        body: JSON.stringify({ company_name: companyName }),
      });
    } catch (err) {
      setPending(false);
      setError(err instanceof Error ? err.message : "Failed to set up company");
      return;
    }

    setPending(false);
    router.push("/dashboard");
    router.refresh();
  }

  if (needsConfirmation) {
    return (
      <AuthShell title="Check your email" subtitle={`We sent a confirmation link to ${email}`}>
        <p className="text-sm text-slate-500">
          Confirm your email, then log in to continue.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm font-medium text-brand hover:text-brand-dark"
        >
          Back to login
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Create your workspace" subtitle="Start your free AI operating system">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Company name
          </label>
          <Input
            type="text"
            placeholder="Acme Inc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Password
          </label>
          <Input
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}
        <Button type="submit" disabled={pending} className="mt-2 w-full">
          {pending ? "Creating account..." : "Sign up"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand hover:text-brand-dark">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
