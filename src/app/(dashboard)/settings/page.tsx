'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  DollarSign,
  Shield,
  Bell,
  Trash2,
  Save,
  AlertTriangle,
  Check,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { UserStats } from '@/lib/supabase';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // 設定フォームの状態
  const [settings, setSettings] = useState({
    defaultStartAmount: 5000,
    riskPercentage: 5,
    enableEmailNotifications: true,
    enableDailyReminder: false,
    reminderTime: '09:00',
  });

  // アカウント削除モーダル
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // ユーザー統計を取得
      const { data: stats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (stats) {
        setUserStats(stats);
        // 既存の設定があれば反映
        if (stats.settings) {
          setSettings({
            ...settings,
            ...stats.settings,
          });
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!user) return;

    setSaving(true);
    setMessage(null);

    try {
      // user_statsテーブルのsettingsカラムを更新
      const { error } = await supabase
        .from('user_stats')
        .update({
          settings: settings,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setMessage({ type: 'success', text: '設定を保存しました' });

      // 3秒後にメッセージを消す
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: '設定の保存に失敗しました' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || deleteConfirmation !== 'DELETE') return;

    try {
      // まず関連データを削除
      await supabase.from('trades').delete().eq('user_id', user.id);
      await supabase.from('daily_entries').delete().eq('user_id', user.id);
      await supabase.from('user_stats').delete().eq('user_id', user.id);

      // アカウントを削除（Supabase Authから）
      const { error } = await supabase.auth.admin.deleteUser(user.id);

      if (error) {
        // 管理者権限がない場合は、ユーザーに手動削除を依頼
        setMessage({
          type: 'error',
          text: 'アカウントの完全削除にはサポートへの連絡が必要です。データは削除されました。',
        });
      } else {
        // ログアウトしてリダイレクト
        await supabase.auth.signOut();
        router.push('/');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage({ type: 'error', text: 'アカウントの削除に失敗しました' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">設定</h1>
        <p className="text-neutral-600 mt-1">
          アカウントとアプリケーションの設定を管理します
        </p>
      </div>

      {/* メッセージ表示 */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {/* アカウント情報 */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-bold">アカウント情報</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              メールアドレス
            </label>
            <p className="text-neutral-900">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              アカウント作成日
            </label>
            <p className="text-neutral-900">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString('ja-JP')
                : '-'}
            </p>
          </div>
        </div>
      </div>

      {/* トレード設定 */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-bold">トレード設定</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              デフォルト開始金額
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-neutral-500">¥</span>
              <input
                type="number"
                value={settings.defaultStartAmount}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultStartAmount: Number(e.target.value),
                  })
                }
                className="w-full pl-8 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              新規ユーザーの初期資金額
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              リスク許容度
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.riskPercentage}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    riskPercentage: Number(e.target.value),
                  })
                }
                min="1"
                max="10"
                className="w-full pr-8 px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
              <span className="absolute right-3 top-3 text-neutral-500">%</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              1トレードあたりの最大リスク
            </p>
          </div>
        </div>
      </div>

      {/* 通知設定 */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-bold">通知設定</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 cursor-pointer">
            <div>
              <p className="font-medium text-neutral-900">メール通知</p>
              <p className="text-sm text-neutral-500">
                重要な更新やレポートを受け取る
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.enableEmailNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  enableEmailNotifications: e.target.checked,
                })
              }
              className="w-5 h-5 accent-neutral-900"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 cursor-pointer">
            <div>
              <p className="font-medium text-neutral-900">
                デイリーリマインダー
              </p>
              <p className="text-sm text-neutral-500">
                毎日の記録を忘れないように通知
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.enableDailyReminder}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  enableDailyReminder: e.target.checked,
                })
              }
              className="w-5 h-5 accent-neutral-900"
            />
          </label>

          {settings.enableDailyReminder && (
            <div className="ml-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                リマインダー時刻
              </label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) =>
                  setSettings({ ...settings, reminderTime: e.target.value })
                }
                className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          )}
        </div>
      </div>

      {/* 保存ボタン */}
      <button
        onClick={handleSaveSettings}
        disabled={saving}
        className="w-full py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {saving ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
        ) : (
          <>
            <Save className="w-5 h-5" />
            設定を保存
          </>
        )}
      </button>

      {/* 危険ゾーン */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-bold text-red-900">危険ゾーン</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-red-900 mb-2">アカウントを削除</h3>
            <p className="text-sm text-red-700 mb-4">
              この操作は取り消すことができません。すべてのデータが永久に削除されます。
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              アカウントを削除
            </button>
          </div>
        </div>
      </div>

      {/* 削除確認モーダル */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold">アカウントを削除しますか？</h3>
            </div>

            <p className="text-neutral-600 mb-4">
              この操作は取り消すことができません。すべてのトレード記録、統計データ、設定が永久に削除されます。
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                確認のため「DELETE」と入力してください
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="DELETE"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE'}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
