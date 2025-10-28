/**
 * Constants for contact form security and validation
 */

// Form security constants
export const FORM_SECURITY_CONSTANTS = {
  RANDOM_TOKEN_START: 2,
  RANDOM_TOKEN_LENGTH: 13,
  RADIX_36: 36,
} as const;

// Form field validation constants
export const FORM_VALIDATION_CONSTANTS = {
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254,
  VISION_MAX_LENGTH: 2000,
} as const;

/**
 * Generate a random token for form security
 * Pure function for better testability and reusability
 */
export function generateRandomToken(): string {
  return Math.random()
    .toString(FORM_SECURITY_CONSTANTS.RADIX_36)
    .substring(
      FORM_SECURITY_CONSTANTS.RANDOM_TOKEN_START,
      FORM_SECURITY_CONSTANTS.RANDOM_TOKEN_LENGTH
    );
}
