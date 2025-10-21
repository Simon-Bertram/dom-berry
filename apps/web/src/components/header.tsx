"use client";
import Link from "next/link";
import Logo from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "./mode-toggle";
import { NavItems } from "./nav-items";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-2">
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
      <hr />
    </div>
  );
}
