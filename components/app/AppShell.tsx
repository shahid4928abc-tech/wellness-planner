"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { logOut, useSession, useUserData, type PublicUser, type UserData } from "@/lib/store";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/habits", label: "Habits" },
  { href: "/goals", label: "Goals" },
  { href: "/journal", label: "Journal" },
];

type Ctx = { user: PublicUser; data: UserData; update: (fn: (d: UserData) => UserData) => void };

function Inner({ user, children }: { user: PublicUser; children: (c: Ctx) => ReactNode }) {
  const { data, update } = useUserData(user.id);
  return <>{children({ user, data, update })}</>;
}

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: (c: Ctx) => ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const leaving = useRef(false);

  useEffect(() => {
    if (session.status === "out" && !leaving.current) router.replace("/login");
  }, [session.status, router]);

  if (session.status !== "in") {
    return <div className="grid min-h-screen place-items-center text-muted">Loading…</div>;
  }
  const { user } = session;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-sage-900/5 bg-cream/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" aria-label="Wellness Planner home"><Logo /></Link>
          <nav aria-label="App" className="hidden gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                  pathname === n.href ? "bg-sage-700 text-cream" : "text-muted hover:bg-sage-100 hover:text-sage-900"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">{user.name}</span>
            <button
              type="button"
              onClick={() => { leaving.current = true; router.replace("/"); logOut(); }}
              className="rounded-full border border-sage-700/30 px-4 py-2 text-sm font-semibold text-sage-900 hover:bg-sage-100"
            >
              Log out
            </button>
          </div>
        </div>
        <nav aria-label="App" className="flex gap-1 overflow-x-auto border-t border-sage-900/5 px-5 py-2 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                pathname === n.href ? "bg-sage-700 text-cream" : "text-muted"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-sage-900">{title}</h1>
        {subtitle && <p className="mt-2 text-lg text-muted">{subtitle}</p>}
        <div className="mt-8">
          <Inner user={user}>{children}</Inner>
        </div>
      </main>
    </div>
  );
}

export const card = "rounded-3xl border border-sage-900/5 bg-paper p-6 shadow-soft sm:p-7";
export const input =
  "w-full rounded-2xl border border-sage-900/15 bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus:border-sage-700";
export const btn =
  "inline-flex items-center justify-center rounded-full bg-sage-700 px-6 py-3 font-semibold text-cream transition-colors hover:bg-sage-900 disabled:opacity-50";
