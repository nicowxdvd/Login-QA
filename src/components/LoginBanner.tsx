"use client";

import { Aperture } from "lucide-react";
import { useTranslations } from "next-intl";
import CarouselIndicators from "./CarouselIndicators";
import TechIllustration from "./TechIllustration";

export default function LoginBanner() {
  const t = useTranslations("Banner");

  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-neutral-900 p-10 text-white md:flex">
      <div
        className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet-700/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-2">
        <Aperture className="h-7 w-7 text-violet-400" aria-hidden="true" />
        <span className="text-lg font-semibold tracking-tight">Lumina</span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <TechIllustration />
      </div>

      <div className="relative animate-fade-slide space-y-4">
        <h1 className="max-w-md text-3xl font-semibold leading-tight tracking-tight">
          {t("title")}
        </h1>
        <p className="max-w-sm text-sm text-neutral-400">{t("subtitle")}</p>
        <CarouselIndicators
          total={3}
          activeIndex={0}
          label={t("carouselLabel")}
        />
      </div>
    </div>
  );
}
