'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URLからトークンを取得
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Error during auth callback:', error);
          router.push('/');
          return;
        }

        if (session) {
          // セッションがある場合、パスワード設定ページへ
          router.push('/auth/set-password');
        } else {
          // セッションがない場合はホームへ
          router.push('/');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        router.push('/');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
        <p className="text-neutral-600">認証中...</p>
      </div>
    </div>
  );
}
