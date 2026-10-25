const habits = [
  { name: "Morning stretch", done: true },
  { name: "Drink 8 glasses of water", done: true },
  { name: "Read for 20 minutes", done: true },
  { name: "Evening journal", done: true },
  { name: "10-minute walk", done: false },
  { name: "Lights out by 10:30", done: false },
];

const week = [
  { day: "Mon", value: 70 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 65 },
  { day: "Sat", value: 100 },
  { day: "Sun", value: 67, today: true },
];

const upcoming = [
  { time: "5:30 PM", name: "Evening walk" },
  { time: "8:00 PM", name: "Wind-down routine" },
  { time: "10:30 PM", name: "Lights out" },
];

const R = 54;
const C = 2 * Math.PI * R;

export function DashboardPreview() {
  const doneCount = habits.filter((h) => h.done).length;
  const pct = Math.round((doneCount / habits.length) * 100);

  return (
    <section id="preview" className="bg-sage-900 py-20 text-cream lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sage-300">Dashboard preview</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Your whole day, at a glance
          </h2>
          <p className="mt-4 text-lg leading-8 text-sage-100/80">
            A look at what your dashboard could feel like. All figures below are illustrative sample data.
          </p>
        </div>

        <div className="mt-14 grid gap-5 text-ink lg:grid-cols-[1.1fr_0.9fr]">
          {/* Habits + ring */}
          <div className="rounded-3xl bg-paper p-6 shadow-lift sm:p-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
              <figure className="relative mx-auto h-40 w-40 shrink-0">
                <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" role="img" aria-label={`${pct}% of today's habits complete`}>
                  <circle cx="64" cy="64" r={R} fill="none" stroke="var(--sage-100)" strokeWidth="12" />
                  <circle
                    cx="64" cy="64" r={R} fill="none" stroke="var(--sage-700)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
                    className="ring" style={{ ["--ring-len" as string]: C }}
                  />
                </svg>
                <figcaption className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl font-semibold text-sage-900">{pct}%</span>
                  <span className="text-xs font-medium text-muted">{doneCount} of {habits.length} done</span>
                </figcaption>
              </figure>
              <div>
                <h3 className="font-display text-2xl font-semibold text-sage-900">Today&apos;s progress</h3>
                <p className="mt-2 leading-7 text-muted">
                  Two more to go. A short walk and an early night would round out the day.
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {habits.map((h) => (
                <li key={h.name} className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${h.done ? "bg-sage-50" : "bg-cream"}`}>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${h.done ? "border-sage-700 bg-sage-700" : "border-sage-300"}`}
                    aria-hidden="true"
                  >
                    {h.done && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="var(--cream)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2.5 6.3 2.4 2.3 4.6-5" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-medium">
                    {h.name}
                    <span className="sr-only">{h.done ? " (done)" : " (to do)"}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5">
            {/* Weekly */}
            <div className="rounded-3xl bg-paper p-6 shadow-lift sm:p-8">
              <h3 className="font-display text-xl font-semibold text-sage-900">This week</h3>
              <p className="text-sm text-muted">Habit completion per day</p>
              <ul className="mt-6 flex h-36 items-end justify-between gap-2">
                {week.map((d, i) => (
                  <li key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className={`bar w-full rounded-t-lg ${d.today ? "bg-clay" : "bg-sage-500"}`}
                        style={{ height: `${d.value}%`, animationDelay: `${i * 70}ms` }}
                        role="img"
                        aria-label={`${d.day}: ${d.value}%`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${d.today ? "text-[#8a4b2d]" : "text-muted"}`}>{d.day}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upcoming */}
            <div className="rounded-3xl bg-paper p-6 shadow-lift sm:p-8">
              <h3 className="font-display text-xl font-semibold text-sage-900">Up next</h3>
              <ul className="mt-4 divide-y divide-sage-900/10">
                {upcoming.map((u) => (
                  <li key={u.name} className="flex items-center justify-between py-3">
                    <span className="font-medium">{u.name}</span>
                    <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-700">{u.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
