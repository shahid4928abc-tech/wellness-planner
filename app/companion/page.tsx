import type { Metadata } from "next";
import { WellnessChat } from "@/components/app/WellnessChat";

export const metadata: Metadata = { title: "AI companion — Wellness Planner" };

export default function Page() {
  return <WellnessChat />;
}
