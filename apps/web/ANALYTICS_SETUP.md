# Analytics and A/B Testing Setup

This document explains how to set up and use the analytics and A/B testing system implemented in this project.

## Overview

The project uses **PostHog** as the primary analytics and A/B testing solution. PostHog provides:

- **Privacy-focused analytics** - GDPR compliant, no cookies required
- **Free tier** - Generous free plan with 1M events/month
- **Feature flags** - For A/B testing and gradual rollouts
- **Event tracking** - Custom event tracking with properties
- **User identification** - For authenticated users
- **Real-time insights** - Live dashboard and analytics

## Setup Instructions

### 1. Create PostHog Account

1. Go to [PostHog.com](https://posthog.com) and sign up for a free account
2. Create a new project
3. Copy your project API key from the project settings

### 2. Configure Environment Variables

Create a `.env.local` file in the `apps/web` directory:

```bash
# PostHog Analytics Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Set Up Feature Flags in PostHog

In your PostHog dashboard, create the following feature flags:

#### A/B Test Flags

- `hero-cta-colors` - Values: `control`, `variant-a`, `variant-b`
- `homepage-layout-variant` - Values: `control`, `variant-a`, `variant-b`
- `contact-form-placement` - Values: `control`, `variant-a`, `variant-b`

#### Feature Flags

- `hero-cta-variant` - Boolean flag
- `homepage-layout` - Boolean flag
- `contact-form-design` - Boolean flag
- `navigation-style` - Boolean flag

## Implementation Details

### Analytics Tracking

The system automatically tracks:

- **Page views** - All page navigation
- **Button clicks** - CTA buttons and navigation
- **Form interactions** - Form starts, submissions, errors
- **Mobile menu** - Open/close events
- **A/B test assignments** - When users are assigned to variants
- **A/B test conversions** - When users complete desired actions

### A/B Testing

#### Hero CTA Colors Test

- **Control**: White background with black text
- **Variant A**: Blue background with white text
- **Variant B**: Green background with white text

#### Homepage Layout Test

- **Control**: Projects first, then testimonials
- **Variant A**: Testimonials first, then projects
- **Variant B**: Side-by-side layout on desktop

#### Contact Form Placement Test

- **Control**: Full page contact form
- **Variant A**: Modal/popup contact form
- **Variant B**: Inline contact form on homepage

### Custom Hooks

#### `useABTest(testName)`

Returns the current variant assignment and conversion tracking function.

```typescript
const { variant, isLoading, error, trackConversion } =
  useABTest("hero-cta-colors");

// Track a conversion
trackConversion("cta_click", { button_text: "View Portfolio" });
```

#### `useFeatureFlag(flagName)`

Returns the feature flag status.

```typescript
const { isEnabled, isLoading, error } = useFeatureFlag("hero-cta-variant");
```

### Analytics Utilities

#### `trackEvent(event, properties)`

Track custom events with properties.

```typescript
trackEvent("button_click", {
  button_text: "Contact Us",
  page: "/",
  variant: "control",
});
```

#### `trackButtonClick(buttonText, page, properties)`

Track button clicks with standardized properties.

```typescript
trackButtonClick("View Portfolio", "/", { variant: "blue" });
```

#### `trackFormSubmit(formName, success, properties)`

Track form submissions.

```typescript
trackFormSubmit("contact_form", true, {
  form_load_time: 1500,
  vision_length: 250,
});
```

## Testing Your Implementation

### 1. Development Testing

1. Start your development server: `bun dev`
2. Open browser developer tools
3. Check the console for PostHog debug messages
4. Verify events are being tracked in the Network tab

### 2. PostHog Dashboard

1. Go to your PostHog dashboard
2. Check the "Events" section for incoming events
3. Verify feature flag assignments in the "Feature Flags" section
4. Monitor A/B test performance in the "Experiments" section

### 3. A/B Test Verification

1. Create feature flags in PostHog with different values
2. Refresh your page multiple times to see different variants
3. Check the browser console for variant assignments
4. Verify tracking events include variant information

## Best Practices

### Privacy and Compliance

- PostHog is GDPR compliant by default
- No cookies are required for basic analytics
- User data is anonymized unless explicitly identified
- Users can opt out of tracking

### Performance

- PostHog loads asynchronously to avoid blocking page load
- Events are batched and sent efficiently
- Feature flags are cached for performance
- Minimal impact on page load times

### A/B Testing

- Always have a control variant
- Test one variable at a time
- Run tests for sufficient duration
- Monitor statistical significance
- Document test results and decisions

### Event Tracking

- Use consistent event names
- Include relevant properties
- Avoid tracking sensitive information
- Use meaningful property names
- Test events in development

## Troubleshooting

### Common Issues

1. **Events not appearing in PostHog**

   - Check environment variables are set correctly
   - Verify PostHog key is valid
   - Check browser console for errors
   - Ensure PostHog is initialized

2. **Feature flags not working**

   - Verify flags are created in PostHog dashboard
   - Check flag names match exactly
   - Ensure flags are enabled
   - Check user targeting rules

3. **A/B tests not showing variants**
   - Verify feature flag values are set correctly
   - Check flag targeting rules
   - Ensure flags are active
   - Test with different user IDs

### Debug Mode

Enable debug mode in development by setting:

```typescript
// In posthog.ts
if (process.env.NODE_ENV === "development") {
  posthog.debug();
}
```

This will log all PostHog events to the browser console.

## Monitoring and Analysis

### Key Metrics to Track

1. **Conversion Rates**

   - CTA button clicks
   - Form submissions
   - Page engagement

2. **User Behavior**

   - Page views and time on page
   - Navigation patterns
   - Mobile vs desktop usage

3. **A/B Test Results**
   - Variant performance
   - Statistical significance
   - User engagement by variant

### PostHog Insights

Use PostHog's built-in insights to:

- Create custom dashboards
- Set up automated reports
- Monitor key metrics
- Analyze user funnels
- Track conversion rates

## Support

For issues with:

- **PostHog setup**: Check [PostHog documentation](https://posthog.com/docs)
- **Implementation**: Review the code in `/src/lib/analytics.ts` and `/src/hooks/`
- **A/B testing**: See `/src/lib/ab-test-config.ts` for configuration

## Next Steps

1. Set up your PostHog account and configure environment variables
2. Create the required feature flags in PostHog
3. Test the implementation in development
4. Deploy and monitor analytics in production
5. Set up custom dashboards and alerts
6. Plan and run your first A/B tests
