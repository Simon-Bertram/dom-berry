import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

// TypeScript types for form data and email options
type ContactFormData = {
  name: string;
  email: string;
  projectType: string;
  projectBudget: string;
  vision: string;
  formTimestamp?: string;
};

type EmailOptions = {
  from: string;
  to: string;
  reply_to?: string;
  subject: string;
  html: string;
};

type EmailResponse = {
  data: { id: string } | null;
  error: string | null;
};

// Constants
const MOCK_DELAY_MS = 500;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FORM_SUBMISSION_TIME_MS = 2000;
const RATE_LIMIT = {
  MAX_REQUESTS: 5,
  WINDOW_MS: 60_000,
} as const;

/**
 * Mocks the Resend utility since a real API key cannot be used.
 * In a real application, you would initialize Resend as shown above.
 */
class ResendMock {
  emails = {
    send: async (options: EmailOptions): Promise<EmailResponse> => {
      // Simulate API call delay and success
      await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

      const hasRequiredFields =
        options.from && options.to && options.subject && options.html;
      if (!hasRequiredFields) {
        throw new Error("Resend mock failed: Missing required fields.");
      }

      // Log the email content to the console (server-side)
      // Note: In production, replace with proper logging service
      // biome-ignore lint/suspicious/noConsole: Mock implementation for development
      console.log("--- RESEND EMAIL MOCK SUCCESS ---");
      // biome-ignore lint/suspicious/noConsole: Mock implementation for development
      console.log(`To: ${options.to}, From: ${options.from}`);
      // biome-ignore lint/suspicious/noConsole: Mock implementation for development
      console.log(`Subject: ${options.subject}`);
      // biome-ignore lint/suspicious/noConsole: Mock implementation for development
      console.log("---------------------------------");

      return { data: { id: "mock-12345" }, error: null };
    },
  };
}

const resend = new ResendMock();

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const { rateLimited } = checkRateLimit(
      ip,
      RATE_LIMIT.MAX_REQUESTS,
      RATE_LIMIT.WINDOW_MS
    );

    if (rateLimited) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    // Validate Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type. Expected application/json." },
        { status: 400 }
      );
    }

    const data: ContactFormData = await request.json();
    const { name, email, projectType, projectBudget, vision, formTimestamp } =
      data;

    // 1. Server-side Validation - Expected errors (return 400, don't throw)
    const hasRequiredFields =
      name && email && vision && projectBudget && projectType;
    if (!hasRequiredFields) {
      return NextResponse.json(
        { error: "Missing required form fields." },
        { status: 400 }
      );
    }

    // Simple email format check
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Check timestamp for bot detection
    const timestamp = Number(formTimestamp || 0);
    const timeDiff = Date.now() - timestamp;
    if (timeDiff < MIN_FORM_SUBMISSION_TIME_MS) {
      return NextResponse.json(
        { error: "Form submitted too quickly." },
        { status: 400 }
      );
    }

    // 2. Construct Email Content (HTML for better formatting)
    // Escape user input to prevent HTML injection
    const escapeHtml = (text: string): string =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType || "Not Specified");
    const safeProjectBudget = escapeHtml(projectBudget);
    const safeVision = escapeHtml(vision);

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

    // 3. Send Email using Resend
    // TODO: Replace with your actual verified domain and email address
    const { error: emailError } = await resend.emails.send({
      from: "Leads <onboarding@yourdomain.com>", // TODO: Replace with your verified Resend domain
      to: "your-professional-email@example.com", // TODO: Replace with YOUR email
      reply_to: email, // Allows you to reply directly to the client
      subject: `New Southwest Project Inquiry from ${name}`,
      html: emailHtml,
    });

    if (emailError) {
      // Note: In production, replace with proper logging service
      // biome-ignore lint/suspicious/noConsole: Error logging for development
      console.error("Resend Error:", emailError);
      // This is an expected error from the email service - return 500 for critical failures
      return NextResponse.json(
        { error: "Failed to send email notification." },
        { status: 500 }
      );
    }

    // 4. Send Success Response
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    // This catch block handles uncaught exceptions (unexpected errors)
    // Log the error to an error reporting service in production
    // biome-ignore lint/suspicious/noConsole: Error logging for development
    console.error("API Route Error:", error);

    // Return a generic error message to avoid exposing internal details
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
