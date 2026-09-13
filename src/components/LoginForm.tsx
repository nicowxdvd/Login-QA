"use client";

import { Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
// TODO: reactivar cuando se implemente el login social (Google/Apple).
// import SocialButton from "@/components/ui/SocialButton";
import { useLogin, type LoginErrorReason } from "@/hooks/useLogin";
import {
  getLoginFieldErrors,
  LOGIN_FIELDS,
  type LoginField,
} from "@/lib/auth/loginSchema";

function errorMessageKey(reason: LoginErrorReason): string {
  switch (reason) {
    case "invalid-credentials":
      return "invalidCredentials";
    case "validation":
      return "validationError";
    case "network":
      return "networkError";
    default:
      return "genericError";
  }
}

export default function LoginForm() {
  const t = useTranslations("LoginForm");
  const router = useRouter();
  const { login, isLoading, errorReason } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Partial<Record<LoginField, boolean>>>({});

  const clientErrors = getLoginFieldErrors({ email, password });

  /** Translated field error, shown only once the field has been touched. */
  function errorFor(field: LoginField): string | undefined {
    const key = touched[field] ? clientErrors[field] : undefined;
    return key ? t(`errors.${key}`) : undefined;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const invalidFields = LOGIN_FIELDS.filter((field) => clientErrors[field]);
    if (invalidFields.length > 0) {
      setTouched(Object.fromEntries(LOGIN_FIELDS.map((field) => [field, true])));
      const firstInvalid = event.currentTarget.elements.namedItem(invalidFields[0]);
      if (firstInvalid instanceof HTMLElement) {
        firstInvalid.focus();
      }
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm animate-fade-slide">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {t("welcomeBack")}
        </h2>
        <p className="mt-2 text-sm text-neutral-400">{t("subtitle")}</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <Input
            id="email"
            name="email"
            label={t("emailLabel")}
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={email}
            error={errorFor("email")}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          />

          <div>
            <Input
              id="password"
              name="password"
              label={t("passwordLabel")}
              icon={Lock}
              isPassword
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={password}
              error={errorFor("password")}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
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

          {errorReason && (
            <p role="alert" className="text-sm text-red-500">
              {t(errorMessageKey(errorReason))}
            </p>
          )}

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? t("signingIn") : t("signIn")}
          </Button>
        </form>

        {/*
          TODO: login social deshabilitado temporalmente hasta implementar el
          flujo OAuth de Google/Apple. Incluye el divisor "O regístrate con"
          porque no tiene sentido mostrarlo sin los botones.

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
        */}

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
