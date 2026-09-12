import "server-only";
import { API_BASE_URL } from "@/lib/api/config";

/** User as returned by the NestJS `POST /users` endpoint. */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

/** Error raised when the users API rejects a request or is unreachable. */
export class UsersApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    /** Validation messages reported by the backend, if any. */
    public readonly details: string[] = []
  ) {
    super(message);
    this.name = "UsersApiError";
  }
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${API_BASE_URL}${path}`, { ...init, cache: "no-store" });
  } catch {
    throw new UsersApiError(
      "Could not reach the users service. Is it running locally?",
      502
    );
  }
}

/** Calls the NestJS `POST /users` endpoint. */
export async function createUser(payload: CreateUserPayload): Promise<User> {
  const response = await request("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const details = Array.isArray(body?.message)
      ? body.message
      : body?.message
        ? [body.message]
        : [];

    throw new UsersApiError(
      "Users service rejected the request",
      response.status,
      details
    );
  }

  return (await response.json()) as User;
}
