const principles = [
  { title: "Gentle, not strict", text: "Missed a day? Pick up tomorrow. Consistency matters more than perfection." },
  { title: "Whole-person", text: "Movement, rest, food and mood live side by side, because they shape each other." },
  { title: "Yours to define", text: "Your goals, your pace, your routines. No one-size-fits-all programme." },
];

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sage-700">About</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-sage-900 sm:text-5xl">
            Wellness is a practice, not a performance
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Wellness Planner is built around a simple belief: lasting change comes from small,
            repeatable actions. It gives you a calm place to plan them and see them add up.
          </p>
        </div>
        <ul className="grid gap-4">
          {principles.map((p) => (
            <li key={p.title} className="rounded-3xl border border-sage-900/5 bg-paper p-6 shadow-soft">
              <h3 className="font-display text-xl font-semibold text-sage-900">{p.title}</h3>
              <p className="mt-1.5 leading-7 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
