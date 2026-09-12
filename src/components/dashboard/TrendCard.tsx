"use client";

import { useTranslations } from "next-intl";
import DashboardCard from "./DashboardCard";

/** September 2026 starts on a Tuesday (two leading empty cells). */
const LEADING_EMPTY_DAYS = 2;
const DAYS_IN_MONTH = 30;
const SELECTED_DAYS = new Set([12, 13]);
const TODAY = 12;
const EVENT_DAY = 25;

const CALENDAR_CELLS: Array<number | null> = [
  ...Array.from({ length: LEADING_EMPTY_DAYS }, () => null),
  ...Array.from({ length: DAYS_IN_MONTH }, (_, index) => index + 1),
];

function dayClassName(day: number): string {
  if (day === TODAY) return "bg-violet-600 text-white";
  if (SELECTED_DAYS.has(day)) return "bg-violet-600/40 text-white";
  if (day === EVENT_DAY) return "bg-neutral-700 text-white";
  return "text-neutral-400";
}

export default function TrendCard() {
  const t = useTranslations("Dashboard");
  const weekdays = t.raw("calendar.weekdays") as string[];

  return (
    <DashboardCard className="grid gap-8 lg:col-span-2 lg:grid-cols-[1fr_auto]">
      <div className="flex flex-col">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-violet-500" aria-hidden="true" />
            {t("trend.seriesA")}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-neutral-500" aria-hidden="true" />
            {t("trend.seriesB")}
          </li>
        </ul>

        <svg
          viewBox="0 0 400 160"
          preserveAspectRatio="none"
          className="mt-6 h-40 w-full flex-1"
          role="img"
          aria-label={t("trend.chartLabel")}
        >
          <defs>
            <linearGradient id="trend-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trend-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#737373" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#737373" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 150 C40 120 70 60 120 70 S180 20 220 40 S280 110 320 60 S380 40 400 70 L400 160 L0 160 Z"
            fill="url(#trend-b)"
            stroke="#737373"
            strokeWidth="1.5"
          />
          <path
            d="M0 155 C50 140 80 80 130 90 S190 150 230 60 S270 150 310 120 S370 100 400 110 L400 160 L0 160 Z"
            fill="url(#trend-a)"
            stroke="#8b5cf6"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div aria-label={t("calendar.label")} role="group">
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {weekdays.map((weekday, index) => (
            <span
              key={`${weekday}-${index}`}
              className="flex h-8 w-8 items-center justify-center font-medium text-neutral-500"
              aria-hidden="true"
            >
              {weekday}
            </span>
          ))}
          {CALENDAR_CELLS.map((day, index) =>
            day === null ? (
              <span key={`empty-${index}`} aria-hidden="true" />
            ) : (
              <span
                key={day}
                aria-current={day === TODAY ? "date" : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${dayClassName(day)}`}
              >
                {day}
              </span>
            )
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
