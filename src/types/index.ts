export interface UseApiCacheOptions<T> {
  enabled?: boolean;
  retry?: number;
  cacheTime?: number;
  staleTime?: number;
  persist?: boolean;
  initialData?: T;
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
}