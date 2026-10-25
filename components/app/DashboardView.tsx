"use client";

import Link from "next/link";
import { dayKey, lastDays, shortDay, streak } from "@/lib/dates";
import { AppShell, card } from "./AppShell";
import { Ring } from "./Ring";
import { moodLabel } from "./JournalView";

export function DashboardView() {
  return (
    <AppShell title="Dashboard">
      {({ user, data }) => {
        const today = dayKey();
        const { habits, goals, journal } = data;
        const done = habits.filter((h) => h.log.includes(today)).length;
        const pct = habits.length ? Math.round((done / habits.length) * 100) : 0;
        const week = lastDays(7).map((d) => ({
          d,
          day: shortDay(d),
          value: habits.length ? Math.round((habits.filter((h) => h.log.includes(d)).length / habits.length) * 100) : 0,
        }));
        const best = habits.reduce((m, h) => Math.max(m, streak(h.log)), 0);
        const hour = new Date().getHours();
        const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
        const last = journal[0];

        return (
          <div className="space-y-6">
            <p className="-mt-4 text-lg text-muted">{greeting}, {user.name.split(" ")[0]}.</p>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className={card} aria-labelledby="today">
                <h2 id="today" className="font-display text-2xl font-semibold text-sage-900">Today</h2>
                {habits.length === 0 ? (
                  <p className="mt-3 text-muted">
                    You haven&apos;t added any habits yet. <Link href="/habits" className="font-semibold text-sage-700 underline">Add your first habit</Link>.
                  </p>
                ) : (
                  <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
                    <Ring pct={pct} label={`${pct}% of today's habits complete`} sub={`${done} of ${habits.length} done`} />
                    <ul className="w-full space-y-2">
                      {habits.slice(0, 6).map((h) => {
                        const ok = h.log.includes(today);
                        return (
                          <li key={h.id} className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium ${ok ? "bg-sage-50 text-sage-700" : "bg-cream"}`}>
                            <span className={`h-3 w-3 rounded-full ${ok ? "bg-sage-700" : "border-2 border-sage-300"}`} aria-hidden="true" />
                            {h.name}<span className="sr-only">{ok ? " (done)" : " (to do)"}</span>
                          </li>
                        );
                      })}
                      <li><Link href="/habits" className="text-sm font-semibold text-sage-700 underline">Check off habits</Link></li>
                    </ul>
                  </div>
                )}
              </section>

              <section className={card} aria-labelledby="week">
                <h2 id="week" className="font-display text-2xl font-semibold text-sage-900">This week</h2>
                <p className="text-sm text-muted">Habit completion per day · best streak: {best} {best === 1 ? "day" : "days"}</p>
                <ul className="mt-6 flex h-36 items-end justify-between gap-2">
                  {week.map((w) => (
                    <li key={w.d} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div className="flex w-full flex-1 items-end">
                        <div
                          role="img" aria-label={`${w.day}: ${w.value}%`}
                          className={`w-full rounded-t-lg ${w.d === today ? "bg-clay" : "bg-sage-500"}`}
                          style={{ height: `${Math.max(w.value, 4)}%`, opacity: w.value ? 1 : 0.25 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted">{w.day}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <section className={card} aria-labelledby="goals">
                <h2 id="goals" className="font-display text-2xl font-semibold text-sage-900">Goals</h2>
                {goals.length === 0 ? (
                  <p className="mt-3 text-muted">No goals yet. <Link href="/goals" className="font-semibold text-sage-700 underline">Set one</Link>.</p>
                ) : (
                  <ul className="mt-4 space-y-4">
                    {goals.slice(0, 4).map((g) => (
                      <li key={g.id}>
                        <div className="flex justify-between text-sm font-medium"><span>{g.title}</span><span>{g.progress}%</span></div>
                        <div className="mt-1.5 h-2.5 rounded-full bg-sage-100" role="progressbar" aria-valuenow={g.progress} aria-valuemin={0} aria-valuemax={100} aria-label={g.title}>
                          <div className="h-full rounded-full bg-sage-700" style={{ width: `${g.progress}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className={card} aria-labelledby="mood">
                <h2 id="mood" className="font-display text-2xl font-semibold text-sage-900">Latest journal entry</h2>
                {last ? (
                  <div className="mt-3">
                    <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-700">{moodLabel(last.mood)}</span>
                    {last.text && <p className="mt-3 line-clamp-4 leading-7">{last.text}</p>}
                    <Link href="/journal" className="mt-3 inline-block text-sm font-semibold text-sage-700 underline">Open journal</Link>
                  </div>
                ) : (
                  <p className="mt-3 text-muted">Nothing yet. <Link href="/journal" className="font-semibold text-sage-700 underline">Write your first entry</Link>.</p>
                )}
              </section>
            </div>
          </div>
        );
      }}
    </AppShell>
  );
}
