/**
 * Frontend Configuration
 * Centralizes environment-dependent configuration
 */

// API base URL - defaults to localhost in development
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Frontend base URL - used for redirects
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:8080';

// Helper function to construct API URLs
export const getApiUrl = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
