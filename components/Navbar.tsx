"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";

const links = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sage-900/5 bg-cream/90 backdrop-blur-sm">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="Wellness Planner home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[0.95rem] font-medium text-muted transition-colors hover:text-sage-900">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden px-2 text-[0.95rem] font-semibold text-sage-900 hover:underline md:inline">
            Log in
          </Link>
          <Button href="/signup" className="max-md:!hidden !py-2.5">
            Get Started
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-sage-900 hover:bg-sage-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-sage-900/5 bg-cream px-5 pb-6 pt-2 md:hidden"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-sage-900/5 py-3.5 text-lg font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Link href="/login" onClick={() => setOpen(false)} className="block border-b border-sage-900/5 py-3.5 text-lg font-medium">
            Log in
          </Link>
          <Button href="/signup" className="mt-5 w-full">
            Get Started
          </Button>
        </div>
      )}
    </header>
  );
}
