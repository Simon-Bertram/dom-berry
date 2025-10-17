// Simple in-memory rate limiter (suitable for single-server deployments)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60_000
): { rateLimited: boolean; remaining: number } {
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
