import rateLimit from "express-rate-limit";

// slows down password guessing
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { message: "Too many login attempts, try again in 15 minutes" },
});

// stops the public contact form being used to flood the inbox
export const messageLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: { message: "Too many messages, please try again later" },
});
