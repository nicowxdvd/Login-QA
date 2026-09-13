"use client";

import { CheckCircle2, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type FormState = "idle" | "loading" | "success" | "error";

interface ErrorState {
  email?: string;
  form?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordForm() {
  const t = useTranslations("ForgotPasswordForm");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<ErrorState>({});
  const [touched, setTouched] = useState(false);

  function validateEmail(value: string): string | undefined {
    if (!value.trim()) {
      return "emailRequired";
    }
    if (!EMAIL_REGEX.test(value)) {
      return "emailInvalid";
    }
    return undefined;
  }

  function handleBlur() {
    setTouched(true);
    const error = validateEmail(email);
    setErrors({ email: error });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setEmail(value);

    if (touched) {
      const error = validateEmail(value);
      setErrors({ email: error });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setTouched(true);
      setErrors({ email: emailError });
      return;
    }

    setState("loading");
    setErrors({});

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setState("success");
      } else {
        setState("error");
        setErrors({ form: "generic" });
      }
    } catch {
      setState("error");
      setErrors({ form: "network" });
    }
  }

  if (state === "success") {
    return (
      <div className="flex h-full w-full flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:px-24">
        <div
          className="mx-auto w-full max-w-sm animate-fade-slide text-center"
          role="status"
        >
          <CheckCircle2
            className="mx-auto h-12 w-12 text-violet-400"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
            {t("successTitle")}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            {t("successMessage")}
          </p>
          <Link
            href="/"
            className="mt-8 flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            {t("backToLogin")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm animate-fade-slide">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-neutral-400">{t("subtitle")}</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          {errors.form && (
            <div
              className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400"
              role="alert"
            >
              {t(`errors.${errors.form}`)}
            </div>
          )}

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
            error={touched ? (errors.email ? t(`errors.${errors.email}`) : undefined) : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div>
            <Button type="submit" isLoading={state === "loading"} disabled={state === "loading"}>
              {state === "loading" ? t("submitting") : t("submit")}
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-400">
            {t("haveAccount")}{" "}
            <Link
              href="/"
              className="font-medium text-violet-400 transition-all duration-200 hover:text-violet-300"
            >
              {t("signIn")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
