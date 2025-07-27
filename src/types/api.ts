export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: 'success' | 'error' | 'loading';
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface FilterParams {
  dateFrom?: string;
  dateTo?: string;
  symbol?: string;
  result?: 'win' | 'loss';
  emotion?: string;
}

export type ApiEndpoint =
  | '/api/trades'
  | '/api/emotions'
  | '/api/journal'
  | '/api/stats'
  | '/api/user/profile'
  | '/api/auth/login'
  | '/api/auth/register'
  | '/api/auth/logout';

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}
