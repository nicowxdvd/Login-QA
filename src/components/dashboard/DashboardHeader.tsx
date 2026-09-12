"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function DashboardHeader() {
  const t = useTranslations("Dashboard");

  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        {t("title")}
      </h1>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <button
          type="button"
          aria-label={t("openMenu")}
          className="rounded-xl p-2 text-neutral-400 transition-all duration-200 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
