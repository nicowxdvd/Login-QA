"use client";

import { Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SocialButton from "@/components/ui/SocialButton";

export default function LoginForm() {
  const t = useTranslations("LoginForm");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulated request delay; replace with a real authentication call.
    setTimeout(() => setIsLoading(false), 1200);
  }

  return (
    <div className="flex h-full w-full flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm animate-fade-slide">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {t("welcomeBack")}
        </h2>
        <p className="mt-2 text-sm text-neutral-400">{t("subtitle")}</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            id="email"
            label={t("emailLabel")}
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div>
            <Input
              id="password"
              label={t("passwordLabel")}
              icon={Lock}
              isPassword
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-violet-400 transition-all duration-200 hover:text-violet-300"
              >
                {t("forgotPassword")}
              </Link>
            </div>
          </div>

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? t("signingIn") : t("signIn")}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-800" />
          <span className="text-xs uppercase tracking-wide text-neutral-500">
            {t("orRegisterWith")}
          </span>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton provider="google" />
          <SocialButton provider="apple" />
        </div>

        <p className="mt-8 text-center text-sm text-neutral-400">
          {t("noAccount")}{" "}
          <Link
            href="/register"
            className="font-medium text-violet-400 transition-all duration-200 hover:text-violet-300"
          >
            {t("signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
}
