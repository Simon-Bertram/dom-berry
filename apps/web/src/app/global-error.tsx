"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // biome-ignore lint/suspicious/noConsole: Error logging for development
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 shadow-lg">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h1 className="mb-2 font-bold text-2xl text-gray-900">
                Something went wrong!
              </h1>
              <p className="mb-6 text-gray-600">
                We encountered an unexpected error. Our team has been notified
                and is working to fix this issue.
              </p>
              <div className="space-y-3">
                <button
                  className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={reset}
                  type="button"
                >
                  Try again
                </button>
                <button
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  type="button"
                >
                  Go to homepage
                </button>
              </div>
              {process.env.NODE_ENV === "development" && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-gray-500 text-sm hover:text-gray-700">
                    Error details (development only)
                  </summary>
                  <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-gray-800 text-xs">
                    {error.message}
                    {error.stack && `\n\nStack trace:\n${error.stack}`}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
