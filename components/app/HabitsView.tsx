"use client";

import { useState, type FormEvent } from "react";
import { dayKey, lastDays, shortDay, streak } from "@/lib/dates";
import { newId } from "@/lib/store";
import { AppShell, btn, card, input } from "./AppShell";

export function HabitsView() {
  const [name, setName] = useState("");
  return (
    <AppShell title="Habits" subtitle="Small actions, checked off daily.">
      {({ data, update }) => {
        const today = dayKey();
        const week = lastDays(7);
        const add = (e: FormEvent) => {
          e.preventDefault();
          const n = name.trim();
          if (!n) return;
          update((d) => ({ ...d, habits: [...d.habits, { id: newId(), name: n, log: [] }] }));
          setName("");
        };
        const toggle = (id: string) =>
          update((d) => ({
            ...d,
            habits: d.habits.map((h) =>
              h.id !== id ? h : { ...h, log: h.log.includes(today) ? h.log.filter((x) => x !== today) : [...h.log, today] },
            ),
          }));
        const remove = (id: string) => update((d) => ({ ...d, habits: d.habits.filter((h) => h.id !== id) }));

        return (
          <div className="space-y-6">
            <form onSubmit={add} className={`${card} flex flex-col gap-3 sm:flex-row`}>
              <label htmlFor="habit" className="sr-only">New habit</label>
              <input id="habit" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Drink 8 glasses of water" maxLength={80} className={input} />
              <button type="submit" className={`${btn} shrink-0`}>Add habit</button>
            </form>

            {data.habits.length === 0 ? (
              <p className={`${card} text-center text-muted`}>No habits yet. Add your first one above.</p>
            ) : (
              <ul className="space-y-3">
                {data.habits.map((h) => {
                  const done = h.log.includes(today);
                  const s = streak(h.log);
                  return (
                    <li key={h.id} className={`${card} flex flex-wrap items-center gap-4 !py-4`}>
                      <button
                        type="button"
                        aria-pressed={done}
                        aria-label={`${h.name}: mark ${done ? "not done" : "done"} today`}
                        onClick={() => toggle(h.id)}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${done ? "border-sage-700 bg-sage-700" : "border-sage-300 hover:border-sage-700"}`}
                      >
                        {done && (
                          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="var(--cream)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 6.3 2.4 2.3 4.6-5" /></svg>
                        )}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate font-semibold ${done ? "text-sage-700" : ""}`}>{h.name}</p>
                        <p className="text-sm text-muted">{s > 0 ? `${s}-day streak` : "No streak yet"}</p>
                      </div>
                      <ul className="flex gap-1.5" aria-label="Last 7 days">
                        {week.map((d) => (
                          <li key={d} className="text-center">
                            <span
                              title={`${shortDay(d)}: ${h.log.includes(d) ? "done" : "not done"}`}
                              className={`block h-5 w-5 rounded-md ${h.log.includes(d) ? "bg-sage-500" : "bg-sage-100"}`}
                            />
                            <span className="sr-only">{shortDay(d)} {h.log.includes(d) ? "done" : "not done"}</span>
                          </li>
                        ))}
                      </ul>
                      <button type="button" onClick={() => remove(h.id)} aria-label={`Delete ${h.name}`} className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-clay-soft hover:text-[#8a4b2d]">
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      }}
    </AppShell>
  );
}
