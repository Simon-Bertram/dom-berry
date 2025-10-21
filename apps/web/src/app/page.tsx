"use client";

import Link from "next/link";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <Hero
      className="-mt-[72px]"
      overlayContent={
        <div className="space-y-6">
          <h1 className="font-bold font-display text-5xl text-black tracking-tight sm:text-6xl lg:text-7xl">
            Dom Berry
          </h1>
          <p className="font-body font-bold text-black/90 text-xl sm:text-2xl">
            Professional filmmaking services
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              className="rounded-lg bg-white px-8 py-3 font-semibold text-black text-lg transition-colors hover:bg-white/90"
              type="button"
            >
              <Link href="/portfolio">View Portfolio</Link>
            </button>
            <Link
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-lg text-white transition-colors hover:bg-white hover:text-black"
              href="/contact"
            >
              Contact Us
            </Link>
          </div>
        </div>
      }
    />
  );
}
