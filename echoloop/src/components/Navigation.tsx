import Link from "next/link";

const links = [
  { href: "/journal", label: "Journal" },
  { href: "/sleep", label: "Sleep" },
  { href: "/drawing", label: "Reflect" },
  { href: "/insights", label: "Insights" },
  { href: "/sounds", label: "Calm" },
];

export default function Navigation() {
  return (
    <nav className="app-nav">
      <p className="app-nav__label">Explore</p>
      <ul className="app-nav__list">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="app-nav__link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
