import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

// Portfolio types
export type PortfolioProject = {
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  budget: string;
  location: string;
  description: string;
  image: string;
  video: string;
  tags: string[];
  featured: boolean;
  slug: string;
  content: string;
};

// Testimonial types
export type Testimonial = {
  name: string;
  role: string;
  company: string;
  project: string;
  rating: number;
  featured: boolean;
  image: string;
  slug: string;
  content: string;
};

const contentDirectory = join(process.cwd(), "content");
const mdxRegex = /\.mdx$/;

/**
 * Get all portfolio projects
 */
export function getAllPortfolioProjects(): PortfolioProject[] {
  const portfolioDirectory = join(contentDirectory, "portfolio");
  const fileNames = [
    "project-1.mdx",
    "project-2.mdx",
    "project-3.mdx",
    "project-4.mdx",
  ];

  const allProjects = fileNames.map((fileName) => {
    const slug = fileName.replace(mdxRegex, "");
    const fullPath = join(portfolioDirectory, fileName);
    const fileContents = readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as PortfolioProject;
  });

  // Sort by featured first, then by year (newest first)
  return allProjects.sort((a, b) => {
    if (a.featured && !b.featured) {
      return -1;
    }
    if (!a.featured && b.featured) {
      return 1;
    }
    return Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10);
  });
}

/**
 * Get featured portfolio projects
 */
export function getFeaturedPortfolioProjects(): PortfolioProject[] {
  return getAllPortfolioProjects().filter((project) => project.featured);
}

/**
 * Get portfolio project by slug
 */
export function getPortfolioProjectBySlug(
  slug: string
): PortfolioProject | null {
  const projects = getAllPortfolioProjects();
  return projects.find((project) => project.slug === slug) || null;
}

/**
 * Get portfolio projects by category
 */
export function getPortfolioProjectsByCategory(
  category: string
): PortfolioProject[] {
  return getAllPortfolioProjects().filter(
    (project) => project.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all testimonials
 */
export function getAllTestimonials(): Testimonial[] {
  const testimonialsDirectory = join(contentDirectory, "testimonials");
  const fileNames = ["testimonial-1.mdx", "testimonial-2.mdx"];

  const allTestimonials = fileNames.map((fileName) => {
    const slug = fileName.replace(mdxRegex, "");
    const fullPath = join(testimonialsDirectory, fileName);
    const fileContents = readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as Testimonial;
  });

  // Sort by featured first, then by rating (highest first)
  return allTestimonials.sort((a, b) => {
    if (a.featured && !b.featured) {
      return -1;
    }
    if (!a.featured && b.featured) {
      return 1;
    }
    return b.rating - a.rating;
  });
}

/**
 * Get featured testimonials
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return getAllTestimonials().filter((testimonial) => testimonial.featured);
}

/**
 * Get testimonial by slug
 */
export function getTestimonialBySlug(slug: string): Testimonial | null {
  const testimonials = getAllTestimonials();
  return testimonials.find((testimonial) => testimonial.slug === slug) || null;
}

/**
 * Get all unique categories from portfolio projects
 */
export function getPortfolioCategories(): string[] {
  const projects = getAllPortfolioProjects();
  const categories = projects.map((project) => project.category);
  return [...new Set(categories)].sort();
}

/**
 * Get all unique tags from portfolio projects
 */
export function getPortfolioTags(): string[] {
  const projects = getAllPortfolioProjects();
  const allTags = projects.flatMap((project) => project.tags);
  return [...new Set(allTags)].sort();
}
