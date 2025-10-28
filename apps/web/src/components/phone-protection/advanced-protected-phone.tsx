"use client";

import { useCallback, useMemo, useState } from "react";
import { getRandomDelay } from "@/lib/phone-protection";
import {
  ADVANCED_MAX_DELAY,
  ADVANCED_MIN_DELAY,
  DIGIT_REGEX,
  LOADING_TEXT,
  REVEAL_TEXT,
} from "./constants";
import type { ProtectedPhoneProps } from "./types";

/**
 * Alternative implementation using a more complex obfuscation method
 * This version uses a more sophisticated approach with character substitution
 */
export function AdvancedProtectedPhone({
  phone,
  className = "text-indigo-600 hover:text-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-700",
  showIcon = true,
}: ProtectedPhoneProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // More complex obfuscation - store phone as encoded parts
  const obfuscatedParts = useMemo(
    () =>
      phone.split(" ").map((part) =>
        part
          .split("")
          .map((char) =>
            DIGIT_REGEX.test(char)
              ? String.fromCharCode(char.charCodeAt(0) + 2)
              : char
          )
          .join("")
      ),
    [phone]
  );

  const deobfuscatePhone = useCallback(
    () =>
      obfuscatedParts
        .map((part) =>
          part
            .split("")
            .map((char) =>
              DIGIT_REGEX.test(char)
                ? String.fromCharCode(char.charCodeAt(0) - 2)
                : char
            )
            .join("")
        )
        .join(" "),
    [obfuscatedParts]
  );

  const handleReveal = useCallback(async () => {
    if (isRevealed || isLoading) {
      return;
    }

    setIsLoading(true);

    // Simulate processing time
    const delay = getRandomDelay(ADVANCED_MIN_DELAY, ADVANCED_MAX_DELAY);
    await new Promise((resolve) => setTimeout(resolve, delay));

    setIsRevealed(true);
    setIsLoading(false);
  }, [isRevealed, isLoading]);

  const handleClick = useCallback(() => {
    if (isRevealed) {
      const actualPhone = deobfuscatePhone();
      window.location.href = `tel:${actualPhone}`;
    } else {
      handleReveal();
    }
  }, [isRevealed, deobfuscatePhone, handleReveal]);

  const getDisplayText = () => {
    if (isLoading) {
      return LOADING_TEXT;
    }
    if (isRevealed) {
      return deobfuscatePhone();
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
          aria-describedby="phone-number-sr-advanced"
          aria-label={
            isRevealed ? `Call ${deobfuscatePhone()}` : "Reveal phone number"
          }
          className={`cursor-pointer transition-colors duration-200 ${className} ${
            isLoading ? "cursor-wait opacity-50" : ""
          }`}
          disabled={isLoading}
          onClick={handleClick}
          type="button"
        >
          {getDisplayText()}
        </button>
        <span className="sr-only" id="phone-number-sr-advanced">
          Phone number: {deobfuscatePhone()}
        </span>
      </div>
    </div>
  );
}
