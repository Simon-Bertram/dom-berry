import { LOADING_TEXT, REVEAL_TEXT } from "./phone-protection.constants";

/**
 * Get display text based on loading and revealed states
 */
export function getDisplayText(
  isLoading: boolean,
  isRevealed: boolean,
  phoneNumber: string
): string {
  if (isLoading) {
    return LOADING_TEXT;
  }
  if (isRevealed) {
    return phoneNumber;
  }
  return REVEAL_TEXT;
}

/**
 * Get accessibility label for phone button
 */
export function getPhoneButtonAriaLabel(
  isRevealed: boolean,
  phoneNumber: string
): string {
  return isRevealed ? `Call ${phoneNumber}` : "Reveal phone number";
}

/**
 * Get screen reader ID for phone number
 */
export function getPhoneScreenReaderId(
  componentType: "basic" | "advanced"
): string {
  return componentType === "advanced"
    ? "phone-number-sr-advanced"
    : "phone-number-sr";
}
