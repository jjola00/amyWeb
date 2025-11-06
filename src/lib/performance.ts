import React from 'react';

// Performance optimization utilities

// Lazy loading utility for components
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  return React.lazy(importFn);
}

// Image preloading utility
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload critical images
export function preloadCriticalImages(imageUrls: string[]): Promise<void[]> {
  return Promise.all(imageUrls.map(preloadImage));
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Cache utilities for content
const contentCache = new Map<string, any>();

export function getCachedContent<T>(key: string): T | null {
  return contentCache.get(key) || null;
}

export function setCachedContent<T>(key: string, content: T): void {
  contentCache.set(key, content);
}

export function clearContentCache(): void {
  contentCache.clear();
}

// Performance monitoring
export function measurePerformance(name: string, fn: () => void): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
}

// Web Vitals reporting (for future analytics integration)
export interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

export function reportWebVitals(metric: WebVitalMetric): void {
  if (process.env.NODE_ENV === 'production') {
    // Future: Send to analytics service
    console.log(metric);
  }
}