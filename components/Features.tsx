import { icons } from "./Icons";

const features = [
  { icon: icons.habit, title: "Daily habit tracking", text: "Check off the small things that add up. Build streaks without the pressure of perfection." },
  { icon: icons.goal, title: "Personal wellness goals", text: "Define what a healthier life means to you, then break it into steps you can actually take." },
  { icon: icons.routine, title: "Routines & schedules", text: "Shape mornings and evenings that fit your life, with gentle reminders of what comes next." },
  { icon: icons.mood, title: "Mood & wellbeing journal", text: "Take a minute to note how you feel and notice what lifts you over time." },
  { icon: icons.chart, title: "Progress & insights", text: "See your consistency at a glance with clear weekly views that celebrate effort." },
  { icon: icons.leaf, title: "Healthy lifestyle planning", text: "Plan meals, movement, rest and downtime together so no part of your wellbeing is left out." },
];

export function Features() {
  return (
    <section id="features" className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sage-700">Features</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-sage-900 sm:text-5xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            Six simple tools that work together to support a steadier, kinder daily routine.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <li
              key={f.title}
              className="group rounded-3xl border border-sage-900/5 bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                  i % 3 === 1 ? "bg-clay-soft text-[#8a4b2d]" : "bg-sage-100 text-sage-700"
                }`}
              >
                {f.icon}
              </span>
              <h3 className="font-display text-xl font-semibold text-sage-900">{f.title}</h3>
              <p className="mt-2 leading-7 text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
