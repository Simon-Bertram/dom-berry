"use client";
import Link from "next/link";
import { trackButtonClick } from "@/lib/analytics";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";
import { MobileMenu } from "./navigation/mobile-menu";
import { NavItems } from "./navigation/nav-items";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="header-glass relative top-0 z-50 w-full py-4">
      <div className="container mx-auto flex flex-row items-center justify-between">
        <Logo />
        <NavItems className="hidden items-center gap-8 lg:flex" />
        <div className="flex items-center gap-3">
          <Button asChild className="hidden lg:inline-flex">
            <Link
              href="/contact"
              onClick={() => trackButtonClick("Start your project", "/")}
            >
              Start your project
            </Link>
          </Button>
          <ModeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
