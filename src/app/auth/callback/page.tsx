'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URLからトークンを取得して認証
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Error during auth callback:', error);
          router.push('/login');
          return;
        }

        if (session) {
          // ユーザー情報を確認
          const { data: userStats } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();

          // 新規ユーザーの場合
          if (!userStats) {
            // user_statsを作成（基本情報も含めて）
            await supabase.from('user_stats').insert({
              user_id: session.user.id,
              email: session.user.email,
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
            });

            // パスワード設定ページへ
            router.push('/auth/set-password');
          } else {
            // 既存ユーザーはダッシュボードへ
            router.push('/');
          }
        } else {
          // セッションがない場合はログインへ
          router.push('/login');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4" />
        <p className="text-neutral-600">認証中...</p>
      </div>
    </div>
  );
}
