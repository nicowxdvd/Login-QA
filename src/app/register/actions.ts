"use server";

import {
  getRegisterFieldErrors,
  REGISTER_FIELDS,
  registerSchema,
  type RegisterFieldErrors,
} from "@/lib/users/registerSchema";
import { createUser, getRoles, UsersApiError } from "@/lib/users/usersApiClient";

export type RegisterFormError = "network" | "apiValidation" | "generic";

export interface RegisterFormState {
  status: "idle" | "success" | "error";
  /** Translation keys under `RegisterForm.errors`, per field. */
  fieldErrors?: RegisterFieldErrors;
  formError?: RegisterFormError;
  /** Raw validation messages from the backend (only for `apiValidation`). */
  apiMessages?: string[];
}

/**
 * Server Action behind the register form. Re-validates everything on the
 * server (client checks can be bypassed), makes sure the chosen role is
 * active, and forwards only whitelisted fields to `POST /users`.
 */
export async function registerUserAction(
  _previousState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const input = Object.fromEntries(
    REGISTER_FIELDS.map((field) => [field, formData.get(field) ?? ""])
  );

  const fieldErrors = getRegisterFieldErrors(input);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const data = registerSchema.parse(input);

  try {
    const roles = await getRoles();
    const role = roles.find(({ id }) => id === data.roleId);
    if (!role?.isActive) {
      return { status: "error", fieldErrors: { roleId: "roleUnavailable" } };
    }

    await createUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      roleId: data.roleId,
      password: data.password,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof UsersApiError) {
      if (error.status === 409) {
        return { status: "error", fieldErrors: { email: "emailTaken" } };
      }
      if (error.status === 502) {
        return { status: "error", formError: "network" };
      }
      if (error.status === 400) {
        return {
          status: "error",
          formError: "apiValidation",
          apiMessages: error.details,
        };
      }
    }

    return { status: "error", formError: "generic" };
  }
}
