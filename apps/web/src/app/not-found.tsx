import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <h1 className="font-bold text-6xl text-indigo-600">404</h1>
          <h2 className="mt-2 font-bold text-2xl text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="space-y-3">
          <Link
            className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            href="/"
          >
            Go back home
          </Link>
          <Link
            className="inline-block rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            href="/contact"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
