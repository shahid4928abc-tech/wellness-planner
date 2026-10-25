import type { Metadata } from "next";
import { GoalsView } from "@/components/app/GoalsView";

export const metadata: Metadata = { title: "Goals — Wellness Planner" };

export default function Page() {
  return <GoalsView />;
}
