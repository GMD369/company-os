import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
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
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <nav className="flex gap-4 text-sm">
          <Link href="/dashboard" className="font-semibold">
            AI OS
          </Link>
          <Link href="/dashboard/documents">Documents</Link>
          <Link href="/dashboard/chat">Chat</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <span>{user?.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
