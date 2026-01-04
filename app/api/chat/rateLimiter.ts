// Simple in-memory rate limiter
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private lastCleanup: number = Date.now();

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();

    // Clean up old entries periodically (every 5 minutes)
    if (now - this.lastCleanup > 5 * 60 * 1000) {
      this.cleanup();
      this.lastCleanup = now;
    }

    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      // New window or expired entry
      const resetTime = now + this.windowMs;
      this.requests.set(identifier, { count: 1, resetTime });
      return { allowed: true, remaining: this.maxRequests - 1, resetTime };
    }

    if (entry.count >= this.maxRequests) {
      // Rate limit exceeded
      return { allowed: false, remaining: 0, resetTime: entry.resetTime };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);
    return { allowed: true, remaining: this.maxRequests - entry.count, resetTime: entry.resetTime };
  }

  private cleanup() {
    const now = Date.now();
    this.requests.forEach((entry, key) => {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    });
  }
}

// Export singleton instance
// 10 requests per minute per IP
export const rateLimiter = new RateLimiter(10, 60000);
