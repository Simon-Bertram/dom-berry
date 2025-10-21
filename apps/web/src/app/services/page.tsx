import { CheckCircle, Clock, DollarSign, Film } from "lucide-react";
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
import type { Service } from "../../../content/services/services";
import { SERVICES } from "../../../content/services/services";

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen py-12">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900 dark:text-white">
            Our Services
          </h1>
          <p className="mx-auto max-w-3xl rounded-lg bg-white/40 p-4 text-gray-600 text-xl dark:bg-gray-900/40 dark:text-gray-300">
            Professional videography services across the Southwest. From
            corporate films to wedding videos, we bring your vision to life with
            cinematic quality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Background image */}
          <div className="-z-10 fixed inset-0">
            <Image
              alt="Services Background"
              className="object-cover"
              fill
              priority
              src="/patrick-tomasso-5hvn-2WW6rY-unsplash.jpg"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40" />
          </div>
          {SERVICES.map((service: Service) => (
            <Card
              className="h-full border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              key={service.id}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900">
                    <Film className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-gray-900 text-xl dark:text-white">
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li className="flex items-start gap-2" key={feature}>
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400" />
                        <span className="text-gray-600 text-sm dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-2 text-gray-600 text-sm dark:text-gray-300">
                    <DollarSign className="h-4 w-4" />
                    <span>Starting from {service.startingPrice}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm dark:text-gray-300">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>

                  <div className="pt-3">
                    <h5 className="mb-2 font-medium text-gray-900 dark:text-white">
                      Deliverables:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {service.deliverables.map((deliverable) => (
                        <Badge
                          className="border-gray-300 text-gray-700 text-xs dark:border-gray-600 dark:text-gray-300"
                          key={deliverable}
                          variant="outline"
                        >
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-16 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:border-gray-700 dark:from-slate-800 dark:to-indigo-900">
          <h2 className="mb-8 text-center font-bold text-3xl text-gray-900 dark:text-white">
            Our Process
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                <span className="font-bold text-2xl text-indigo-600 dark:text-indigo-200">
                  1
                </span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
                Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We discuss your vision, requirements, and timeline to create a
                tailored approach.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                <span className="font-bold text-2xl text-indigo-600 dark:text-indigo-200">
                  2
                </span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
                Production
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional filming with high-quality equipment and experienced
                crew.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                <span className="font-bold text-2xl text-indigo-600 dark:text-indigo-200">
                  3
                </span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
                Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Final edited video delivered in your preferred formats with
                revisions included.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-xl bg-indigo-600 p-12 text-center text-white dark:bg-indigo-700">
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
        </div>
      </div>
    </div>
  );
}
