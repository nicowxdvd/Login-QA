"use client";

import { CheckCircle2, Lock, Mail, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  useActionState,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  registerUserAction,
  type RegisterFormState,
} from "@/app/register/actions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  getRegisterFieldErrors,
  REGISTER_FIELDS,
  type RegisterField,
} from "@/lib/users/registerSchema";

type FormValues = Record<RegisterField, string>;

const INITIAL_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_STATE: RegisterFormState = { status: "idle" };

export default function RegisterForm() {
  const t = useTranslations("RegisterForm");
  const [state, formAction, isPending] = useActionState(
    registerUserAction,
    INITIAL_STATE
  );
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<RegisterField, boolean>>>({});

  const clientErrors = getRegisterFieldErrors(values);

  /** Live client errors once a field is touched; otherwise the server's. */
  function errorFor(field: RegisterField): string | undefined {
    const key = touched[field] ? clientErrors[field] : state.fieldErrors?.[field];
    return key ? t(`errors.${key}`) : undefined;
  }

  function fieldProps(field: RegisterField) {
    return {
      id: field,
      name: field,
      value: values[field],
      error: errorFor(field),
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setValues((prev) => ({ ...prev, [field]: event.target.value })),
      onBlur: () => setTouched((prev) => ({ ...prev, [field]: true })),
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const invalidFields = REGISTER_FIELDS.filter((field) => clientErrors[field]);

    if (invalidFields.length > 0) {
      event.preventDefault();
      setTouched(Object.fromEntries(REGISTER_FIELDS.map((field) => [field, true])));
      const firstInvalid = event.currentTarget.elements.namedItem(invalidFields[0]);
      if (firstInvalid instanceof HTMLElement) {
        firstInvalid.focus();
      }
      return;
    }

    // Let the server's field errors show until the user edits again.
    setTouched({});
  }

  if (state.status === "success") {
    return (
      <div className="flex h-full w-full flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:px-24">
        <div
          className="mx-auto w-full max-w-sm animate-fade-slide text-center"
          role="status"
        >
          <CheckCircle2 className="mx-auto h-12 w-12 text-violet-400" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
            {t("successTitle")}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">{t("successMessage")}</p>
          <Link
            href="/"
            className="mt-8 flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            {t("goToLogin")}
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

        <form
          className="mt-8 space-y-5"
          action={formAction}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              {...fieldProps("firstName")}
              label={t("firstNameLabel")}
              icon={UserRound}
              placeholder="Guillermo"
              autoComplete="given-name"
              maxLength={50}
              required
            />
            <Input
              {...fieldProps("lastName")}
              label={t("lastNameLabel")}
              icon={UserRound}
              placeholder="Loyola"
              autoComplete="family-name"
              maxLength={50}
              required
            />
          </div>

          <Input
            {...fieldProps("email")}
            label={t("emailLabel")}
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={254}
            required
          />

          <div>
            <Input
              {...fieldProps("password")}
              label={t("passwordLabel")}
              icon={Lock}
              isPassword
              placeholder="••••••••"
              autoComplete="new-password"
              maxLength={72}
              required
            />
            {!errorFor("password") && (
              <p className="mt-1.5 text-xs text-neutral-500">{t("passwordHint")}</p>
            )}
          </div>

          <Input
            {...fieldProps("confirmPassword")}
            label={t("confirmPasswordLabel")}
            icon={Lock}
            isPassword
            placeholder="••••••••"
            autoComplete="new-password"
            maxLength={72}
            required
          />

          {state.formError && (
            <div role="alert" className="text-sm text-red-500">
              <p>{t(`errors.${state.formError}`)}</p>
              {state.apiMessages && state.apiMessages.length > 0 && (
                <ul className="mt-1 list-inside list-disc">
                  {state.apiMessages.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <Button type="submit" isLoading={isPending}>
            {isPending ? t("submitting") : t("submit")}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-400">
          {t("haveAccount")}{" "}
          <Link
            href="/"
            className="font-medium text-violet-400 transition-all duration-200 hover:text-violet-300"
          >
            {t("signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
