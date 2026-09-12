"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import DashboardCard from "./DashboardCard";

const PROGRESS = 45;
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressCard() {
  const t = useTranslations("Dashboard");
  const items = t.raw("progress.items") as string[];

  return (
    <DashboardCard className="flex flex-col lg:row-span-2">
      <h2 className="text-base font-semibold text-white">
        {t("progress.title")}
      </h2>

      <div className="mt-6 flex justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-44 w-44 -rotate-90"
          role="img"
          aria-label={t("progress.chartLabel")}
        >
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth="12"
            className="stroke-neutral-800"
          />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - PROGRESS / 100)}
            className="stroke-violet-500"
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            transform="rotate(90 50 50)"
            className="fill-white text-[18px] font-semibold"
          >
            {PROGRESS}%
          </text>
        </svg>
      </div>

      <ul className="mt-6 flex-1 divide-y divide-neutral-800 text-center text-sm text-neutral-400">
        {items.map((item) => (
          <li key={item} className="py-3">
            {item}
          </li>
        ))}
      </ul>

      <Button className="mt-6">{t("checkNow")}</Button>
    </DashboardCard>
  );
}
