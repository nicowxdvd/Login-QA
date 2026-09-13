"use client";

import { Loader2, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { logoutAction } from "@/app/dashboard/actions";

function SubmitButton({ collapsed = false }: { collapsed?: boolean }) {
  const t = useTranslations("Dashboard");
  const { pending } = useFormStatus();
  const Icon = pending ? Loader2 : LogOut;
  const label = pending ? t("loggingOut") : t("logout");

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={collapsed ? label : undefined}
      title={collapsed ? label : undefined}
      className={`flex w-full items-center rounded-xl py-3.5 text-sm text-neutral-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:cursor-not-allowed disabled:opacity-60 ${
        collapsed ? "justify-center px-0" : "gap-4 px-3"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${pending ? "animate-spin" : ""}`}
        aria-hidden="true"
      />
      {!collapsed && label}
    </button>
  );
}

/** Form-based so logout works even before JavaScript hydrates. */
export default function LogoutButton({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <form action={logoutAction}>
      <SubmitButton collapsed={collapsed} />
    </form>
  );
}
