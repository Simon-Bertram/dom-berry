"use client";

import Link from "next/link";
import Hero from "@/components/hero";
import { useABTest } from "@/hooks/use-ab-test";
import { trackButtonClick } from "@/lib/analytics";

export default function HeroWithCTA() {
  // A/B Test for hero CTA button colors
  const { variant: ctaVariant, trackConversion } = useABTest("hero-cta-colors");

  const handleCTAClick = (buttonText: string, href: string) => {
    trackButtonClick(buttonText, "/");
    trackConversion("cta_click", { button_text: buttonText, href });
  };

  const getCTAButtonClass = () => {
    if (ctaVariant === "variant-a") {
      return "bg-blue-600 text-white hover:bg-blue-700";
    }
    if (ctaVariant === "variant-b") {
      return "bg-green-600 text-white hover:bg-green-700";
    }
    return "bg-white text-black hover:bg-white/90";
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
              className={`rounded-lg px-8 py-3 font-semibold text-lg transition-colors ${getCTAButtonClass()}`}
              href="/portfolio"
              onClick={() => handleCTAClick("View Portfolio", "/portfolio")}
            >
              View Portfolio
            </Link>
            <Link
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-lg text-white transition-colors hover:bg-white hover:text-black"
              href="/contact"
              onClick={() => handleCTAClick("Contact Us", "/contact")}
            >
              Contact Us
            </Link>
          </div>
        </div>
      }
    />
  );
}
