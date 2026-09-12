"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import DashboardCard from "./DashboardCard";

/** Placeholder values per month: [previous year, current year]. */
const RESULTS: ReadonlyArray<readonly [number, number]> = [
  [18, 37],
  [26, 43],
  [17, 32],
  [24, 13],
  [35, 30],
  [25, 45],
  [35, 20],
  [26, 20],
  [31, 20],
];

const MAX_VALUE = 50;
const Y_TICKS = [50, 40, 30, 20, 10];

export default function ResultsChart() {
  const t = useTranslations("Dashboard");
  const months = t.raw("results.months") as string[];

  return (
    <DashboardCard className="lg:col-span-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-white">
          {t("results.title")}
        </h2>
        <Button className="w-auto px-4 py-2 text-xs">{t("checkNow")}</Button>
      </div>

      <div className="mt-6 flex gap-6">
        <div
          className="relative flex flex-1 gap-3"
          role="img"
          aria-label={t("results.chartLabel")}
        >
          <div
            className="flex h-48 flex-col justify-between text-xs text-neutral-500"
            aria-hidden="true"
          >
            {Y_TICKS.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          <div className="flex-1 overflow-x-auto">
            <div className="min-w-[28rem]" aria-hidden="true">
              <div className="flex h-48 items-end justify-between border-b border-neutral-800">
                {RESULTS.map(([previous, current], index) => (
                  <div key={months[index]} className="flex h-full items-end gap-1">
                    <span
                      className="w-3 rounded-t bg-neutral-600"
                      style={{ height: `${(previous / MAX_VALUE) * 100}%` }}
                    />
                    <span
                      className="w-3 rounded-t bg-violet-500"
                      style={{ height: `${(current / MAX_VALUE) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-neutral-500">
                {months.map((month) => (
                  <span key={month} className="w-7 text-center">
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ul className="hidden flex-col justify-center gap-4 text-sm text-neutral-400 sm:flex">
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-neutral-600" aria-hidden="true" />
            2025
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-violet-500" aria-hidden="true" />
            2026
          </li>
        </ul>
      </div>
    </DashboardCard>
  );
}
