import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/20",
        props.className
      )}
    />
  );
}
