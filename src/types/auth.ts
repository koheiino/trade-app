import type { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthFormState {
  email: string;
  password: string;
  confirmPassword?: string;
  loading: boolean;
  error: string;
  showPassword: boolean;
}

export interface AuthValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordUpdateRequest {
  password: string;
  confirmPassword: string;
}
