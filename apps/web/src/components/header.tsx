"use client";
import Link from "next/link";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";
import { NavItems } from "./nav-items";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <Logo />
        <NavItems />
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/contact">Start your project</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
