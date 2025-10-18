"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit, RATE_LIMIT } from "./rate-limit";

// Constants for validation limits
const VALIDATION_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254,
  VISION_MIN_LENGTH: 10,
  VISION_MAX_LENGTH: 2000,
  MIN_FORM_SUBMISSION_TIME_MS: 2000,
} as const;

// TODO: Add email functionality
// Email configuration will be added when implementing actual email service

// Constants for TODO implementation
const VISION_LOG_TRUNCATE_LENGTH = 100;

// Type definitions for better type safety
type ContactFormData = {
  name: string;
  email: string;
  projectType: string;
  projectBudget: string;
  vision: string;
  website?: string; // Honeypot field
  formTimestamp?: string; // Timestamp for bot detection
};

type ContactFormResult = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

// Enhanced Zod schema with better validation messages using constants
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .min(VALIDATION_LIMITS.NAME_MIN_LENGTH, {
      message: "Name must be at least 2 characters long.",
    })
    .max(VALIDATION_LIMITS.NAME_MAX_LENGTH, {
      message: "Name must be less than 100 characters.",
    })
    .regex(/^[a-zA-Z\s\-'.]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, apostrophes, and periods.",
    }),
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please enter a valid email address." })
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH, {
      message: "Email address is too long.",
    }),
  projectType: z.string().min(1, { message: "Please select a project type." }),
  projectBudget: z
    .string()
    .min(1, { message: "Please select a budget range." }),
  vision: z
    .string()
    .min(1, { message: "Project vision is required." })
    .min(VALIDATION_LIMITS.VISION_MIN_LENGTH, {
      message: "Please provide at least 10 characters describing your vision.",
    })
    .max(VALIDATION_LIMITS.VISION_MAX_LENGTH, {
      message: "Project vision must be less than 2000 characters.",
    }),
  // Honeypot field - should be empty for legitimate submissions
  website: z
    .string()
    .optional()
    .refine((val) => !val || val === "", {
      message: "Spam detected",
    }),
  // Timestamp field for bot detection
  formTimestamp: z.string().optional(),
});

/**
 * Safely extracts and sanitizes form data from FormData object
 */
function extractAndSanitizeFormData(formData: FormData): ContactFormData {
  const getStringValue = (key: string): string => {
    const value = formData.get(key);
    if (typeof value !== "string") {
      throw new Error(`Invalid form data for field: ${key}`);
    }
    // Trim whitespace - Zod validation provides sufficient protection
    return value.trim();
  };

  const getOptionalStringValue = (key: string): string | undefined => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : undefined;
  };

  return {
    name: getStringValue("name"),
    email: getStringValue("email"),
    projectType: getStringValue("projectType"),
    projectBudget: getStringValue("projectBudget"),
    vision: getStringValue("vision"),
    website: getOptionalStringValue("website"), // Honeypot field
    formTimestamp: getOptionalStringValue("formTimestamp"), // Timestamp for bot detection
  };
}

/**
 * Formats validation errors for better accessibility
 */
function formatValidationErrors(issues: z.ZodIssue[]): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    const fieldName = issue.path[0] as string;
    if (fieldName) {
      // Add field-specific error messages with better accessibility
      errors[fieldName] =
        `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: ${issue.message}`;
    }
  }

  return errors;
}

/**
 * Validates form submission timing to detect bots
 */
function validateSubmissionTiming(data: ContactFormData): {
  isValid: boolean;
  message?: string;
} {
  const timeDiff = Date.now() - Number(data.formTimestamp || 0);
  if (timeDiff < VALIDATION_LIMITS.MIN_FORM_SUBMISSION_TIME_MS) {
    return {
      isValid: false,
      message: "Form submitted too quickly. Please try again.",
    };
  }
  return { isValid: true };
}

/**
 * Logs form submission attempts for monitoring and debugging
 */
function logFormSubmission(
  data: ContactFormData,
  success: boolean,
  error?: string
) {
  const logData = {
    timestamp: new Date().toISOString(),
    success,
    projectType: data.projectType,
    budgetRange: data.projectBudget,
    error,
    // Don't log sensitive data like email or personal details
  };

  // In production, this should be sent to a proper logging service
  // biome-ignore lint/suspicious/noConsole: Development logging for debugging
  console.log("Contact form submission:", JSON.stringify(logData));
}

/**
 * TODO: Implement email functionality
 * This function will be implemented when email service is added
 */
function sendEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  // TODO: Add email functionality
  // For now, simulate a successful email send to maintain form functionality
  // biome-ignore lint/suspicious/noConsole: TODO logging for debugging
  console.log(
    "TODO: Email functionality not implemented yet. Form data received:",
    {
      name: data.name,
      email: data.email,
      projectType: data.projectType,
      projectBudget: data.projectBudget,
      vision: `${data.vision.substring(0, VISION_LOG_TRUNCATE_LENGTH)}...`, // Log truncated vision for debugging
    }
  );

  // Return success to maintain user experience while email service is being implemented
  return Promise.resolve({ success: true });
}

export async function submitContactForm(
  formData: FormData
): Promise<ContactFormResult> {
  try {
    // Get client IP from headers for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");

    // Extract IP (handle proxy chains)
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "unknown";

    // Apply rate limiting
    const rateLimit =
      ip === "unknown" ? RATE_LIMIT.UNKNOWN_IP_LIMIT : RATE_LIMIT.DEFAULT_LIMIT;
    const { rateLimited } = checkRateLimit(
      ip === "unknown" ? "global-unknown" : ip,
      rateLimit,
      RATE_LIMIT.DEFAULT_WINDOW_MS
    );

    if (rateLimited) {
      return {
        success: false,
        message: "Too many requests. Please wait a moment and try again.",
      };
    }

    // Extract and sanitize form data
    const data = extractAndSanitizeFormData(formData);

    // Validate the data
    const validationResult = contactFormSchema.safeParse(data);

    if (!validationResult.success) {
      const fieldErrors = formatValidationErrors(validationResult.error.issues);

      logFormSubmission(data, false, "Validation failed");

      return {
        success: false,
        message: "Please correct the errors below and try again.",
        fieldErrors,
      };
    }

    // Check timestamp for bot detection
    const timingValidation = validateSubmissionTiming(data);
    if (!timingValidation.isValid) {
      logFormSubmission(data, false, "Form submitted too quickly");
      return {
        success: false,
        message: timingValidation.message,
      };
    }

    // Send email directly via Resend
    const emailResult = await sendEmail(validationResult.data);

    if (emailResult.success) {
      logFormSubmission(data, true);
      return {
        success: true,
        message:
          "TODO - add email functionality. Your form has been received and validated successfully.",
      };
    }

    logFormSubmission(data, false, emailResult.error);
    return {
      success: false,
      message: "Failed to send email. Please try again or contact us directly.",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Log the error for debugging (without sensitive data)
    // biome-ignore lint/suspicious/noConsole: Error logging for debugging
    console.error("Contact form submission error:", errorMessage);

    return {
      success: false,
      message:
        "A technical error occurred. Please try again or contact us directly if the problem persists.",
    };
  }
}
