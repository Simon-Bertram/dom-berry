"use client";
import Link from "next/link";
import Logo from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "./mode-toggle";
import { NavItems } from "./nav-items";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="header-glass sticky top-0 z-50 w-full">
      <div className="container mx-auto flex flex-row items-center justify-between px-4 py-3">
        <Logo />
        <NavItems className="hidden items-center gap-8 lg:flex" />
        <div className="flex items-center gap-3">
          <Button asChild className="hidden lg:inline-flex">
            <Link href="/contact">Start your project</Link>
          </Button>
          <ModeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
