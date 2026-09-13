import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LoginBanner from "@/components/LoginBanner";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Recuperar contraseña | Capturando Momentos, Creando Recuerdos",
  description: "Recupera acceso a tu cuenta",
};

export default function ForgotPasswordPage() {
  return (
    <main className="relative grid min-h-screen grid-cols-1 bg-neutral-950 md:grid-cols-2">
      <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6">
        <LanguageSwitcher />
      </div>
      <LoginBanner />
      <ForgotPasswordForm />
    </main>
  );
}
