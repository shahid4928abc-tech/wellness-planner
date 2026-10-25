import { Button } from "./Button";

export function CTA() {
  return (
    <section className="px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-sage-700 px-6 py-16 text-center text-cream sm:px-12 sm:py-20">
        <svg className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-sage-500/40" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 text-sage-500/40" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Your healthier rhythm starts with one small step
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-sage-100">
            Pick a single goal, choose one habit, and begin today. The rest follows, one day at a time.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/signup" variant="light">Create your account</Button>
            <a
              href="#preview"
              className="inline-flex items-center justify-center rounded-full border border-cream/40 px-6 py-3 text-[0.95rem] font-semibold transition-colors hover:bg-cream/10"
            >
              Revisit the dashboard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
