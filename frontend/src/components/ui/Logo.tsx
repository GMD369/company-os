export function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold ${className}`}>
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-light to-brand text-sm font-bold text-white shadow-sm shadow-indigo-300/50">
        N
      </span>
      <span className={variant === "dark" ? "text-white" : "text-slate-900"}>
        Nexus
      </span>
    </span>
  );
}
