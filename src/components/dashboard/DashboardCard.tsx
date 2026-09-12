import type { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

/** Shared surface for dashboard widgets, matching the login's dark panels. */
export default function DashboardCard({
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <section
      className={`rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 ${className}`}
    >
      {children}
    </section>
  );
}
