import type { Metadata } from "next";
import { ScheduleView } from "@/components/app/ScheduleView";

export const metadata: Metadata = { title: "Daily rhythm — Wellness Planner" };

export default function Page() {
  return <ScheduleView />;
}
