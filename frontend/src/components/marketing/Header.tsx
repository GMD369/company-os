"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="transition-colors hover:text-slate-900">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-slate-900">
            How it works
          </a>
          <a href="#pricing" className="transition-colors hover:text-slate-900">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Log in
          </Link>
          <LinkButton href="/signup" size="sm">
            Get started
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
