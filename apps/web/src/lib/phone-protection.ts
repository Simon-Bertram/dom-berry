/**
 * Phone number protection utilities
 * Implements multiple layers of protection against malicious harvesting
 */

// Simple encoding/decoding for phone numbers
const PHONE_ENCODING_KEY = 3;

// Regex patterns for performance optimization
const DIGIT_REGEX = /\d/;
const NON_DIGIT_REGEX = /\D/;

// UK phone number parsing constants
const UK_COUNTRY_CODE = "44";
const UK_AREA_CODE_LENGTH = 4;
const UK_FIRST_PART_LENGTH = 3;

// Random delay constants
const MIN_DELAY_MS = 100;
const MAX_DELAY_MS = 500;

/**
 * Encodes a phone number by shifting each digit
 */
export function encodePhoneNumber(phone: string): string {
  return phone
    .split("")
    .map((char) => {
      if (DIGIT_REGEX.test(char)) {
        return String.fromCharCode(char.charCodeAt(0) + PHONE_ENCODING_KEY);
      }
      return char;
    })
    .join("");
}

/**
 * Decodes a phone number by shifting each digit back
 */
export function decodePhoneNumber(encodedPhone: string): string {
  return encodedPhone
    .split("")
    .map((char) => {
      if (DIGIT_REGEX.test(char)) {
        return String.fromCharCode(char.charCodeAt(0) - PHONE_ENCODING_KEY);
      }
      return char;
    })
    .join("");
}

/**
 * Splits a phone number into parts for obfuscation
 */
export function splitPhoneNumber(phone: string): {
  countryCode: string;
  areaCode: string;
  firstPart: string;
  secondPart: string;
} {
  // Remove all non-digit characters
  const digits = phone.replace(NON_DIGIT_REGEX, "");

  // For UK numbers, typically: +44 (0) 1453 123456
  if (digits.startsWith(UK_COUNTRY_CODE)) {
    return {
      countryCode: "+44",
      areaCode: digits.slice(2, 2 + UK_AREA_CODE_LENGTH),
      firstPart: digits.slice(
        2 + UK_AREA_CODE_LENGTH,
        2 + UK_AREA_CODE_LENGTH + UK_FIRST_PART_LENGTH
      ),
      secondPart: digits.slice(2 + UK_AREA_CODE_LENGTH + UK_FIRST_PART_LENGTH),
    };
  }

  // Fallback for other formats
  const midPoint = Math.ceil(digits.length / 2);
  return {
    countryCode: "+44",
    areaCode: digits.slice(0, UK_AREA_CODE_LENGTH),
    firstPart: digits.slice(UK_AREA_CODE_LENGTH, midPoint),
    secondPart: digits.slice(midPoint),
  };
}

/**
 * Reconstructs a phone number from its parts
 */
export function reconstructPhoneNumber(parts: {
  countryCode: string;
  areaCode: string;
  firstPart: string;
  secondPart: string;
}): string {
  return `${parts.countryCode} (0) ${parts.areaCode} ${parts.firstPart}${parts.secondPart}`;
}

/**
 * Generates a random delay for anti-bot protection
 */
export function getRandomDelay(
  min: number = MIN_DELAY_MS,
  max: number = MAX_DELAY_MS
): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
