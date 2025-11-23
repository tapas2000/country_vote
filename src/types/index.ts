// Types for the application

export interface Vote {
  name: string;
  email: string;
  country: string;
}

export interface Country {
  name: string;
  capital: string;
  region: string;
  subRegion: string;
  votes: number;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  country?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  isMockData?: boolean;
}
