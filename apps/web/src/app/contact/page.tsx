import type { Metadata } from "next";
import ContactForm from "@/components/contact-form/contact-form";
import { EmailProtection } from "@/components/email-protection";
import { ProtectedPhone } from "@/components/phone-protection";
import { BUSINESS_INFO } from "@/lib/business-info";

export const metadata: Metadata = {
  title:
    "Contact Dom Berry - Professional Video Production in Stroud, Gloucestershire",
  description:
    "Get in touch with Dom Berry for professional video production services in Stroud, Gloucestershire. Wedding videography, corporate films, and marketing content across the South West UK.",
  keywords: [
    "contact Dom Berry",
    "video production quote Stroud",
    "wedding videographer contact Gloucestershire",
    "corporate video consultation Bristol",
    "marketing video quote Bath",
    "professional filmmaker contact South West UK",
  ],
  openGraph: {
    title:
      "Contact Dom Berry - Professional Video Production in Stroud, Gloucestershire",
    description:
      "Get in touch with Dom Berry for professional video production services in Stroud, Gloucestershire. Wedding videography, corporate films, and marketing content across the South West UK.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h1 className="mb-4 font-bold font-display text-4xl text-gray-900 dark:text-gray-100">
                Get In Touch
              </h1>
              <p className="font-body text-gray-600 text-xl dark:text-gray-300">
                Ready to bring your vision to life? Let's discuss your project
                and create something amazing together.
              </p>
            </div>

            {/* Business Information */}
            <div className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h2 className="mb-4 font-semibold text-gray-900 text-xl dark:text-gray-100">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">📍</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        Address
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {BUSINESS_INFO.address.street}
                        <br />
                        {BUSINESS_INFO.address.city},{" "}
                        {BUSINESS_INFO.address.county}
                        <br />
                        {BUSINESS_INFO.address.postcode}, United Kingdom
                      </p>
                    </div>
                  </div>

                  <ProtectedPhone
                    phone={BUSINESS_INFO.contact.phone}
                    showIcon={true}
                  />

                  <div className="flex items-center gap-3">
                    <span className="text-xl dark:text-primary">✉️</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        Email
                      </p>
                      <EmailProtection
                        className="cursor-pointer text-indigo-600 hover:text-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-700"
                        email={BUSINESS_INFO.contact.email}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h2 className="mb-4 font-semibold text-gray-900 text-xl dark:text-gray-100">
                  Service Areas
                </h2>
                <p className="mb-3 text-gray-600 dark:text-gray-300">
                  We proudly serve clients across the South West UK:
                </p>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_INFO.serviceAreas.map((area) => (
                    <span
                      className="rounded-full bg-primary/60 px-3 py-1 text-sm dark:bg-primary/20 dark:text-primary"
                      key={area}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex items-start">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
