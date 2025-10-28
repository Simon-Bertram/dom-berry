"use client";

import { useEffect, useState } from "react";

type EmailProtectionProps = {
  email: string;
  displayText?: string;
  className?: string;
};

/**
 * Email protection component that prevents harvesting by:
 * 1. Not displaying the email in plain text initially
 * 2. Requiring user interaction to reveal
 * 3. Using JavaScript to construct the mailto link
 */
export function EmailProtection({
  email,
  displayText = "Click to reveal email",
  className = "text-indigo-600 hover:text-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-700 cursor-pointer",
}: EmailProtectionProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [displayEmail, setDisplayEmail] = useState(displayText);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isRevealed) {
      window.location.href = `mailto:${email}`;
      return;
    }

    setDisplayEmail(email);
    setIsRevealed(true);
    // Small delay before opening mailto to show the email
    const MAILTO_DELAY = 100;
    setTimeout(() => {
      window.location.href = `mailto:${email}`;
    }, MAILTO_DELAY);
  };

  const handleMouseEnter = () => {
    if (!isRevealed) {
      setDisplayEmail(email);
    }
  };

  const handleMouseLeave = () => {
    if (!isRevealed) {
      setDisplayEmail(displayText);
    }
  };

  return (
    <button
      aria-label={`Email address: ${email}`}
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      {displayEmail}
    </button>
  );
}

/**
 * Alternative email protection using obfuscated display
 * Shows a partially obfuscated email that becomes clear on hover
 */
export function ObfuscatedEmail({
  email,
  className = "text-indigo-600 hover:text-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-700",
}: {
  email: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Obfuscate email by replacing middle characters with dots
  const obfuscateEmail = (emailToObfuscate: string) => {
    const [localPart, domain] = emailToObfuscate.split("@");
    if (localPart.length <= 2) {
      return emailToObfuscate;
    }

    const MINIMUM_LENGTH_FOR_OBFUSCATION = 2;
    const obfuscatedLocal =
      localPart[0] +
      "*".repeat(localPart.length - MINIMUM_LENGTH_FOR_OBFUSCATION) +
      localPart.at(-1);
    return `${obfuscatedLocal}@${domain}`;
  };

  return (
    <a
      aria-label={`Email address: ${email}`}
      className={className}
      href={`mailto:${email}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? email : obfuscateEmail(email)}
    </a>
  );
}

/**
 * Contact form that reveals email only after form interaction
 * This prevents harvesters from getting the email without form interaction
 */
export function ProtectedContactEmail({
  email,
  className = "text-indigo-600 hover:text-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-700",
}: {
  email: string;
  className?: string;
}) {
  const [isFormInteracted, setIsFormInteracted] = useState(false);

  // Listen for form interactions
  useEffect(() => {
    const handleFormInteraction = () => {
      setIsFormInteracted(true);
    };

    // Listen for any form field focus or input
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("focusin", handleFormInteraction);
      form.addEventListener("input", handleFormInteraction);

      return () => {
        form.removeEventListener("focusin", handleFormInteraction);
        form.removeEventListener("input", handleFormInteraction);
      };
    }
  }, []);

  if (isFormInteracted) {
    return (
      <a
        aria-label={`Email address: ${email}`}
        className={className}
        href={`mailto:${email}`}
      >
        {email}
      </a>
    );
  }

  return <span className={className}>Complete the form to reveal email</span>;
}
