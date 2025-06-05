import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 型定義
export type UserStats = {
  id: string;
  user_id: string;
  current_phase: number;
  current_balance: number;
  streak_days: number;
  created_at: string;
  updated_at: string;
};

export type DailyEntry = {
  id: string;
  user_id: string;
  date: string;
  total_profit: number;
  notes: string;
  checklist: {
    morning: boolean;
    analysis: boolean;
    rules: boolean;
    mental: boolean;
  };
  created_at: string;
};

export type Trade = {
  id: string;
  daily_entry_id: string;
  user_id: string;
  result: number;
  notes: string;
  created_at: string;
};
