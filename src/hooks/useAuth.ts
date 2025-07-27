/**
 * 統一認証フック
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  authManager,
  type AuthState,
  type LoginCredentials,
} from '@/lib/auth-manager';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(authManager.getState());
  const router = useRouter();

  useEffect(() => {
    // 認証状態の変更を監視
    const unsubscribe = authManager.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const result = await authManager.login(credentials);
    if (result.success) {
      router.push('/dashboard');
    }
    return result;
  };

  const logout = async () => {
    await authManager.logout();
    router.push('/login');
  };

  const requireAuth = () => {
    if (!authState.user && !authState.loading) {
      router.push('/login');
    }
  };

  return {
    // 状態
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    isAdmin: authManager.isAdmin(authState.user),
    isLocal: authState.user ? authManager.isLocalUser(authState.user) : false,

    // アクション
    login,
    logout,
    requireAuth,
  };
}
