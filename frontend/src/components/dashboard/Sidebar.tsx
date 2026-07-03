"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, MessageSquare } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white">
      <div className="border-b border-slate-200/70 px-6 py-5">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? "text-brand" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-indigo-50"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {!active && (
                <span className="absolute inset-0 rounded-lg transition-colors hover:bg-slate-50" />
              )}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
