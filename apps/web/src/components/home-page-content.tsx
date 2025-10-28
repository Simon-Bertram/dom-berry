"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackButtonClick } from "@/lib/analytics";
import type { PortfolioProject, Testimonial } from "@/lib/content";

const QUOTE_PREFIX_REGEX = /^>\s*"?/;
const QUOTE_SUFFIX_REGEX = /"$/;

type HomePageContentProps = {
  projects: PortfolioProject[];
  testimonials: Testimonial[];
};

export default function HomePageContent({
  projects,
  testimonials,
}: HomePageContentProps) {
  const handlePortfolioClick = () => {
    trackButtonClick("View Portfolio", "/");
  };

  return (
    <>
      {/* Recent Projects */}
      <section className="bg-gray-50 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-bold font-display text-2xl text-gray-900 dark:text-gray-100">
              Recent Projects
            </h2>
            <Link
              className="text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-700 dark:text-primary dark:hover:text-primary/80"
              href="/portfolio"
              onClick={handlePortfolioClick}
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <Card className="h-full overflow-hidden" key={project.slug}>
                <div className="relative aspect-video w-full">
                  <Image
                    alt={`${project.title} - Professional video production project in ${project.location} by Dom Berry, Stroud videographer`}
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
              className="text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-700 dark:text-primary dark:hover:text-primary/80"
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
  );
}
