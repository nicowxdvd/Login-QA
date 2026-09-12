import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LoginBanner from "@/components/LoginBanner";
import RegisterForm from "@/components/RegisterForm";
import { getRoles, type Role } from "@/lib/users/usersApiClient";

export const metadata: Metadata = {
  title: "Crear cuenta | Capturando Momentos, Creando Recuerdos",
  description: "Crea una cuenta nueva",
};

async function loadRoles(): Promise<{ roles: Role[]; rolesUnavailable: boolean }> {
  try {
    return { roles: await getRoles(), rolesUnavailable: false };
  } catch {
    return { roles: [], rolesUnavailable: true };
  }
}

export default async function RegisterPage() {
  const { roles, rolesUnavailable } = await loadRoles();

  return (
    <main className="relative grid min-h-screen grid-cols-1 bg-neutral-950 md:grid-cols-2">
      <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6">
        <LanguageSwitcher />
      </div>
      <LoginBanner />
      <RegisterForm roles={roles} rolesUnavailable={rolesUnavailable} />
    </main>
  );
}
