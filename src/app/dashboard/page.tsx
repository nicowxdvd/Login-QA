import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/app/api/login/route";

/**
 * Minimal authenticated placeholder. Confirms the JWT issued by the login
 * flow was stored and is actually gating access to this route.
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (!token) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          You are signed in
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          This page is only reachable with a valid session cookie.
        </p>
      </div>
    </main>
  );
}
