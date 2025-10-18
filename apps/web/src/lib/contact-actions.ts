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

// Email configuration
const EMAIL_CONFIG = {
  FROM: process.env.EMAIL_FROM || "Leads <onboarding@yourdomain.com>",
  TO: process.env.EMAIL_TO || "your-professional-email@example.com",
} as const;

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
 * Escapes HTML to prevent injection attacks
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends email directly via Resend API
 */
async function sendEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Escape user input to prevent HTML injection
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeProjectType = escapeHtml(data.projectType);
    const safeProjectBudget = escapeHtml(data.projectBudget);
    const safeVision = escapeHtml(data.vision);

    const emailHtml = `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; line-height: 1.6; color: #333; }
            .container { padding: 20px; border: 1px solid #eee; border-radius: 8px; max-width: 600px; margin: 20px auto; }
            .header { background-color: #4f46e5; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center; }
            .detail { margin-bottom: 15px; padding: 10px; border-bottom: 1px dotted #ccc; }
            .detail strong { display: inline-block; width: 150px; font-weight: 700; color: #1e40af; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>NEW LEAD: Southwest Videography Inquiry</h2>
            </div>
            <p>You have received a new project brief from your website contact form.</p>
            
            <div class="detail">
              <strong>Name:</strong> ${safeName}
            </div>
            <div class="detail">
              <strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a>
            </div>
            <div class="detail">
              <strong>Project Type:</strong> ${safeProjectType}
            </div>
            <div class="detail">
              <strong>Budget Range:</strong> ${safeProjectBudget}
            </div>
            <div class="detail">
              <strong>Vision/Brief:</strong>
              <p style="white-space: pre-wrap; margin-top: 5px; padding: 10px; background: #f9f9f9; border-left: 3px solid #4f46e5;">${safeVision}</p>
            </div>

            <p style="text-align: center; margin-top: 30px;">
              <a href="mailto:${safeEmail}" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">
                Reply to ${safeName} Now
              </a>
            </p>
          </div>
        </body>
      </html>
    `;

    // Use Resend API directly
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_CONFIG.FROM,
        to: EMAIL_CONFIG.TO,
        reply_to: data.email,
        subject: `New Southwest Project Inquiry from ${data.name}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: `Resend API error: ${errorData.message || response.statusText}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
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
    const { rateLimited } = checkRateLimit(
      ip === "unknown" ? "global-unknown" : ip,
      ip === "unknown" ? RATE_LIMIT.UNKNOWN_IP_LIMIT : RATE_LIMIT.DEFAULT_LIMIT,
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
          "Success! Your brief has been sent. I will review it and reply within 1 business day.",
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
