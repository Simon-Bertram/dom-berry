import type { Metadata } from "next";
import Link from "next/link";
import PortfolioGrid from "@/components/portfolio-grid";
import { getAllPortfolioProjects, getPortfolioCategories } from "@/lib/content";

export const metadata: Metadata = {
  title:
    "Portfolio - Professional Video Production Work in Stroud, Gloucestershire",
  description:
    "Explore our portfolio of professional video production work across Stroud, Gloucestershire, and the South West UK. Wedding videos, corporate films, and marketing content.",
  keywords: [
    "video production portfolio Stroud",
    "wedding videography examples Gloucestershire",
    "corporate video portfolio Bristol",
    "marketing video examples Bath",
    "professional filmmaker work South West UK",
    "video production showcase Gloucestershire",
  ],
  openGraph: {
    title:
      "Portfolio - Professional Video Production Work in Stroud, Gloucestershire",
    description:
      "Explore our portfolio of professional video production work across Stroud, Gloucestershire, and the South West UK. Wedding videos, corporate films, and marketing content.",
    type: "website",
  },
};

export default function PortfolioPage() {
  const projects = getAllPortfolioProjects();
  const categories = getPortfolioCategories();

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold font-display text-4xl text-gray-900 dark:text-gray-100">
            Portfolio
          </h1>
          <p className="mx-auto max-w-3xl font-body text-gray-600 text-xl dark:text-gray-300">
            Explore our recent work across Stroud, Gloucestershire and the South
            West UK. From corporate films to wedding videos, each project tells
            a unique story.
          </p>
        </div>

        {/* Portfolio Grid with Filtering */}
        <PortfolioGrid categories={categories} projects={projects} />

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="mb-4 font-bold font-display text-2xl text-gray-900 dark:text-gray-100">
            Ready to Start Your Project?
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Let's discuss how we can bring your vision to life.
          </p>
          <Link
            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            href="/contact"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
