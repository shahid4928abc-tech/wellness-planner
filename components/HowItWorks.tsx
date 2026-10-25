const steps = [
  { title: "Set your wellness goals", text: "Choose what matters to you: more energy, better sleep, steadier moods. Start with one or two." },
  { title: "Create daily habits & routines", text: "Turn each goal into small actions and place them in a morning, afternoon or evening routine." },
  { title: "Track progress, celebrate consistency", text: "Check in each day, glance at your week and notice how far steady effort has taken you." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sage-700">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-sage-900 sm:text-5xl">
            Three steps to a steadier you
          </h2>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-sage-300 md:block"
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-700 font-display text-2xl font-semibold text-cream ring-8 ring-cream">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-sage-900">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs leading-7 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
