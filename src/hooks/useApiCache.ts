import { useEffect, useState } from 'react';
import { memoryCache } from '../cache/memoryCache';
import { retryRequest } from '../utils/retry';
import { saveToStorage, getFromStorage } from '../utils/storage';
import type { UseApiCacheOptions } from '../types';

export function useApiCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseApiCacheOptions<T> = {}
) {
  const {
    enabled = true,
    retry = 3,
    cacheTime = 1000 * 60 * 5,
    staleTime = 1000 * 30,
    persist = false,
    initialData,
  } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  async function fetchData(force = false) {
    try {
      setLoading(true);

      const cached = memoryCache.get<T>(key);

      if (
        cached &&
        !force &&
        Date.now() - cached.timestamp < staleTime
      ) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      if (persist) {
        const persistedData = getFromStorage<T>(key);

        if (
          persistedData &&
          !force &&
          Date.now() - persistedData.timestamp < staleTime
        ) {
          setData(persistedData.data);
          setLoading(false);
          return;
        }
      }

      const response = await retryRequest(fetcher, retry);

      const cacheItem = {
        data: response,
        timestamp: Date.now(),
      };

      memoryCache.set(key, cacheItem);

      if (persist) {
        saveToStorage(key, cacheItem);
      }

      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!enabled) return;

    fetchData();

    const timer = setInterval(() => {
      const cached = memoryCache.get<T>(key);

      if (
        cached &&
        Date.now() - cached.timestamp > cacheTime
      ) {
        memoryCache.delete(key);
      }
    }, cacheTime);

    return () => clearInterval(timer);
  }, [key]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
  };
}