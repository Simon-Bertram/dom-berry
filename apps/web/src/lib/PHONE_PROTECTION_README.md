# Phone Number Protection Implementation

This implementation provides multiple layers of protection against malicious phone number harvesting while maintaining accessibility and user experience.

## Protection Strategies

### 1. **Obfuscation**

- Phone numbers are split into parts and stored separately
- Numbers are reconstructed client-side only when needed
- Character encoding/decoding for additional obfuscation

### 2. **Dynamic Rendering**

- Phone numbers are hidden by default with "Click to reveal" text
- Full number only appears after user interaction
- Random delays prevent automated clicking

### 3. **Anti-Bot Measures**

- Random delays between 200-800ms prevent rapid automated clicking
- Loading states prevent multiple simultaneous requests
- Mouse hover triggers for better user experience

### 4. **Accessibility Support**

- Screen readers can access the full phone number via `aria-describedby`
- Proper ARIA labels for different states
- Keyboard navigation support

## Usage

### Basic Protection

```tsx
import { ProtectedPhone } from "@/components/phone-protection";

<ProtectedPhone phone="+44 1453 123456" showIcon={true} />;
```

### Advanced Protection

```tsx
import { AdvancedProtectedPhone } from "@/components/phone-protection";

<AdvancedProtectedPhone phone="+44 1453 123456" showIcon={true} />;
```

## Components

### `ProtectedPhone`

- Basic protection with phone number splitting
- Hover-to-reveal functionality
- Click-to-call when revealed

### `AdvancedProtectedPhone`

- More complex character substitution obfuscation
- Longer random delays (300-1000ms)
- Additional encoding layers

## Utilities

### `phone-protection.ts`

- `splitPhoneNumber()` - Splits phone into parts
- `reconstructPhoneNumber()` - Rebuilds phone number
- `encodePhoneNumber()` - Simple character encoding
- `decodePhoneNumber()` - Character decoding
- `getRandomDelay()` - Anti-bot delay generation

## Security Features

1. **No Plain Text Storage**: Phone numbers are never stored in plain text in the DOM
2. **Client-Side Only**: All reconstruction happens in the browser
3. **Random Delays**: Prevents automated harvesting attempts
4. **Multiple Obfuscation Layers**: Character encoding + splitting
5. **Accessibility Compliant**: Screen readers can still access numbers

## Browser Compatibility

- Modern browsers with ES6+ support
- React 18+ required
- TypeScript support included

## Performance

- Minimal bundle size impact
- Efficient memoization with `useMemo` and `useCallback`
- No external dependencies beyond React
