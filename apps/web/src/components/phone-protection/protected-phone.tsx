"use client";

import { useCallback, useMemo, useState } from "react";
import {
  getRandomDelay,
  reconstructPhoneNumber,
  splitPhoneNumber,
} from "@/lib/phone-protection";
import { LOADING_TEXT, MAX_DELAY, MIN_DELAY, REVEAL_TEXT } from "./constants";
import type { ProtectedPhoneProps } from "./types";

/**
 * ProtectedPhone component with multiple layers of anti-harvesting protection
 *
 * Protection strategies:
 * 1. Obfuscated display - shows "Click to reveal" initially
 * 2. Dynamic reconstruction - builds phone number client-side
 * 3. Random delay - prevents automated clicking
 * 4. Split storage - phone number stored in parts
 * 5. Accessibility support - screen readers can access the number
 */
export function ProtectedPhone({
  phone,
  className = "text-indigo-600 hover:text-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-700",
  showIcon = true,
}: ProtectedPhoneProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Split the phone number into parts for obfuscation
  const phoneParts = useMemo(() => splitPhoneNumber(phone), [phone]);
  const fullPhone = useMemo(
    () => reconstructPhoneNumber(phoneParts),
    [phoneParts]
  );

  const handleReveal = useCallback(async () => {
    if (isRevealed || isLoading) {
      return;
    }

    setIsLoading(true);

    // Add random delay to prevent automated clicking
    const delay = getRandomDelay(MIN_DELAY, MAX_DELAY);
    await new Promise((resolve) => setTimeout(resolve, delay));

    setIsRevealed(true);
    setIsLoading(false);
  }, [isRevealed, isLoading]);

  const handleMouseEnter = useCallback(() => {
    if (isRevealed || isLoading) {
      return;
    }
    handleReveal();
  }, [isRevealed, isLoading, handleReveal]);

  const handleClick = useCallback(() => {
    if (isRevealed) {
      // Open phone app
      window.location.href = `tel:${fullPhone}`;
    } else {
      handleReveal();
    }
  }, [isRevealed, fullPhone, handleReveal]);

  const getDisplayText = () => {
    if (isLoading) {
      return LOADING_TEXT;
    }
    if (isRevealed) {
      return fullPhone;
    }
    return REVEAL_TEXT;
  };

  return (
    <div className="flex items-center gap-3">
      {showIcon && (
        <span aria-hidden="true" className="text-xl dark:text-primary">
          📞
        </span>
      )}
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">Phone</p>
        <button
          aria-describedby="phone-number-sr"
          aria-label={isRevealed ? `Call ${fullPhone}` : "Reveal phone number"}
          className={`cursor-pointer transition-colors duration-200 ${className} ${
            isLoading ? "cursor-wait opacity-50" : ""
          }`}
          disabled={isLoading}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          // Hidden span for screen readers with the actual phone number
          type="button"
        >
          {getDisplayText()}
        </button>
        {/* Screen reader accessible phone number */}
        <span className="sr-only" id="phone-number-sr">
          Phone number: {fullPhone}
        </span>
      </div>
    </div>
  );
}
