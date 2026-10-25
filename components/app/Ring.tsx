export function Ring({ pct, label, sub }: { pct: number; label: string; sub: string }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  return (
    <figure className="relative mx-auto h-40 w-40 shrink-0">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" role="img" aria-label={label}>
        <circle cx="64" cy="64" r={R} fill="none" stroke="var(--sage-100)" strokeWidth="12" />
        <circle
          cx="64" cy="64" r={R} fill="none" stroke="var(--sage-700)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-semibold text-sage-900">{pct}%</span>
        <span className="text-xs font-medium text-muted">{sub}</span>
      </figcaption>
    </figure>
  );
}
