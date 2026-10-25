"use client";

import { useState, type FormEvent } from "react";
import { newId } from "@/lib/store";
import { AppShell, btn, card, input } from "./AppShell";

export function GoalsView() {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  return (
    <AppShell title="Goals" subtitle="What does a healthier life mean to you?">
      {({ data, update }) => {
        const add = (e: FormEvent) => {
          e.preventDefault();
          const t = title.trim();
          if (!t) return;
          update((d) => ({ ...d, goals: [...d.goals, { id: newId(), title: t, due: due || undefined, progress: 0 }] }));
          setTitle("");
          setDue("");
        };
        const setProgress = (id: string, progress: number) =>
          update((d) => ({ ...d, goals: d.goals.map((g) => (g.id === id ? { ...g, progress } : g)) }));
        const remove = (id: string) => update((d) => ({ ...d, goals: d.goals.filter((g) => g.id !== id) }));

        return (
          <div className="space-y-6">
            <form onSubmit={add} className={`${card} grid gap-3 sm:grid-cols-[1fr_auto_auto]`}>
              <label htmlFor="goal" className="sr-only">New goal</label>
              <input id="goal" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Sleep 8 hours every night" maxLength={100} className={input} />
              <label htmlFor="due" className="sr-only">Target date (optional)</label>
              <input id="due" type="date" value={due} onChange={(e) => setDue(e.target.value)} className={input} />
              <button type="submit" className={btn}>Add goal</button>
            </form>

            {data.goals.length === 0 ? (
              <p className={`${card} text-center text-muted`}>No goals yet. Start with one or two.</p>
            ) : (
              <ul className="grid gap-4 md:grid-cols-2">
                {data.goals.map((g) => (
                  <li key={g.id} className={card}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-display text-xl font-semibold text-sage-900">{g.title}</h2>
                        {g.due && <p className="text-sm text-muted">Target: {g.due}</p>}
                      </div>
                      {g.progress >= 100 && <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-700">Done</span>}
                    </div>
                    <label htmlFor={`p-${g.id}`} className="mt-5 flex justify-between text-sm font-medium">
                      <span>Progress</span><span>{g.progress}%</span>
                    </label>
                    <input
                      id={`p-${g.id}`} type="range" min={0} max={100} step={5} value={g.progress}
                      onChange={(e) => setProgress(g.id, Number(e.target.value))}
                      className="mt-2 w-full accent-[var(--sage-700)]"
                    />
                    <button type="button" onClick={() => remove(g.id)} aria-label={`Delete goal ${g.title}`} className="mt-4 rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-clay-soft hover:text-[#8a4b2d]">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }}
    </AppShell>
  );
}
