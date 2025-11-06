// Analytics and monitoring utilities
// This is a basic setup that can be extended with actual analytics services

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export interface PageViewEvent {
  page: string;
  title: string;
  referrer?: string;
}

// Basic analytics interface
class Analytics {
  private isEnabled: boolean;
  
  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production' && 
                    typeof window !== 'undefined';
  }

  // Track page views
  pageView(event: PageViewEvent): void {
    if (!this.isEnabled) return;
    
    // Future: Send to analytics service (Google Analytics, Plausible, etc.)
    console.log('Page view:', event);
  }

  // Track custom events
  track(event: AnalyticsEvent): void {
    if (!this.isEnabled) return;
    
    // Future: Send to analytics service
    console.log('Event:', event);
  }

  // Track errors
  error(error: Error, context?: Record<string, any>): void {
    if (!this.isEnabled) return;
    
    // Future: Send to error tracking service (Sentry, LogRocket, etc.)
    console.error('Error tracked:', error, context);
  }

  // Performance monitoring
  performance(metric: string, value: number, unit: string = 'ms'): void {
    if (!this.isEnabled) return;
    
    // Future: Send to performance monitoring service
    console.log(`Performance: ${metric} = ${value}${unit}`);
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Convenience functions
export function trackPageView(page: string, title: string): void {
  analytics.pageView({ page, title, referrer: typeof document !== 'undefined' ? document.referrer : undefined });
}

export function trackEvent(name: string, properties?: Record<string, any>): void {
  analytics.track({ name, properties });
}

export function trackError(error: Error, context?: Record<string, any>): void {
  analytics.error(error, context);
}

export function trackPerformance(metric: string, value: number, unit?: string): void {
  analytics.performance(metric, value, unit);
}

// Web Vitals integration (for future use)
export function reportWebVitals(metric: any): void {
  if (process.env.NODE_ENV === 'production') {
    // Future: Send to analytics service
    trackPerformance(metric.name, metric.value, metric.unit);
  }
}