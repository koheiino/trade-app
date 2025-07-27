/**
 * 統一認証管理システム
 * Supabaseとローカル認証を統一的に扱う
 */

import { supabase } from '@/lib/supabase';
import { LocalAuthService, type LocalUser } from '@/lib/local-auth';
import { logger } from '@/utils/logger';
import type { User } from '@supabase/supabase-js';

export type AuthUser = User | LocalUser;

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

class AuthManager {
  private static instance: AuthManager;
  private listeners: ((state: AuthState) => void)[] = [];
  private state: AuthState = {
    user: null,
    loading: true,
    error: null,
  };

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  private constructor() {
    this.initializeAuth();
  }

  /**
   * 認証状態を初期化
   */
  private async initializeAuth(): Promise<void> {
    try {
      // 1. ローカル認証を優先チェック
      const localUser = LocalAuthService.getSession();
      if (localUser && LocalAuthService.isValidSession(localUser)) {
        this.setState({ user: localUser, loading: false, error: null });
        logger.auth('initialization', true, {
          type: 'local',
          userId: localUser.id,
        });
        return;
      }

      // 2. Supabase認証をチェック
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;

      if (session?.user) {
        this.setState({ user: session.user, loading: false, error: null });
        logger.auth('initialization', true, {
          type: 'supabase',
          userId: session.user.id,
        });
      } else {
        this.setState({ user: null, loading: false, error: null });
        logger.auth('initialization', false, { type: 'none' });
      }

      // Supabaseの認証状態変更を監視
      supabase.auth.onAuthStateChange((event, session) => {
        // ローカル認証が有効な場合はSupabaseイベントを無視
        const currentLocalUser = LocalAuthService.getSession();
        if (
          currentLocalUser &&
          LocalAuthService.isValidSession(currentLocalUser)
        ) {
          return;
        }

        if (session?.user) {
          this.setState({ user: session.user, loading: false, error: null });
          logger.auth('state-change', true, { event, userId: session.user.id });
        } else {
          this.setState({ user: null, loading: false, error: null });
          logger.auth('state-change', false, { event });
        }
      });
    } catch (error) {
      this.setState({
        user: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Authentication initialization failed',
      });
      logger.error('Auth initialization failed', error as Error);
    }
  }

  /**
   * ログイン
   */
  async login(
    credentials: LoginCredentials,
  ): Promise<{ success: boolean; error?: string }> {
    this.setState({ ...this.state, loading: true, error: null });

    try {
      // 1. ローカル認証を試行
      const localUser = LocalAuthService.login(
        credentials.email,
        credentials.password,
      );
      if (localUser) {
        this.setState({ user: localUser, loading: false, error: null });
        logger.auth('login', true, { type: 'local', userId: localUser.id });
        return { success: true };
      }

      // 2. Supabase認証を試行
      const { data, error } =
        await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;

      if (data.user) {
        this.setState({ user: data.user, loading: false, error: null });
        logger.auth('login', true, { type: 'supabase', userId: data.user.id });
        return { success: true };
      }

      throw new Error('Login failed: No user returned');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      this.setState({ user: null, loading: false, error: errorMessage });
      logger.auth('login', false, { error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }

  /**
   * ログアウト
   */
  async logout(): Promise<void> {
    try {
      // ローカル認証をクリア
      LocalAuthService.logout();

      // Supabase認証をクリア
      await supabase.auth.signOut();

      this.setState({ user: null, loading: false, error: null });
      logger.auth('logout', true);
    } catch (error) {
      logger.error('Logout failed', error as Error);
      // エラーでも状態はクリア
      this.setState({ user: null, loading: false, error: null });
    }
  }

  /**
   * 現在の認証状態を取得
   */
  getState(): AuthState {
    return this.state;
  }

  /**
   * 認証状態の変更を監視
   */
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    // 購読解除関数を返す
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * ユーザーがローカル認証かどうか判定
   */
  isLocalUser(user: AuthUser): user is LocalUser {
    return 'isLocal' in user && user.isLocal === true;
  }

  /**
   * 管理者権限を持つかチェック
   */
  isAdmin(user?: AuthUser | null): boolean {
    if (!user) return false;

    if (this.isLocalUser(user)) {
      return LocalAuthService.isAdmin(user);
    }

    // Supabaseユーザーの場合、メタデータで判定
    return (user as User).user_metadata?.role === 'admin';
  }

  /**
   * 状態を更新し、リスナーに通知
   */
  private setState(newState: AuthState): void {
    this.state = newState;
    this.listeners.forEach((listener) => listener(newState));
  }
}

export const authManager = AuthManager.getInstance();
