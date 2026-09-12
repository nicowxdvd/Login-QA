"use client";

import { Loader2, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { logoutAction } from "@/app/dashboard/actions";

function SubmitButton() {
  const t = useTranslations("Dashboard");
  const { pending } = useFormStatus();
  const Icon = pending ? Loader2 : LogOut;

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-sm text-neutral-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Icon className={`h-5 w-5 ${pending ? "animate-spin" : ""}`} aria-hidden="true" />
      {pending ? t("loggingOut") : t("logout")}
    </button>
  );
}

/** Form-based so logout works even before JavaScript hydrates. */
export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <SubmitButton />
    </form>
  );
}
