"use client";

import Link from "next/link";
import Hero from "@/components/hero-video/hero";
import { trackButtonClick } from "@/lib/analytics";

export default function HeroWithCTA() {
  const handleCTAClick = (buttonText: string) => {
    trackButtonClick(buttonText, "/");
  };

  return (
    <Hero
      className="-mt-[72px] -z-10"
      overlayContent={
        <div className="absolute bottom-8 left-8 max-w-md space-y-4 rounded-lg bg-black/20 p-6 backdrop-blur-sm">
          <h1 className="font-bold font-display text-3xl text-white tracking-tight sm:text-4xl">
            Dom Berry
          </h1>
          <p className="font-body text-lg text-white sm:text-xl">
            Professional filmmaking services in Stroud, Gloucestershire
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-md bg-white/90 px-6 py-2 font-semibold text-black text-sm transition-colors hover:bg-white"
              href="/portfolio"
              onClick={() => handleCTAClick("View Portfolio")}
            >
              View Portfolio
            </Link>
            <Link
              className="rounded-md border border-white/80 px-6 py-2 font-semibold text-sm text-white transition-colors hover:bg-white/10"
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
