import { CheckCircle, Clock, DollarSign, Film } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SERVICES } from "@/content/services/services";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900">
            Our Services
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">
            Professional videography services across the Southwest. From
            corporate films to wedding videos, we bring your vision to life with
            cinematic quality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Card
              className="h-full transition-shadow hover:shadow-lg"
              key={service.id}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-2">
                    <Film className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold text-gray-900">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li className="flex items-start gap-2" key={feature}>
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <DollarSign className="h-4 w-4" />
                    <span>Starting from {service.startingPrice}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>

                  <div className="pt-3">
                    <h5 className="mb-2 font-medium text-gray-900">
                      Deliverables:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {service.deliverables.map((deliverable) => (
                        <Badge
                          className="text-xs"
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
        <div className="mb-16 rounded-xl bg-white p-8">
          <h2 className="mb-8 text-center font-bold text-3xl text-gray-900">
            Our Process
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <span className="font-bold text-2xl text-indigo-600">1</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                Consultation
              </h3>
              <p className="text-gray-600">
                We discuss your vision, requirements, and timeline to create a
                tailored approach.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <span className="font-bold text-2xl text-indigo-600">2</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                Production
              </h3>
              <p className="text-gray-600">
                Professional filming with high-quality equipment and experienced
                crew.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <span className="font-bold text-2xl text-indigo-600">3</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                Delivery
              </h3>
              <p className="text-gray-600">
                Final edited video delivered in your preferred formats with
                revisions included.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-xl bg-indigo-600 p-12 text-center text-white">
          <h2 className="mb-4 font-bold text-3xl">
            Ready to Start Your Project?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Get a personalized quote and timeline for your video project.
          </p>
          <Link
            className="inline-flex items-center rounded-lg bg-white px-8 py-4 font-semibold text-indigo-600 transition-colors hover:bg-gray-100"
            href="/contact"
          >
            Get Your Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
