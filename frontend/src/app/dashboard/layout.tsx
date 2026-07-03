import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SignOutButton } from "./SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 border-b border-slate-200/70 bg-white/80 px-8 py-4 backdrop-blur">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand text-xs font-medium text-white shadow-sm">
              {user?.email?.[0]?.toUpperCase()}
            </span>
            {user?.email}
          </div>
          <SignOutButton />
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
