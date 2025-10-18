// Simple in-memory rate limiter (suitable for single-server deployments)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit constants
export const RATE_LIMIT = {
  DEFAULT_LIMIT: 5,
  DEFAULT_WINDOW_MS: 60_000,
  UNKNOWN_IP_LIMIT: 10,
  CLEANUP_INTERVAL_MS: 300_000, // 5 minutes
} as const;

// Cleanup expired entries periodically to prevent memory leaks
let lastCleanup = Date.now();
function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < RATE_LIMIT.CLEANUP_INTERVAL_MS) {
    return;
  }

  lastCleanup = now;
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

export function checkRateLimit(
  identifier: string,
  limit: number = RATE_LIMIT.DEFAULT_LIMIT,
  windowMs: number = RATE_LIMIT.DEFAULT_WINDOW_MS
): { rateLimited: boolean; remaining: number } {
  // Cleanup expired entries periodically
  cleanupExpiredEntries();

  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return { rateLimited: false, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { rateLimited: true, remaining: 0 };
  }

  record.count++;
  return { rateLimited: false, remaining: limit - record.count };
}
