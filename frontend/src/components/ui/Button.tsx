import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-light to-brand text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_20px_-6px_rgba(79,70,229,0.55)] hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_10px_28px_-6px_rgba(79,70,229,0.65)]",
  secondary:
    "bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.015 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <Link
        href={href}
        className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      >
        {children}
      </Link>
    </motion.div>
  );
}
