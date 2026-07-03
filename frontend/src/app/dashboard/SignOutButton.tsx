"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
