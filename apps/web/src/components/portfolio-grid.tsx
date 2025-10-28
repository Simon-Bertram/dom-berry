"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PortfolioProject } from "@/lib/content";

type PortfolioGridProps = {
  projects: PortfolioProject[];
  categories: string[];
};

export default function PortfolioGrid({
  projects,
  categories,
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Projects") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <>
      {/* Categories Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <Badge
          className={`cursor-pointer px-4 py-2 transition-colors ${
            activeCategory === "All Projects"
              ? "bg-primary text-black hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveCategory("All Projects")}
          variant={activeCategory === "All Projects" ? "default" : "outline"}
        >
          All Projects
        </Badge>
        {categories.map((category) => (
          <Badge
            className={`cursor-pointer px-4 py-2 transition-colors ${
              activeCategory === category
                ? "bg-primary text-black hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            key={category}
            onClick={() => setActiveCategory(category)}
            variant={activeCategory === category ? "default" : "outline"}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {filteredProjects.length} of {projects.length} projects
          {activeCategory !== "All Projects" && (
            <span className="ml-2 text-primary dark:text-primary">
              in {activeCategory}
            </span>
          )}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0
          ? // Skeleton loading state to prevent CLS
            Array.from({ length: 6 }, (_, index) => (
              <div
                className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                key={`skeleton-${index}-${Date.now()}`}
              >
                <div className="mb-4 h-48 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mb-4 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mb-2 h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))
          : filteredProjects.map((project) => (
              <Card
                className="fade-in-0 animate-in overflow-hidden transition-all duration-300 hover:shadow-lg"
                key={project.slug}
              >
                <div className="relative h-48 w-full">
                  <Image
                    alt={`${project.title} project showcase`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={project.image}
                  />
                  {project.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary text-black dark:bg-primary dark:text-black">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>
                    {project.client} • {project.year}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">{project.category}</Badge>
                    <Badge variant="outline">{project.location}</Badge>
                  </div>

                  <div className="mb-4 flex items-center justify-between text-gray-500 text-sm dark:text-gray-400">
                    <span>Duration: {project.duration}</span>
                    <span>Budget: {project.budget}</span>
                  </div>

                  <div className="inline-flex items-center font-medium text-indigo-600 dark:text-primary">
                    View Project Details
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Arrow right</title>
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </>
  );
}
