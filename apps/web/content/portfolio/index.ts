import { readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export interface PortfolioProject {
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
}

const portfolioDirectory = join(process.cwd(), "content/portfolio");

export function getAllPortfolioProjects(): PortfolioProject[] {
  const fileNames = ["project-1.mdx", "project-2.mdx"];

  const allProjects = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
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
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return Number.parseInt(b.year) - Number.parseInt(a.year);
  });
}

export function getFeaturedProjects(): PortfolioProject[] {
  return getAllPortfolioProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): PortfolioProject | null {
  const projects = getAllPortfolioProjects();
  return projects.find((project) => project.slug === slug) || null;
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
  return getAllPortfolioProjects().filter(
    (project) => project.category.toLowerCase() === category.toLowerCase()
  );
}
