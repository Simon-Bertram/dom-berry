"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigation } from "@/hooks/use-navigation";
import { navItems } from "./nav-items";

export function MobileMenu() {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isCurrentPage,
    closeMobileMenu,
  } = useNavigation();

  return (
    <Sheet onOpenChange={setIsMobileMenuOpen} open={isMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          aria-label="Open navigation menu"
          className="lg:hidden"
          size="icon"
          variant="ghost"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-label="Navigation menu"
        className="w-[300px] sm:w-[400px]"
        id="mobile-navigation"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="text-left">Navigation</SheetTitle>
          <SheetDescription className="text-left">
            Navigate to different sections of the website
          </SheetDescription>
        </SheetHeader>
        <nav
          aria-label="Main navigation"
          className="mt-8 flex flex-col space-y-4"
        >
          {navItems.map((item) => (
            <Link
              aria-current={isCurrentPage(item.href) ? "page" : undefined}
              className={`block rounded-lg px-4 py-3 font-medium text-lg transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                isCurrentPage(item.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground"
              }`}
              href={item.href}
              key={item.href}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 border-t pt-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/contact" onClick={closeMobileMenu}>
                Start your project
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
