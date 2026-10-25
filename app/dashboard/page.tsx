import type { Metadata } from "next";
import { DashboardView } from "@/components/app/DashboardView";

export const metadata: Metadata = { title: "Dashboard — Wellness Planner" };

export default function Page() {
  return <DashboardView />;
}
