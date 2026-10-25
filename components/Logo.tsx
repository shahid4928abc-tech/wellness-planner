export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="var(--sage-700)" />
        <path
          d="M16 25c-5.5 0-9-3.8-9-9 5.6 0 9 2.6 9 9Zm0 0c0-6.4 3.4-9.6 9-9.6 0 5.7-3.5 9.6-9 9.6Z"
          fill="var(--cream)"
        />
        <path d="M16 25V13" stroke="var(--cream)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">Wellness Planner</span>
    </span>
  );
}
