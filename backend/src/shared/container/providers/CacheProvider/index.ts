import { container } from "tsyringe";
import cacheConfig from "@config/cache";
import RedisCacheProvider from "./implementations/RedisCacheProvider";
import ICacheProvider from "./models/ICacheProvider";

const provider = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>("cacheProvider", provider[cacheConfig.driver]);
