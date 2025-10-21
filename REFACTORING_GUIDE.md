# React/Next.js Refactoring Guide: Separation of Concerns

This document outlines the refactoring process applied to improve separation of concerns in the Dom Berry Next.js application. It serves as a learning resource for future development and refactoring efforts.

## Table of Contents

1. [Overview](#overview)
2. [Before vs After](#before-vs-after)
3. [Refactoring Principles](#refactoring-principles)
4. [Step-by-Step Refactoring Process](#step-by-step-refactoring-process)
5. [Key Patterns and Techniques](#key-patterns-and-techniques)
6. [Benefits Achieved](#benefits-achieved)
7. [Best Practices for Future Development](#best-practices-for-future-development)
8. [Common Anti-Patterns to Avoid](#common-anti-patterns-to-avoid)

## Overview

The refactoring focused on separating **business logic** from **presentation logic** in React components, following the principle that components should be responsible for rendering UI while custom hooks and utility functions handle business logic.

### Core Philosophy

> **"Components should be dumb, hooks should be smart"**

- **Components**: Handle presentation, user interactions, and UI state
- **Hooks**: Manage business logic, data fetching, and complex state
- **Utilities**: Provide pure functions for data transformation and calculations

## Before vs After

### Before Refactoring

```tsx
// ❌ BEFORE: ContactForm component (287 lines)
export default function ContactForm() {
  // Mixed concerns:
  // - Form state management
  // - Validation logic
  // - UI rendering
  // - Business logic
  // - Constants definition

  const [state, formAction, isPending] = useActionState(/* ... */);
  const [visionLength, setVisionLength] = useState(0);
  const [formLoadTime] = useState(Date.now());
  const visionRef = useRef<HTMLTextAreaElement>(null);

  // Business logic mixed with component
  const PROJECT_TYPES = ["Corporate Film", "Live Event Coverage" /* ... */];
  const BUDGET_RANGES = ["Under £500", "£500 - £2k" /* ... */];

  // Complex useEffect hooks for form management
  useEffect(() => {
    // Form reset logic
  }, [state.status]);

  // 200+ lines of JSX with inline logic
  return <div>{/* Massive form with embedded logic */}</div>;
}
```

### After Refactoring

```tsx
// ✅ AFTER: ContactForm component (~60 lines)
export default function ContactForm() {
  // Clean separation: only UI logic
  const {
    state,
    formAction,
    isPending,
    visionLength,
    formLoadTime,
    visionRef,
    handleVisionChange,
  } = useContactForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl sm:p-10">
        <h1 className="mb-2 font-extrabold text-3xl text-card-foreground">
          Start Your Project
        </h1>
        <p className="mb-8 text-muted-foreground">
          Tell me about your video vision for the Southwest. I'll get back to
          you with a personalized quote and timeline.
        </p>

        <Form
          action={formAction}
          aria-busy={isPending}
          className="space-y-6"
          id="contact-form"
        >
          <StatusMessage
            isPending={isPending}
            message={state.message}
            status={state.status}
          />

          <ContactFormFields
            formLoadTime={formLoadTime}
            onVisionChange={handleVisionChange}
            state={state}
            visionLength={visionLength}
            visionRef={visionRef}
          />

          <button
            className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 font-bold text-lg text-primary-foreground shadow-lg transition duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
            disabled={state.status === "loading" || isPending}
            type="submit"
          >
            {state.status === "loading" || isPending
              ? "Sending..."
              : "SEND MY PROJECT BRIEF"}
          </button>
        </Form>
      </div>
    </div>
  );
}
```

## Refactoring Principles

### 1. Single Responsibility Principle (SRP)

Each module should have only one reason to change:

- **Components**: Only handle UI rendering and user interactions
- **Hooks**: Only manage state and side effects
- **Utilities**: Only perform data transformations
- **Actions**: Only handle server-side operations

### 2. Separation of Concerns

```tsx
// ❌ Mixed concerns
function ContactForm() {
  // UI logic + business logic + data fetching + validation
}

// ✅ Separated concerns
function ContactForm() {
  // Only UI logic
  const formLogic = useContactForm(); // Business logic
  return <ContactFormFields {...formLogic} />; // Presentation logic
}
```

### 3. Composition over Inheritance

Build complex functionality by combining smaller, focused pieces:

```tsx
// ✅ Composed from smaller components
<ContactForm>
  <StatusMessage />
  <ContactFormFields />
  <SubmitButton />
</ContactForm>
```

### 4. Dependency Inversion

High-level modules should not depend on low-level modules:

```tsx
// ❌ Component depends on specific implementation
function Hero() {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.split("@")[1];
  // Direct dependency on Cloudinary implementation
}

// ✅ Component depends on abstraction
function Hero() {
  const { isVideoLoaded, hasError, handleVideoLoadedData, handleVideoError } =
    useVideoPlayer();
  const desktopVideoUrl = getDesktopVideoUrl(desktopVideoId);
  // Depends on abstractions (hooks and utilities)
}
```

## Step-by-Step Refactoring Process

### Step 1: Identify Mixed Concerns

**What to look for:**

- Components with >100 lines
- Multiple `useEffect` hooks
- Inline business logic
- Hardcoded constants
- Complex state management

**Example from ContactForm:**

```tsx
// ❌ Mixed concerns identified
export default function ContactForm() {
  // 1. Form state management (business logic)
  const [state, formAction, isPending] = useActionState(/* ... */);

  // 2. UI state management (presentation logic)
  const [visionLength, setVisionLength] = useState(0);

  // 3. Constants definition (configuration)
  const PROJECT_TYPES = ["Corporate Film", /* ... */];

  // 4. Complex side effects (business logic)
  useEffect(() => {
    if (state.status === "success") {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) {
        form.reset();
        setVisionLength(0);
      }
    }
  }, [state.status]);

  // 5. Event handlers (business logic)
  const handleVisionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVisionLength(e.target.value.length);
  };

  // 6. Massive JSX (presentation logic)
  return (/* 200+ lines of JSX */);
}
```

### Step 2: Extract Custom Hooks

**Create hooks for business logic:**

```tsx
// ✅ Extracted to useContactForm hook
export function useContactForm() {
  // 1. Form state management
  const [formState, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) =>
      submitContactForm(formData),
    initialState
  );

  // 2. UI state management
  const [visionLength, setVisionLength] = useState(0);
  const [formLoadTime] = useState(Date.now());
  const visionRef = useRef<HTMLTextAreaElement>(null);

  // 3. Side effects
  useEffect(() => {
    if (formState.status === "success") {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) {
        form.reset();
        setVisionLength(0);
      }
    }
  }, [formState.status]);

  // 4. Event handlers
  const handleVisionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVisionLength(e.target.value.length);
  };

  // 5. Return clean interface
  return {
    state: formState,
    formAction,
    isPending,
    visionLength,
    formLoadTime,
    visionRef,
    handleVisionChange,
  };
}
```

### Step 3: Extract Utility Functions

**Move pure functions to utilities:**

```tsx
// ✅ Extracted to video-utils.ts
export function getCloudinaryVideoUrl(
  videoId: string,
  options: {
    width?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.split("@")[1] || "dulwhlyqt";
  const { width = 1920, quality = "auto:low", format = "auto" } = options;
  const transformations = [`f_${format}`, `q_${quality}`, `w_${width}`].join(
    ","
  );
  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${videoId}`;
}

export function getDesktopVideoUrl(videoId: string): string {
  return getCloudinaryVideoUrl(videoId, { width: 1920 });
}

export function getMobileVideoUrl(videoId: string): string {
  return getCloudinaryVideoUrl(videoId, { width: 768 });
}
```

### Step 4: Extract Presentation Components

**Break down large components into smaller, focused ones:**

```tsx
// ✅ Extracted ContactFormFields component
export function ContactFormFields({
  state,
  visionLength,
  formLoadTime,
  visionRef,
  onVisionChange,
}: ContactFormFieldsProps) {
  return (
    <>
      {/* Honeypot field */}
      <input
        aria-hidden="true"
        autoComplete="off"
        name="website"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
        }}
        tabIndex={-1}
        type="text"
      />

      {/* Form fields grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Individual form fields */}
      </div>

      {/* Vision textarea */}
      <FormField
        error={state.errors.vision}
        htmlFor="vision"
        icon={<MessageSquare className="mr-2 text-primary" size={16} />}
        label="Tell me about your vision (Project brief)"
      >
        <div>
          <textarea
            onChange={onVisionChange}
            ref={visionRef}
            // ... other props
          />
          <div className="mt-1 text-right text-muted-foreground text-sm">
            {visionLength}/2000 characters
          </div>
        </div>
      </FormField>
    </>
  );
}
```

### Step 5: Update Component to Use Extracted Logic

**Clean up the main component:**

```tsx
// ✅ Clean, focused component
export default function ContactForm() {
  const {
    state,
    formAction,
    isPending,
    visionLength,
    formLoadTime,
    visionRef,
    handleVisionChange,
  } = useContactForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl sm:p-10">
        <h1 className="mb-2 font-extrabold text-3xl text-card-foreground">
          Start Your Project
        </h1>
        <p className="mb-8 text-muted-foreground">
          Tell me about your video vision for the Southwest. I'll get back to
          you with a personalized quote and timeline.
        </p>

        <Form
          action={formAction}
          aria-busy={isPending}
          className="space-y-6"
          id="contact-form"
        >
          <StatusMessage
            isPending={isPending}
            message={state.message}
            status={state.status}
          />

          <ContactFormFields
            formLoadTime={formLoadTime}
            onVisionChange={handleVisionChange}
            state={state}
            visionLength={visionLength}
            visionRef={visionRef}
          />

          <button
            className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 font-bold text-lg text-primary-foreground shadow-lg transition duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
            disabled={state.status === "loading" || isPending}
            type="submit"
          >
            {state.status === "loading" || isPending
              ? "Sending..."
              : "SEND MY PROJECT BRIEF"}
          </button>
        </Form>
      </div>
    </div>
  );
}
```

## Key Patterns and Techniques

### 1. Custom Hook Pattern

**Purpose**: Extract stateful logic from components

```tsx
// Pattern: use[FeatureName]
export function useContactForm() {
  // State management
  const [state, setState] = useState(initialState);

  // Side effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handleEvent = useCallback(
    (event) => {
      // Handler logic
    },
    [dependencies]
  );

  // Return clean interface
  return {
    state,
    handlers: { handleEvent },
    // ... other values
  };
}
```

### 2. Utility Function Pattern

**Purpose**: Extract pure functions for data transformation

```tsx
// Pattern: [action][Entity] or get[Entity]
export function getCloudinaryVideoUrl(
  videoId: string,
  options: VideoOptions
): string {
  // Pure function - no side effects
  // Takes input, returns output
  // Easy to test
}
```

### 3. Component Composition Pattern

**Purpose**: Build complex UI from smaller, focused components

```tsx
// Pattern: [Feature][SubFeature] or [Feature]Section
export function ContactFormFields(props: ContactFormFieldsProps) {
  // Focused on one aspect of the form
  // Reusable across different contexts
  // Easy to test in isolation
}
```

### 4. Props Interface Pattern

**Purpose**: Define clear contracts between components

```tsx
// Pattern: [ComponentName]Props
type ContactFormFieldsProps = {
  state: FormState;
  visionLength: number;
  formLoadTime: number;
  visionRef: React.RefObject<HTMLTextAreaElement>;
  onVisionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
```

## Benefits Achieved

### 1. **Maintainability**

- **Before**: Changes to form logic required touching the entire component
- **After**: Changes to form logic only affect the hook, UI changes only affect components

### 2. **Testability**

- **Before**: Testing form logic required rendering the entire component
- **After**: Can test hooks and utilities in isolation

```tsx
// ✅ Easy to test
import { renderHook } from "@testing-library/react";
import { useContactForm } from "./use-contact-form";

test("should reset form on success", () => {
  const { result } = renderHook(() => useContactForm());
  // Test hook logic in isolation
});
```

### 3. **Reusability**

- **Before**: Form logic was tied to one component
- **After**: `useContactForm` can be used in different contexts

### 4. **Readability**

- **Before**: 287 lines of mixed concerns
- **After**: ~60 lines of focused UI logic

### 5. **Type Safety**

- Clear interfaces between components and hooks
- Better IntelliSense and error detection

## Best Practices for Future Development

### 1. **Start with Separation in Mind**

```tsx
// ✅ Good: Plan separation from the start
function NewFeature() {
  const businessLogic = useNewFeatureLogic();
  return <NewFeatureUI {...businessLogic} />;
}
```

### 2. **Follow the Hook Naming Convention**

```tsx
// ✅ Good: use[FeatureName]
useContactForm();
useVideoPlayer();
useNavigation();

// ❌ Bad: Generic or unclear names
useForm();
useVideo();
useNav();
```

### 3. **Keep Hooks Focused**

```tsx
// ✅ Good: Single responsibility
export function useVideoPlayer() {
  // Only video-related state and logic
}

// ❌ Bad: Multiple responsibilities
export function useVideoAndFormAndNavigation() {
  // Too many concerns
}
```

### 4. **Use TypeScript Interfaces**

```tsx
// ✅ Good: Clear contracts
type ContactFormFieldsProps = {
  state: FormState;
  onVisionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

// ❌ Bad: Any or loose typing
type ContactFormFieldsProps = {
  state: any;
  onVisionChange: any;
};
```

### 5. **Extract Constants**

```tsx
// ✅ Good: Constants in appropriate files
export const PROJECT_TYPES = ["Corporate Film", "Live Event Coverage"] as const;

// ❌ Bad: Constants mixed in components
function ContactForm() {
  const PROJECT_TYPES = ["Corporate Film", "Live Event Coverage"];
  // ...
}
```

### 6. **Compose Components**

```tsx
// ✅ Good: Composed from smaller pieces
<ContactForm>
  <StatusMessage />
  <ContactFormFields />
  <SubmitButton />
</ContactForm>

// ❌ Bad: Monolithic component
<ContactForm>
  {/* 200+ lines of mixed JSX */}
</ContactForm>
```

## Common Anti-Patterns to Avoid

### 1. **God Components**

```tsx
// ❌ Anti-pattern: Component doing everything
function ContactForm() {
  // Form logic
  // Validation logic
  // API calls
  // UI state
  // Business logic
  // Constants
  // 500+ lines of JSX
}
```

### 2. **Props Drilling**

```tsx
// ❌ Anti-pattern: Passing props through many levels
<Parent>
  <Child prop={value}>
    <GrandChild prop={value}>
      <GreatGrandChild prop={value} />
    </GrandChild>
  </Child>
</Parent>

// ✅ Solution: Use context or composition
<Parent>
  <Child>
    <GrandChild>
      <GreatGrandChild /> {/* Gets value from context */}
    </GrandChild>
  </Child>
</Parent>
```

### 3. **Mixed Concerns in Hooks**

```tsx
// ❌ Anti-pattern: Hook doing too much
export function useContactForm() {
  // Form logic
  // Video logic
  // Navigation logic
  // API calls
  // Local storage
}
```

### 4. **Inline Business Logic**

```tsx
// ❌ Anti-pattern: Business logic in JSX
<button
  onClick={() => {
    // Complex business logic here
    if (user.isValid && form.isComplete && !isSubmitting) {
      // More complex logic
    }
  }}
>
  Submit
</button>;

// ✅ Solution: Extract to handler
const handleSubmit = useCallback(() => {
  // Business logic in handler
}, [dependencies]);

<button onClick={handleSubmit}>Submit</button>;
```

### 5. **Hardcoded Values**

```tsx
// ❌ Anti-pattern: Magic numbers and strings
<div style={{ width: 1920, height: 1080 }}>
  <video src="https://res.cloudinary.com/cloudname/video/upload/f_auto,q_auto:low,w_1920/video.mp4" />
</div>

// ✅ Solution: Use constants and utilities
<div style={{ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT }}>
  <video src={getDesktopVideoUrl(videoId)} />
</div>
```

## File Organization

### Recommended Structure

```
src/
├── components/           # Presentational components
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form-specific components
│   └── sections/        # Page sections
├── hooks/               # Custom hooks (business logic)
│   ├── use-contact-form.ts
│   ├── use-video-player.ts
│   └── use-navigation.ts
├── lib/                 # Utilities and configurations
│   ├── video-utils.ts
│   ├── contact-actions.ts
│   └── utils.ts
├── types/               # TypeScript type definitions
│   ├── form.types.ts
│   └── video.types.ts
└── app/                 # Next.js app router pages
    ├── contact/
    └── services/
```

### Naming Conventions

- **Components**: PascalCase (`ContactForm`, `VideoPlayer`)
- **Hooks**: camelCase starting with `use` (`useContactForm`, `useVideoPlayer`)
- **Utilities**: camelCase (`getVideoUrl`, `formatDate`)
- **Types**: PascalCase (`FormState`, `VideoOptions`)
- **Constants**: UPPER_SNAKE_CASE (`PROJECT_TYPES`, `BUDGET_RANGES`)

## Conclusion

This refactoring demonstrates how to apply separation of concerns principles to create maintainable, testable, and scalable React applications. The key is to:

1. **Identify mixed concerns** early
2. **Extract business logic** into custom hooks
3. **Create focused components** for presentation
4. **Use utility functions** for pure logic
5. **Follow consistent patterns** and naming conventions

By following these principles, you'll create code that's easier to understand, test, and maintain as your application grows.

---

_This guide was created based on the refactoring of the Dom Berry Next.js application. Use it as a reference for future development and refactoring efforts._
