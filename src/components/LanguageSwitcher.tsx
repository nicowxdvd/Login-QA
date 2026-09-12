"use client";

import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations("LanguageSwitcher");

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-900/70 p-1 text-xs font-medium backdrop-blur-sm"
      aria-label={t("label")}
    >
      <Languages className="ml-1.5 h-3.5 w-3.5 text-neutral-400" aria-hidden="true" />
      {(["es", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          className={`rounded-full px-2.5 py-1 uppercase transition-all duration-200 ${
            locale === option
              ? "bg-violet-600 text-white"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
