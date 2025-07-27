// App Configuration
export const APP_CONFIG = {
  name: 'FX Trading Diary',
  description: 'AI自動トレード日誌 × 成績分析SaaS',
  version: '1.0.0',
  author: 'FX Trading Diary Team',
  supportEmail: 'support@fxtradingdiary.com',
} as const;

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

// File Upload Configuration
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['text/csv', 'application/vnd.ms-excel'],
  maxFiles: 10,
} as const;

// Trading Configuration
export const TRADING = {
  supportedMarkets: ['forex', 'stock', 'crypto', 'commodity'] as const,
  supportedCurrencies: ['USD', 'JPY', 'EUR', 'GBP', 'AUD', 'CAD'] as const,
  defaultCurrency: 'JPY',
  maxTradesPerDay: 100,
  maxPositionSize: 1000000,
} as const;

// Emotion Configuration
export const EMOTIONS = {
  types: [
    'confident',
    'anxious',
    'greedy',
    'fearful',
    'patient',
    'impulsive',
    'calm',
    'excited',
    'frustrated',
    'focused',
  ] as const,
  intensityRange: [1, 5] as const,
  maxDescriptionLength: 500,
} as const;

// Journal Configuration
export const JOURNAL = {
  maxTitleLength: 100,
  maxContentLength: 10000,
  maxTagsPerEntry: 10,
  maxTagLength: 30,
  visibilityOptions: ['private', 'public', 'shared'] as const,
  defaultVisibility: 'private',
} as const;

// Pagination
export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
  minLimit: 5,
} as const;

// Date Formats
export const DATE_FORMATS = {
  display: 'yyyy年MM月dd日',
  input: 'yyyy-MM-dd',
  time: 'HH:mm',
  datetime: 'yyyy-MM-dd HH:mm',
  iso: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'fx-diary-theme',
  language: 'fx-diary-language',
  sidebar: 'fx-diary-sidebar-state',
  preferences: 'fx-diary-user-preferences',
  draftTrade: 'fx-diary-draft-trade',
  draftJournal: 'fx-diary-draft-journal',
} as const;

// Routes
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  trades: '/records',
  analytics: '/analytics',
  journal: '/journal',
  settings: '/settings',
  profile: '/profile',
  help: '/help',
  terms: '/terms',
  privacy: '/privacy',
  contact: '/contact',
} as const;

// Theme Configuration
export const THEME = {
  colors: {
    primary: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
  },
} as const;

// Animation Durations (ms)
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (px)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Statistics Configuration
export const STATISTICS = {
  minimumTradesForAnalysis: 10,
  defaultAnalysisPeriodDays: 30,
  maxAnalysisPeriodDays: 365,
  riskFreeRate: 0.02, // 2% annual risk-free rate
} as const;

// Validation Rules
export const VALIDATION = {
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
  },
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_-]+$/,
  },
} as const;

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMIT: 'RATE_LIMIT',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
} as const;
