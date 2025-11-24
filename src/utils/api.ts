// API configuration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  VOTES: `${API_BASE_URL}/votes`,
  TOP_COUNTRIES: `${API_BASE_URL}/countries/top`,
  ALL_COUNTRIES: `${API_BASE_URL}/countries`,
} as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];
