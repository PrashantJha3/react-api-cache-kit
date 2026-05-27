import type{ CacheItem } from '../types';

export function saveToStorage<T>(key: string, data: CacheItem<T>) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage<T>(key: string): CacheItem<T> | null {
  if (typeof window === 'undefined') return null;

  const data = localStorage.getItem(key);

  if (!data) return null;

  return JSON.parse(data);
}