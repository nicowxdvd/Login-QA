import "server-only";

/**
 * Base URL of the local NestJS API (auth, users, roles).
 * Configure via `AUTH_API_URL` in `.env.local` to match the port your
 * NestJS instance is running on. Defaults to the common local dev port.
 */
export const API_BASE_URL = process.env.AUTH_API_URL ?? "http://localhost:3001";
