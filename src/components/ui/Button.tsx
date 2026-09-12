import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Shows a spinner and disables the button while true. */
  isLoading?: boolean;
}

export default function Button({
  children,
  isLoading = false,
  disabled,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-neutral-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
