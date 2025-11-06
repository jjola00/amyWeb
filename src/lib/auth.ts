/**
 * Authentication utilities for Netlify Identity integration
 * Used for CMS authentication and user management
 */

declare global {
  interface Window {
    netlifyIdentity: {
      init: (config?: { APIUrl?: string }) => void;
      on: (event: string, callback: (user?: any) => void) => void;
      open: () => void;
      close: () => void;
      currentUser: () => any;
      logout: () => void;
    };
  }
}

/**
 * Initialize Netlify Identity with proper configuration
 */
export function initializeNetlifyIdentity(): void {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    // Initialize with the Netlify site URL from environment variables
    const netlifyUrl = process.env.NEXT_PUBLIC_NETLIFY_SITE_URL;
    
    if (netlifyUrl) {
      window.netlifyIdentity.init({
        APIUrl: `${netlifyUrl}/.netlify/identity`
      });
    } else {
      console.warn('NEXT_PUBLIC_NETLIFY_SITE_URL not configured');
    }
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    return !!window.netlifyIdentity.currentUser();
  }
  return false;
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): any {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    return window.netlifyIdentity.currentUser();
  }
  return null;
}

/**
 * Open authentication modal
 */
export function openAuth(): void {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    window.netlifyIdentity.open();
  }
}

/**
 * Close authentication modal
 */
export function closeAuth(): void {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    window.netlifyIdentity.close();
  }
}

/**
 * Logout current user
 */
export function logout(): void {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    window.netlifyIdentity.logout();
  }
}

/**
 * Set up authentication event listeners
 */
export function setupAuthListeners(): void {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    // Handle login events
    window.netlifyIdentity.on('login', (user) => {
      console.log('User logged in:', user);
      // Redirect to admin if coming from admin page
      if (window.location.pathname.includes('/admin')) {
        window.location.href = '/admin/';
      }
    });

    // Handle logout events
    window.netlifyIdentity.on('logout', () => {
      console.log('User logged out');
      // Redirect away from admin if on admin page
      if (window.location.pathname.includes('/admin')) {
        window.location.href = '/';
      }
    });

    // Handle authentication errors
    window.netlifyIdentity.on('error', (err) => {
      console.error('Authentication error:', err);
    });
  }
}