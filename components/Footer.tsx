import { Logo } from "./Logo";

const links = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#preview", label: "Dashboard" },
  { href: "#about", label: "About" },
];

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-sage-900/10 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm leading-6 text-muted">A calm planner for healthier habits and a balanced life.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-medium text-muted hover:text-sage-900">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-sage-900/10 py-5 text-center text-sm text-muted">
        &copy; {year} Wellness Planner. All rights reserved.
      </div>
    </footer>
  );
}
