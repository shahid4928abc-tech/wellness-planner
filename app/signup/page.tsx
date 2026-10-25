import type { Metadata } from "next";
import { AuthForm } from "@/components/app/AuthForm";

export const metadata: Metadata = { title: "Sign up — Wellness Planner" };

export default function Page() {
  return <AuthForm mode="signup" />;
}
