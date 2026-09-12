import { Apple } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export type SocialProvider = "google" | "apple";

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider;
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.89c2.27-2.09 3.58-5.17 3.58-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.89-3.02c-1.08.72-2.46 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.79l3.45-3.45C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.27 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

export default function SocialButton({
  provider,
  className = "",
  ...rest
}: SocialButtonProps) {
  const label = provider === "google" ? "Google" : "Apple";

  return (
    <button
      type="button"
      className={`flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/40 px-4 py-3 text-sm font-medium text-neutral-200 transition-all duration-200 hover:border-neutral-600 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-violet-500/40 active:scale-[0.98] ${className}`}
      aria-label={`Continue with ${label}`}
      {...rest}
    >
      {provider === "google" ? (
        <GoogleIcon />
      ) : (
        <Apple className="h-5 w-5" aria-hidden="true" />
      )}
      {label}
    </button>
  );
}
