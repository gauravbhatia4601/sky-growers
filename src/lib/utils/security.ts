import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting using in-memory store (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const blockedIPs = new Set<string>();
const duplicateOrderMap = new Map<string, number>(); // email/phone -> timestamp

export function rateLimit(
  request: NextRequest,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const ip = getClientIP(request);
  
  // Check if IP is blocked
  if (blockedIPs.has(ip)) {
    return false;
  }
  
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    // Block IP if it exceeds rate limit significantly
    if (record.count >= limit * 2) {
      blockedIPs.add(ip);
      // Auto-unblock after 1 hour
      setTimeout(() => blockedIPs.delete(ip), 60 * 60 * 1000);
    }
    return false;
  }

  record.count++;
  return true;
}

export function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// Check for duplicate orders (same email/phone within 5 minutes)
export function checkDuplicateOrder(email: string, phone: string): boolean {
  const key = `${email.toLowerCase()}_${phone.replace(/\D/g, '')}`;
  const now = Date.now();
  const lastOrderTime = duplicateOrderMap.get(key);

  if (lastOrderTime && now - lastOrderTime < 5 * 60 * 1000) {
    return true; // Duplicate detected
  }

  duplicateOrderMap.set(key, now);
  
  // Clean up old entries
  if (duplicateOrderMap.size > 10000) {
    for (const [k, v] of duplicateOrderMap.entries()) {
      if (now - v > 10 * 60 * 1000) {
        duplicateOrderMap.delete(k);
      }
    }
  }

  return false;
}

// Sanitize string input to prevent XSS and injection
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 10000); // Max length protection
}

// Normalize phone number
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, ''); // Remove all non-digits
}

// Validate email domain
export function isValidEmailDomain(email: string): boolean {
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  // Block disposable email domains
  const disposableDomains = [
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email',
  ];
  
  return !disposableDomains.some((d) => domain.includes(d));
}

// Validate request body size (max 50KB)
export function validateBodySize(body: string): boolean {
  return body.length <= 50 * 1024; // 50KB limit
}

// Check for spam patterns in text
export function containsSpamPatterns(text: string): boolean {
  const spamPatterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:bit\.ly|tinyurl|t\.co|goo\.gl)/i, // URL shorteners
    /(?:buy|sell|cheap|discount|offer|deal).*?(?:now|today|limited)/i, // Spam keywords
    /(?:click here|visit now|act now)/i,
  ];
  
  return spamPatterns.some((pattern) => pattern.test(text));
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000); // Clean up every minute

// Validate MongoDB ObjectId
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

