'use client';

import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { validateLoginCredentials } from '@/utils/validation';
import { getErrorMessage, logError, ErrorMessages } from '@/utils/errorHandler';
import { LocalAuthService } from '@/lib/local-auth';
import LocalLoginDialog from '@/components/dev/LocalLoginDialog';
import type { AuthFormState, LoginCredentials } from '@/types/auth';
import type { LocalUser } from '@/lib/local-auth';

export default function LoginPage() {
  const router = useRouter();
  const [formState, setFormState] = useState<AuthFormState>({
    email: '',
    password: '',
    loading: false,
    error: '',
    showPassword: false,
  });
  const [showLocalDialog, setShowLocalDialog] = useState(false);

  const handleInputChange = (
    field: keyof AuthFormState,
    value: string | boolean,
  ) => {
    console.log('handleInputChange called:', field, value);
    setFormState((prev) => {
      const newState = {
        ...prev,
        [field]: value,
        error: '', // Clear error when user starts typing
      };
      console.log('New form state:', newState);
      return newState;
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = {
      email: formState.email.trim(),
      password: formState.password,
    };

    // Validate input
    const validationErrors = validateLoginCredentials(credentials);
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      setFormState((prev) => ({ ...prev, error: firstError }));
      return;
    }

    setFormState((prev) => ({ ...prev, loading: true, error: '' }));

    try {
      // まずローカル認証を試行
      const localUser = LocalAuthService.login(
        credentials.email,
        credentials.password,
      );
      if (localUser) {
        handleLocalLogin(localUser);
        return;
      }

      // Supabase認証を試行
      const { error } = await supabase.auth.signInWithPassword(credentials);

      if (error) {
        // Map Supabase errors to user-friendly messages
        let errorMessage = ErrorMessages.AUTH.LOGIN_FAILED;

        if (error.message.includes('Invalid login credentials')) {
          errorMessage = ErrorMessages.AUTH.INVALID_CREDENTIALS;
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = ErrorMessages.AUTH.EMAIL_NOT_VERIFIED;
        }

        throw new Error(errorMessage);
      }

      router.push('/dashboard');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      logError(error, {
        context: 'LoginPage.handleLogin',
        email: credentials.email,
      });

      setFormState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  };

  const handleLocalLogin = (user: LocalUser) => {
    // ローカルユーザー情報を保存して遷移
    console.log('Local user logged in:', user);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            おかえりなさい
          </h1>
          <p className="text-neutral-600">FX Trading Diaryにログイン</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              メールアドレス
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                required
                disabled={formState.loading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              パスワード
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
              <input
                id="password"
                type={formState.showPassword ? 'text' : 'password'}
                value={formState.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                required
                disabled={formState.loading}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Password toggle clicked, current:', formState.showPassword);
                  handleInputChange('showPassword', !formState.showPassword);
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  padding: '4px',
                  color: '#9ca3af',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: formState.loading ? 0.5 : 1,
                }}
                disabled={formState.loading}
                aria-label={
                  formState.showPassword
                    ? 'パスワードを隠す'
                    : 'パスワードを表示'
                }
              >
                {formState.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {formState.error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{formState.error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formState.loading}
            className="w-full py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {formState.loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                ログイン
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            アカウントをお持ちでない方は
            <Link
              href="/register"
              className="text-neutral-900 font-medium hover:underline ml-1"
            >
              新規登録
            </Link>
          </p>
        </div>

        {/* 開発用・緊急時用認証ボタン */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowLocalDialog(true)}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-orange-300 text-orange-700 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-sm"
          >
            <Settings className="w-4 h-4" />
            <span>開発・緊急時認証</span>
          </button>
        </div>
      </div>

      {/* ローカル認証ダイアログ */}
      <LocalLoginDialog
        isOpen={showLocalDialog}
        onClose={() => setShowLocalDialog(false)}
        onLogin={handleLocalLogin}
      />
    </div>
  );
}
