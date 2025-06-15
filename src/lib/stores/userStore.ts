import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';
import type { UserStats } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

interface UserStore {
  // 状態
  user: User | null;
  userStats: UserStats | null;
  loading: boolean;
  error: string | null;

  // アクション
  setUser: (user: User | null) => void;
  setUserStats: (stats: UserStats | null) => void;
  fetchUserData: () => Promise<void>;
  updateUserStats: (updates: Partial<UserStats>) => Promise<void>;
  deleteAccount: () => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // 初期状態
      user: null,
      userStats: null,
      loading: false,
      error: null,

      // ユーザー情報をセット
      setUser: (user) => set({ user }),

      // ユーザー統計をセット
      setUserStats: (userStats) => set({ userStats }),

      // エラーをクリア
      clearError: () => set({ error: null }),

      // ユーザーデータを取得
      fetchUserData: async () => {
        set({ loading: true, error: null });

        try {
          // 現在のユーザーを取得
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) {
            set({ user: null, userStats: null, loading: false });
            return;
          }

          set({ user });

          // ユーザー統計を取得
          const { data: stats, error } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }

          // データが存在しない場合は新規作成
          if (!stats) {
            const { data: newStats, error: createError } = await supabase
              .from('user_stats')
              .insert({
                user_id: user.id,
                email: user.email || '',
                username: user.email?.split('@')[0] || '',
                current_balance: 5000,
                current_phase: 1,
                streak_days: 0,
                timezone: 'Asia/Tokyo',
                currency_pair: 'USD/JPY',
                default_lot_size: 0.01,
                theme: 'light',
                language: 'ja',
                settings: {
                  defaultStartAmount: 5000,
                  riskPercentage: 5,
                  enableEmailNotifications: true,
                  enableDailyReminder: false,
                  reminderTime: '09:00',
                },
              })
              .select()
              .single();

            if (createError) throw createError;
            set({ userStats: newStats });
          } else {
            set({ userStats: stats });
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({
              error: 'ユーザーデータの取得中に不明なエラーが発生しました',
            });
          }
        }
      },

      // ユーザー統計を更新
      updateUserStats: async (updates) => {
        const { user, userStats } = get();
        if (!user || !userStats) return;

        try {
          const { data, error } = await supabase
            .from('user_stats')
            .update(updates)
            .eq('user_id', user.id)
            .select()
            .single();

          if (error) throw error;
          set({ userStats: data });
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({
              error: 'ユーザーステータス更新時に不明なエラーが発生しました',
            });
          }
          throw error;
        }
      },

      // アカウント削除（Edge Function版）
      deleteAccount: async () => {
        const { user } = get();
        if (!user) return false;

        set({ loading: true, error: null });

        try {
          // Edge Functionが設定されている場合
          if (process.env.NEXT_PUBLIC_DELETE_USER_FUNCTION_URL) {
            const {
              data: { session },
            } = await supabase.auth.getSession();

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/delete-user`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${session?.access_token}`,
                  'Content-Type': 'application/json',
                },
              },
            );

            if (!response.ok) {
              throw new Error('アカウント削除に失敗しました');
            }
          } else {
            // Edge Functionがない場合は通常の削除処理
            // 1. 関連データを削除
            await supabase.from('trades').delete().eq('user_id', user.id);
            await supabase
              .from('daily_entries')
              .delete()
              .eq('user_id', user.id);
            await supabase.from('user_stats').delete().eq('user_id', user.id);

            // 2. サインアウト
            await supabase.auth.signOut();
          }

          // ローカル状態をクリア
          set({ user: null, userStats: null, loading: false });
          return true;
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message, loading: false });
          } else {
            set({
              error: 'アカウント削除中に不明なエラーが発生しました',
              loading: false,
            });
          }
          return false;
        }
      },

      // サインアウト
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, userStats: null });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        // 永続化しない（セキュリティのため）
      }),
    },
  ),
);
