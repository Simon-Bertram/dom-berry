import { readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  project: string;
  rating: number;
  featured: boolean;
  image: string;
  slug: string;
  content: string;
}

const testimonialsDirectory = join(process.cwd(), "content/testimonials");

export function getAllTestimonials(): Testimonial[] {
  const fileNames = ["testimonial-1.mdx", "testimonial-2.mdx"];

  const allTestimonials = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
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
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });
}

export function getFeaturedTestimonials(): Testimonial[] {
  return getAllTestimonials().filter((testimonial) => testimonial.featured);
}

export function getTestimonialBySlug(slug: string): Testimonial | null {
  const testimonials = getAllTestimonials();
  return testimonials.find((testimonial) => testimonial.slug === slug) || null;
}
