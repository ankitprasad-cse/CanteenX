import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, disabled, ...props }, ref) => (
    <input
      ref={ref}
      disabled={disabled}
      aria-invalid={error || undefined}
      className={cn(
        "min-h-11 w-full rounded-control border bg-surface px-3 text-body text-content-primary placeholder:text-content-muted",
        "border-border transition-shadow duration-150",
        "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        error && "border-error focus:border-error focus:ring-error/20",
        "disabled:cursor-not-allowed disabled:bg-background disabled:text-content-muted",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";