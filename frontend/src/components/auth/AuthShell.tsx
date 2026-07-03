"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(129,140,248,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.25),transparent_55%)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

        <Link href="/" className="relative z-10">
          <Logo variant="dark" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-slate-200 backdrop-blur">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            AI operating system
          </div>
          <h2 className="text-3xl font-bold leading-tight text-white">
            Run your business with one intelligent assistant.
          </h2>
          <p className="mt-4 text-slate-300">
            Documents, email, calendar, and tasks — searchable and automated
            from a single conversation.
          </p>
        </motion.div>

        <p className="relative z-10 text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Nexus. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-white px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 flex justify-center lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
