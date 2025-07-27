'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowRight, AlertCircle, CheckCircle, Settings } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import LocalLoginDialog from '@/components/dev/LocalLoginDialog';
import type { LocalUser } from '@/lib/local-auth';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [showLocalDialog, setShowLocalDialog] = useState(false);

  console.log('RegisterPage state - showLocalDialog:', showLocalDialog);

  // テスト用のハンドラー
  const handleDialogOpen = () => {
    console.log('handleDialogOpen called');
    console.log('Before setState - showLocalDialog:', showLocalDialog);
    setShowLocalDialog(prev => {
      console.log('setState callback - prev:', prev, 'new:', true);
      return true;
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // マジックリンクを送信
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            isNewUser: true,
          },
        },
      });

      if (error) throw error;

      setEmailSent(true);
      setMessage({
        type: 'success',
        text: '確認メールを送信しました。メールをご確認ください。',
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setMessage({
        type: 'error',
        text: errorMessage.includes('Email rate limit exceeded')
          ? 'メール送信の制限に達しました。しばらく待ってから再度お試しください。'
          : errorMessage || '登録に失敗しました',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            isNewUser: true,
          },
        },
      });

      if (error) throw error;

      setMessage({
        type: 'success',
        text: '確認メールを再送信しました。',
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setMessage({
        type: 'error',
        text: '再送信に失敗しました。しばらく待ってから再度お試しください。',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLocalLogin = (user: LocalUser) => {
    // ローカルユーザー情報を保存して遷移
    console.log('Local user logged in from register:', user);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 w-full max-w-md">
        {!emailSent ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                アカウントを作成
              </h1>
              <p className="text-neutral-600">
                FX Trading Diaryで成長を記録しましょう
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  登録用のリンクをメールでお送りします
                </p>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg flex items-center gap-2 ${
                    message.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    確認メールを送信
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600">
                すでにアカウントをお持ちの方は
                <Link
                  href="/login"
                  className="text-neutral-900 font-medium hover:underline ml-1"
                >
                  ログイン
                </Link>
              </p>
            </div>

            {/* 開発用・緊急時用認証ボタン */}
            <div style={{ marginTop: '16px' }}>
              <button
                type="button"
                onClick={handleDialogOpen}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  border: '1px solid #fed7aa',
                  color: '#c2410c',
                  backgroundColor: '#fff7ed',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <Settings className="w-4 h-4" />
                <span>開発・緊急時認証</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                メールを確認してください
              </h2>
              <p className="text-neutral-600 mb-6">
                {email} に確認メールを送信しました。
                <br />
                メール内のリンクをクリックして登録を完了してください。
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-neutral-900 mb-2">
                次のステップ
              </h3>
              <ol className="text-sm text-neutral-600 space-y-1 list-decimal list-inside">
                <li>受信トレイを確認</li>
                <li>確認メールのリンクをクリック</li>
                <li>パスワードを設定して完了</li>
              </ol>
            </div>

            <div className="flex flex-col gap-2 space-y-3">
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={loading}
                className="w-full py-3 bg-neutral-400 text-white font-medium rounded-lg hover:bg-neutral-600 transition-colors disabled:opacity-50"
              >
                {loading ? '送信中...' : 'メールを再送信'}
              </button>

              <Link
                href="/login"
                className="w-full py-3 bg-neutral-400 text-white text-center font-medium rounded-lg hover:bg-neutral-600 transition-colors disabled:opacity-50"
              >
                ログインページに戻る
              </Link>
            </div>

            {message && (
              <div
                className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                  message.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>メールが届かない場合：</strong>
                <br />• 迷惑メールフォルダを確認してください
                <br />• しばらく待ってから再送信してください
                <br />• 別のメールアドレスでお試しください
              </p>
            </div>
          </>
        )}
      </div>

      {/* ローカル認証ダイアログ */}
      <LocalLoginDialog
        isOpen={showLocalDialog}
        onClose={() => {
          console.log('LocalLoginDialog closed');
          setShowLocalDialog(false);
        }}
        onLogin={handleLocalLogin}
      />
    </div>
  );
}
