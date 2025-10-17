import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPortfolioProjects, getPortfolioCategories } from "@/lib/content";

export default function PortfolioPage() {
  const projects = getAllPortfolioProjects();
  const categories = getPortfolioCategories();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900">Portfolio</h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">
            Explore our recent work across the Southwest. From corporate films
            to wedding videos, each project tells a unique story.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge className="px-4 py-2" variant="default">
            All Projects
          </Badge>
          {categories.map((category) => (
            <Badge className="px-4 py-2" key={category} variant="outline">
              {category}
            </Badge>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              className="overflow-hidden transition-shadow hover:shadow-lg"
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
                  <Badge className="absolute top-2 right-2 bg-indigo-600">
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
                <p className="mb-4 line-clamp-3 text-gray-600">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{project.category}</Badge>
                  <Badge variant="outline">{project.location}</Badge>
                </div>

                <div className="mb-4 flex items-center justify-between text-gray-500 text-sm">
                  <span>Duration: {project.duration}</span>
                  <span>Budget: {project.budget}</span>
                </div>

                <Link
                  className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800"
                  href={`/portfolio/${project.slug}`}
                >
                  View Project Details
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="mb-4 font-bold text-2xl text-gray-900">
            Ready to Start Your Project?
          </h2>
          <p className="mb-8 text-gray-600">
            Let's discuss how we can bring your vision to life.
          </p>
          <Link
            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            href="/contact"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for dynamic routes (if needed in future)
export function generateStaticParams() {
  const projects = getAllPortfolioProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
