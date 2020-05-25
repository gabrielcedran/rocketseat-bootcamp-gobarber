import Redis, { Redis as RedisClient } from "ioredis";
import cacheConfig from "@config/cache";
import ICacheProvider from "../models/ICacheProvider";

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.redis);
  }

  public async put(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    return value;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.unlink(key);
  }
}
