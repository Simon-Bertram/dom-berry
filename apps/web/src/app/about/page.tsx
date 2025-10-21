import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900 dark:text-white">
            About Dom Berry
          </h1>
          <p className="text-gray-600 text-xl dark:text-gray-300">
            Professional filmmaker based in the Southwest
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          {/* About Section */}
          <section className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Dom Berry is a professional videography service specializing in
                high-quality film production across the Southwest. We bring
                stories to life through cinematic storytelling, capturing
                moments that matter.
              </p>
              <p className="mb-4">
                From corporate films and live events to weddings and marketing
                videos, we deliver exceptional results that exceed expectations.
                Our team combines technical expertise with creative vision to
                produce compelling content that resonates with your audience.
              </p>
              <p>
                Based in the Southwest, we serve clients across the region with
                a commitment to professionalism, quality, and timely delivery.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
            <h2 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">
              What We Value
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="mb-3 font-semibold text-gray-900 text-xl dark:text-white">
                  Quality
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We use professional equipment and techniques to ensure every
                  project meets the highest standards.
                </p>
              </article>
              <article className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="mb-3 font-semibold text-gray-900 text-xl dark:text-white">
                  Creativity
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Every project is approached with fresh perspective and
                  innovative storytelling techniques.
                </p>
              </article>
              <article className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="mb-3 font-semibold text-gray-900 text-xl dark:text-white">
                  Reliability
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We deliver projects on time and within budget, maintaining
                  clear communication throughout.
                </p>
              </article>
              <article className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="mb-3 font-semibold text-gray-900 text-xl dark:text-white">
                  Partnership
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We work closely with clients to understand their vision and
                  bring it to life effectively.
                </p>
              </article>
            </div>
          </section>

          {/* Call to Action */}
          <section className="rounded-xl bg-indigo-600 p-12 text-center text-white dark:bg-indigo-700">
            <h2 className="mb-4 font-bold text-3xl">Ready to Work Together?</h2>
            <p className="mb-8 text-xl opacity-90">
              Let's discuss your project and create something amazing.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                className="inline-flex items-center rounded-lg bg-white px-8 py-4 font-semibold text-indigo-600 transition-colors hover:bg-gray-100 dark:bg-gray-100 dark:text-indigo-700 dark:hover:bg-gray-200"
                href="/contact"
              >
                Get in Touch
              </Link>
              <Link
                className="inline-flex items-center rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-indigo-600"
                href="/portfolio"
              >
                View Our Work
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
