"use client";

import {
  Aperture,
  BarChart3,
  Bell,
  Folder,
  Home,
  Mail,
  MapPin,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface NavItem {
  key: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/dashboard", icon: Home },
  { key: "files", href: "#", icon: Folder },
  { key: "messages", href: "#", icon: Mail },
  { key: "notifications", href: "#", icon: Bell },
  { key: "location", href: "#", icon: MapPin },
  { key: "stats", href: "#", icon: BarChart3 },
];

export default function Sidebar() {
  const t = useTranslations("Dashboard");

  return (
    <aside className="relative hidden w-72 shrink-0 flex-col overflow-hidden bg-neutral-900 p-8 text-white md:flex">
      <div
        className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-700/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-2">
        <Aperture className="h-7 w-7 text-violet-400" aria-hidden="true" />
        <span className="text-lg font-semibold tracking-tight">Lumina</span>
      </div>

      <div className="relative mt-10 flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-800 ring-4 ring-violet-600/40">
          <UserRound className="h-12 w-12 text-neutral-300" aria-hidden="true" />
        </div>
        <p className="mt-4 text-lg font-semibold uppercase tracking-tight">
          John Doe
        </p>
        <p className="text-sm text-neutral-400">johndoe@company.com</p>
      </div>

      <nav className="relative mt-10" aria-label={t("mainNav")}>
        <ul className="divide-y divide-neutral-800">
          {NAV_ITEMS.map(({ key, href, icon: Icon }, index) => {
            const isActive = index === 0;
            return (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-4 rounded-xl px-3 py-3.5 text-sm transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-violet-400" : ""}`}
                    aria-hidden="true"
                  />
                  {t(`nav.${key}`)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
