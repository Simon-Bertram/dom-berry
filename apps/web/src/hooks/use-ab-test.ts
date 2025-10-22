"use client";

import posthog from "posthog-js";
import { useEffect, useState } from "react";

type ABTestResult = {
  variant: string;
  isLoading: boolean;
  error: string | null;
  trackConversion: (
    event: string,
    properties?: Record<string, unknown>
  ) => void;
};

export function useABTest(testName: string): ABTestResult {
  const [variant, setVariant] = useState<string>("control");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get the feature flag value from PostHog
      const flagValue = posthog.getFeatureFlag(testName);

      if (flagValue) {
        setVariant(flagValue as string);
      } else {
        // Default to control if flag is not set
        setVariant("control");
      }

      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get A/B test variant"
      );
      setVariant("control");
      setIsLoading(false);
    }
  }, [testName]);

  const trackConversion = (
    event: string,
    properties?: Record<string, unknown>
  ) => {
    try {
      posthog.capture(event, {
        test_name: testName,
        variant,
        ...properties,
      });
    } catch {
      // Silently fail for analytics tracking
    }
  };

  return {
    variant,
    isLoading,
    error,
    trackConversion,
  };
}
