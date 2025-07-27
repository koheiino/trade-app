'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Settings,
  Menu,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { logError } from '@/utils/errorHandler';
import { LocalAuthService } from '@/lib/local-auth';
import { logger } from '@/utils/logger';
import Sidebar from '@/components/layout/Sidebar';
import type { User } from '@supabase/supabase-js';
import type { NavigationItem } from '@/types/dashboard';
import type { LocalUser } from '@/lib/local-auth';

const navigation: NavigationItem[] = [
  { name: 'ダッシュボード', href: '/dashboard', icon: LayoutDashboard },
  { name: 'トレード記録', href: '/records', icon: TrendingUp },
  { name: '分析', href: '/analytics', icon: BarChart3 },
  { name: '設定', href: '/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | LocalUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        logger.debug('Initializing dashboard authentication');
        // まずローカル認証セッションを確認
        const localUser = LocalAuthService.getSession();

        if (localUser && LocalAuthService.isValidSession(localUser)) {
          logger.auth('local-session-check', true, { userId: localUser.id });
          setUser(localUser);
          setLoading(false);
          return;
        } else {
          logger.debug('No valid local session, checking Supabase');
        }

        // Supabase認証を確認
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (!session) {
          logger.auth('supabase-session-check', false);
          router.push('/login');
        } else {
          logger.auth('supabase-session-check', true, {
            userId: session.user.id,
          });
          setUser(session.user);
        }
      } catch (error) {
        logError(error, { context: 'DashboardLayout.initializeAuth' });
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Supabase認証の状態変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // ローカル認証が有効な場合はSupabase認証を無視
      const localUser = LocalAuthService.getSession();
      if (localUser && LocalAuthService.isValidSession(localUser)) {
        return;
      }

      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      // ローカル認証のログアウト
      LocalAuthService.logout();

      // Supabase認証のログアウト
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      router.push('/login');
    } catch (error) {
      logError(error, { context: 'DashboardLayout.handleLogout' });
      // Even if logout fails, redirect to login
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* モバイルサイドバー */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-neutral-900/50"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSidebarOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="サイドバーを閉じる"
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <Sidebar
            user={user}
            pathname={pathname}
            onLogout={handleLogout}
            onClose={() => setSidebarOpen(false)}
            navigationItems={navigation}
          />
        </div>
      </div>

      {/* デスクトップサイドバー */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <Sidebar
          user={user}
          pathname={pathname}
          onLogout={handleLogout}
          navigationItems={navigation}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="lg:pl-64">
        {/* モバイルヘッダー */}
        <div className="sticky top-0 z-40 lg:hidden bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-lg font-semibold text-neutral-900">
              FX Trading Diary
            </h1>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="サイドバーを開く"
            >
              <Menu className="w-5 h-5 text-neutral-700" />
            </button>
          </div>
        </div>

        {/* ページコンテンツ */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
