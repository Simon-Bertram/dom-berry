"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import VideoBg from "./video-bg";

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <VideoBg />
      <div className="absolute right-10 bottom-30 z-10 flex flex-col rounded-lg bg-black/70 p-6 text-white">
        <h1 className="mb-4 font-black text-4xl">Dom Berry</h1>
        <p className="mb-4 text-lg">
          Professional filmmaking services in Stroud, Gloucestershire
        </p>
        <Button asChild className="bg-white text-blue-950 hover:bg-white/80">
          <Link href="/portfolio">View portfolio</Link>
        </Button>
        <Button asChild className="bg-white text-blue-950 hover:bg-white/80">
          <Link href="/contact">Get in touch</Link>
        </Button>
      </div>
    </div>
  );
}
