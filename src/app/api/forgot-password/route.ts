import { NextResponse } from "next/server";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email is too long"),
});

/**
 * POST /api/forgot-password
 *
 * Accepts an email address and initiates a password reset flow.
 * Returns success regardless of whether the email exists (for security:
 * prevents email enumeration attacks).
 *
 * In a real implementation, this would:
 * - Verify the email exists in the database
 * - Generate a reset token
 * - Store it with an expiry time
 * - Send an email with the reset link
 */
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json().catch(() => null);
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: parsed.error.issues[0]?.message ?? "Invalid request",
        },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Check if user with this email exists
    // 2. Generate reset token
    // 3. Store token in database with expiry
    // 4. Send email with reset link
    // For now, we simulate success

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
