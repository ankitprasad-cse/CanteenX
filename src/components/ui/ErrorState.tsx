import type { ReactNode } from "react";
import { cn } from "../../lib/utils/cn";

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({ title = "Something went wrong", description = "We couldn't complete that request. Please try again.", action, className }: ErrorStateProps) {
  return (
    <div className={cn("rounded-card border border-red-100 bg-surface p-8 text-center", className)}>
      <h2 className="text-section-heading text-content-primary">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-body-sm text-content-secondary">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}