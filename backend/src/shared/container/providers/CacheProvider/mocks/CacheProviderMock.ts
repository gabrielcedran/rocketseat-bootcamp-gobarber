import ICacheProvider from "../models/ICacheProvider";

interface ICacheData {
  [key: string]: string;
}

export default class CacheProviderMock implements ICacheProvider {
  private cache: ICacheData = {};

  public async put(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = this.cache[key];
    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key => key.startsWith(prefix));
    keys.forEach(key => delete this.cache[key]);
  }
}
