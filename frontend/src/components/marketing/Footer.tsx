import { Logo } from "@/components/ui/Logo";

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-slate-500 md:flex-row">
        <Logo />
        <p>&copy; {new Date().getFullYear()} Nexus. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-slate-900">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-slate-900">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-slate-900">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
