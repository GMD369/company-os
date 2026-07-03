import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
