import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllTestimonials } from "@/lib/content";

export default function TestimonialsPage() {
  const testimonials = getAllTestimonials();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900">
            Client Testimonials
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">
            Don't just take our word for it. Here's what our clients say about
            working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              className="h-full transition-shadow hover:shadow-lg"
              key={testimonial.slug}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-indigo-100 p-3">
                    <Quote className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4 flex justify-center">
                  {new Array(testimonial.rating).fill(null).map((_, i) => (
                    <Star
                      className="h-5 w-5 fill-current text-yellow-400"
                      key={`star-${i}`}
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="mb-6 text-center text-gray-700 italic">
                  "{testimonial.content.split("\n")[0]}"
                </blockquote>

                {/* Client Info */}
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                        sizes="64px"
                        src={testimonial.image}
                      />
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="font-medium text-indigo-600 text-sm">
                    {testimonial.company}
                  </p>

                  {testimonial.featured && (
                    <Badge className="mt-2 bg-indigo-600">
                      Featured Client
                    </Badge>
                  )}
                </div>

                {/* Project Info */}
                <div className="mt-4 border-gray-200 border-t pt-4">
                  <p className="text-center text-gray-500 text-xs">
                    Project: {testimonial.project}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-16 rounded-xl bg-white p-8">
          <h2 className="mb-8 text-center font-bold text-3xl text-gray-900">
            Our Track Record
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 font-bold text-4xl text-indigo-600">50+</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>

            <div className="text-center">
              <div className="mb-2 font-bold text-4xl text-indigo-600">
                100%
              </div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>

            <div className="text-center">
              <div className="mb-2 font-bold text-4xl text-indigo-600">5.0</div>
              <p className="text-gray-600">Average Rating</p>
            </div>

            <div className="text-center">
              <div className="mb-2 font-bold text-4xl text-indigo-600">3</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="mb-4 font-bold text-3xl text-gray-900">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="mb-8 text-gray-600 text-xl">
            Let's create something amazing together.
          </p>
          <a
            className="inline-flex items-center rounded-lg bg-indigo-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-indigo-700"
            href="/contact"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </div>
  );
}
