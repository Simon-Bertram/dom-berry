import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TypeScript types for form data and email options
type ContactFormData = {
  name: string;
  email: string;
  projectType: string;
  projectBudget: string;
  vision: string;
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
    const data: ContactFormData = await request.json();
    const { name, email, projectType, projectBudget, vision } = data;

    // 1. Server-side Validation
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

    // 2. Construct Email Content (HTML for better formatting)
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
							<strong>Name:</strong> ${name}
						</div>
						<div class="detail">
							<strong>Email:</strong> <a href="mailto:${email}">${email}</a>
						</div>
						<div class="detail">
							<strong>Project Type:</strong> ${projectType || "Not Specified"}
						</div>
						<div class="detail">
							<strong>Budget Range:</strong> ${projectBudget}
						</div>
						<div class="detail">
							<strong>Vision/Brief:</strong>
							<p style="white-space: pre-wrap; margin-top: 5px; padding: 10px; background: #f9f9f9; border-left: 3px solid #4f46e5;">${vision}</p>
						</div>

						<p style="text-align: center; margin-top: 30px;">
							<a href="mailto:${email}" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">
								Reply to ${name} Now
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
      // Log the error but send a generic success to the client to avoid giving away details
      // Or, ideally, return a 500 status for critical failures
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
    // Note: In production, replace with proper logging service
    // biome-ignore lint/suspicious/noConsole: Error logging for development
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
