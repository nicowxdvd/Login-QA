import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  /** Renders the card with the brand accent background. */
  highlighted?: boolean;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  highlighted = false,
}: StatCardProps) {
  return (
    <article
      className={`rounded-2xl border p-6 transition-all duration-200 ${
        highlighted
          ? "border-violet-500/40 bg-violet-600 text-white"
          : "border-neutral-800 bg-neutral-900/60 text-white hover:border-neutral-700"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2
          className={`text-sm font-medium ${
            highlighted ? "text-violet-100" : "text-neutral-400"
          }`}
        >
          {label}
        </h2>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            highlighted ? "bg-white/15" : "bg-violet-500/10"
          }`}
        >
          <Icon
            className={`h-4 w-4 ${highlighted ? "text-white" : "text-violet-400"}`}
            aria-hidden="true"
          />
        </span>
      </div>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{value}</p>
    </article>
  );
}
