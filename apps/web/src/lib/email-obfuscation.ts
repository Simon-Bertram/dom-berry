/**
 * Email obfuscation utilities to prevent harvesting
 */

// Character code constants for ASCII ranges
const UPPERCASE_A_CODE = 65;
const UPPERCASE_Z_CODE = 90;
const LOWERCASE_A_CODE = 97;
const LOWERCASE_Z_CODE = 122;
const ALPHABET_LENGTH = 26;
const ROT13_SHIFT = 13;

/**
 * Obfuscates an email address by encoding it with a simple ROT13-like cipher
 * This makes it harder for basic email harvesters to extract the address
 */
export function obfuscateEmail(email: string): string {
  return email
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      // Simple character shifting - not secure but effective against basic harvesters
      if (code >= UPPERCASE_A_CODE && code <= UPPERCASE_Z_CODE) {
        // A-Z
        return String.fromCharCode(
          ((code - UPPERCASE_A_CODE + ROT13_SHIFT) % ALPHABET_LENGTH) +
            UPPERCASE_A_CODE
        );
      }
      if (code >= LOWERCASE_A_CODE && code <= LOWERCASE_Z_CODE) {
        // a-z
        return String.fromCharCode(
          ((code - LOWERCASE_A_CODE + ROT13_SHIFT) % ALPHABET_LENGTH) +
            LOWERCASE_A_CODE
        );
      }
      return char; // Keep non-alphabetic characters as-is
    })
    .join("");
}

/**
 * Deobfuscates an email address (reverse of obfuscateEmail)
 */
export function deobfuscateEmail(obfuscatedEmail: string): string {
  return obfuscatedEmail
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= UPPERCASE_A_CODE && code <= UPPERCASE_Z_CODE) {
        // A-Z
        return String.fromCharCode(
          ((code - UPPERCASE_A_CODE - ROT13_SHIFT + ALPHABET_LENGTH) %
            ALPHABET_LENGTH) +
            UPPERCASE_A_CODE
        );
      }
      if (code >= LOWERCASE_A_CODE && code <= LOWERCASE_Z_CODE) {
        // a-z
        return String.fromCharCode(
          ((code - LOWERCASE_A_CODE - ROT13_SHIFT + ALPHABET_LENGTH) %
            ALPHABET_LENGTH) +
            LOWERCASE_A_CODE
        );
      }
      return char;
    })
    .join("");
}

/**
 * Creates a mailto link with obfuscated email that gets deobfuscated on click
 */
export function createObfuscatedMailtoLink(email: string): string {
  const obfuscated = obfuscateEmail(email);
  return `javascript:window.location.href='mailto:'+decodeURIComponent('${encodeURIComponent(obfuscated)}'.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<='Z'?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);}));`;
}

/**
 * Alternative: Split email into parts and reconstruct with JavaScript
 */
export function createSplitEmailLink(email: string): {
  parts: string[];
  jsCode: string;
} {
  const [localPart, domain] = email.split("@");
  const parts = [localPart, domain].filter(
    (part): part is string => part !== undefined
  );

  const jsCode = `
    (function() {
      const parts = ['${localPart}', '${domain}'];
      window.location.href = 'mailto:' + parts.join('@');
    })();
  `;

  return { parts, jsCode };
}

/**
 * Creates a contact form that reveals email on interaction
 */
export function createRevealEmailComponent(email: string): {
  displayText: string;
  clickHandler: string;
} {
  const obfuscated = obfuscateEmail(email);

  return {
    displayText: "Click to reveal email",
    clickHandler: `
      (function() {
        const email = '${obfuscated}'.replace(/[a-zA-Z]/g, function(c) {
          return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        this.textContent = email;
        this.href = 'mailto:' + email;
        this.onclick = null;
      })();
    `,
  };
}
