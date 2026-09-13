import type { ReactNode } from "react";

interface FoodSectionProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

export function FoodSection({ title, action, children }: FoodSectionProps) {
  const headingId = title.toLowerCase().replaceAll(" ", "-");

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2
          id={headingId}
          className="text-section-heading font-semibold text-content-primary"
        >
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
