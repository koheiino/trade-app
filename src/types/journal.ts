export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  date: string;
  tags?: string[];
  images?: JournalImage[];
  relatedTrades?: string[];
  mood?: number;
  lessons?: string[];
  goals?: string[];
  visibility: 'private' | 'public' | 'shared';
  createdAt: string;
  updatedAt: string;
}

export interface JournalImage {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  caption?: string;
  uploadedAt: string;
}

export interface JournalInput {
  title: string;
  content: string;
  date: string;
  tags?: string[];
  relatedTrades?: string[];
  mood?: number;
  lessons?: string[];
  goals?: string[];
  visibility?: 'private' | 'public' | 'shared';
}

export interface JournalTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  category: 'daily' | 'weekly' | 'monthly' | 'trade-specific' | 'custom';
  fields: JournalTemplateField[];
  isDefault: boolean;
  createdAt: string;
}

export interface JournalTemplateField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 'rating';
  required: boolean;
  options?: string[];
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface JournalAnalytics {
  totalEntries: number;
  averageMood: number;
  moodTrend: Array<{
    date: string;
    mood: number;
  }>;
  commonTags: Array<{
    tag: string;
    count: number;
  }>;
  writingStreak: number;
  longestStreak: number;
}
