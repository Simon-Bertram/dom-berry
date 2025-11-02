import Hero from "@/components/hero/hero";
import HomePageContent from "@/components/home-page-content";
import { getAllPortfolioProjects, getAllTestimonials } from "@/lib/content";

const NUM_HOMEPAGE_ITEMS = 3;
const DECIMAL_RADIX = 10;

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

  return (
    <>
      <Hero />
      <HomePageContent projects={projects} testimonials={testimonials} />
    </>
  );
}
