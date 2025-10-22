import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPortfolioProjects, getAllTestimonials } from "@/lib/content";

export default function Home() {
  const projects = getAllPortfolioProjects()
    .slice()
    .sort((a, b) => Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10))
    .slice(0, 3);

  const testimonials = getAllTestimonials().slice(0, 3);

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
                className="rounded-lg bg-white px-8 py-3 font-semibold text-black text-lg transition-colors hover:bg-white/90"
                href="/portfolio"
              >
                View Portfolio
              </Link>
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
                          .replace(/^>\s*"?/, "")
                          .replace(/"$/, "");
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
