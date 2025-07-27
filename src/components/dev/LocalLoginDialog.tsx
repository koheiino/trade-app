'use client';

import { useState, useEffect } from 'react';
import { X, UserCheck, Users, Zap } from 'lucide-react';
import { LocalAuthService } from '@/lib/local-auth';
import type { LocalUser } from '@/lib/local-auth';

interface LocalLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: LocalUser) => void;
}

export default function LocalLoginDialog({
  isOpen,
  onClose,
  onLogin,
}: LocalLoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAccounts, setShowAccounts] = useState(false);

  console.log('LocalLoginDialog rendered, isOpen:', isOpen);

  useEffect(() => {
    console.log('LocalLoginDialog useEffect - isOpen changed:', isOpen);
  }, [isOpen]);

  if (!isOpen) {
    console.log('LocalLoginDialog returning null because isOpen is false');
    return null;
  }

  console.log('LocalLoginDialog rendering dialog because isOpen is true');

  const handleLocalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = LocalAuthService.login(email, password);
    if (user) {
      onLogin(user);
      onClose();
    } else {
      setError('認証情報が正しくありません');
    }
  };

  const handleBypassLogin = () => {
    const user = LocalAuthService.bypassLogin();
    onLogin(user);
    onClose();
  };

  const accounts = LocalAuthService.getAccountList();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          width: '100%',
          maxWidth: '448px',
          margin: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-neutral-900">ローカル認証</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>開発・緊急時用認証</strong>
            <br />
            Supabaseが利用できない場合のバックアップ認証システムです。
          </p>
        </div>

        <form onSubmit={handleLocalLogin} className="space-y-4 mb-6">
          <div>
            <label
              htmlFor="local-email"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              メールアドレス
            </label>
            <input
              id="local-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="admin@fxtradingdiary.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="local-password"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              パスワード
            </label>
            <input
              id="local-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            ローカルログイン
          </button>
        </form>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowAccounts(!showAccounts)}
            className="w-full flex items-center justify-center space-x-2 border border-neutral-300 text-neutral-700 py-3 px-4 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>アカウント一覧を表示</span>
          </button>

          <button
            type="button"
            onClick={handleBypassLogin}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>バイパスモード</span>
          </button>
        </div>

        {showAccounts && (
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
            <h3 className="text-sm font-medium text-neutral-900 mb-3">
              利用可能アカウント
            </h3>
            <div className="space-y-2 text-xs">
              {accounts.map((account) => (
                <div
                  key={account.email}
                  className="flex justify-between items-center p-2 bg-white rounded border"
                >
                  <div>
                    <div className="font-medium">{account.email}</div>
                    <div className="text-neutral-500">{account.name}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      account.role === 'admin'
                        ? 'bg-red-100 text-red-700'
                        : account.role === 'developer'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {account.role}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-500 mt-3">
              パスワードは「FXDiary2024!」（admin/dev）または「demo123」「test123」（ユーザー）
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
