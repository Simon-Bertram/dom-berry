"use client";

import { useCallback, useMemo } from "react";
import {
  reconstructPhoneNumber,
  splitPhoneNumber,
} from "@/lib/phone-protection";
import { MAX_DELAY, MIN_DELAY } from "./phone-protection.constants";
import {
  getDisplayText,
  getPhoneButtonAriaLabel,
  getPhoneScreenReaderId,
} from "./phone-protection.utils";
import type { ProtectedPhoneProps } from "./types";
import { useDelayedReveal } from "./use-delayed-reveal";

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
  const { isRevealed, isLoading, handleReveal } = useDelayedReveal(
    MIN_DELAY,
    MAX_DELAY
  );

  // Split the phone number into parts for obfuscation
  const phoneParts = useMemo(() => splitPhoneNumber(phone), [phone]);
  const fullPhone = useMemo(
    () => reconstructPhoneNumber(phoneParts),
    [phoneParts]
  );

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
          aria-describedby={getPhoneScreenReaderId("basic")}
          aria-label={getPhoneButtonAriaLabel(isRevealed, fullPhone)}
          className={`cursor-pointer transition-colors duration-200 ${className} ${
            isLoading ? "cursor-wait opacity-50" : ""
          }`}
          disabled={isLoading}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          // Hidden span for screen readers with the actual phone number
          type="button"
        >
          {getDisplayText(isLoading, isRevealed, fullPhone)}
        </button>
        {/* Screen reader accessible phone number */}
        <span className="sr-only" id={getPhoneScreenReaderId("basic")}>
          Phone number: {fullPhone}
        </span>
      </div>
    </div>
  );
}
