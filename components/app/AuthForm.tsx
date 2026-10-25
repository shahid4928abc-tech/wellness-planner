
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { logIn, signUp, useSession } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { btn, input } from "./AppShell";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const session = useSession();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const isSignup = mode === "signup";

  useEffect(() => {
    if (session.status === "in") router.replace("/dashboard");
  }, [session.status, router]);

  async function handleGoogleLogin() {
    setBusy(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setError(error.message);
        setBusy(false);
      }
    } catch {
      setError("Unable to sign in with Google. Please try again.");
      setBusy(false);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);

    const err = isSignup
      ? await signUp(
          String(f.get("name")),
          String(f.get("email")),
          String(f.get("password"))
        )
      : await logIn(
          String(f.get("email")),
          String(f.get("password"))
        );

    setBusy(false);

    if (err) {
      setError(err);
    } else if (!isSignup) {
      router.replace("/dashboard");
    } else {
      setError(
        "Account created. If email confirmation is enabled in Supabase, check your inbox and confirm your email before logging in."
      );
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex justify-center"
          aria-label="Wellness Planner home"
        >
          <Logo />
        </Link>

        <div className="rounded-[2rem] bg-paper p-8 shadow-lift">
          <h1 className="font-display text-3xl font-semibold text-sage-900">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>

          <p className="mt-2 text-muted">
            {isSignup
              ? "Start tracking your habits today."
              : "Log in to continue your journey."}
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={busy}
            className={`${btn} mt-6 w-full`}
          >
            {busy ? "Please wait…" : "Continue with Google"}
          </button>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-muted">or use email</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className={input}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={input}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold"
              >
                Password
                {isSignup && (
                  <span className="font-normal text-muted">
                    {" "}(8+ characters)
                  </span>
                )}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={isSignup ? 8 : undefined}
                autoComplete={
                  isSignup ? "new-password" : "current-password"
                }
                className={input}
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-clay-soft px-4 py-3 text-sm font-medium text-[#8a4b2d]"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className={`${btn} w-full`}
            >
              {busy
                ? "Please wait…"
                : isSignup
                  ? "Create account"
                  : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <Link
              href={isSignup ? "/login" : "/signup"}
              className="font-semibold text-sage-700 underline"
            >
              {isSignup ? "Log in" : "Create an account"}
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-muted">
          Your account is managed by Supabase. Wellness data is synced to
          your private cloud account.
        </p>
      </div>
    </div>
  );
}
