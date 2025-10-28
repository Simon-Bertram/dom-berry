import { useCallback, useState } from "react";
import { getRandomDelay } from "@/lib/phone-protection";

/**
 * Custom hook for handling delayed reveal functionality
 * Encapsulates the random delay + loading + revealed state flow
 */
export function useDelayedReveal(minDelay: number, maxDelay: number) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReveal = useCallback(async () => {
    if (isRevealed || isLoading) {
      return;
    }

    setIsLoading(true);

    // Add random delay to prevent automated clicking
    const delay = getRandomDelay(minDelay, maxDelay);
    await new Promise((resolve) => setTimeout(resolve, delay));

    setIsRevealed(true);
    setIsLoading(false);
  }, [isRevealed, isLoading, minDelay, maxDelay]);

  const reset = useCallback(() => {
    setIsRevealed(false);
    setIsLoading(false);
  }, []);

  return {
    isRevealed,
    isLoading,
    handleReveal,
    reset,
  };
}
