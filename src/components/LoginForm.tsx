"use client";

import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SocialButton from "@/components/ui/SocialButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulated request delay; replace with a real authentication call.
    setTimeout(() => setIsLoading(false), 1200);
  }

  return (
    <div className="flex h-full w-full flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm animate-fade-slide">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Enter your credentials to access your account.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div>
            <Input
              id="password"
              label="Password"
              icon={Lock}
              isPassword
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-violet-400 transition-all duration-200 hover:text-violet-300"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-800" />
          <span className="text-xs uppercase tracking-wide text-neutral-500">
            Or register with
          </span>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton provider="google" />
          <SocialButton provider="apple" />
        </div>

        <p className="mt-8 text-center text-sm text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-violet-400 transition-all duration-200 hover:text-violet-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
