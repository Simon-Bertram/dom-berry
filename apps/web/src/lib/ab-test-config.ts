/**
 * A/B Test Configuration
 *
 * This file centralizes all A/B test definitions and configurations.
 * Update this file when adding new tests or modifying existing ones.
 */

export type ABTestConfig = {
  name: string;
  description: string;
  variants: {
    control: string;
    "variant-a": string;
    "variant-b"?: string;
    "variant-c"?: string;
  };
  targetPages: string[];
  metrics: {
    primary: string;
    secondary?: string[];
  };
  status: "active" | "paused" | "completed";
  startDate: string;
  endDate?: string;
};

/**
 * Active A/B Tests Configuration
 *
 * Define your A/B tests here. Each test should have:
 * - A unique name (matching PostHog feature flag name)
 * - Clear description of what's being tested
 * - Variant descriptions
 * - Target pages where the test runs
 * - Success metrics to track
 */
export const AB_TESTS: Record<string, ABTestConfig> = {
  "hero-cta-colors": {
    name: "hero-cta-colors",
    description: "Test different CTA button colors in the hero section",
    variants: {
      control: "White background with black text (current)",
      "variant-a": "Blue background with white text",
      "variant-b": "Green background with white text",
    },
    targetPages: ["/"],
    metrics: {
      primary: "cta_click",
      secondary: ["page_view", "contact_form_start"],
    },
    status: "active",
    startDate: "2024-01-01",
  },

  "homepage-layout-variant": {
    name: "homepage-layout-variant",
    description: "Test different homepage layout arrangements",
    variants: {
      control: "Current layout with projects first, then testimonials",
      "variant-a": "Testimonials first, then projects",
      "variant-b": "Side-by-side layout on desktop",
    },
    targetPages: ["/"],
    metrics: {
      primary: "scroll_depth",
      secondary: ["portfolio_view", "testimonial_view"],
    },
    status: "active",
    startDate: "2024-01-01",
  },

  "contact-form-placement": {
    name: "contact-form-placement",
    description: "Test different contact form placements and designs",
    variants: {
      control: "Full page contact form",
      "variant-a": "Modal/popup contact form",
      "variant-b": "Inline contact form on homepage",
    },
    targetPages: ["/contact", "/"],
    metrics: {
      primary: "contact_form_complete",
      secondary: ["contact_form_start", "form_error"],
    },
    status: "active",
    startDate: "2024-01-01",
  },
};

/**
 * Get active A/B tests for a specific page
 */
export function getActiveTestsForPage(page: string): ABTestConfig[] {
  return Object.values(AB_TESTS).filter(
    (test) => test.status === "active" && test.targetPages.includes(page)
  );
}

/**
 * Get test configuration by name
 */
export function getTestConfig(testName: string): ABTestConfig | undefined {
  return AB_TESTS[testName];
}

/**
 * Check if a test is active
 */
export function isTestActive(testName: string): boolean {
  const test = AB_TESTS[testName];
  return test?.status === "active";
}

/**
 * Get all active test names
 */
export function getActiveTestNames(): string[] {
  return Object.values(AB_TESTS)
    .filter((test) => test.status === "active")
    .map((test) => test.name);
}

/**
 * PostHog Feature Flag Configuration
 *
 * These are the feature flag names that should be created in PostHog
 * to match the A/B tests defined above.
 */
export const POSTHOG_FEATURE_FLAGS = {
  // A/B Test Flags
  "hero-cta-colors": "hero-cta-colors",
  "homepage-layout-variant": "homepage-layout-variant",
  "contact-form-placement": "contact-form-placement",

  // Feature Flags (not A/B tests)
  "hero-cta-variant": "hero-cta-variant",
  "homepage-layout": "homepage-layout",
  "contact-form-design": "contact-form-design",
  "navigation-style": "navigation-style",
} as const;

/**
 * Analytics Event Names
 *
 * Standardized event names for consistent tracking across the application
 */
export const ANALYTICS_EVENTS = {
  // Page Events
  PAGE_VIEW: "page_view",

  // Interaction Events
  BUTTON_CLICK: "button_click",
  NAVIGATION_CLICK: "navigation_click",
  MOBILE_MENU_TOGGLE: "mobile_menu_toggle",

  // Form Events
  FORM_SUBMIT: "form_submit",
  FORM_ERROR: "form_error",
  CONTACT_FORM_START: "contact_form_start",
  CONTACT_FORM_COMPLETE: "contact_form_complete",

  // Content Events
  PORTFOLIO_VIEW: "portfolio_view",
  TESTIMONIAL_VIEW: "testimonial_view",
  VIDEO_PLAY: "video_play",
  VIDEO_ERROR: "video_error",

  // A/B Test Events
  AB_TEST_ASSIGNED: "ab_test_assigned",
  AB_TEST_CONVERSION: "ab_test_conversion",
} as const;
