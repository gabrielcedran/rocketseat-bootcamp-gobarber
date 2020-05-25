import { RedisOptions } from "ioredis";

interface ICacheConfig {
  driver: "redis";
  redis: RedisOptions;
}

export default {
  driver: "redis",
  redis: {
    host: "localhost",
    port: 6379,
    password: undefined,
  },
} as ICacheConfig;
