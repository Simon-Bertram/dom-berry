"use client";

import Link from "next/link";
import Hero from "@/components/hero";
import { trackButtonClick } from "@/lib/analytics";

export default function HeroWithCTA() {
  const handleCTAClick = (buttonText: string) => {
    trackButtonClick(buttonText, "/");
  };

  return (
    <Hero
      className="-mt-[72px] -z-10"
      overlayContent={
        <div className="space-y-6">
          <h1 className="font-bold font-display text-5xl text-black tracking-tight sm:text-6xl lg:text-7xl">
            Dom Berry
          </h1>
          <p className="font-body font-bold text-black/90 text-xl sm:text-3xl">
            Professional filmmaking services in Stroud, Gloucestershire
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              className="rounded-lg bg-white px-8 py-3 font-semibold text-black text-lg transition-colors hover:bg-white/90"
              href="/portfolio"
              onClick={() => handleCTAClick("View Portfolio")}
            >
              View Portfolio
            </Link>
            <Link
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-lg text-white transition-colors hover:bg-white hover:text-black"
              href="/contact"
              onClick={() => handleCTAClick("Contact Us")}
            >
              Contact Us
            </Link>
          </div>
        </div>
      }
    />
  );
}
