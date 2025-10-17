import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem<T extends string = string> = {
  href: T;
  label: string;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type NavItemsProps = {
  onItemClick?: () => void;
  className?: string;
};

export function NavItems({
  onItemClick,
  className = "flex items-center gap-6",
}: NavItemsProps) {
  const pathname = usePathname();
  return (
    <nav className={className}>
      {navItems.map((item) => (
        <Link
          className={`font-medium text-sm transition-colors hover:text-foreground/90 ${pathname === item.href ? "text-foreground" : "text-foreground/70"}`}
          href={item.href as any}
          key={item.href}
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
