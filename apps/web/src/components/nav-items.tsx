import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem<T extends string = string> = {
  href: T;
  label: string;
};

const navItems: NavItem<Route>[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function NavItems() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          className={`font-medium text-sm transition-colors hover:text-foreground/90 ${pathname === item.href ? "text-foreground" : "text-foreground/70"}`}
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
