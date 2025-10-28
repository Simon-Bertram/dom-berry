/**
 * FormSecurityFields component for additional bot detection
 * Includes timestamp and random token generation
 */

// Constants for random token generation
const RANDOM_TOKEN_START = 2;
const RANDOM_TOKEN_LENGTH = 13;
const RADIX_36 = 36;

type FormSecurityFieldsProps = {
  formLoadTime: number;
};

export function FormSecurityFields({ formLoadTime }: FormSecurityFieldsProps) {
  // Generate random token for additional bot detection
  const randomToken = Math.random()
    .toString(RADIX_36)
    .substring(RANDOM_TOKEN_START, RANDOM_TOKEN_LENGTH);

  return (
    <>
      {/* Timestamp field for bot detection */}
      <input name="formTimestamp" type="hidden" value={formLoadTime} />

      {/* Random token for additional bot detection */}
      <input name="formToken" type="hidden" value={randomToken} />
    </>
  );
}
