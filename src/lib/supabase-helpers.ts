import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { UserStats } from '@/lib/supabase';

interface UseUserStatsReturn {
  user: User | null;
  userStats: UserStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUserStats(): UseUserStatsReturn {
  const [user, setUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // ユーザー情報を取得
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (!currentUser) {
        setError('ユーザーが見つかりません');
        return;
      }
      setUser(currentUser);

      // ユーザー統計を取得
      const { data: stats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (statsError && statsError.code !== 'PGRST116') {
        console.error('Error fetching user stats:', statsError);
        setError('データの取得に失敗しました');
        return;
      }

      // データが存在しない場合は新規作成
      if (!stats) {
        console.log('Creating new user stats...');
        const { data: newStats, error: createError } = await supabase
          .from('user_stats')
          .insert({
            user_id: currentUser.id,
            email: currentUser.email || '',
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

        if (createError) {
          console.error('Error creating user stats:', createError);
          setError('ユーザーデータの作成に失敗しました');
          return;
        }

        setUserStats(newStats);
      } else {
        setUserStats(stats);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('予期しないエラーが発生しました');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserStats();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchUserStats();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserStats(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserStats]);

  return {
    user,
    userStats,
    loading,
    error,
    refetch: fetchUserStats,
  };
}
