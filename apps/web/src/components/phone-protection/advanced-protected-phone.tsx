"use client";

import { useCallback, useMemo } from "react";
import {
  ADVANCED_MAX_DELAY,
  ADVANCED_MIN_DELAY,
  DIGIT_REGEX,
} from "./phone-protection.constants";
import {
  getDisplayText,
  getPhoneButtonAriaLabel,
  getPhoneScreenReaderId,
} from "./phone-protection.utils";
import type { ProtectedPhoneProps } from "./types";
import { useDelayedReveal } from "./use-delayed-reveal";

/**
 * Alternative implementation using a more complex obfuscation method
 * This version uses a more sophisticated approach with character substitution
 */
export function AdvancedProtectedPhone({
  phone,
  className = "text-indigo-600 hover:text-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-700",
  showIcon = true,
}: ProtectedPhoneProps) {
  const { isRevealed, isLoading, handleReveal } = useDelayedReveal(
    ADVANCED_MIN_DELAY,
    ADVANCED_MAX_DELAY
  );

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

  const handleClick = useCallback(() => {
    if (isRevealed) {
      const actualPhone = deobfuscatePhone();
      window.location.href = `tel:${actualPhone}`;
    } else {
      handleReveal();
    }
  }, [isRevealed, deobfuscatePhone, handleReveal]);

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
          aria-describedby={getPhoneScreenReaderId("advanced")}
          aria-label={getPhoneButtonAriaLabel(isRevealed, deobfuscatePhone())}
          className={`cursor-pointer transition-colors duration-200 ${className} ${
            isLoading ? "cursor-wait opacity-50" : ""
          }`}
          disabled={isLoading}
          onClick={handleClick}
          type="button"
        >
          {getDisplayText(isLoading, isRevealed, deobfuscatePhone())}
        </button>
        <span className="sr-only" id={getPhoneScreenReaderId("advanced")}>
          Phone number: {deobfuscatePhone()}
        </span>
      </div>
    </div>
  );
}
