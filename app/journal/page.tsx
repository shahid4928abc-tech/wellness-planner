import type { Metadata } from "next";
import { JournalView } from "@/components/app/JournalView";

export const metadata: Metadata = { title: "Journal — Wellness Planner" };

export default function Page() {
  return <JournalView />;
}
