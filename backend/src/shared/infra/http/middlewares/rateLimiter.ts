import { Request, Response, NextFunction } from "express";
import cacheConfig from "@config/cache";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
import ApplicationError from "@shared/errors/ApplicationError";

const redisClient = new Redis(cacheConfig.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rate-limit",
  points: 5,
  duration: 5,
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch {
    throw new ApplicationError("Too many requests", 429);
  }
}
