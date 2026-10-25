import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

const styles = {
  primary: "bg-sage-700 text-cream hover:bg-sage-900 shadow-soft",
  secondary: "border border-sage-700/30 text-sage-900 hover:bg-sage-100",
  light: "bg-cream text-sage-900 hover:bg-white",
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-colors ${styles[variant]} ${className}`;
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <a href={href} className={cls}>{children}</a>
  );
}
