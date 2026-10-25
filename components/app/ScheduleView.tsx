"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { dayKey } from "@/lib/dates";
import { newId, type ActivityKind } from "@/lib/store";
import { AppShell, btn, card, input } from "./AppShell";

const kinds: { value: ActivityKind; label: string }[] = [
  { value: "MOVE", label: "Movement" },
  { value: "MEAL", label: "Meal" },
  { value: "REST", label: "Rest" },
  { value: "REMINDER", label: "Reminder" },
];

function formatTime(value: string) {
  const [hourText, minute = "00"] = value.split(":");
  const hour = Number(hourText);
  if (!Number.isFinite(hour)) return value;
  return `${hour % 12 || 12}:${minute} ${hour >= 12 ? "PM" : "AM"}`;
}

export function ScheduleView() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [time, setTime] = useState("18:00");
  const [tag, setTag] = useState<ActivityKind>("MOVE");
  const [showForm, setShowForm] = useState(false);

  return (
    <AppShell title="Daily rhythm" subtitle="Build a realistic day, one small activity at a time.">
      {({ data, update }) => {
        const today = dayKey();
        const plan = [...(data.dailyPlan ?? [])].sort((a, b) => a.time.localeCompare(b.time));
        const completed = plan.filter((activity) => activity.completedOn === today).length;

        function add(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const cleanTitle = title.trim();
          if (!cleanTitle) return;
          update((current) => ({
            ...current,
            dailyPlan: [
              ...(current.dailyPlan ?? []),
              { id: newId(), title: cleanTitle, detail: detail.trim() || "A small step that fits your day.", time, tag, completedOn: null },
            ],
          }));
          setTitle("");
          setDetail("");
          setShowForm(false);
        }

        return (
          <div className="space-y-6">
            <section className={`${card} flex flex-wrap items-center justify-between gap-4`}>
              <div>
                <p className="text-sm font-semibold text-muted">Today&apos;s progress</p>
                <p className="mt-1 font-display text-3xl font-semibold text-sage-900">{completed} <span className="text-lg text-muted">/ {plan.length} complete</span></p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/companion" className="inline-flex items-center justify-center rounded-full border border-sage-700/30 px-5 py-3 text-sm font-semibold text-sage-900 hover:bg-sage-100">Ask the AI companion</Link>
                <button type="button" onClick={() => setShowForm((open) => !open)} className={btn}>+ Add activity</button>
              </div>
            </section>

            {showForm && (
              <form onSubmit={add} className={`${card} space-y-4`}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-2xl font-semibold text-sage-900">Add to your day</h2>
                  <button type="button" onClick={() => setShowForm(false)} className="text-sm font-medium text-muted underline">Cancel</button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold">Activity<input required maxLength={80} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Take a short walk" className={`${input} mt-1.5`} /></label>
                  <label className="text-sm font-semibold">Time<input type="time" value={time} onChange={(event) => setTime(event.target.value)} className={`${input} mt-1.5`} /></label>
                  <label className="text-sm font-semibold">Category<select value={tag} onChange={(event) => setTag(event.target.value as ActivityKind)} className={`${input} mt-1.5`}>
                    {kinds.map((kind) => <option key={kind.value} value={kind.value}>{kind.label}</option>)}
                  </select></label>
                  <label className="text-sm font-semibold">Helpful note<input maxLength={240} value={detail} onChange={(event) => setDetail(event.target.value)} placeholder="Optional detail or reminder" className={`${input} mt-1.5`} /></label>
                </div>
                <button type="submit" className={btn}>Save activity</button>
              </form>
            )}

            {plan.length === 0 ? (
              <p className={`${card} text-center text-muted`}>Your day is open. Add an activity or ask the AI companion for an idea.</p>
            ) : (
              <ol className="space-y-3">
                {plan.map((activity) => {
                  const done = activity.completedOn === today;
                  const kind = kinds.find((item) => item.value === activity.tag);
                  return (
                    <li key={activity.id} className={`${card} flex flex-wrap items-center gap-4 !py-4`}>
                      <label className="flex items-center gap-3 text-sm font-semibold text-sage-900">
                        <input type="time" aria-label={`Time for ${activity.title}`} value={activity.time} onChange={(event) => update((current) => ({ ...current, dailyPlan: current.dailyPlan.map((item) => item.id === activity.id ? { ...item, time: event.target.value } : item) }))} className="w-32 rounded-xl border border-sage-900/15 bg-white px-2.5 py-2 text-sm" />
                        <span className="sr-only">{formatTime(activity.time)}</span>
                      </label>
                      <button type="button" onClick={() => update((current) => ({ ...current, dailyPlan: current.dailyPlan.map((item) => item.id === activity.id ? { ...item, completedOn: done ? null : today } : item) }))} aria-pressed={done} aria-label={`${done ? "Uncheck" : "Complete"} ${activity.title}`} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${done ? "border-sage-700 bg-sage-700 text-white" : "border-sage-300 text-transparent hover:border-sage-700"}`}>✓</button>
                      <div className="min-w-0 flex-1">
                        <p className={`font-semibold ${done ? "text-muted line-through" : "text-sage-900"}`}>{activity.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">{activity.detail}</p>
                      </div>
                      <span className="rounded-full bg-sage-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sage-700">{kind?.label ?? "Activity"}</span>
                      <button type="button" onClick={() => update((current) => ({ ...current, dailyPlan: current.dailyPlan.filter((item) => item.id !== activity.id) }))} aria-label={`Remove ${activity.title}`} className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-clay-soft hover:text-[#8a4b2d]">Remove</button>
                    </li>
                  );
                })}
              </ol>
            )}

            <p className="text-center text-xs leading-5 text-muted">Medication reminders are for your own schedule. The planner does not recommend or change medication.</p>
          </div>
        );
      }}
    </AppShell>
  );
}
