"use client";

import { useCallback, useState } from "react";

export type LoginErrorReason = "invalid-credentials" | "network" | "unknown";

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

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setErrorReason(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        return true;
      }

      if (response.status === 401) {
        setErrorReason("invalid-credentials");
      } else if (response.status === 502) {
        setErrorReason("network");
      } else {
        setErrorReason("unknown");
      }

      return false;
    } catch {
      setErrorReason("network");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setErrorReason(null), []);

  return { login, isLoading, errorReason, clearError };
}
