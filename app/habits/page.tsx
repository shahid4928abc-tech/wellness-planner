import type { Metadata } from "next";
import { HabitsView } from "@/components/app/HabitsView";

export const metadata: Metadata = { title: "Habits — Wellness Planner" };

export default function Page() {
  return <HabitsView />;
}
