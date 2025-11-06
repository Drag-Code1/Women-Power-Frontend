// Centralized API base URL for the frontend (server+client)
// Reads NEXT_PUBLIC_API_URL. If it lacks "/v1", append it to match our API routes.
const raw = (typeof process !== 'undefined' && process.env && (process.env.NEXT_PUBLIC_API_URL as string)) || 'http://localhost:5000';
const trimmed = raw.replace(/\/$/, '');
export const API_BASE_URL: string = /\/v1($|\/)/.test(trimmed) ? trimmed : `${trimmed}/v1`;

