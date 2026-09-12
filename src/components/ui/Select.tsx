import { ChevronDown, type LucideIcon } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Icon rendered on the left side of the field. */
  icon?: LucideIcon;
  /** Label displayed above the field. */
  label?: string;
  /** Error message displayed below the field. */
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ icon: Icon, label, error, className = "", id, children, ...rest }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-neutral-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3.5 h-5 w-5 text-neutral-500"
              aria-hidden="true"
            />
          )}
          <select
            ref={ref}
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={error && id ? `${id}-error` : undefined}
            className={`w-full appearance-none rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 pr-11 text-sm text-neutral-100 outline-none transition-all duration-200 hover:border-neutral-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60 ${
              Icon ? "pl-11" : "pl-4"
            } ${
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""
            } ${className}`}
            {...rest}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 h-5 w-5 text-neutral-500"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p id={id ? `${id}-error` : undefined} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
