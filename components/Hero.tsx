import { Button } from "./Button";

function Leaf({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
      <path d="M60 155C20 130 8 80 60 8c52 72 40 122 0 147Z" fill="currentColor" />
      <path d="M60 150V40" stroke="var(--cream)" strokeWidth="2" opacity=".5" />
    </svg>
  );
}

const habits = [
  { name: "Morning stretch", done: true },
  { name: "Drink 8 glasses of water", done: true },
  { name: "10-minute walk", done: false },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <Leaf className="pointer-events-none absolute -left-10 top-40 h-72 w-48 rotate-[-25deg] text-sage-100" />
      <Leaf className="pointer-events-none absolute -right-8 -top-6 h-64 w-44 rotate-[28deg] text-clay-soft" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
        <div className="animate-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-1.5 text-sm font-semibold text-sage-700">
            <span className="h-2 w-2 rounded-full bg-sage-500" aria-hidden="true" />
            Progress, one day at a time
          </p>
          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-sage-900 sm:text-6xl">
            Small habits.
            <br />
            <span className="italic text-sage-700">A balanced</span> life.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Wellness Planner brings your goals, daily routines and moods into one calm space, so
            healthy habits feel less like a chore and more like a rhythm you can keep.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/signup">Start Your Journey</Button>
            <Button href="#features" variant="secondary">
              Explore Features
            </Button>
          </div>
        </div>

        {/* Illustrative sample card */}
        <div className="relative mx-auto w-full max-w-md animate-rise [animation-delay:150ms]">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-cream-deep" aria-hidden="true" />
          <div className="relative rounded-[2rem] bg-paper p-6 shadow-lift sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Today</p>
                <p className="font-display text-2xl font-semibold text-sage-900">Your gentle rhythm</p>
              </div>
              <span className="rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold text-[#8a4b2d]">
                Sample
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {habits.map((h) => (
                <li
                  key={h.name}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 ${h.done ? "bg-sage-50" : "bg-cream"}`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                      h.done ? "border-sage-700 bg-sage-700" : "border-sage-300"
                    }`}
                    aria-hidden="true"
                  >
                    {h.done && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--cream)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2.5 6.3 2.4 2.3 4.6-5" />
                      </svg>
                    )}
                  </span>
                  <span className={`font-medium ${h.done ? "text-sage-700 line-through decoration-sage-300" : "text-ink"}`}>
                    {h.name}
                    <span className="sr-only">{h.done ? " (done)" : " (to do)"}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-sage-700 px-5 py-4 text-cream">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20.5s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" />
              </svg>
              <p className="text-sm leading-5">
                <span className="font-semibold">Feeling calm today.</span>{" "}
                <span className="opacity-80">Mood journal entry saved.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
