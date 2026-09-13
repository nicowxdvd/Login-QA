"use client";

import { useCallback, useRef, useState } from "react";

export type LoginErrorReason =
  | "invalid-credentials"
  | "validation"
  | "network"
  | "unknown";

interface UseLoginResult {
  login: (email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
  errorReason: LoginErrorReason | null;
  clearError: () => void;
}

/**
 * Drives the login request against the internal `/api/login` route,
 * which proxies to the local NestJS auth API. Keeps request/loading/error
 * state out of the form component.
 */
export function useLogin(): UseLoginResult {
  const [isLoading, setIsLoading] = useState(false);
  const [errorReason, setErrorReason] = useState<LoginErrorReason | null>(null);
  // Synchronous guard against double submits. Unlike `isLoading`, a ref updates
  // immediately, so rapid clicks fired before the next render still see the lock.
  const inFlightRef = useRef(false);

  const login = useCallback(async (email: string, password: string) => {
    if (inFlightRef.current) {
      return false;
    }
    inFlightRef.current = true;
    setIsLoading(true);
    setErrorReason(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Keep the lock held: the caller navigates away on success, and
        // releasing here would briefly re-open the window for a duplicate login.
        return true;
      }

      if (response.status === 401) {
        setErrorReason("invalid-credentials");
      } else if (response.status === 400) {
        // Malformed credentials rejected by the schema (safety net; the form
        // validates client-side first, so this rarely happens).
        setErrorReason("validation");
      } else if (response.status === 502) {
        setErrorReason("network");
      } else {
        setErrorReason("unknown");
      }
    } catch {
      setErrorReason("network");
    }

    // Only reached on failure: release the lock so the user can retry.
    inFlightRef.current = false;
    setIsLoading(false);
    return false;
  }, []);

  const clearError = useCallback(() => setErrorReason(null), []);

  return { login, isLoading, errorReason, clearError };
}
