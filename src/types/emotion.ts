export type EmotionType =
  | 'confident'
  | 'anxious'
  | 'greedy'
  | 'fearful'
  | 'patient'
  | 'impulsive'
  | 'calm'
  | 'excited'
  | 'frustrated'
  | 'focused';

export type EmotionIntensity = 1 | 2 | 3 | 4 | 5;

export interface Emotion {
  id: string;
  userId: string;
  type: EmotionType;
  intensity: EmotionIntensity;
  description?: string;
  timestamp: string;
  tradeId?: string;
  sessionId?: string;
  aiAnalysis?: EmotionAnalysis;
  createdAt: string;
  updatedAt: string;
}

export interface EmotionInput {
  type: EmotionType;
  intensity: EmotionIntensity;
  description?: string;
  tradeId?: string;
  sessionId?: string;
}

export interface EmotionAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  suggestions: string[];
  patterns: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface EmotionTrend {
  date: string;
  dominantEmotion: EmotionType;
  averageIntensity: number;
  emotionCount: Record<EmotionType, number>;
  performanceCorrelation: number;
}

export interface EmotionStatistics {
  totalEntries: number;
  mostFrequentEmotion: EmotionType;
  averageIntensity: number;
  emotionDistribution: Record<EmotionType, number>;
  weeklyTrends: EmotionTrend[];
  correlationWithPerformance: {
    emotion: EmotionType;
    correlation: number;
  }[];
}
