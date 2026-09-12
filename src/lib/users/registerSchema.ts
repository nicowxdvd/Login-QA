import { z } from "zod";

/**
 * Validation rules for the register form. Shared between the client form
 * (live feedback) and the Server Action (source of truth), and aligned with
 * the NestJS `POST /users` DTO.
 *
 * Messages are translation keys under `RegisterForm.errors`, so the client
 * can render them in the active locale.
 */
export const REGISTER_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "roleId",
  "password",
  "confirmPassword",
] as const;

export type RegisterField = (typeof REGISTER_FIELDS)[number];

export type RegisterFieldErrors = Partial<Record<RegisterField, string>>;

/** Letters (any language), spaces, apostrophes and hyphens; must start with a letter. */
const NAME_PATTERN = /^\p{L}[\p{L}\s'-]*$/u;

function nameSchema(field: "firstName" | "lastName") {
  return z
    .string()
    .trim()
    .min(1, `${field}Required`)
    .min(3, `${field}Min`)
    .max(50, `${field}Max`)
    .regex(NAME_PATTERN, `${field}Invalid`);
}

export const registerSchema = z.object({
  firstName: nameSchema("firstName"),
  lastName: nameSchema("lastName"),
  email: z
    .string()
    .trim()
    .min(1, "emailRequired")
    .max(254, "emailMax")
    .email("emailInvalid"),
  roleId: z.coerce
    .number({ invalid_type_error: "roleRequired" })
    .int("roleRequired")
    .min(1, "roleRequired"),
  password: z
    .string()
    .min(1, "passwordRequired")
    .min(8, "passwordMin")
    .max(72, "passwordMax")
    .regex(/[a-z]/, "passwordWeak")
    .regex(/[A-Z]/, "passwordWeak")
    .regex(/\d/, "passwordWeak"),
  confirmPassword: z.string().min(1, "confirmPasswordRequired"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Returns the first error key per field, including the password
 * confirmation check. An empty object means the input is valid.
 */
export function getRegisterFieldErrors(
  input: Record<string, unknown>
): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {};
  const result = registerSchema.safeParse(input);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    for (const field of REGISTER_FIELDS) {
      const message = fieldErrors[field]?.[0];
      if (message) {
        errors[field] = message;
      }
    }
  }

  if (!errors.confirmPassword && input.confirmPassword !== input.password) {
    errors.confirmPassword = "passwordMismatch";
  }

  return errors;
}
