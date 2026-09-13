import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils/cn";

type BadgeTone = "default" | "success" | "warning" | "error" | "special" | "unavailable";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Backward-compatible alias used by existing food cards. */
  variant?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  default: "bg-background text-content-secondary border-border",
  success: "bg-primary-light text-success border-transparent",
  warning: "bg-amber-50 text-warning border-transparent",
  error: "bg-red-50 text-error border-transparent",
  special: "bg-[#FFF7E3] text-[#9A6A00] border-transparent",
  unavailable: "bg-background text-content-secondary border-border"
};

export function Badge({ className, tone, variant, children, ...props }: BadgeProps) {
  const resolvedTone = variant ?? tone ?? "default";
  return <span className={cn("inline-flex items-center rounded-sm border px-2 py-1 text-meta", tones[resolvedTone], className)} {...props}>{children}</span>;
}