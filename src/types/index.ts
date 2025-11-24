// Types for the application

export interface Vote {
  name: string;
  email: string;
  country: string;
}

export interface Country {
  name: string;
  officialName?: string;
  cca2?: string; // 2-character country code
  cca3?: string; // 3-character country code
  capital: string[] | string;
  region: string;
  subRegion: string;
  votes: number;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  country?: string;
}

export interface ApiError {
  field?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
  };
  errors?: ApiError[];
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: ApiError[];
  isMockData?: boolean;
}
