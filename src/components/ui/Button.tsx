import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary !text-white hover:bg-primary-dark",
  secondary: "border border-border bg-surface text-content-primary hover:bg-primary-light",
  ghost: "bg-transparent text-content-primary hover:bg-primary-light",
  danger: "bg-error !text-white hover:opacity-90"
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-body-sm",
  md: "min-h-11 px-4 text-body-sm",
  lg: "min-h-12 px-5 text-body font-semibold"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        !loading && "disabled:pointer-events-none disabled:opacity-50",
        loading && "cursor-wait",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-r-transparent"
        />
      )}
      {children}
    </button>
  )
);

Button.displayName = "Button";
