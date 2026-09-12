"use client";

import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { forwardRef, useState, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Icon rendered on the left side of the field. */
  icon?: LucideIcon;
  /** Label displayed above the field. */
  label?: string;
  /** Shows an eye/eye-off toggle to reveal or hide the value (for passwords). */
  isPassword?: boolean;
  /** Error message displayed below the field. */
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { icon: Icon, label, isPassword = false, error, className = "", type, id, ...rest },
    ref
  ) => {
    const t = useTranslations("Common");
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

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
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={`w-full rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 hover:border-neutral-600 ${
              Icon ? "pl-11" : "pl-4"
            } ${isPassword ? "pr-11" : "pr-4"} ${
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""
            } ${className}`}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 text-neutral-500 transition-colors duration-200 hover:text-neutral-300"
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
