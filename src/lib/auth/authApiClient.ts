import "server-only";
import { API_BASE_URL } from "@/lib/api/config";
import type { LoginCredentials } from "./loginSchema";

/** Shape returned by the NestJS backend on a successful login. */
interface NestLoginResponse {
  access_token: string;
}

export interface LoginResult {
  accessToken: string;
}

/** Error raised when the upstream auth API rejects credentials or is unreachable. */
export class AuthApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

/**
 * Calls the NestJS `POST /auth/login` endpoint with the given credentials.
 * Runs server-side only (Route Handler), so the NestJS API never needs to
 * allow CORS for the browser and the JWT never touches client JavaScript
 * until we choose to expose it.
 */
export async function loginWithCredentials(
  credentials: LoginCredentials
): Promise<LoginResult> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });
  } catch {
    throw new AuthApiError(
      "Could not reach the authentication service. Is it running locally?",
      502
    );
  }

  if (response.status === 401) {
    throw new AuthApiError("Invalid email or password", 401);
  }

  if (!response.ok) {
    throw new AuthApiError("Authentication service returned an error", response.status);
  }

  const data = (await response.json()) as NestLoginResponse;

  if (!data.access_token) {
    throw new AuthApiError("Authentication service returned an unexpected response", 502);
  }

  return { accessToken: data.access_token };
}
