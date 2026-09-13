"use client";

import {
  Aperture,
  BarChart3,
  Bell,
  Folder,
  Home,
  Mail,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

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
  const [collapsed, setCollapsed] = useState(false);

  const toggleLabel = collapsed ? t("expandSidebar") : t("collapseSidebar");

  return (
    <aside
      className={`relative hidden shrink-0 flex-col overflow-hidden bg-neutral-900 text-white transition-all duration-300 md:flex ${
        collapsed ? "w-20 p-4" : "w-72 p-8"
      }`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-700/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className={`relative flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Aperture className="h-7 w-7 text-violet-400" aria-hidden="true" />
            <span className="text-lg font-semibold tracking-tight">Lumina</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={toggleLabel}
          aria-expanded={!collapsed}
          title={toggleLabel}
          className="rounded-xl p-2 text-neutral-400 transition-all duration-200 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="relative mt-10 flex flex-col items-center text-center">
        <div
          className={`flex items-center justify-center rounded-full bg-neutral-800 ring-4 ring-violet-600/40 transition-all duration-300 ${
            collapsed ? "h-12 w-12" : "h-24 w-24"
          }`}
        >
          <UserRound
            className={`text-neutral-300 ${collapsed ? "h-6 w-6" : "h-12 w-12"}`}
            aria-hidden="true"
          />
        </div>
        {!collapsed && (
          <>
            <p className="mt-4 text-lg font-semibold uppercase tracking-tight">
              John Doe
            </p>
            <p className="text-sm text-neutral-400">johndoe@company.com</p>
          </>
        )}
      </div>

      <nav className="relative mt-10" aria-label={t("mainNav")}>
        <ul className={collapsed ? "space-y-1" : "divide-y divide-neutral-800"}>
          {NAV_ITEMS.map(({ key, href, icon: Icon }, index) => {
            const isActive = index === 0;
            const label = t(`nav.${key}`);
            return (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={collapsed ? label : undefined}
                  title={collapsed ? label : undefined}
                  className={`flex items-center rounded-xl py-3.5 text-sm transition-all duration-200 ${
                    collapsed ? "justify-center px-0" : "gap-4 px-3"
                  } ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${isActive ? "text-violet-400" : ""}`}
                    aria-hidden="true"
                  />
                  {!collapsed && label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative mt-auto border-t border-neutral-800 pt-4">
        <LogoutButton collapsed={collapsed} />
      </div>
    </aside>
  );
}
