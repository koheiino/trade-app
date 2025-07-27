export type * from './auth';
export type * from './api';
export type * from './trade';
export type * from './emotion';
export type * from './journal';
export type * from './dashboard';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends BaseEntity {
  userId: string;
  displayName?: string;
  avatar?: string;
  timezone: string;
  currency: string;
  tradingExperience: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  riskTolerance: 'low' | 'medium' | 'high';
  tradingGoals: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ja';
  dateFormat: string;
  numberFormat: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  tradeReminders: boolean;
  journalReminders: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  shareAnalytics: boolean;
  shareJournal: boolean;
  allowDataCollection: boolean;
}

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'ja';
export type Currency = 'USD' | 'JPY' | 'EUR' | 'GBP' | 'AUD' | 'CAD';

export interface AppConfig {
  theme: Theme;
  language: Language;
  currency: Currency;
  timezone: string;
}
