import posthog from "posthog-js";

export function trackEvent(
  event: string,
  properties?: Record<string, unknown>
): void {
  posthog.capture(event, properties);
}

export function trackButtonClick(
  buttonText: string,
  page: string,
  properties?: Record<string, unknown>
): void {
  posthog.capture("button_click", {
    button_text: buttonText,
    page,
    ...properties,
  });
}

export function trackNavigationClick(label: string, currentPath: string): void {
  posthog.capture("navigation_click", { label, current_path: currentPath });
}

export function trackFormSubmit(
  formName: string,
  success: boolean,
  properties?: Record<string, unknown>
): void {
  posthog.capture("form_submit", {
    form_name: formName,
    success,
    ...properties,
  });
}

export function trackFormError(
  formName: string,
  errorType: string,
  properties?: Record<string, unknown>
): void {
  posthog.capture("form_error", {
    form_name: formName,
    error_type: errorType,
    ...properties,
  });
}
