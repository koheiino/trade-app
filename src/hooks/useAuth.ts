import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/stores/userStore';
import { supabase } from '@/lib/supabase';

export function useAuth(redirectTo?: string) {
  const router = useRouter();
  const { user, userStats, loading, fetchUserData } = useUserStore();

  useEffect(() => {
    // 初回ロード時にユーザー情報を取得
    fetchUserData();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        await fetchUserData();
      } else if (event === 'SIGNED_OUT') {
        useUserStore.getState().setUser(null);
        useUserStore.getState().setUserStats(null);
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // 依存配列にfetchUserData, router, redirectToを追加
  }, [fetchUserData, router, redirectTo]);

  return {
    user,
    userStats,
    loading,
    isAuthenticated: !!user,
  };
}
