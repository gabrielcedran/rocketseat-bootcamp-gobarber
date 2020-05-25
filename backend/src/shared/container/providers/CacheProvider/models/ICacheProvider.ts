export default interface ICacheProvider {
  put(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  invalidate(key: string): Promise<void>;
}
