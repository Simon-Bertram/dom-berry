import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProcessSection } from "@/components/process-section";
import { ServicesGrid } from "@/components/services-grid";
import { generateJsonLd, serviceSchema } from "@/lib/structured-data";
import { SERVICES } from "../../../content/services/services";

export const metadata: Metadata = {
  title: "Professional Video Production Services in Stroud, Gloucestershire",
  description:
    "Professional videography services in Stroud, Gloucestershire and across the South West UK. Wedding videos, corporate films, marketing content, and live event coverage.",
  keywords: [
    "video production services Stroud",
    "wedding videography Gloucestershire",
    "corporate video production Bristol",
    "marketing video Bath",
    "event videography Cheltenham",
    "professional filmmaker South West UK",
    "video production Gloucestershire",
  ],
  openGraph: {
    title: "Professional Video Production Services in Stroud, Gloucestershire",
    description:
      "Professional videography services in Stroud, Gloucestershire and across the South West UK. Wedding videos, corporate films, marketing content, and live event coverage.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Service Schema for each service */}
      {SERVICES.map((service) => (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: generateJsonLd(serviceSchema(service)),
          }}
          key={service.id}
          type="application/ld+json"
        />
      ))}
      <div className="relative min-h-screen py-12">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 font-bold font-display text-4xl text-gray-900 dark:text-white">
              Our Services
            </h1>
            <p className="mx-auto max-w-3xl rounded-lg p-4 font-body text-gray-800 text-xl dark:text-white">
              Professional videography services in Stroud, Gloucestershire and
              across the South West UK. From corporate films to wedding videos,
              we bring your vision to life with cinematic quality.
            </p>
          </div>
        </div>

        {/* Services Grid Section - Full Width */}
        <section className="relative mb-12 w-full">
          {/* Full-width background image */}
          <div className="absolute inset-0">
            <Image
              alt="Professional video production services background - Dom Berry videographer in Stroud, Gloucestershire"
              className="object-cover"
              fill
              priority
              src="/patrick-tomasso-5hvn-2WW6rY-unsplash.jpg"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40" />
          </div>

          {/* Content container */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <ServicesGrid services={SERVICES} />
          </div>
        </section>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProcessSection />

          {/* Call to Action */}
          <section className="rounded-xl bg-indigo-600 p-12 text-center text-white dark:bg-indigo-700">
            <h2 className="mb-4 font-bold text-3xl">
              Ready to Start Your Project?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Get a personalized quote and timeline for your video project.
            </p>
            <Link
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 font-semibold text-indigo-600 transition-colors hover:bg-gray-100 dark:bg-gray-100 dark:text-indigo-700 dark:hover:bg-gray-200"
              href="/contact"
            >
              Get Your Quote
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
