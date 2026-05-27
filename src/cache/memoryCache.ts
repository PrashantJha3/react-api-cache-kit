import type { CacheItem } from '../types';

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();

  get<T>(key: string): CacheItem<T> | undefined {
    return this.cache.get(key);
  }

  set<T>(key: string, value: CacheItem<T>) {
    this.cache.set(key, value);
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

export const memoryCache = new MemoryCache();