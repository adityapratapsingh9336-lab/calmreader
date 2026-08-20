/**
 * Global API Configuration
 * In local dev: Uses empty string (proxied through Vite to http://localhost:5000)
 * In production: Uses VITE_API_BASE_URL (e.g., https://calmreader-backend.onrender.com)
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
