/**
 * Simple in-memory rate limiter for API routes
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((entry, key) => {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  });
}, 5 * 60 * 1000);

interface RateLimitOptions {
  /** Maximum requests allowed in the window */
  limit: number;
  /** Window size in seconds */
  windowInSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number;
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 10, windowInSeconds: 60 }
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + options.windowInSeconds * 1000,
    });
    return {
      success: true,
      remaining: options.limit - 1,
      resetIn: options.windowInSeconds,
    };
  }

  if (entry.count >= options.limit) {
    return {
      success: false,
      remaining: 0,
      resetIn: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  entry.count++;
  return {
    success: true,
    remaining: options.limit - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/**
 * Get rate limit identifier from request headers
 */
export function getRateLimitIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return ip;
}
