"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
  const pathname = usePathname();
  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => (
            <Link
              className={`link ${pathname === "/" ? "active" : ""}`}
              href={to}
              key={to}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link as href="/contact" string>
              Start your project
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
