import { z } from "zod";

/**
 * Shape of the credentials accepted by the login flow.
 * Shared between the client form and the server route handler so both
 * sides reject malformed input the same way.
 */
export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
