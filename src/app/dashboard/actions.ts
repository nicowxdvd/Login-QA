"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/app/api/login/route";

/**
 * Ends the session by deleting the httpOnly JWT cookie (the NestJS API has
 * no logout endpoint; the token is stateless) and returns to the login.
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/");
}
