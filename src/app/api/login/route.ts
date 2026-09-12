import { NextResponse } from "next/server";
import { AuthApiError, loginWithCredentials } from "@/lib/auth/authApiClient";
import { loginSchema } from "@/lib/auth/loginSchema";

export const AUTH_COOKIE_NAME = "access_token";

/**
 * POST /api/login
 *
 * Proxies the credentials to the local NestJS auth API and, on success,
 * stores the returned JWT in an httpOnly cookie. The token never reaches
 * client-side JavaScript, which limits exposure to XSS.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  try {
    const { accessToken } = await loginWithCredentials(parsed.data);

    const response = NextResponse.json({ success: true });
    response.cookies.set(AUTH_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour, align with the backend's JWT expiry.
    });

    return response;
  } catch (error) {
    if (error instanceof AuthApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { message: "Unexpected error during login" },
      { status: 500 }
    );
  }
}
