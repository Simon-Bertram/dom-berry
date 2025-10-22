"use client";

import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useABTest } from "@/hooks/use-ab-test";
import { trackButtonClick } from "@/lib/analytics";
import { getAllPortfolioProjects, getAllTestimonials } from "@/lib/content";

const NUM_HOMEPAGE_ITEMS = 3;
const DECIMAL_RADIX = 10;
const QUOTE_PREFIX_REGEX = /^>\s*"?/;
const QUOTE_SUFFIX_REGEX = /"$/;

export default function Home() {
  const projects = getAllPortfolioProjects()
    .slice()
    .sort(
      (a, b) =>
        Number.parseInt(b.year, DECIMAL_RADIX) -
        Number.parseInt(a.year, DECIMAL_RADIX)
    )
    .slice(0, NUM_HOMEPAGE_ITEMS);

  const testimonials = getAllTestimonials().slice(0, NUM_HOMEPAGE_ITEMS);

  // A/B Test for hero CTA button colors
  const { variant: ctaVariant, trackConversion } = useABTest("hero-cta-colors");

  // A/B Test for homepage layout
  const { variant: layoutVariant } = useABTest("homepage-layout-variant");

  const handleCTAClick = (buttonText: string, href: string) => {
    trackButtonClick(buttonText, "/");
    trackConversion("cta_click", { button_text: buttonText, href });
  };

  const handlePortfolioClick = (projectSlug: string) => {
    trackButtonClick("View Portfolio", "/");
    trackConversion("portfolio_view", { project_slug: projectSlug });
  };

  return (
    <>
      <Hero
        className="-mt-[72px] -z-10"
        overlayContent={
          <div className="space-y-6">
            <h1 className="font-bold font-display text-5xl text-black tracking-tight sm:text-6xl lg:text-7xl">
              Dom Berry
            </h1>
            <p className="font-body font-bold text-black/90 text-xl sm:text-3xl">
              Professional filmmaking services
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                className={`rounded-lg px-8 py-3 font-semibold text-lg transition-colors ${
                  ctaVariant === "variant-a"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : ctaVariant === "variant-b"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-white text-black hover:bg-white/90"
                }`}
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

      {/* Layout A/B Test: Different section orders */}
      {layoutVariant === "variant-a" ? (
        // Variant A: Testimonials first, then projects
        <>
          {/* Latest Testimonials */}
          <section className="bg-white py-12 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-bold font-display text-2xl text-gray-900 dark:text-gray-100">
                  Latest Testimonials
                </h2>
                <Link
                  className="text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  href="/testimonials"
                >
                  Read more
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {testimonials.map((t) => (
                  <Card className="h-full" key={t.slug}>
                    <CardContent className="p-6">
                      <blockquote className="mb-4 text-gray-700 italic dark:text-gray-300">
                        {(() => {
                          const lines = t.content.split("\n");
                          const quoteLine = lines.find((line) =>
                            line.trim().startsWith(">")
                          );
                          if (quoteLine) {
                            return quoteLine
                              .replace(QUOTE_PREFIX_REGEX, "")
                              .replace(QUOTE_SUFFIX_REGEX, "");
                          }
                          return t.content.split("\n")[0];
                        })()}
                      </blockquote>
                      <div className="text-gray-900 text-sm dark:text-gray-100">
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {t.role} at {t.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="bg-gray-50 py-12 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-bold font-display text-2xl text-gray-900 dark:text-gray-100">
                  Recent Projects
                </h2>
                <Link
                  className="text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  href="/portfolio"
                  onClick={() => handlePortfolioClick("all")}
                >
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {projects.map((project) => (
                  <Card className="h-full overflow-hidden" key={project.slug}>
                    <div className="relative aspect-video w-full">
                      <Image
                        alt={`${project.title} thumbnail`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        src={project.image}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {project.category} • {project.location} • {project.year}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-gray-600 text-sm dark:text-gray-300">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        // Control and Variant B: Projects first, then testimonials
        <>
          {/* Recent Projects */}
          <section className="bg-gray-50 py-12 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-bold font-display text-2xl text-gray-900 dark:text-gray-100">
                  Recent Projects
                </h2>
                <Link
                  className="text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  href="/portfolio"
                  onClick={() => handlePortfolioClick("all")}
                >
                  View all
                </Link>
              </div>

              <div
                className={`grid grid-cols-1 gap-6 ${
                  layoutVariant === "variant-b"
                    ? "lg:grid-cols-2 xl:grid-cols-3"
                    : "md:grid-cols-3"
                }`}
              >
                {projects.map((project) => (
                  <Card className="h-full overflow-hidden" key={project.slug}>
                    <div className="relative aspect-video w-full">
                      <Image
                        alt={`${project.title} thumbnail`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        src={project.image}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {project.category} • {project.location} • {project.year}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-gray-600 text-sm dark:text-gray-300">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Latest Testimonials */}
          <section className="bg-white py-12 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-bold font-display text-2xl text-gray-900 dark:text-gray-100">
                  Latest Testimonials
                </h2>
                <Link
                  className="text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  href="/testimonials"
                >
                  Read more
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {testimonials.map((t) => (
                  <Card className="h-full" key={t.slug}>
                    <CardContent className="p-6">
                      <blockquote className="mb-4 text-gray-700 italic dark:text-gray-300">
                        {(() => {
                          const lines = t.content.split("\n");
                          const quoteLine = lines.find((line) =>
                            line.trim().startsWith(">")
                          );
                          if (quoteLine) {
                            return quoteLine
                              .replace(QUOTE_PREFIX_REGEX, "")
                              .replace(QUOTE_SUFFIX_REGEX, "");
                          }
                          return t.content.split("\n")[0];
                        })()}
                      </blockquote>
                      <div className="text-gray-900 text-sm dark:text-gray-100">
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {t.role} at {t.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
