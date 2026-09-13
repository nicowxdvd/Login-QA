import { z } from "zod";

/**
 * Shape of the credentials accepted by the login flow.
 * Shared between the client form (live feedback) and the server route
 * handler (source of truth) so both sides reject malformed input the same way.
 *
 * Messages are translation keys under `LoginForm.errors`, so the client
 * can render them in the active locale.
 */
export const LOGIN_FIELDS = ["email", "password"] as const;

export type LoginField = (typeof LOGIN_FIELDS)[number];

export type LoginFieldErrors = Partial<Record<LoginField, string>>;

export const loginSchema = z.object({
  email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
  password: z.string().min(1, "passwordRequired"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

/**
 * Returns the first error key per field. An empty object means the input
 * is valid.
 */
export function getLoginFieldErrors(
  input: Record<string, unknown>
): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const result = loginSchema.safeParse(input);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    for (const field of LOGIN_FIELDS) {
      const message = fieldErrors[field]?.[0];
      if (message) {
        errors[field] = message;
      }
    }
  }

  return errors;
}
