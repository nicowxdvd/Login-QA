"use client";

import { DollarSign, Share2, Star, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";
import StatCard from "./StatCard";

export default function StatsGrid() {
  const t = useTranslations("Dashboard.stats");

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label={t("earning")} value="$628" icon={DollarSign} highlighted />
      <StatCard label={t("share")} value="2434" icon={Share2} />
      <StatCard label={t("likes")} value="1259" icon={ThumbsUp} />
      <StatCard label={t("rating")} value="8,5" icon={Star} />
    </div>
  );
}
