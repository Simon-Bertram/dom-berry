"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

type PostHogProviderProps = {
  children: React.ReactNode;
};

export default function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // PostHog is already initialized in instrumentation-client.ts
    // This provider just ensures it's available on the client side
    if (typeof window !== "undefined" && !posthog.__loaded) {
      // If PostHog isn't loaded yet, wait for it
      const checkPostHog = () => {
        if (posthog.__loaded) {
          return;
        }
        const CHECK_INTERVAL_MS = 100;
        setTimeout(checkPostHog, CHECK_INTERVAL_MS);
      };
      checkPostHog();
    }
  }, []);

  return <>{children}</>;
}
