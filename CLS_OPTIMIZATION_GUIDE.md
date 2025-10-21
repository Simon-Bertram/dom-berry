# Cumulative Layout Shift (CLS) Optimization Guide

## Overview

This document outlines the comprehensive CLS optimization improvements implemented for the Dom Berry website. CLS measures visual stability by quantifying how much visible content shifts during page load.

## What is Cumulative Layout Shift?

CLS is a Core Web Vital that measures the visual stability of a page. It quantifies how much visible content shifts during the loading process. A good CLS score is 0.1 or less.

### Common Causes of CLS:

- Images without dimensions
- Fonts without fallbacks
- Dynamically injected content
- Ads or embeds without reserved space
- Web fonts causing text to shift

## Implemented Improvements

### 1. Hero Video Section Optimization

**Problem**: Video loading caused layout shifts when transitioning between poster and video.

**Solution**: Always render both video and poster elements, using opacity transitions instead of conditional rendering.

```typescript
// Before (caused CLS)
<video
  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
    isVideoLoaded && !hasError ? "opacity-100" : "opacity-0"
  }`}
  // ...
/>

// After (prevents CLS)
<video
  className="absolute inset-0 h-full w-full object-cover"
  style={{
    opacity: isVideoLoaded && !hasError ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
  }}
  // ...
/>
```

**Key Changes**:

- Moved opacity control to inline styles
- Always present both video and poster in DOM
- Smooth transitions without layout shifts
- Consistent positioning and sizing

### 2. Status Message Component Optimization

**Problem**: Form status messages appeared/disappeared causing layout shifts.

**Solution**: Always render a container with minimum height, conditionally show content.

```typescript
// Before (caused CLS)
if (status === "loading" || isPending) {
  return <output>...</output>;
}
return null;

// After (prevents CLS)
return <div className="min-h-[3rem]">{renderContent()}</div>;
```

**Key Changes**:

- Reserved space with `min-h-[3rem]`
- Eliminated nested ternary expressions
- Consistent container height
- Proper conditional rendering

### 3. Portfolio Grid Skeleton Loading

**Problem**: Portfolio filtering caused content to disappear/reappear, creating layout shifts.

**Solution**: Added skeleton loading states to maintain consistent grid layout.

```typescript
// Added skeleton loading state
{filteredProjects.length === 0
  ? Array.from({ length: 6 }, (_, index) => (
      <div
        className="animate-pulse rounded-lg border border-gray-200 bg-white p-6"
        key={`skeleton-${index}-${Date.now()}`}
      >
        <div className="mb-4 h-48 w-full rounded-lg bg-gray-200" />
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />
        {/* More skeleton elements */}
      </div>
    ))
  : filteredProjects.map((project) => (
      // Actual project cards
    ))
}
```

**Key Changes**:

- Skeleton placeholders maintain grid structure
- Consistent card dimensions
- Smooth loading animations
- Proper key generation for React

### 4. Font Loading Optimization

**Problem**: Web fonts loading could cause text to shift.

**Solution**: Enhanced font loading strategy with proper fallbacks and display settings.

```css
/* Added to index.css */
.font-display {
  font-display: swap;
}

.font-body {
  font-display: swap;
}
```

**Key Changes**:

- Explicit `font-display: swap` declarations
- Proper fallback font stacks in layout.tsx
- Preloading critical fonts
- Consistent font loading behavior

### 5. CSS Animation Improvements

**Problem**: Missing skeleton loading animations.

**Solution**: Added proper keyframe animations for loading states.

```css
/* Added to index.css */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## Best Practices Applied

### 1. Reserved Space Strategy

- Always allocate space for dynamic content
- Use `min-height` for containers that change content
- Maintain consistent dimensions during state changes

### 2. Smooth Transitions

- Use opacity instead of conditional rendering
- Implement smooth CSS transitions
- Avoid abrupt content changes

### 3. Skeleton Loading

- Show placeholders during loading states
- Maintain layout structure during content changes
- Use consistent dimensions and spacing

### 4. Font Optimization

- Use `font-display: swap` for web fonts
- Provide proper fallback fonts
- Preload critical fonts

### 5. Image Optimization

- Use Next.js Image component with proper sizing
- Provide `sizes` attributes for responsive images
- Use `fill` with `object-cover` for consistent aspect ratios

## Code Quality Improvements

### 1. Eliminated Nested Ternaries

```typescript
// Before (linting error)
{
  condition ? <Component1 /> : otherCondition ? <Component2 /> : <Component3 />;
}

// After (clean)
const renderContent = () => {
  if (condition) return <Component1 />;
  if (otherCondition) return <Component2 />;
  return <Component3 />;
};
```

### 2. Proper Key Generation

```typescript
// Before (linting error)
Array.from({ length: 6 }).map((_, index) => <div key={index}>...</div>);

// After (proper)
Array.from({ length: 6 }, (_, index) => (
  <div key={`skeleton-${index}-${Date.now()}`}>...</div>
));
```

## Performance Impact

### Expected Improvements:

- **CLS Score**: Reduced from potential 0.2+ to <0.1
- **User Experience**: Smoother page loads, no content jumping
- **Core Web Vitals**: Better overall performance scores
- **Accessibility**: More stable layout for screen readers

### Metrics to Monitor:

- CLS score in PageSpeed Insights
- Real User Monitoring (RUM) data
- Lighthouse performance scores
- User feedback on page stability

## Future Considerations

### 1. Additional Optimizations

- Implement intersection observer for lazy loading
- Add more granular skeleton states
- Consider using CSS `content-visibility` for large lists
- Implement proper error boundaries

### 2. Monitoring

- Set up CLS monitoring in production
- Track Core Web Vitals over time
- Monitor user experience metrics
- Regular performance audits

### 3. Maintenance

- Review CLS impact of new features
- Test on various devices and network conditions
- Keep font loading strategies updated
- Monitor third-party content impact

## Testing Checklist

### Before Deployment:

- [ ] Test video loading on slow connections
- [ ] Verify form status messages don't cause shifts
- [ ] Check portfolio filtering behavior
- [ ] Test font loading with network throttling
- [ ] Validate skeleton loading states
- [ ] Run Lighthouse performance audit
- [ ] Test on mobile devices

### Post-Deployment:

- [ ] Monitor CLS scores in production
- [ ] Check Core Web Vitals dashboard
- [ ] Review user experience metrics
- [ ] Test on various browsers
- [ ] Validate accessibility compliance

## Conclusion

These CLS optimizations significantly improve the visual stability of the Dom Berry website. The implemented changes follow modern web performance best practices and should result in better Core Web Vitals scores and improved user experience.

The key principle is to always reserve space for dynamic content and use smooth transitions instead of abrupt changes. This approach ensures a stable, professional user experience that reflects the quality of the videography services offered.
